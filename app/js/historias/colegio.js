/* História 1 — Sinal das Sete (ensino médio). Roteiro original. */
(function (raiz) {
  const H = {
    id: 'colegio',
    rota: 'colegio',
    nome: 'Sinal das Sete',
    subtitulo: 'Ensino médio no Colégio Ipê Amarelo',
    ambientacao: 'Colégio Ipê Amarelo, em Serra Clara',
    cor: '#FF7A6B',
    capa: 'portao',
    destaque: 'davi',
    tipoSeletor: 'episodio',
    intro: 'Transferência no meio do ano, uniforme novo e um colégio onde todo mundo já se conhece. Descubra os clubes, faça amizades e chegue à Festa Junina com o coração decidido.',
    novidades: [
      'Festa Junina com correio elegante no episódio 3',
      'Três caminhos de afinidade e um final de amizade',
      'PA ∞: explore o colégio quanto quiser',
    ],
    elenco: [
      { id: 'davi', nome: 'Davi Ventura', papel: 'Baterista e skatista',
        descricao: 'Chega atrasado, sai mais cedo e sabe o nome de todos os inspetores. Esconde uma playlist de música clássica no celular.',
        aparencia: { pele: 'p3', cabelo: 'espetado', corCabelo: 'preto', olhos: 'castanho', roupa: 'jaqueta', corRoupa: 'oliva', acessorio: 'curativo' } },
      { id: 'theo', nome: 'Theo Amaral', papel: 'Poeta do clube de astronomia',
        descricao: 'Fala baixo, escreve em guardanapos e sabe achar Júpiter a olho nu. Fica sem graça quando alguém lê seus versos.',
        aparencia: { pele: 'p1', cabelo: 'cacheado', corCabelo: 'ruivo', olhos: 'verde', roupa: 'sueter', corRoupa: 'mostarda', acessorio: 'oculos' } },
      { id: 'iara', nome: 'Iara Sampaio', papel: 'Presidente do grêmio',
        descricao: 'Planilhas, prazos e uma risada que atravessa o corredor. Quer reformar o colégio inteiro antes de se formar.',
        aparencia: { pele: 'p5', cabelo: 'coque', corCabelo: 'preto', olhos: 'mel', roupa: 'blazer', corRoupa: 'vinho', acessorio: 'brinco' } },
    ],
    extras: {
      bia: { nome: 'Bia', aparencia: { pele: 'p2', cabelo: 'chanel', corCabelo: 'rosa', olhos: 'castanho', roupa: 'camiseta', corRoupa: 'azul', acessorio: 'laco' } },
      rosa: { nome: 'Dona Rosa', aparencia: { pele: 'p4', cabelo: 'coque', corCabelo: 'grisalho', olhos: 'castanho', roupa: 'blazer', corRoupa: 'azul_marinho', acessorio: 'oculos' } },
    },
    episodios: [
      {
        id: 'c1', titulo: 'Primeiro sinal', inicio: 'inicio',
        previa: { titulo: 'A chegada ao Ipê Amarelo', texto: 'Primeiro dia, portão lotado e um skate desgovernado vindo na sua direção.', cenario: 'portao', personagem: 'davi' },
        cenas: {
          inicio: {
            cenario: 'portao',
            falas: [
              ['n', 'Segunda-feira, 6h58. O ipê da entrada está tão amarelo que parece aceso.'],
              ['eu', 'Colégio novo, cidade nova. Respira, {nome}. É só uma escola.'],
              ['bia', 'Ei! Você é a pessoa nova que veio da capital? Eu sou a Bia. Me pediram pra te mostrar tudo.', 'feliz'],
              ['bia', 'A Dona Rosa fecha o portão às sete em ponto. Nem um segundo depois.'],
              ['n', 'Um barulho de rodinhas cresce atrás de vocês.'],
              ['davi', 'Licença, licença, LICENÇA!', 'surpreso'],
            ],
            escolhas: [
              { t: 'Pular para o lado no último segundo.', af: { davi: 1 },
                resp: [['davi', 'Reflexo bom. Você sobreviveu ao primeiro dia antes do primeiro sinal.', 'riso']] },
              { t: 'Ficar onde está e encarar o skate.', af: { davi: 2 }, marca: 'davi_encarou',
                resp: [['n', 'O skate desvia a um palmo dos seus tênis.'], ['davi', 'Isso foi coragem ou distração? Ainda não decidi.', 'riso']] },
              { t: 'Dar uma bronca: “Aqui não é pista!”', af: { davi: -1, iara: 1 }, marca: 'davi_bronca',
                resp: [['davi', 'Uau. Já tem fiscal novo no colégio.', 'bravo'], ['n', 'Do alto da escada, alguém de blazer vinho aplaude baixinho.']] },
            ],
            ir: 'rosa',
          },
          rosa: {
            cenario: 'portao',
            falas: [
              ['rosa', 'Ventura! Skate é na saída, não na entrada.', 'bravo'],
              ['davi', 'Bom dia pra senhora também, Dona Rosa.', 'riso'],
              ['rosa', 'E você deve ser {nome}. Que bom ter você no Ipê. A primeira aula hoje é só às oito: aproveite para conhecer o colégio.'],
              ['bia', 'Uma hora livre! O pátio, a biblioteca e a sala do grêmio são os lugares onde as coisas acontecem.', 'feliz'],
            ],
            ir: 'mapa',
          },
          mapa: {
            cenario: 'patio',
            falas: [['n', 'Você tem uma hora antes da primeira aula. Visite pelo menos dois lugares.']],
            mapa: {
              texto: 'Para onde você vai?', minimo: 2, sair: 'sinal', textoSair: 'Ir para a sala de aula',
              locais: [
                { id: 'patio', nome: 'Pátio', descricao: 'Alguém está caindo de skate.', cena: 'l_patio' },
                { id: 'biblioteca', nome: 'Biblioteca', descricao: 'Silêncio e cheiro de papel.', cena: 'l_bib' },
                { id: 'gremio', nome: 'Sala do grêmio', descricao: 'Cartazes, fichas e planilhas.', cena: 'l_gremio' },
              ],
            },
          },
          l_patio: {
            cenario: 'patio', mostra: ['davi'],
            falas: [
              ['n', 'No canto do pátio, Davi treina uma manobra e cai pela quarta vez.'],
              { p: 'davi', t: 'Veio conferir se eu sobrevivi ao portão? Sobrevivi. O orgulho, nem tanto.', e: 'riso', se: { nao: 'davi_bronca' } },
              { p: 'davi', t: 'Olha quem chegou: a pessoa da bronca. Veio me multar?', e: 'bravo', se: { marca: 'davi_bronca' } },
            ],
            escolhas: [
              { t: 'Pedir para ele te ensinar a manobra.', af: { davi: 2 }, marca: 'davi_manobra',
                resp: [['davi', 'Sério? Ninguém nunca pede. Primeira lição: cair faz parte.', 'feliz'], ['n', 'Você cai duas vezes. Ele ri, mas te ajuda a levantar nas duas.']] },
              { t: 'Perguntar sobre o curativo na bochecha.', af: { davi: 1 },
                resp: [['davi', 'Briga com uma escada. A escada ganhou.', 'riso'], ['davi', 'Toco bateria numa garagem. Às vezes a baqueta volta.']] },
              { t: 'Dizer que ele devia usar capacete.', af: { davi: -1, iara: 1 },
                resp: [['davi', 'Você e a Iara iam se dar muito bem.', 'bravo']] },
            ],
            revisita: [['davi', 'Se voltar aqui de novo, vou começar a cobrar ingresso.', 'riso']],
          },
          l_bib: {
            cenario: 'biblioteca', mostra: ['theo'],
            falas: [
              ['n', 'A biblioteca cheira a papel velho. Perto da janela, um garoto de suéter mostarda escreve sem levantar a cabeça.'],
              ['theo', 'Ah! Desculpa, achei que estava sozinho.', 'surpreso'],
              ['theo', 'Eu sou o Theo. Não estou fazendo nada de interessante. Juro.', 'timido'],
              ['n', 'Um guardanapo escorrega da mesa. Tem um poema escrito nele.'],
            ],
            escolhas: [
              { t: 'Devolver o guardanapo sem ler.', af: { theo: 2 }, marca: 'theo_respeito',
                resp: [['theo', 'Obrigado. Pouca gente faz isso.', 'feliz']] },
              { t: 'Ler o poema em voz alta.', af: { theo: -1 }, marca: 'theo_leu',
                resp: [['theo', 'Por favor, não… é só um rascunho.', 'timido'], ['n', 'Ele fica vermelho até as orelhas.']] },
              { t: 'Perguntar sobre o que ele escreve.', af: { theo: 1 }, marca: 'theo_terraco',
                resp: [['theo', 'Sobre o céu, quase sempre. As estrelas não se importam se o verso ficou ruim.', 'riso'], ['theo', 'Tem um telescópio no terraço. O clube de astronomia se reúne às quintas.']] },
            ],
            revisita: [['theo', 'Voltou? Eu ainda estou aqui. Fingindo estudar.', 'riso']],
          },
          l_gremio: {
            cenario: 'gremio', mostra: ['iara'],
            falas: [
              ['iara', 'Você! Exatamente quem eu precisava.', 'feliz'],
              ['iara', 'Iara Sampaio, presidente do grêmio. Todo estudante novo preenche esta ficha: nome, turma e uma ideia para melhorar o colégio.'],
              { p: 'iara', t: 'E obrigada pela bronca no Davi lá no portão. Alguém precisava.', e: 'riso', se: { marca: 'davi_bronca' } },
            ],
            escolhas: [
              { t: 'Escrever: “bebedouros que funcionem”.', af: { iara: 2 },
                resp: [['iara', 'Prática! Gostei. Vai pra pauta da reunião.', 'feliz']] },
              { t: 'Escrever: “uma rampa de skate no pátio”.', af: { iara: -1, davi: 1 }, marca: 'ideia_rampa',
                resp: [['iara', 'Você conversou com o Davi, né?', 'bravo'], ['iara', 'Vou anotar. Com muitas ressalvas.']] },
              { t: 'Escrever: “aulas de astronomia no terraço”.', af: { iara: 1, theo: 1 },
                resp: [['iara', 'Interessante. O Theo vai adorar saber que tem aliados.', 'riso']] },
            ],
            revisita: [['iara', 'Ficha entregue, tudo certo. Agora vá, antes que eu te arrume uma comissão.', 'riso']],
          },
          sinal: {
            cenario: 'sala',
            falas: [
              ['n', 'O sinal das oito toca. A sala do 2º B é barulhenta e tem exatamente três lugares vagos.'],
              ['bia', 'Escolhe rápido, a professora já está vindo!', 'surpreso'],
            ],
            escolhas: [
              { t: 'Sentar perto da janela, ao lado do Davi.', af: { davi: 2 }, marca: 'sentou_davi',
                resp: [['davi', 'Lugar estratégico: dá pra ver o pátio e fugir pela janela.', 'riso']] },
              { t: 'Sentar na frente, ao lado da Iara.', af: { iara: 2 }, marca: 'sentou_iara',
                resp: [['iara', 'Ótima escolha. Daqui a gente ouve tudo e ninguém cola de você.', 'feliz']] },
              { t: 'Sentar no fundo, ao lado do Theo.', af: { theo: 2 }, marca: 'sentou_theo',
                resp: [['theo', 'Daqui dá pra ver o céu pela janela de cima. Às vezes passa um gavião.', 'timido']] },
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'portao', fim: true,
            falas: [
              ['n', 'O primeiro dia termina mais rápido do que você esperava.'],
              { p: 'n', t: 'Na saída, Davi passa de skate e acena. Dessa vez, devagar.', se: { afMin: { davi: 3 } } },
              { p: 'n', t: 'Theo deixa um guardanapo dobrado na sua mochila: “Boas-vindas ao céu de Serra Clara.”', se: { afMin: { theo: 3 } } },
              { p: 'n', t: 'Iara manda uma mensagem: “Reunião do grêmio na sexta. Pense nisso.”', se: { afMin: { iara: 3 } } },
              ['eu', 'Talvez esse colégio não seja tão ruim assim.', 'feliz'],
            ],
          },
        },
      },
      {
        id: 'c2', titulo: 'Feira dos clubes', inicio: 'inicio',
        previa: { titulo: 'A feira dos clubes', texto: 'Banda, astronomia ou grêmio? Cada barraca da quadra promete um semestre diferente.', cenario: 'quadra', personagem: 'theo' },
        cenas: {
          inicio: {
            cenario: 'corredor',
            falas: [
              ['bia', 'Hoje é a feira dos clubes! Quem não escolhe nenhum vai parar no clube de xadrez da Dona Rosa.', 'riso'],
              { p: 'eu', t: 'Meus joelhos ainda lembram da aula de skate.', se: { marca: 'davi_manobra' } },
              { p: 'bia', t: 'O Theo perguntou de você, sabia? Acho que ninguém nunca devolveu um poema dele sem ler.', se: { marca: 'theo_respeito' } },
              { p: 'bia', t: 'Aliás, a Iara colou sua ideia da rampa no mural. Com um ponto de interrogação enorme.', e: 'riso', se: { marca: 'ideia_rampa' } },
              ['bia', 'Vem, a quadra já está lotada!'],
            ],
            ir: 'feira',
          },
          feira: {
            cenario: 'quadra',
            falas: [['n', 'A quadra virou um labirinto de barracas, cartazes e gente gritando slogans.']],
            mapa: {
              texto: 'Qual barraca visitar?', minimo: 1, sair: 'decisao', textoSair: 'Decidir meu clube',
              locais: [
                { id: 'banda', nome: 'Barraca da banda', descricao: 'Banda Ferrugem procura integrantes.', cena: 'b_banda' },
                { id: 'astro', nome: 'Clube de astronomia', descricao: 'Um telescópio e um cartaz escrito à mão.', cena: 'b_astro' },
                { id: 'gremio', nome: 'Mesa do grêmio', descricao: 'Uma prancheta para cada voluntário.', cena: 'b_gremio' },
              ],
            },
          },
          b_banda: {
            cenario: 'quadra', mostra: ['davi'],
            falas: [
              ['davi', 'Banda Ferrugem. A gente ensaia na minha garagem e o vizinho reclama toda semana.', 'riso'],
              { p: 'davi', t: 'Você não vai me dar outra bronca, vai?', e: 'bravo', se: { marca: 'davi_bronca' } },
              ['davi', 'Precisamos de alguém no teclado. Ou no pandeiro. Ou alguém que segure a lanterna quando a luz cai.'],
            ],
            escolhas: [
              { t: 'Topar fazer um teste de pandeiro.', af: { davi: 1 }, marca: 'teste_banda',
                resp: [['davi', 'Ritmo duvidoso, entusiasmo excelente.', 'riso']] },
              { t: 'Perguntar sobre a tal playlist de música clássica.', se: { afMin: { davi: 3 } }, af: { davi: 2 }, marca: 'segredo_davi',
                resp: [['davi', 'Quem te contou?! … Tá. É Chopin. Ajuda a dormir. Não espalha.', 'timido']] },
              { t: 'Dizer que barulho não é muito a sua praia.', af: { davi: -1 },
                resp: [['davi', 'Barulho é só música que ainda não deu certo.']] },
            ],
            revisita: [['davi', 'Ainda pensando? A garagem tem sofá. Isso é um argumento.']],
          },
          b_astro: {
            cenario: 'quadra', mostra: ['theo'],
            falas: [
              ['theo', 'O clube de astronomia tem três membros. Contando com o telescópio.', 'timido'],
              { p: 'theo', t: 'Você veio mesmo. Achei que tinha esquecido do terraço.', e: 'feliz', se: { marca: 'theo_terraco' } },
              ['theo', 'Na quinta vai ter chuva de meteoros. Pequena, mas honesta.'],
            ],
            escolhas: [
              { t: 'Perguntar se dá pra fazer um pedido.', af: { theo: 2 },
                resp: [['theo', 'Dá. Mas aí vira segredo e não pode contar.', 'riso']] },
              { t: 'Pedir para ler um poema, dessa vez com permissão.', se: { marca: 'theo_leu' }, af: { theo: 3 }, marca: 'poema_cometa',
                resp: [['theo', 'Com permissão… tudo bem. Só não ri.', 'timido'], ['n', 'É sobre alguém que chegou no meio do ano, como um cometa fora de época.']] },
              { t: 'Comentar que astronomia parece difícil.',
                resp: [['theo', 'É só olhar pra cima com paciência. O resto o céu explica.']] },
            ],
            revisita: [['theo', 'O telescópio mandou dizer que sente sua falta. Eu só traduzo.', 'riso']],
          },
          b_gremio: {
            cenario: 'quadra', mostra: ['iara'],
            falas: [
              ['iara', 'O grêmio não é um clube, é uma missão.'],
              ['iara', 'Tem a reforma do terraço, a Festa Junina e o jornal mural. Escolha sua trincheira.'],
            ],
            escolhas: [
              { t: 'Ficar com a organização da Festa Junina.', af: { iara: 2 }, marca: 'organiza_festa',
                resp: [['iara', 'Perfeito. Você acaba de ganhar uma planilha.', 'feliz']] },
              { t: 'Propor um jornal mural com fofocas do bem.', af: { iara: 1 },
                resp: [['iara', 'Fofocas do bem? … Isso é genial e perigoso.', 'riso']] },
              { t: 'Perguntar por que ela faz tanta coisa.', af: { iara: 1 }, marca: 'iara_motivo',
                resp: [['iara', 'Porque no ano que vem eu vou embora, e quero deixar algo que funcione.', 'triste'], ['iara', 'Esquece. Pergunta séria demais pra uma feira.']] },
            ],
            revisita: [['iara', 'A planilha de inscrições tem uma linha esperando por você.']],
          },
          decisao: {
            cenario: 'quadra',
            falas: [['n', 'O sinal avisa que a feira está acabando. Hora de assinar uma lista.']],
            escolhas: [
              { t: 'Entrar para a banda Ferrugem.', se: { visitou: 'banda' }, af: { davi: 3 }, marca: 'clube_banda', ir: 'c_banda' },
              { t: 'Entrar para o clube de astronomia.', se: { visitou: 'astro' }, af: { theo: 3 }, marca: 'clube_astro', ir: 'c_astro' },
              { t: 'Entrar para o grêmio.', se: { visitou: 'gremio' }, af: { iara: 3 }, marca: 'clube_gremio', ir: 'c_gremio' },
            ],
          },
          c_banda: {
            cenario: 'musica', mostra: ['davi'],
            falas: [
              ['n', 'Na garagem dos Ventura, o ensaio termina com um amplificador soltando fumaça.'],
              ['davi', 'Foi o melhor ensaio do ano. Sério. O amplificador concorda.', 'riso'],
              { p: 'davi', t: 'E não comenta do Chopin com ninguém, hein.', e: 'timido', se: { marca: 'segredo_davi' } },
            ],
            escolhas: [
              { t: 'Sugerir que a banda toque na Festa Junina.', af: { davi: 2 }, marca: 'banda_festa',
                resp: [['davi', 'Forró com bateria? … A gente vai precisar ensaiar muito.', 'feliz']] },
              { t: 'Ajudar a consertar o amplificador.', af: { davi: 1 },
                resp: [['davi', 'Você entende de fio? Não? Nem eu. Vamos com fé.', 'riso']] },
            ],
            ir: 'fim',
          },
          c_astro: {
            cenario: 'observatorio', mostra: ['theo'],
            falas: [
              ['n', 'Quinta-feira, terraço do colégio. O céu está limpo como raramente fica.'],
              ['theo', 'Ali. Viu? Mais um.', 'feliz'],
              ['n', 'Um risco de luz cruza o céu e some atrás da caixa-d’água.'],
            ],
            escolhas: [
              { t: 'Fazer um pedido em silêncio.', af: { theo: 2 }, marca: 'pedido_meteoro',
                resp: [['theo', 'Não conta. Senão não vale.', 'timido']] },
              { t: 'Perguntar qual foi o pedido dele.', af: { theo: 1 },
                resp: [['theo', 'Que essa quinta não acabe tão rápido.', 'timido'], ['theo', 'Ops. Contei.', 'surpreso']] },
            ],
            ir: 'fim',
          },
          c_gremio: {
            cenario: 'gremio', mostra: ['iara'],
            falas: [
              ['n', 'A reunião do grêmio dura duas horas e termina com dezessete tarefas.'],
              ['iara', 'Você foi a única pessoa que não reclamou. Isso me assusta um pouco.', 'riso'],
            ],
            escolhas: [
              { t: 'Ficar depois para pintar as bandeirinhas.', af: { iara: 2 }, marca: 'bandeirinhas',
                resp: [['iara', 'Fica com o azul. Você tem cara de azul.', 'feliz']] },
              { t: 'Dizer que ela precisa descansar.', af: { iara: 1 },
                resp: [['iara', 'Descansar… é, já ouvi falar.', 'triste'], ['iara', 'Obrigada. De verdade.', 'timido']] },
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'corredor', fim: true,
            falas: [
              ['n', 'Na sexta, o mural do corredor anuncia: Festa Junina do Ipê, sábado que vem.'],
              ['bia', 'Vai ter correio elegante! Já estou com medo de quem vai me mandar recado.', 'riso'],
              ['n', 'Você tem a impressão de que alguém quer falar com você… mas o sinal toca antes.'],
            ],
          },
        },
      },
      {
        id: 'c3', titulo: 'Arraiá do Ipê', inicio: 'inicio',
        previa: { titulo: 'Arraiá do Ipê', texto: 'Bandeirinhas, quentão sem álcool e o correio elegante revelando quem pensa em você.', cenario: 'festa_junina', personagem: 'iara' },
        cenas: {
          inicio: {
            cenario: 'festa_junina',
            falas: [
              ['n', 'Sábado à noite. O pátio virou arraiá, com fogueira cenográfica e bandeirinhas de todas as cores.'],
              { p: 'n', t: 'Algumas bandeirinhas azuis têm a sua letra pintada no canto.', se: { marca: 'bandeirinhas' } },
              { p: 'n', t: 'No palco improvisado, a banda Ferrugem afina os instrumentos. O cartaz diz: “Forró com bateria”.', se: { marca: 'banda_festa' } },
              ['bia', 'Correio elegante! Um real cada recado. E já tem um com o seu nome!', 'feliz'],
            ],
            ramos: [
              { se: { maior: 'davi', afMin: { davi: 5 } }, ir: 'recado_davi' },
              { se: { maior: 'theo', afMin: { theo: 5 } }, ir: 'recado_theo' },
              { se: { maior: 'iara', afMin: { iara: 5 } }, ir: 'recado_iara' },
              { ir: 'recado_bia' },
            ],
          },
          recado_davi: {
            cenario: 'festa_junina',
            falas: [['n', 'O recado está escrito com caneta de quadro, em letras tortas:'], ['n', '“Te encontro na saída depois da quadrilha? Prometo frear o skate. — D.”']],
            ir: 'quadrilha',
          },
          recado_theo: {
            cenario: 'festa_junina',
            falas: [['n', 'O recado vem num guardanapo dobrado em quatro:'], ['n', '“Às 22h o céu abre em cima do terraço. Guardei um lugar. — T.”']],
            ir: 'quadrilha',
          },
          recado_iara: {
            cenario: 'festa_junina',
            falas: [['n', 'O recado é impresso, com tópicos numerados:'], ['n', '“Item 18 da planilha: dançar a quadrilha com você. Não aceito ‘não’ como resposta. Brincadeira. Aceito. — I.”']],
            ir: 'quadrilha',
          },
          recado_bia: {
            cenario: 'festa_junina',
            falas: [['n', 'O recado é da própria Bia: “Para a pessoa nova mais legal do Ipê. Não esquece da gente!”'], ['bia', 'Ninguém fica sem recado no meu correio.', 'riso']],
            ir: 'quadrilha',
          },
          quadrilha: {
            cenario: 'festa_junina',
            falas: [['n', 'A quadrilha vai começar. O locutor grita “Olha a chuva!” e todo mundo responde “É mentira!”.'], ['n', 'Você precisa de um par.']],
            escolhas: [
              { t: 'Chamar o Davi.', af: { davi: 2 }, marca: 'par_davi', resp: [['davi', 'Eu danço mal. Mas danço com vontade.', 'riso']] },
              { t: 'Chamar o Theo.', af: { theo: 2 }, marca: 'par_theo', resp: [['theo', 'Eu vou pisar no seu pé. Desde já, desculpa.', 'timido']] },
              { t: 'Chamar a Iara.', af: { iara: 2 }, marca: 'par_iara', resp: [['iara', 'Finalmente uma tarefa que eu não precisei delegar.', 'feliz']] },
              { t: 'Dançar com a Bia e só se divertir.', marca: 'par_bia', resp: [['bia', 'Melhor par da festa, óbvio!', 'feliz']] },
            ],
            ir: 'decisao',
          },
          decisao: {
            cenario: 'festa_junina',
            falas: [['n', 'Depois da quadrilha, a festa fica mais calma. A fogueira de papel celofane balança com o vento.']],
            ramos: [
              { se: { maior: 'davi', afMin: { davi: 6 } }, ir: 'final_davi' },
              { se: { maior: 'theo', afMin: { theo: 6 } }, ir: 'final_theo' },
              { se: { maior: 'iara', afMin: { iara: 6 } }, ir: 'final_iara' },
              { ir: 'final_amizade' },
            ],
          },
          final_davi: {
            cenario: 'portao_noite', mostra: ['davi'], fim: true, final: 'Final de Davi — Pista livre',
            falas: [
              ['davi', 'Ei. Achei que você ia fugir antes de mim.', 'riso'],
              ['davi', 'Eu queria te dizer… a primeira pessoa que não saiu correndo do meu skate foi você.', 'timido'],
              { p: 'davi', t: 'Mesmo com a bronca. Principalmente com a bronca.', e: 'riso', se: { marca: 'davi_bronca' } },
              ['davi', 'Anda comigo até a praça? Devagar. Juro.', 'feliz'],
              ['eu', 'Devagar, então.', 'feliz'],
              ['n', 'As rodinhas fazem um som baixo do seu lado, até a esquina, até a praça, até o fim da noite.'],
            ],
          },
          final_theo: {
            cenario: 'observatorio', mostra: ['theo'], fim: true, final: 'Final de Theo — Céu aberto',
            falas: [
              ['n', 'O terraço está vazio, exceto por um telescópio e um garoto de suéter mostarda.'],
              ['theo', 'Você veio.', 'feliz'],
              { p: 'theo', t: 'Lembra do pedido da quinta? Agora eu conto o meu: era este momento.', e: 'timido', se: { marca: 'pedido_meteoro' } },
              ['theo', 'Eu escrevi um poema. Não é sobre estrelas desta vez.', 'timido'],
              ['theo', 'É sobre você.', 'timido'],
              ['n', 'Ele não lê. Só entrega o papel dobrado. Lá embaixo, a sanfona toca baixinho.'],
            ],
          },
          final_iara: {
            cenario: 'festa_junina', mostra: ['iara'], fim: true, final: 'Final de Iara — Item 18',
            falas: [
              ['iara', 'A festa deu certo. Ninguém se machucou, o som não queimou e a planilha fechou.', 'feliz'],
              ['iara', 'Faltava só uma coisa.', 'timido'],
              { p: 'iara', t: 'Você perguntou por que eu faço tanta coisa. Hoje eu queria fazer uma coisa só pra mim.', se: { marca: 'iara_motivo' } },
              ['iara', 'Fica no grêmio comigo no ano que vem? E… fica comigo hoje, também?', 'timido'],
              ['n', 'Ela ri, nervosa, pela primeira vez sem uma prancheta na mão.'],
            ],
          },
          final_amizade: {
            cenario: 'festa_junina', fim: true, final: 'Final da amizade — Arraiá completo',
            falas: [
              ['n', 'Bia te arrasta para a pescaria, Davi aparece com pipoca, Theo aponta uma estrela e Iara confere a planilha uma última vez.'],
              ['bia', 'Viu? Você nem é mais a pessoa nova. É só a pessoa.', 'feliz'],
              ['eu', 'Acho que achei meu lugar aqui.', 'feliz'],
              ['n', 'Às vezes, o começo de tudo é só isso: ter com quem dividir a pipoca.'],
            ],
          },
        },
      },
    ],
  };
  (raiz.HISTORIAS = raiz.HISTORIAS || []).push(H);
})(typeof globalThis !== 'undefined' ? globalThis : this);
