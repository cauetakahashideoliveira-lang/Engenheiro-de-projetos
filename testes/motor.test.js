// Testes do motor e do roteiro: node --test testes/
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const APP = path.join(__dirname, '..', 'app', 'js');
const Motor = require(path.join(APP, 'motor.js'));
globalThis.HISTORIAS = [];
for (const f of ['colegio', 'universidade', 'vida-adulta', 'outros-caminhos']) require(path.join(APP, 'historias', f + '.js'));
const HISTORIAS = globalThis.HISTORIAS;

function novoJogo(arm) {
  const j = new Motor.Jogo({ historias: HISTORIAS, armazenamento: arm || Motor.armazenamentoMemoria() });
  j.definirPerfil('Lia', { pele: 'p2', cabelo: 'longo' });
  return j;
}

// Joga o episódio atual até o fim. `escolha(vista)` devolve o índice da opção.
function jogarAteFim(j, hid, escolha = (v) => v.opcoes[0].i, local = (v) => v.locais.find((l) => !l.visitado)) {
  let v = j.vista(hid);
  for (let passos = 0; passos < 2000; passos++) {
    if (v.tipo === 'fim') return v;
    if (v.tipo === 'fala') v = j.avancar(hid);
    else if (v.tipo === 'escolha') v = j.escolher(hid, escolha(v)).vista;
    else if (v.tipo === 'mapa') {
      const l = local(v);
      v = l && !v.podeSair ? j.visitar(hid, l.id) : (l && Math.random() < 0.5 ? j.visitar(hid, l.id) : j.sairDoMapa(hid));
    } else throw new Error('vista inesperada ' + v.tipo);
  }
  throw new Error('episódio não terminou');
}

test('as quatro histórias carregam com rotas únicas', () => {
  assert.equal(HISTORIAS.length, 4);
  assert.deepEqual(HISTORIAS.map((h) => h.rota), ['colegio', 'universidade', 'vida-adulta', 'outros-caminhos']);
  for (const h of HISTORIAS) assert.equal(h.episodios.length, 3, h.id);
});

test('todo destino do roteiro aponta para uma cena existente', () => {
  for (const h of HISTORIAS) {
    const ids = new Set([...h.elenco.map((p) => p.id), ...Object.keys(h.extras || {}), 'n', 'eu']);
    for (const ep of h.episodios) {
      const cenas = ep.cenas;
      assert.ok(cenas[ep.inicio], `${ep.id} sem início`);
      for (const [cid, c] of Object.entries(cenas)) {
        const alvo = (x, onde) => assert.ok(cenas[x], `${h.id}/${ep.id}/${cid}: destino ${x} inexistente (${onde})`);
        if (c.ir) alvo(c.ir, 'ir');
        (c.ramos || []).forEach((r) => alvo(r.ir, 'ramo'));
        (c.escolhas || []).forEach((e) => e.ir && alvo(e.ir, 'escolha'));
        if (c.mapa) { alvo(c.mapa.sair, 'sair'); c.mapa.locais.forEach((l) => alvo(l.cena, 'local')); }
        if (c.ramos) assert.ok(!c.ramos[c.ramos.length - 1].se, `${cid}: último ramo precisa ser incondicional`);
        for (const l of [...(c.falas || []), ...(c.revisita || []), ...(c.escolhas || []).flatMap((e) => e.resp || [])]) {
          const p = Array.isArray(l) ? l[0] : l.p;
          assert.ok(ids.has(p), `${h.id}/${cid}: falante desconhecido ${p}`);
        }
        for (const [k] of Object.entries(Object.assign({}, ...(c.escolhas || []).map((e) => e.af || {})))) {
          assert.ok(h.elenco.some((p) => p.id === k), `${cid}: afinidade com ${k} fora do elenco`);
        }
      }
    }
  }
});

test('PA ∞: centenas de ações seguidas em todas as histórias, sem saldo nem bloqueio', () => {
  const j = novoJogo();
  assert.equal(j.rotuloPA, 'PA ∞');
  for (const h of HISTORIAS) {
    for (let rodada = 0; rodada < 6; rodada++) {
      for (const ep of j.episodios(h.id)) {
        if (!ep.desbloqueado) continue;
        j.iniciarEpisodio(h.id, ep.id);
        const v = jogarAteFim(j, h.id, (v) => v.opcoes[Math.floor(Math.random() * v.opcoes.length)].i,
          (v) => v.locais[Math.floor(Math.random() * v.locais.length)]);
        assert.equal(v.tipo, 'fim');
        assert.equal(v.pa, 'PA ∞');
      }
    }
  }
  assert.ok(j.save.estat.acoes > 300, 'esperava muitas ações: ' + j.save.estat.acoes);
  assert.equal(j.pa.saldo, Infinity);
  assert.ok(!JSON.stringify(j.save).includes('saldo'), 'o saldo não deve ir para o save');
});

test('escolhas alteram afinidade e cenas posteriores (colegio)', () => {
  const j = novoJogo();
  j.continuar('colegio');
  let v = j.vista('colegio');
  while (v.tipo === 'fala') v = j.avancar('colegio');
  assert.equal(v.tipo, 'escolha');
  const bronca = v.opcoes.find((o) => o.texto.includes('bronca'));
  const r = j.escolher('colegio', bronca.i);
  assert.deepEqual(r.mudancas.map((m) => [m.id, m.delta]), [['davi', -1], ['iara', 1]]);
  v = r.vista;
  while (v.tipo === 'fala') v = j.avancar('colegio');
  assert.equal(v.tipo, 'mapa');
  v = j.visitar('colegio', 'patio');
  const falas = [];
  while (v.tipo === 'fala') { falas.push(v.texto); v = j.avancar('colegio'); }
  assert.ok(falas.some((t) => t.includes('pessoa da bronca')), 'fala condicional da bronca');
});

test('salva no meio de uma fala e retoma exatamente no mesmo ponto', () => {
  const arm = Motor.armazenamentoMemoria();
  const j = novoJogo(arm);
  j.continuar('universidade');
  j.avancar('universidade');
  const v1 = j.avancar('universidade');
  const j2 = new Motor.Jogo({ historias: HISTORIAS, armazenamento: arm });
  const v2 = j2.vista('universidade');
  assert.equal(v2.tipo, v1.tipo);
  assert.equal(v2.texto, v1.texto);
  assert.equal(j2.perfil.nome, 'Lia');
  assert.equal(j2.perfil.aparencia.cabelo, 'longo');
});

test('retoma uma escolha pendente com afinidade e histórico preservados', () => {
  const arm = Motor.armazenamentoMemoria();
  const j = novoJogo(arm);
  j.continuar('vidaadulta');
  let v = j.vista('vidaadulta');
  while (v.tipo !== 'mapa') v = v.tipo === 'fala' ? j.avancar('vidaadulta') : j.escolher('vidaadulta', v.opcoes[0].i).vista;
  v = j.visitar('vidaadulta', 'cafe');
  while (v.tipo === 'fala') v = j.avancar('vidaadulta');
  v = j.escolher('vidaadulta', 0).vista; // ri da piada: caio +2
  while (v.tipo === 'fala') v = j.avancar('vidaadulta');
  v = j.visitar('vidaadulta', 'praca');
  while (v.tipo === 'fala') v = j.avancar('vidaadulta');
  assert.equal(v.tipo, 'escolha');
  const j2 = new Motor.Jogo({ historias: HISTORIAS, armazenamento: arm });
  const v2 = j2.vista('vidaadulta');
  assert.equal(v2.tipo, 'escolha');
  assert.deepEqual(v2.opcoes, v.opcoes);
  assert.equal(j2.estado('vidaadulta').af.caio, 2);
  assert.ok(j2.estado('vidaadulta').historico.some((x) => x.tipo === 'escolha' && x.texto.includes('piada')));
});

test('repetir episódio restaura a afinidade do início e permite outro caminho', () => {
  const j = novoJogo();
  j.iniciarEpisodio('colegio', 'c1');
  jogarAteFim(j, 'colegio');
  const depois = Object.assign({}, j.estado('colegio').af);
  assert.ok(Object.values(depois).some((x) => x !== 0));
  j.iniciarEpisodio('colegio', 'c1');
  assert.deepEqual(j.estado('colegio').af, {});
  jogarAteFim(j, 'colegio', (v) => v.opcoes[v.opcoes.length - 1].i);
  assert.equal(j.estado('colegio').concluidos.c1.vezes, 2);
});

test('rotas independentes começam do zero', () => {
  const j = novoJogo();
  j.iniciarEpisodio('outros', 'o_joaquim');
  jogarAteFim(j, 'outros');
  assert.ok(j.estado('outros').af.joaquim > 0);
  j.iniciarEpisodio('outros', 'o_sofia');
  assert.deepEqual(j.estado('outros').af, {});
  assert.deepEqual(j.afinidades('outros').map((a) => a.id), ['sofia']);
});

test('exporta e importa o save; rejeita arquivos inválidos', () => {
  const j = novoJogo();
  j.continuar('colegio');
  j.avancar('colegio');
  const texto = j.exportar();
  const j2 = new Motor.Jogo({ historias: HISTORIAS, armazenamento: Motor.armazenamentoMemoria() });
  j2.importar(texto);
  assert.equal(j2.vista('colegio').texto, j.vista('colegio').texto);
  assert.throws(() => j2.importar('não é json'), /JSON válido/);
  assert.throws(() => j2.importar('{"formato":"outro"}'), /não é um save/);
  // save adulterado com cena inexistente é saneado em vez de quebrar
  const ruim = JSON.parse(texto);
  ruim.historias.colegio.pos.cena = 'nao_existe';
  ruim.historias.colegio.af.davi = 999;
  j2.importar(JSON.stringify(ruim));
  assert.equal(j2.estado('colegio').pos, null);
  assert.equal(j2.estado('colegio').af.davi, Motor.REGRAS.AF_MAX);
});

test('episódios seguintes ficam bloqueados até concluir o anterior', () => {
  const j = novoJogo();
  assert.throws(() => j.iniciarEpisodio('colegio', 'c2'), /anterior/);
  j.iniciarEpisodio('colegio', 'c1');
  jogarAteFim(j, 'colegio');
  assert.equal(j.episodios('colegio')[1].desbloqueado, true);
});

test('todos os finais escritos são alcançáveis jogando', () => {
  for (const h of HISTORIAS) {
    const esperados = new Set();
    h.episodios.forEach((ep) => Object.values(ep.cenas).forEach((c) => c.final && esperados.add(c.final)));
    const obtidos = new Set();
    for (let t = 0; t < 400 && obtidos.size < esperados.size; t++) {
      const j = novoJogo();
      // cada partida favorece uma personagem diferente, com um pouco de acaso
      const alvo = h.elenco[t % h.elenco.length].id;
      const ganancia = t % 4 === 3 ? -1 : 1;
      for (const ep of h.episodios) {
        j.iniciarEpisodio(h.id, ep.id);
        jogarAteFim(j, h.id, (v) => {
          const cena = ep.cenas[j.estado(h.id).pos.cena];
          const pontos = v.opcoes.map((o) => (((cena.escolhas[o.i].af || {})[alvo]) || 0) * ganancia + Math.random() * 1.5);
          return v.opcoes[pontos.indexOf(Math.max(...pontos))].i;
        }, (v) => v.locais.filter((l) => !l.visitado)[Math.floor(Math.random() * v.locais.filter((l) => !l.visitado).length)]);
        const f = j.estado(h.id).concluidos[ep.id].ultimoFinal;
        if (f) obtidos.add(f);
      }
    }
    assert.deepEqual([...obtidos].sort(), [...esperados].sort(), h.id);
  }
});
