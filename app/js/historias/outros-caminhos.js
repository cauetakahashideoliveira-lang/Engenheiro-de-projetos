/* História 4 — Outros Caminhos (reencontros; rotas independentes por personagem). Roteiro original. */
(function (raiz) {
  const chegada = (extra) => ['n', 'Lagoa Funda continua do tamanho de uma lembrança: uma estação, uma praça, uma lagoa. ' + extra];
  const abertura = [
    ['ines', '{nome}! Você veio! A cápsula do tempo vai ser aberta amanhã, no coreto.', 'feliz'],
    ['ines', 'Dez anos, acredita? Eu ainda tenho a lista de chamada daquela turma.', 'riso'],
  ];

  const H = {
    id: 'outros',
    rota: 'outros-caminhos',
    nome: 'Outros Caminhos',
    subtitulo: 'Reencontros em Lagoa Funda',
    ambientacao: 'Lagoa Funda, sua cidade natal, dez anos depois',
    cor: '#E0A030',
    capa: 'lagoa',
    destaque: 'joaquim',
    tipoSeletor: 'personagem',
    independentes: true,
    intro: 'Dez anos atrás, sua turma enterrou uma cápsula do tempo na praça de Lagoa Funda. Agora ela vai ser aberta. Escolha quem reencontrar e descubra o que poderia ter sido.',
    novidades: [
      'Três rotas independentes: cada uma começa do zero',
      'Cada rota tem três desfechos possíveis',
      'Escolha a rota pelo nome de quem você quer reencontrar',
    ],
    elenco: [
      { id: 'joaquim', nome: 'Joaquim Reis', papel: 'Amigo de infância, hoje bombeiro',
        descricao: 'Subia em árvore para buscar a pipa de todo mundo. Agora sobe em escada de verdade. Ainda guarda a sua pipa vermelha.',
        aparencia: { pele: 'p3', cabelo: 'curto', corCabelo: 'castanho', olhos: 'mel', roupa: 'camiseta', corRoupa: 'vermelho', acessorio: 'nenhum' } },
      { id: 'sofia', nome: 'Sofia Lemos', papel: 'Ex-colega de banda, hoje musicista',
        descricao: 'Vocês tinham uma banda de garagem com dois acordes. Ela aprendeu os outros e toca na estação todo sábado.',
        aparencia: { pele: 'p6', cabelo: 'longo', corCabelo: 'azul', olhos: 'castanho', roupa: 'jaqueta', corRoupa: 'preto', acessorio: 'brinco' } },
      { id: 'otavio', nome: 'Otávio Cruz', papel: 'Antigo rival, hoje professor',
        descricao: 'Disputou com você cada olimpíada de matemática da escola. Hoje dá aula na mesma sala onde vocês competiam.',
        aparencia: { pele: 'p2', cabelo: 'cacheado', corCabelo: 'preto', olhos: 'castanho', roupa: 'blazer', corRoupa: 'cinza', acessorio: 'oculos' } },
    ],
    extras: {
      ines: { nome: 'Professora Inês', aparencia: { pele: 'p4', cabelo: 'chanel', corCabelo: 'grisalho', olhos: 'castanho', roupa: 'sueter', corRoupa: 'verde', acessorio: 'oculos' } },
    },
    episodios: [
      {
        id: 'o_joaquim', rotulo: 'Joaquim', foco: 'joaquim', titulo: 'A pipa vermelha', inicio: 'inicio',
        previa: { titulo: 'A pipa vermelha', texto: 'O amigo que subia em árvores agora apaga incêndios. E ainda sabe onde você escondia os segredos.', cenario: 'bombeiros', personagem: 'joaquim' },
        cenas: {
          inicio: {
            cenario: 'estacao',
            falas: [
              chegada('O ônibus te deixa na plataforma às quatro da tarde.'),
              ...abertura,
              ['n', 'Do outro lado da rua, a sirene curta de um caminhão de bombeiros. Um homem de farda acena para você.'],
              ['joaquim', 'Não acredito. É você mesmo?', 'surpreso'],
            ],
            escolhas: [
              { t: 'Correr para dar um abraço.', af: { joaquim: 2 }, resp: [['joaquim', 'Você ainda abraça como quem segura uma pipa no vento.', 'riso']] },
              { t: 'Acenar de longe, sem graça.', af: { joaquim: 1 }, resp: [['joaquim', 'Vem cá, não me deixa no vácuo depois de dez anos!', 'riso']] },
            ],
            ir: 'quartel',
          },
          quartel: {
            cenario: 'bombeiros', mostra: ['joaquim'],
            falas: [
              ['joaquim', 'Virei bombeiro. Tirar gato de árvore ainda é metade do trabalho.', 'riso'],
              ['joaquim', 'Lembra da pipa vermelha? A que ficou presa no ipê da escola?'],
            ],
            escolhas: [
              { t: 'Lembrar que ele subiu para buscar e quebrou o braço.', af: { joaquim: 2 }, marca: 'lembra_braco',
                resp: [['joaquim', 'Gesso por dois meses. Você assinou primeiro. Ainda tenho a foto.', 'feliz']] },
              { t: 'Fingir que não lembra, só para provocar.',
                resp: [['joaquim', 'Mentira! Você chorou mais que eu!', 'bravo'], ['joaquim', 'Tá, tá. Eu também lembro de tudo.', 'riso']] },
              { t: 'Perguntar por que ele nunca saiu da cidade.', af: { joaquim: 1 }, marca: 'pergunta_ficar',
                resp: [['joaquim', 'Alguém tinha que ficar. Pra cuidar dos lugares. E das lembranças.', 'triste']] },
            ],
            ir: 'lagoa',
          },
          lagoa: {
            cenario: 'lagoa', mostra: ['joaquim'],
            falas: [
              ['n', 'No fim da tarde, vocês sentam no píer da lagoa, como faziam aos doze anos.'],
              ['joaquim', 'Eu guardei uma coisa.'],
              ['n', 'Ele tira da mochila uma pipa vermelha, desbotada, remendada com fita.'],
              ['joaquim', 'É a mesma. Eu consertei. Umas quinze vezes.', 'timido'],
            ],
            escolhas: [
              { t: 'Propor empinar a pipa agora.', af: { joaquim: 3 }, marca: 'empinou',
                resp: [['n', 'O vento da lagoa pega a pipa na primeira tentativa. Ela sobe vermelha contra o céu laranja.'], ['joaquim', 'Dez anos esperando esse vento.', 'feliz']] },
              { t: 'Perguntar por que ele guardou.', af: { joaquim: 2 },
                resp: [['joaquim', 'Porque era sua. E porque eu sempre achei que você ia voltar pra buscar.', 'timido']] },
              { t: 'Dizer que ele devia ter jogado fora.', af: { joaquim: -2 },
                resp: [['joaquim', 'É… talvez.', 'triste']] },
            ],
            ir: 'capsula',
          },
          capsula: {
            cenario: 'coreto', mostra: ['ines'],
            falas: [
              ['n', 'No dia seguinte, a praça está cheia. A Professora Inês abre a cápsula do tempo no coreto.'],
              ['ines', 'Cada um lê a própria carta. A de dez anos atrás.'],
              ['n', 'Na sua carta, com letra de criança: “Daqui a dez anos, eu espero ainda ter o Joaquim como melhor amigo.”'],
            ],
            ramos: [
              { se: { afMin: { joaquim: 6 } }, ir: 'final_bom' },
              { se: { afMin: { joaquim: 3 } }, ir: 'final_amigo' },
              { ir: 'final_distante' },
            ],
          },
          final_bom: {
            cenario: 'lagoa', mostra: ['joaquim'], fim: true, final: 'Joaquim — Coragem de dizer',
            falas: [
              ['joaquim', 'Eu também escrevi sobre você na minha carta.', 'timido'],
              ['joaquim', '“Daqui a dez anos, eu quero ter coragem de dizer o que sinto.” Pronto. Disse.', 'timido'],
              { p: 'n', t: 'A pipa vermelha continua no alto, amarrada ao banco do píer, balançando.', se: { marca: 'empinou' } },
              ['n', 'Vocês riem como aos doze anos. Mas dessa vez ele segura a sua mão.'],
            ],
          },
          final_amigo: {
            cenario: 'coreto', mostra: ['joaquim'], fim: true, final: 'Joaquim — Amizade de pipa',
            falas: [
              ['joaquim', 'Melhores amigos, então. Dez anos depois e ainda valendo.', 'feliz'],
              ['n', 'Ele promete uma visita. Você promete voltar no próximo verão. Os dois sabem que vão cumprir.'],
            ],
          },
          final_distante: {
            cenario: 'estacao', mostra: ['joaquim'], fim: true, final: 'Joaquim — O que ficou no ar',
            falas: [
              ['n', 'Joaquim sorri, educado, mas a conversa não engata. Dez anos às vezes pesam.'],
              ['joaquim', 'Foi bom te ver. De verdade.'],
              ['n', 'No ônibus de volta, você pensa no que poderia ter dito.'],
            ],
          },
        },
      },
      {
        id: 'o_sofia', rotulo: 'Sofia', foco: 'sofia', titulo: 'Dois acordes', inicio: 'inicio',
        previa: { titulo: 'Dois acordes', texto: 'A banda de garagem acabou num sábado chuvoso. Na estação, alguém ainda toca aquela música.', cenario: 'estacao', personagem: 'sofia' },
        cenas: {
          inicio: {
            cenario: 'estacao',
            falas: [
              chegada('Na plataforma, uma música conhecida.'),
              ...abertura,
              ['n', 'Dois acordes. Depois um terceiro, que você não conhecia.'],
              ['sofia', 'Sabia que ia te ver aqui. A cidade inteira veio pela cápsula.', 'riso'],
            ],
            escolhas: [
              { t: 'Cantar o refrão junto, como antigamente.', af: { sofia: 2 }, marca: 'cantou',
                resp: [['sofia', 'Você ainda erra a mesma palavra. Que bom.', 'feliz']] },
              { t: 'Elogiar o acorde novo.', af: { sofia: 1 },
                resp: [['sofia', 'Aprendi depois que você foi embora. A música precisava de alguém pra completar.']] },
            ],
            ir: 'garagem',
          },
          garagem: {
            cenario: 'musica', mostra: ['sofia'],
            falas: [
              ['n', 'A garagem da casa da Sofia está igual: pôsteres, um sofá rasgado e duas guitarras baratas.'],
              ['sofia', 'A banda acabou porque você foi embora sem se despedir. Eu fiquei brava por uns… sete anos.', 'bravo'],
            ],
            escolhas: [
              { t: 'Pedir desculpas de verdade.', af: { sofia: 3 }, marca: 'desculpas',
                resp: [['sofia', 'Era tudo que eu queria ouvir. Demorou, hein.', 'timido']] },
              { t: 'Explicar que a mudança foi de repente.', af: { sofia: 1 },
                resp: [['sofia', 'Eu sei. Eu sabia. Mas sete anos é muito tempo pra ficar brava sozinha.', 'triste']] },
              { t: 'Mudar de assunto.', af: { sofia: -2 },
                resp: [['sofia', 'Ainda foge das coisas difíceis, né?', 'bravo']] },
            ],
            ir: 'ensaio',
          },
          ensaio: {
            cenario: 'musica', mostra: ['sofia'],
            falas: [['sofia', 'Amanhã, depois da cápsula, vou tocar no coreto. Uma música nova. Toca comigo?']],
            escolhas: [
              { t: 'Aceitar, mesmo sem tocar há anos.', af: { sofia: 2 }, marca: 'toca_junto',
                resp: [['n', 'Vocês ensaiam até a vizinha bater na parede, como nos velhos tempos.'], ['sofia', 'Você esqueceu tudo. Ainda bem que eu lembro por duas pessoas.', 'riso']] },
              { t: 'Prometer assistir da primeira fila.', af: { sofia: 1 },
                resp: [['sofia', 'Primeira fila. Vou cobrar.', 'riso']] },
            ],
            ir: 'capsula',
          },
          capsula: {
            cenario: 'coreto', mostra: ['ines'],
            falas: [
              ['n', 'A Professora Inês abre a cápsula do tempo no coreto.'],
              ['ines', 'Cada um lê a própria carta.'],
              ['n', 'Na sua carta: “Daqui a dez anos, eu e a Sofia vamos tocar num palco de verdade.”'],
              { p: 'n', t: 'O coreto não é exatamente um palco de verdade. Mas, com a Sofia do lado, parece.', se: { marca: 'toca_junto' } },
            ],
            ramos: [
              { se: { afMin: { sofia: 6 } }, ir: 'final_bom' },
              { se: { afMin: { sofia: 3 } }, ir: 'final_amigo' },
              { ir: 'final_distante' },
            ],
          },
          final_bom: {
            cenario: 'coreto', mostra: ['sofia'], fim: true, final: 'Sofia — Terceiro acorde',
            falas: [
              ['sofia', 'A música nova se chama “Volta”. Escrevi há três anos.', 'timido'],
              ['sofia', 'Eu fingia que não sabia pra quem era. Sempre soube.', 'timido'],
              ['n', 'O último acorde ecoa na praça. Ela não solta a sua mão quando a música acaba.'],
            ],
          },
          final_amigo: {
            cenario: 'coreto', mostra: ['sofia'], fim: true, final: 'Sofia — Turnê de verão',
            falas: [
              ['sofia', 'Banda reunida. Nem que seja uma vez por ano.', 'feliz'],
              ['n', 'Vocês combinam um show todo verão, no mesmo coreto, com o mesmo erro no refrão.'],
            ],
          },
          final_distante: {
            cenario: 'coreto', mostra: ['sofia'], fim: true, final: 'Sofia — Plateia',
            falas: [
              ['sofia', 'Foi bom te ver. Espero que a vida aí fora esteja tocando a sua música.'],
              ['n', 'Ela toca sozinha no coreto. Você assiste do fundo da praça.'],
            ],
          },
        },
      },
      {
        id: 'o_otavio', rotulo: 'Otávio', foco: 'otavio', titulo: 'Olimpíada de um problema só', inicio: 'inicio',
        previa: { titulo: 'Olimpíada de um problema só', texto: 'Seu maior rival virou professor na sala onde vocês competiam. Ele tem um último problema para você.', cenario: 'sala', personagem: 'otavio' },
        cenas: {
          inicio: {
            cenario: 'estacao',
            falas: [
              chegada('Na saída da estação, um cartaz chama a sua atenção.'),
              ...abertura,
              ['n', '“Olimpíada Municipal de Matemática — 10ª edição. Coordenação: Prof. Otávio Cruz.”'],
              ['eu', 'Otávio Cruz. Professor. Claro que sim.', 'riso'],
            ],
            ir: 'escola',
          },
          escola: {
            cenario: 'sala', mostra: ['otavio'],
            falas: [
              ['n', 'A sala 7 da escola antiga cheira a giz e a nervoso de prova.'],
              ['otavio', 'Eu sabia que você ia vir. Ninguém resiste a uma provocação minha.', 'riso'],
              ['otavio', 'Último desafio: um problema. Quem resolver primeiro escolhe onde a gente janta.'],
            ],
            escolhas: [
              { t: 'Aceitar o desafio na hora.', af: { otavio: 2 }, marca: 'desafio',
                resp: [['otavio', 'Igualzinho. Você nunca soube recusar uma briga boa.', 'feliz']] },
              { t: 'Dizer que não compete mais.', marca: 'desafio',
                resp: [['otavio', 'Mentira. Seus olhos já estão lendo o quadro.', 'riso']] },
              { t: 'Provocar: “Você nunca me venceu.”', af: { otavio: 1 },
                resp: [['otavio', 'Sete a seis pra mim. Eu contei. Durante dez anos.', 'bravo']] },
            ],
            ir: 'problema',
          },
          problema: {
            cenario: 'sala', mostra: ['otavio'],
            falas: [
              ['n', 'No quadro: “Duas pessoas saem de cidades diferentes. Depois de dez anos, em que ponto elas se encontram?”'],
              ['eu', 'Isso não é um problema de matemática.'],
              ['otavio', 'Não. É uma pergunta. Fiquei com vergonha de fazer de outro jeito.', 'timido'],
            ],
            escolhas: [
              { t: 'Responder: “Aqui, nesta sala.”', af: { otavio: 3 }, marca: 'resposta_sala',
                resp: [['otavio', 'Resposta correta. Pontuação máxima.', 'timido']] },
              { t: 'Resolver como um problema sério, com fórmulas.', af: { otavio: 1 },
                resp: [['otavio', 'Você calculou a velocidade média da saudade. Isso é… tecnicamente impressionante.', 'riso']] },
              { t: 'Rir e dizer que ele continua estranho.', af: { otavio: -1 },
                resp: [['otavio', 'Estranho, mas consistente.', 'triste']] },
            ],
            ir: 'jantar',
          },
          jantar: {
            cenario: 'lagoa', mostra: ['otavio'],
            falas: [
              ['n', 'Vocês jantam pastel na barraca da lagoa, como depois de cada olimpíada.'],
              ['otavio', 'Sabe por que eu virei professor? Queria que alguém sentisse o que eu sentia competindo com você.'],
              ['otavio', 'Desafio. Vontade. Vida.', 'timido'],
            ],
            escolhas: [
              { t: 'Contar que também sentia falta das disputas.', af: { otavio: 2 },
                resp: [['otavio', 'Então a gente concorda em alguma coisa. Primeira vez em vinte anos.', 'riso']] },
              { t: 'Perguntar se ele ganhou alguma olimpíada sem você.', af: { otavio: 1 },
                resp: [['otavio', 'Ganhei todas. Não teve graça nenhuma.', 'triste']] },
            ],
            ir: 'capsula',
          },
          capsula: {
            cenario: 'coreto', mostra: ['ines'],
            falas: [
              ['ines', 'Cada um lê a própria carta.'],
              ['n', 'Na sua carta: “Daqui a dez anos, eu vou vencer o Otávio de uma vez por todas.”'],
              ['otavio', 'Na minha está escrito: “Daqui a dez anos, quero que a gente pare de competir e comece outra coisa.” Eu tinha doze anos e já era dramático.', 'timido'],
            ],
            ramos: [
              { se: { afMin: { otavio: 6 } }, ir: 'final_bom' },
              { se: { afMin: { otavio: 3 } }, ir: 'final_amigo' },
              { ir: 'final_distante' },
            ],
          },
          final_bom: {
            cenario: 'lagoa', mostra: ['otavio'], fim: true, final: 'Otávio — Empate técnico',
            falas: [
              ['otavio', 'Empate, então? Oito a oito, sem prorrogação.', 'feliz'],
              ['otavio', 'Começa outra coisa comigo?', 'timido'],
              ['n', 'Você estende a mão como antes das provas. Ele entrelaça os dedos nos seus e não solta.'],
            ],
          },
          final_amigo: {
            cenario: 'sala', mostra: ['otavio'], fim: true, final: 'Otávio — Rivais de estimação',
            falas: [
              ['otavio', 'Ano que vem, você vem pro júri da olimpíada. Não é convite, é intimação.', 'riso'],
              ['n', 'Vocês trocam números e uma lista de problemas impossíveis.'],
            ],
          },
          final_distante: {
            cenario: 'sala', mostra: ['otavio'], fim: true, final: 'Otávio — Quadro apagado',
            falas: [
              ['otavio', 'Bom. Foi bom te ver. Sete a seis, então.'],
              ['n', 'Ele apaga o quadro devagar. Você sai antes que ele termine.'],
            ],
          },
        },
      },
    ],
  };
  (raiz.HISTORIAS = raiz.HISTORIAS || []).push(H);
})(typeof globalThis !== 'undefined' ? globalThis : this);
