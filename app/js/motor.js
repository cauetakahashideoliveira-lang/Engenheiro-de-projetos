/*
 * Entre Escolhas — motor do jogo.
 * Não depende do DOM: roda no navegador (window.Motor) e no Node (require).
 * Regras centrais:
 *  - Pontos de Ação (PA) começam em Infinity. Toda ação passa por PontosDeAcao.gastar(),
 *    e Infinity - custo continua Infinity: nenhuma ação fica bloqueada por saldo.
 *  - O saldo não é gravado no save; vem sempre de REGRAS, então nenhum save importado
 *    consegue limitar os PA.
 *  - Cada mudança de estado é persistida imediatamente.
 */
(function (raiz, fabrica) {
  const m = fabrica();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else raiz.Motor = m;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FORMATO = 'entre-escolhas-save';
  const VERSAO_SAVE = 1;
  const CHAVE_PADRAO = 'entre-escolhas:save:v1';

  const REGRAS = Object.freeze({
    PA_INICIAL: Infinity,
    CUSTOS: Object.freeze({ andar: 1, conversar: 1, escolher: 1, episodio: 1, repetir: 1 }),
    AF_MIN: -5,
    AF_MAX: 10,
    LIMITE_HISTORICO: 400,
    NOME_MAX: 24,
  });

  const FASES = ['falas', 'escolha', 'resposta', 'mapa', 'fim'];
  const REVISITA_PADRAO = [['n', 'Você já passou por aqui. Melhor seguir para outro lugar.']];

  /* ---------- Pontos de Ação ---------- */
  class PontosDeAcao {
    constructor(saldo = REGRAS.PA_INICIAL) {
      this.saldo = saldo;
      this.gastos = 0;
    }
    get ilimitado() { return this.saldo === Infinity; }
    get rotulo() { return this.ilimitado ? 'PA ∞' : `PA ${this.saldo}`; }
    custo(tipo) { return REGRAS.CUSTOS[tipo] ?? 0; }
    podeGastar(tipo) { return this.saldo >= this.custo(tipo); }
    gastar(tipo) {
      const c = this.custo(tipo);
      if (!this.podeGastar(tipo)) return false;
      this.saldo -= c; // Infinity - c === Infinity
      this.gastos += c;
      return true;
    }
  }

  class ErroPA extends Error {
    constructor() { super('Pontos de Ação insuficientes.'); this.name = 'ErroPA'; }
  }

  /* ---------- Armazenamento ---------- */
  function armazenamentoMemoria(inicial = null) {
    let dado = inicial ? JSON.parse(JSON.stringify(inicial)) : null;
    return {
      carregar() { return dado ? JSON.parse(JSON.stringify(dado)) : null; },
      salvar(d) { dado = JSON.parse(JSON.stringify(d)); return true; },
      limpar() { dado = null; },
    };
  }

  function armazenamentoLocal(chave = CHAVE_PADRAO) {
    const reserva = armazenamentoMemoria();
    const ls = () => { try { return globalThis.localStorage || null; } catch (e) { return null; } };
    return {
      carregar() {
        try {
          const t = ls() && ls().getItem(chave);
          return t ? JSON.parse(t) : reserva.carregar();
        } catch (e) { return reserva.carregar(); }
      },
      salvar(d) {
        reserva.salvar(d);
        try { ls().setItem(chave, JSON.stringify(d)); return true; } catch (e) { return false; }
      },
      limpar() {
        reserva.limpar();
        try { ls().removeItem(chave); } catch (e) { /* sem armazenamento */ }
      },
    };
  }

  /* ---------- utilidades ---------- */
  const clonar = (o) => JSON.parse(JSON.stringify(o));
  const lista = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]);
  const limitar = (v) => Math.max(REGRAS.AF_MIN, Math.min(REGRAS.AF_MAX, v));
  const ehObj = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);
  const inteiro = (v, padrao = 0) => (Number.isInteger(v) && v >= 0 ? v : padrao);

  function normLinha(l) {
    if (Array.isArray(l)) return { p: l[0], t: l[1], e: l[2] };
    return l;
  }

  function novoSave() {
    const agora = Date.now();
    return {
      formato: FORMATO, versao: VERSAO_SAVE, criado: agora, atualizado: agora,
      perfil: null, ultima: null, historias: {},
      estat: { acoes: 0, escolhas: 0, episodios: 0 },
    };
  }

  function novoEstadoHistoria() {
    return { ep: null, pos: null, af: {}, marcas: {}, visitados: {}, historico: [], concluidos: {}, inicios: {} };
  }

  /* ---------- validação de save ---------- */
  function limparAparencia(a) {
    const r = {};
    if (!ehObj(a)) return r;
    for (const k of ['pele', 'cabelo', 'corCabelo', 'olhos', 'roupa', 'corRoupa', 'acessorio']) {
      if (typeof a[k] === 'string' && /^[a-z0-9_-]{1,20}$/.test(a[k])) r[k] = a[k];
    }
    return r;
  }

  function limparMarcas(m) {
    const r = {};
    if (!ehObj(m)) return r;
    for (const [k, v] of Object.entries(m)) if (/^[\w-]{1,40}$/.test(k) && v === true) r[k] = true;
    return r;
  }

  function limparAf(af, d) {
    const r = {};
    if (!ehObj(af)) return r;
    for (const p of d.elenco) if (typeof af[p.id] === 'number' && isFinite(af[p.id])) r[p.id] = limitar(Math.round(af[p.id]));
    return r;
  }

  function limparHistoria(h, d) {
    const r = novoEstadoHistoria();
    if (!ehObj(h)) return r;
    const eps = Object.fromEntries(d.episodios.map((e) => [e.id, e]));
    r.af = limparAf(h.af, d);
    r.marcas = limparMarcas(h.marcas);
    if (ehObj(h.visitados)) {
      for (const [ep, v] of Object.entries(h.visitados)) {
        if (eps[ep] && Array.isArray(v)) r.visitados[ep] = v.filter((x) => typeof x === 'string').slice(0, 50);
      }
    }
    if (Array.isArray(h.historico)) {
      r.historico = h.historico.filter(ehObj).slice(-REGRAS.LIMITE_HISTORICO).map((x) => {
        const y = {};
        for (const k of ['tipo', 'ep', 'cena', 'texto', 'final']) if (typeof x[k] === 'string') y[k] = x[k].slice(0, 300);
        if (typeof x.em === 'number') y.em = x.em;
        if (typeof x.repeticao === 'boolean') y.repeticao = x.repeticao;
        if (ehObj(x.af)) y.af = limparAf(x.af, d);
        return y;
      });
    }
    if (ehObj(h.concluidos)) {
      for (const [ep, c] of Object.entries(h.concluidos)) {
        if (!eps[ep] || !ehObj(c)) continue;
        r.concluidos[ep] = {
          vezes: Math.max(1, inteiro(c.vezes, 1)),
          finais: lista(c.finais).filter((x) => typeof x === 'string').slice(0, 20),
          ultimoFinal: typeof c.ultimoFinal === 'string' ? c.ultimoFinal : null,
          af: limparAf(c.af, d),
        };
      }
    }
    if (ehObj(h.inicios)) {
      for (const [ep, s] of Object.entries(h.inicios)) {
        if (eps[ep] && ehObj(s)) r.inicios[ep] = { af: limparAf(s.af, d), marcas: limparMarcas(s.marcas) };
      }
    }
    if (typeof h.ep === 'string' && eps[h.ep] && ehObj(h.pos)) {
      const ep = eps[h.ep];
      const p = h.pos;
      const cena = ep.cenas[p.cena];
      if (cena && FASES.includes(p.fase)) {
        const pos = { cena: p.cena, fase: p.fase, i: inteiro(p.i) };
        if (typeof p.mapa === 'string' && ep.cenas[p.mapa] && ep.cenas[p.mapa].mapa) pos.mapa = p.mapa;
        if (p.revisita === true) pos.revisita = true;
        if (p.fase === 'resposta') {
          if (cena.escolhas && cena.escolhas[p.escolha]) pos.escolha = p.escolha;
          else { pos.fase = 'falas'; pos.i = 0; }
        }
        if (p.fase === 'mapa' && !cena.mapa) { pos.fase = 'falas'; pos.i = 0; }
        if (p.fase === 'escolha' && !cena.escolhas) { pos.fase = 'falas'; pos.i = 0; }
        r.ep = h.ep;
        r.pos = pos;
      }
    }
    return r;
  }

  function validarSave(o, mapaHistorias) {
    if (o == null) return null;
    if (!ehObj(o) || o.formato !== FORMATO) throw new Error('Este arquivo não é um save do Entre Escolhas.');
    if (!Number.isInteger(o.versao) || o.versao < 1 || o.versao > VERSAO_SAVE) throw new Error('Versão de save não suportada.');
    const s = novoSave();
    if (typeof o.criado === 'number') s.criado = o.criado;
    if (typeof o.atualizado === 'number') s.atualizado = o.atualizado;
    if (ehObj(o.perfil)) {
      const nome = String(o.perfil.nome || '').replace(/\s+/g, ' ').trim().slice(0, REGRAS.NOME_MAX);
      if (nome) s.perfil = { nome, aparencia: limparAparencia(o.perfil.aparencia) };
    }
    if (typeof o.ultima === 'string' && mapaHistorias[o.ultima]) s.ultima = o.ultima;
    if (ehObj(o.historias)) {
      for (const [hid, h] of Object.entries(o.historias)) {
        if (mapaHistorias[hid]) s.historias[hid] = limparHistoria(h, mapaHistorias[hid]);
      }
    }
    if (ehObj(o.estat)) for (const k of Object.keys(s.estat)) s.estat[k] = inteiro(o.estat[k]);
    return s;
  }

  /* ---------- Jogo ---------- */
  class Jogo {
    constructor({ historias, armazenamento } = {}) {
      if (!Array.isArray(historias) || !historias.length) throw new Error('Nenhuma história carregada.');
      this.lista = historias;
      this.mapa = Object.fromEntries(historias.map((h) => [h.id, h]));
      this.arm = armazenamento || armazenamentoMemoria();
      this.pa = new PontosDeAcao();
      this.ultimoSalvamento = null;
      this.erroCarregamento = null;
      let s = null;
      try { s = validarSave(this.arm.carregar(), this.mapa); } catch (e) { this.erroCarregamento = e.message; }
      this.save = s || novoSave();
    }

    /* PA */
    get rotuloPA() { return this.pa.rotulo; }
    acao(tipo) {
      if (!this.pa.gastar(tipo)) throw new ErroPA();
      this.save.estat.acoes++;
    }

    /* persistência */
    persistir() {
      this.save.atualizado = Date.now();
      const ok = this.arm.salvar(this.save);
      this.ultimoSalvamento = { em: this.save.atualizado, ok };
      return ok;
    }
    exportar() { return JSON.stringify(this.save, null, 2); }
    importar(texto) {
      let obj;
      try { obj = JSON.parse(texto); } catch (e) { throw new Error('O arquivo não é um JSON válido.'); }
      const s = validarSave(obj, this.mapa);
      if (!s) throw new Error('O arquivo está vazio.');
      this.save = s;
      this.persistir();
      return s;
    }
    apagarTudo() { this.save = novoSave(); this.persistir(); }

    /* perfil */
    get perfil() { return this.save.perfil; }
    definirPerfil(nome, aparencia) {
      const n = String(nome || '').replace(/\s+/g, ' ').trim().slice(0, REGRAS.NOME_MAX);
      if (!n) throw new Error('Escolha um nome para a sua personagem.');
      this.save.perfil = { nome: n, aparencia: limparAparencia(aparencia) };
      this.persistir();
      return this.save.perfil;
    }

    /* acesso aos dados */
    historia(hid) {
      const d = this.mapa[hid];
      if (!d) throw new Error(`História desconhecida: ${hid}`);
      return d;
    }
    estado(hid) {
      this.historia(hid);
      if (!this.save.historias[hid]) this.save.historias[hid] = novoEstadoHistoria();
      return this.save.historias[hid];
    }
    episodio(hid, epId) {
      const ep = this.historia(hid).episodios.find((e) => e.id === epId);
      if (!ep) throw new Error(`Episódio desconhecido: ${epId}`);
      return ep;
    }
    indiceEp(hid, epId) { return this.historia(hid).episodios.findIndex((e) => e.id === epId); }

    pessoa(hid, id) {
      if (!id || id === 'n') return null;
      if (id === 'eu') {
        const p = this.save.perfil;
        return { id: 'eu', nome: p ? p.nome : 'Você', aparencia: p ? p.aparencia : {}, jogador: true };
      }
      const d = this.historia(hid);
      const c = d.elenco.find((x) => x.id === id);
      if (c) return { id, nome: c.nome, aparencia: c.aparencia, elenco: true };
      const x = d.extras && d.extras[id];
      if (x) return { id, nome: x.nome, aparencia: x.aparencia };
      return { id, nome: id, aparencia: {} };
    }

    texto(t) {
      const nome = this.save.perfil ? this.save.perfil.nome : 'Você';
      return String(t || '').replace(/\{nome\}/g, nome);
    }

    cumpre(se, hid) {
      if (!se) return true;
      const h = this.estado(hid);
      if (lista(se.marca).some((m) => !h.marcas[m])) return false;
      if (se.alguma && !lista(se.alguma).some((m) => h.marcas[m])) return false;
      if (lista(se.nao).some((m) => h.marcas[m])) return false;
      if (se.afMin) for (const [k, v] of Object.entries(se.afMin)) if ((h.af[k] || 0) < v) return false;
      if (se.afMax) for (const [k, v] of Object.entries(se.afMax)) if ((h.af[k] || 0) > v) return false;
      if (se.maior) {
        const elenco = this.historia(hid).elenco.map((p) => p.id);
        const iAlvo = elenco.indexOf(se.maior);
        const vAlvo = h.af[se.maior] || 0;
        for (let i = 0; i < elenco.length; i++) {
          if (i === iAlvo) continue;
          const v = h.af[elenco[i]] || 0;
          if (v > vAlvo || (v === vAlvo && i < iAlvo)) return false;
        }
      }
      if (se.visitou) {
        const vis = (h.ep && h.visitados[h.ep]) || [];
        if (lista(se.visitou).some((l) => !vis.includes(l))) return false;
      }
      return true;
    }

    episodios(hid) {
      const d = this.historia(hid);
      const h = this.estado(hid);
      return d.episodios.map((ep, i) => {
        const c = h.concluidos[ep.id];
        return {
          id: ep.id, numero: i + 1, rotulo: ep.rotulo || `Episódio ${i + 1}`, titulo: ep.titulo, previa: ep.previa,
          foco: ep.foco || null,
          concluido: !!c, vezes: c ? c.vezes : 0, finais: c ? c.finais : [],
          desbloqueado: !!d.independentes || i === 0 || !!h.concluidos[d.episodios[i - 1].id],
          emAndamento: h.ep === ep.id && !!h.pos && h.pos.fase !== 'fim',
        };
      });
    }

    afinidades(hid) {
      const d = this.historia(hid);
      const h = this.estado(hid);
      const ep = h.ep ? this.episodio(hid, h.ep) : null;
      const ids = ep && ep.foco ? [ep.foco] : d.elenco.map((p) => p.id);
      return ids.map((id) => {
        const p = d.elenco.find((x) => x.id === id);
        return { id, nome: p.nome, aparencia: p.aparencia, valor: h.af[id] || 0, min: REGRAS.AF_MIN, max: REGRAS.AF_MAX };
      });
    }

    /* ---------- fluxo de episódio ---------- */
    iniciarEpisodio(hid, epId) {
      const d = this.historia(hid);
      const h = this.estado(hid);
      const ep = this.episodio(hid, epId);
      const info = this.episodios(hid).find((e) => e.id === epId);
      if (!info.desbloqueado) throw new Error('Conclua o episódio anterior para liberar este.');
      const idx = this.indiceEp(hid, epId);
      const idxAtual = h.ep ? this.indiceEp(hid, h.ep) : -1;
      const repeticao = !!h.concluidos[epId] || idx <= idxAtual;
      this.acao(repeticao ? 'repetir' : 'episodio');

      if (d.independentes) {
        h.af = {};
        h.marcas = {};
      } else if (h.inicios[epId] && idx <= idxAtual) {
        // Voltando a um episódio já iniciado: restaura o estado do começo dele.
        h.af = clonar(h.inicios[epId].af);
        h.marcas = clonar(h.inicios[epId].marcas);
        d.episodios.forEach((e, i) => { if (i > idx) delete h.inicios[e.id]; });
      } else {
        h.inicios[epId] = { af: clonar(h.af), marcas: clonar(h.marcas) };
      }
      if (d.independentes) h.inicios[epId] = { af: {}, marcas: {} };

      h.ep = epId;
      h.visitados[epId] = [];
      this._registrar(h, { tipo: 'episodio', ep: epId, repeticao });
      this._entrar(hid, ep.inicio, {});
      this.save.ultima = hid;
      this._normalizar(hid);
      this.persistir();
      return this.vista(hid);
    }

    /** Começa a história do ponto certo: retoma o que está em andamento ou abre o próximo episódio. */
    continuar(hid) {
      const h = this.estado(hid);
      this.save.ultima = hid;
      if (h.ep && h.pos) { this.persistir(); return this.vista(hid); }
      const d = this.historia(hid);
      if (!d.independentes) return this.iniciarEpisodio(hid, d.episodios[0].id);
      this.persistir();
      return this.vista(hid);
    }

    avancar(hid) {
      const h = this.estado(hid);
      if (!h.pos || (h.pos.fase !== 'falas' && h.pos.fase !== 'resposta')) return this.vista(hid);
      h.pos.i++;
      this._normalizar(hid);
      this.persistir();
      return this.vista(hid);
    }

    escolher(hid, indice) {
      const h = this.estado(hid);
      if (!h.pos || h.pos.fase !== 'escolha') throw new Error('Não há escolha a fazer agora.');
      const cena = this._cena(hid);
      const op = this._escolhasVisiveis(hid, cena).find((e) => e.i === indice);
      if (!op) throw new Error('Opção indisponível.');
      this.acao('escolher');
      const d = this.historia(hid);
      const mudancas = [];
      for (const [id, delta] of Object.entries(op.af || {})) {
        const antes = h.af[id] || 0;
        const depois = limitar(antes + delta);
        h.af[id] = depois;
        const p = d.elenco.find((x) => x.id === id);
        if (depois !== antes) mudancas.push({ id, nome: p ? p.nome : id, delta: depois - antes, valor: depois });
      }
      for (const m of lista(op.marca)) h.marcas[m] = true;
      this.save.estat.escolhas++;
      this._registrar(h, { tipo: 'escolha', ep: h.ep, cena: h.pos.cena, texto: this.texto(op.t), af: op.af || {} });
      const posAnterior = h.pos;
      if (op.resp && op.resp.length) {
        h.pos = Object.assign({}, posAnterior, { fase: 'resposta', i: 0, escolha: op.i });
      } else {
        this._ir(hid, op.ir || this._destino(hid, cena, posAnterior), posAnterior);
      }
      this._normalizar(hid);
      this.persistir();
      return { vista: this.vista(hid), mudancas };
    }

    visitar(hid, localId) {
      const h = this.estado(hid);
      if (!h.pos || h.pos.fase !== 'mapa') throw new Error('Não há mapa aberto.');
      const cena = this._cena(hid);
      const local = this._locais(hid, cena).find((l) => l.id === localId);
      if (!local) throw new Error('Lugar indisponível.');
      this.acao('andar');
      this.acao('conversar');
      const vis = h.visitados[h.ep] || (h.visitados[h.ep] = []);
      const revisita = vis.includes(localId);
      if (!revisita) vis.push(localId);
      const mapa = h.pos.cena;
      this._entrar(hid, local.cena, revisita ? { mapa, revisita: true } : { mapa });
      this._normalizar(hid);
      this.persistir();
      return this.vista(hid);
    }

    sairDoMapa(hid) {
      const h = this.estado(hid);
      if (!h.pos || h.pos.fase !== 'mapa') throw new Error('Não há mapa aberto.');
      const cena = this._cena(hid);
      const vis = h.visitados[h.ep] || [];
      if (vis.length < (cena.mapa.minimo || 0)) throw new Error(`Visite pelo menos ${cena.mapa.minimo} lugares.`);
      this.acao('andar');
      this._entrar(hid, cena.mapa.sair, {});
      this._normalizar(hid);
      this.persistir();
      return this.vista(hid);
    }

    /* ---------- internos ---------- */
    _registrar(h, item) {
      h.historico.push(Object.assign({ em: Date.now() }, item));
      if (h.historico.length > REGRAS.LIMITE_HISTORICO) h.historico.splice(0, h.historico.length - REGRAS.LIMITE_HISTORICO);
    }

    _cena(hid) {
      const h = this.estado(hid);
      const ep = this.episodio(hid, h.ep);
      const c = ep.cenas[h.pos.cena];
      if (!c) throw new Error(`Cena desconhecida: ${h.pos.cena}`);
      return c;
    }

    _entrar(hid, cenaId, extras) {
      const h = this.estado(hid);
      const ep = this.episodio(hid, h.ep);
      const c = ep.cenas[cenaId];
      if (!c) throw new Error(`Cena desconhecida: ${cenaId}`);
      h.pos = Object.assign({ cena: cenaId, fase: 'falas', i: 0 }, extras);
      if (!extras.revisita) for (const m of lista(c.marca)) h.marcas[m] = true;
    }

    _falas(hid, cena) {
      const h = this.estado(hid);
      const pos = h.pos;
      let base = [];
      if (pos.fase === 'falas') base = pos.revisita ? (cena.revisita || REVISITA_PADRAO) : (cena.falas || []);
      else if (pos.fase === 'resposta') base = cena.escolhas[pos.escolha].resp || [];
      else if (pos.fase === 'escolha' || pos.fase === 'mapa') base = cena.falas || [];
      return base.map(normLinha).filter((l) => this.cumpre(l.se, hid));
    }

    _escolhasVisiveis(hid, cena) {
      return (cena.escolhas || []).map((e, i) => Object.assign({ i }, e)).filter((e) => this.cumpre(e.se, hid));
    }

    _locais(hid, cena) {
      return (cena.mapa.locais || []).filter((l) => this.cumpre(l.se, hid));
    }

    _destino(hid, cena, pos) {
      if (pos.revisita) return '@mapa';
      if (cena.ir) return cena.ir;
      if (cena.ramos) {
        const r = cena.ramos.find((x) => this.cumpre(x.se, hid));
        if (r) return r.ir;
      }
      if (cena.fim) return '@fim';
      if (pos.mapa) return '@mapa';
      throw new Error(`Cena sem saída: ${pos.cena}`);
    }

    _ir(hid, destino, posAnterior) {
      const h = this.estado(hid);
      if (destino === '@mapa') { h.pos = { cena: posAnterior.mapa, fase: 'mapa', i: 0 }; return; }
      if (destino === '@fim') { this._concluir(hid); return; }
      this._entrar(hid, destino, posAnterior.mapa ? { mapa: posAnterior.mapa } : {});
    }

    _concluir(hid) {
      const h = this.estado(hid);
      const cena = this._cena(hid);
      h.pos = { cena: h.pos.cena, fase: 'fim', i: 0 };
      const reg = h.concluidos[h.ep] || { vezes: 0, finais: [], ultimoFinal: null, af: {} };
      reg.vezes++;
      reg.ultimoFinal = cena.final || null;
      if (cena.final && !reg.finais.includes(cena.final)) reg.finais.push(cena.final);
      reg.af = clonar(h.af);
      h.concluidos[h.ep] = reg;
      this.save.estat.episodios++;
      this._registrar(h, { tipo: 'fim', ep: h.ep, final: cena.final || '' });
    }

    _normalizar(hid) {
      const h = this.estado(hid);
      for (let guarda = 0; guarda < 200; guarda++) {
        const pos = h.pos;
        if (!pos || pos.fase === 'fim' || pos.fase === 'mapa' || pos.fase === 'escolha') return;
        const cena = this._cena(hid);
        const falas = this._falas(hid, cena);
        if (pos.i < falas.length) return;
        if (pos.fase === 'falas' && !pos.revisita) {
          if (this._escolhasVisiveis(hid, cena).length) { h.pos = Object.assign({}, pos, { fase: 'escolha', i: 0 }); return; }
          if (cena.mapa) { h.pos = { cena: pos.cena, fase: 'mapa', i: 0 }; return; }
        }
        let destino;
        if (pos.fase === 'resposta') destino = cena.escolhas[pos.escolha].ir || this._destino(hid, cena, pos);
        else destino = this._destino(hid, cena, pos);
        this._ir(hid, destino, pos);
      }
      throw new Error('O roteiro entrou em laço.');
    }

    _mostra(hid, cena, linha) {
      const base = linha && linha.mostra ? lista(linha.mostra) : lista(cena.mostra);
      const ids = base.slice();
      const fal = linha && linha.p;
      if (fal && fal !== 'n' && fal !== 'eu' && !ids.includes(fal)) ids.push(fal);
      return ids.slice(-3).map((id) => {
        const p = this.pessoa(hid, id);
        return { id, nome: p.nome, aparencia: p.aparencia, fala: id === fal, expressao: id === fal ? (linha.e || 'neutro') : 'neutro' };
      });
    }

    /* ---------- vista para a interface ---------- */
    vista(hid) {
      const d = this.historia(hid);
      const h = this.estado(hid);
      const comum = { historia: { id: d.id, nome: d.nome, rota: d.rota }, pa: this.pa.rotulo, acoes: this.save.estat.acoes };
      if (!h.ep || !h.pos) return Object.assign(comum, { tipo: 'inicio', episodios: this.episodios(hid), cenario: d.capa });
      const ep = this.episodio(hid, h.ep);
      const idx = this.indiceEp(hid, h.ep);
      const cena = this._cena(hid);
      Object.assign(comum, {
        episodio: { id: ep.id, titulo: ep.titulo, rotulo: ep.rotulo || `Episódio ${idx + 1}`, numero: idx + 1 },
        cenario: cena.cenario || ep.cenario || d.capa,
        afinidades: this.afinidades(hid),
      });
      const pos = h.pos;
      if (pos.fase === 'falas' || pos.fase === 'resposta') {
        const falas = this._falas(hid, cena);
        const l = falas[pos.i];
        return Object.assign(comum, {
          tipo: 'fala', falante: this.pessoa(hid, l.p), texto: this.texto(l.t), expressao: l.e || 'neutro',
          mostra: this._mostra(hid, cena, l), indice: pos.i, total: falas.length, cena: pos.cena,
        });
      }
      if (pos.fase === 'escolha') {
        const falas = this._falas(hid, cena);
        const ult = falas[falas.length - 1];
        return Object.assign(comum, {
          tipo: 'escolha', cena: pos.cena,
          contexto: ult ? { falante: this.pessoa(hid, ult.p), texto: this.texto(ult.t) } : null,
          opcoes: this._escolhasVisiveis(hid, cena).map((e) => ({ i: e.i, texto: this.texto(e.t) })),
          mostra: this._mostra(hid, cena, ult ? Object.assign({}, ult, { e: ult.e }) : null),
        });
      }
      if (pos.fase === 'mapa') {
        const vis = h.visitados[h.ep] || [];
        const minimo = cena.mapa.minimo || 0;
        return Object.assign(comum, {
          tipo: 'mapa', cena: pos.cena, texto: this.texto(cena.mapa.texto || 'Para onde você vai?'),
          locais: this._locais(hid, cena).map((l) => ({
            id: l.id, nome: l.nome, descricao: l.descricao || '', visitado: vis.includes(l.id),
            cenario: (ep.cenas[l.cena] && ep.cenas[l.cena].cenario) || comum.cenario,
          })),
          podeSair: vis.length >= minimo, faltam: Math.max(0, minimo - vis.length),
          textoSair: cena.mapa.textoSair || 'Seguir em frente', mostra: [],
        });
      }
      // fim
      const antes = (h.inicios[h.ep] && h.inicios[h.ep].af) || {};
      const proximo = d.independentes ? null : d.episodios[idx + 1] || null;
      return Object.assign(comum, {
        tipo: 'fim', cena: pos.cena, final: cena.final || null, mostra: [],
        resumo: this.afinidades(hid).map((a) => ({ id: a.id, nome: a.nome, antes: antes[a.id] || 0, depois: a.valor })),
        proximo: proximo ? { id: proximo.id, titulo: proximo.titulo } : null,
        ultimo: !d.independentes && idx === d.episodios.length - 1,
      });
    }
  }

  return { Jogo, PontosDeAcao, ErroPA, REGRAS, FORMATO, VERSAO_SAVE, CHAVE_PADRAO, armazenamentoLocal, armazenamentoMemoria, validarSave, novoSave };
});
