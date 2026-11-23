/* História 3 — Café com Contas (vida adulta). Roteiro original. */
(function (raiz) {
  const H = {
    id: 'vidaadulta',
    rota: 'vida-adulta',
    nome: 'Café com Contas',
    subtitulo: 'Vida adulta na Vila Jacarandá',
    ambientacao: 'Rua das Glicínias, na Vila Jacarandá',
    cor: '#8E5BD3',
    capa: 'cafe',
    destaque: 'caio',
    tipoSeletor: 'episodio',
    intro: 'Primeiro apartamento, primeiro emprego e boletos que chegam antes do salário. No prédio da Rua das Glicínias, os vizinhos podem virar família — ou algo mais.',
    novidades: [
      'Quem bate à sua porta depende de quem você conheceu',
      'Uma infiltração com três jeitos de resolver',
      'Festa de rua com mapa livre para circular',
    ],
    elenco: [
      { id: 'caio', nome: 'Caio Mendonça', papel: 'Dono do Café Esquina',
        descricao: 'Largou a cozinha de um restaurante chique para abrir um café de seis mesas. Conta piadas péssimas e faz o melhor pão de queijo do bairro.',
        aparencia: { pele: 'p4', cabelo: 'curto', corCabelo: 'castanho', olhos: 'castanho', roupa: 'camiseta', corRoupa: 'vinho', acessorio: 'nenhum' } },
      { id: 'nara', nome: 'Nara Bittencourt', papel: 'Arquiteta e vizinha de cima',
        descricao: 'Está reformando o apartamento sozinha, parede por parede. Fala alto quando se concentra e pede desculpas pelo barulho com bolos.',
        aparencia: { pele: 'p2', cabelo: 'chanel', corCabelo: 'preto', olhos: 'cinza', roupa: 'jaqueta', corRoupa: 'mostarda', acessorio: 'brinco' } },
      { id: 'hugo', nome: 'Hugo Teles', papel: 'Enfermeiro do plantão noturno',
        descricao: 'Dorme quando o bairro acorda. Passeia com o Biscoito, um vira-lata caramelo, e lembra o nome de todos os pacientes.',
        aparencia: { pele: 'p5', cabelo: 'raspado', corCabelo: 'preto', olhos: 'castanho', roupa: 'moletom', corRoupa: 'azul', acessorio: 'nenhum' } },
    ],
    extras: {
      zeca: { nome: 'Seu Zeca', aparencia: { pele: 'p3', cabelo: 'raspado', corCabelo: 'grisalho', olhos: 'castanho', roupa: 'sueter', corRoupa: 'marrom', acessorio: 'oculos' } },
    },
    episodios: [
      {
        id: 'v1', titulo: 'Caixas pela sala', inicio: 'inicio',
        previa: { titulo: 'Mudança na Rua das Glicínias', texto: 'Doze caixas, nenhuma cortina e uma vizinha de cima que começa a furar a parede às sete da manhã.', cenario: 'apartamento', personagem: 'nara' },
        cenas: {
          inicio: {
            cenario: 'apartamento',
            falas: [
              ['n', 'Apartamento 204, Rua das Glicínias. Doze caixas, um colchão e nenhuma cortina.'],
              ['eu', 'Primeiro apartamento. Primeiro emprego na segunda. Primeiro boleto… já chegou.'],
              ['n', 'TRRRRRR! Uma furadeira começa no andar de cima.'],
              ['zeca', 'Bom dia! Eu sou o Zeca, o síndico. Isso aí é a Nara, do 304. Ela está reformando. Há oito meses.', 'riso'],
              ['zeca', 'Dica de quem mora aqui há trinta anos: conheça o café da esquina, a praça e a vizinhança.'],
            ],
            ir: 'mapa',
          },
          mapa: {
            cenario: 'rua',
            falas: [['n', 'Sábado de manhã. O bairro inteiro parece ter acordado ao mesmo tempo.']],
            mapa: {
              texto: 'Aonde você vai?', minimo: 2, sair: 'noite', textoSair: 'Voltar e desencaixotar',
              locais: [
                { id: 'cafe', nome: 'Café Esquina', descricao: 'Cheiro de pão de queijo na calçada.', cena: 'l_cafe' },
                { id: 'escada', nome: 'Terceiro andar', descricao: 'De onde vem a furadeira.', cena: 'l_nara' },
                { id: 'praca', nome: 'Praça das Glicínias', descricao: 'Um cachorro caramelo corre em círculos.', cena: 'l_praca' },
              ],
            },
          },
          l_cafe: {
            cenario: 'cafe', mostra: ['caio'],
            falas: [
              ['n', 'O Café Esquina tem seis mesas, cheiro de pão de queijo e um quadro com a piada do dia.'],
              ['n', 'No quadro: “Por que o café foi à polícia? Porque foi assaltado… de manhã.”'],
              ['caio', 'Você leu a piada. Agora rir é obrigatório. Regra da casa.', 'riso'],
              ['caio', 'Caio. Cozinheiro, garçom, caixa e humorista. Primeira vez aqui?'],
            ],
            escolhas: [
              { t: 'Rir da piada, mesmo sendo ruim.', af: { caio: 2 }, marca: 'riu_piada',
                resp: [['caio', 'Uma risada sincera! Pão de queijo por conta da casa.', 'feliz']] },
              { t: 'Sugerir uma piada melhor.', af: { caio: 1 }, marca: 'piada_sua',
                resp: [['caio', 'Concorrência? Gostei. Amanhã a sua vai pro quadro.', 'riso']] },
              { t: 'Pedir só um café, sem conversa.',
                resp: [['caio', 'Café sem conversa saindo. Mas a conversa fica no cardápio, caso mude de ideia.']] },
            ],
            revisita: [['caio', 'Voltou! O pão de queijo te chamou, né? Ele faz isso.', 'riso']],
          },
          l_nara: {
            cenario: 'escada', mostra: ['nara'],
            falas: [
              ['n', 'No terceiro andar, a porta do 304 está aberta. Lá dentro, uma mulher de jaqueta suja de tinta mede uma parede.'],
              ['nara', 'Ai, você é do 204, né? Desculpa a furadeira. Desculpa mesmo. Vou te fazer um bolo.', 'surpreso'],
            ],
            escolhas: [
              { t: 'Dizer que não tem problema e perguntar da reforma.', af: { nara: 2 }, marca: 'nara_reforma',
                resp: [['nara', 'Vou derrubar essa parede e transformar dois cômodos num ateliê. Quer ver a planta?', 'feliz'], ['n', 'Ela mostra um desenho cheio de setas, janelas e uma cozinha impossível.']] },
              { t: 'Pedir para ela furar só depois das nove.', af: { nara: 1 },
                resp: [['nara', 'Justo. Muito justo. Depois das nove. Vou anotar.', 'riso']] },
              { t: 'Reclamar que acordou cedo demais.', af: { nara: -1 },
                resp: [['nara', 'Eu entendo… Me desculpa. Sério.', 'triste']] },
            ],
            revisita: [['nara', 'Ainda não fiz o bolo. Mas ele já existe em projeto.', 'riso']],
          },
          l_praca: {
            cenario: 'praca', mostra: ['hugo'],
            falas: [
              ['n', 'Na praça, um vira-lata caramelo corre direto até você, abanando o rabo como um ventilador.'],
              ['hugo', 'Biscoito! Desculpa, ele acha que todo mundo é amigo.', 'riso'],
              ['hugo', 'Hugo, do 102. Trabalho à noite no hospital, então de dia sou só um cara que passeia com cachorro.'],
            ],
            escolhas: [
              { t: 'Fazer carinho no Biscoito.', af: { hugo: 2 }, marca: 'biscoito',
                resp: [['hugo', 'Pronto. Agora ele vai fazer festa sempre que te vir. Desculpa antecipada.', 'feliz']] },
              { t: 'Perguntar se o plantão é muito cansativo.', af: { hugo: 1 },
                resp: [['hugo', 'É. Mas às vezes alguém vai pra casa melhor do que chegou. Isso compensa.']] },
              { t: 'Dizer que não é muito fã de cachorro.', af: { hugo: -1 },
                resp: [['hugo', 'Tudo bem. O Biscoito vai tentar te convencer mesmo assim.', 'triste']] },
            ],
            revisita: [['hugo', 'O Biscoito pediu pra te ver de novo. Eu só obedeço.', 'riso']],
          },
          noite: {
            cenario: 'apartamento',
            falas: [['n', 'À noite, metade das caixas está aberta e a outra metade virou mesa.'], ['n', 'Alguém bate na porta.']],
            ramos: [
              { se: { maior: 'caio', afMin: { caio: 2 } }, ir: 'porta_caio' },
              { se: { maior: 'nara', afMin: { nara: 2 } }, ir: 'porta_nara' },
              { se: { maior: 'hugo', afMin: { hugo: 2 } }, ir: 'porta_hugo' },
              { ir: 'porta_zeca' },
            ],
          },
          porta_nara: {
            cenario: 'apartamento', mostra: ['nara'],
            falas: [['nara', 'Bolo de laranja. Prometi. A furadeira já pediu desculpas, mas eu também queria.', 'timido']],
            escolhas: [
              { t: 'Convidar para dividir o bolo no meio das caixas.', af: { nara: 2 },
                resp: [['n', 'Vocês comem no chão, usando uma caixa escrita “LIVROS” como mesa.'], ['nara', 'Esse apartamento tem potencial. Que nem você.', 'riso']] },
              { t: 'Agradecer e dizer que precisa dormir.', af: { nara: 1 },
                resp: [['nara', 'Claro! Boa noite. Sem furadeira amanhã. Prometo… quase.']] },
            ],
            ir: 'fim',
          },
          porta_caio: {
            cenario: 'apartamento', mostra: ['caio'],
            falas: [['caio', 'Sobrou pão de queijo do dia. Achei que mudança combina com carboidrato.', 'riso']],
            escolhas: [
              { t: 'Chamar para entrar e ajudar a montar a estante.', af: { caio: 2 },
                resp: [['caio', 'Eu leio receita, não manual. Mas vamos lá.', 'riso'], ['n', 'A estante fica torta. Vocês decidem que é estilo.']] },
              { t: 'Agradecer na porta.', af: { caio: 1 },
                resp: [['caio', 'Boa primeira noite, vizinhança.']] },
            ],
            ir: 'fim',
          },
          porta_hugo: {
            cenario: 'apartamento', mostra: ['hugo'],
            falas: [
              ['n', 'É o Hugo, de uniforme, a caminho do plantão. O Biscoito está com ele.'],
              ['hugo', 'Vou passar a noite fora. Será que você podia dar uma olhada no Biscoito amanhã cedo? Só se puder.'],
            ],
            escolhas: [
              { t: 'Aceitar cuidar do Biscoito.', af: { hugo: 2 }, marca: 'cuida_biscoito',
                resp: [['hugo', 'Você salvou minha noite. Ele come às sete. E finge que não comeu às oito.', 'feliz']] },
              { t: 'Dizer que não vai conseguir.',
                resp: [['hugo', 'Sem problema! O Zeca sempre quebra esse galho.']] },
            ],
            ir: 'fim',
          },
          porta_zeca: {
            cenario: 'apartamento', mostra: ['zeca'],
            falas: [
              ['zeca', 'Só vim avisar: o cano do terceiro andar anda fazendo um barulho estranho. Se pingar alguma coisa, me chama.'],
              ['eu', 'Pingar onde?', 'surpreso'],
              ['zeca', 'Melhor nem pensar nisso hoje.', 'riso'],
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'apartamento', fim: true,
            falas: [
              ['n', 'Você dorme no colchão no meio da sala, entre caixas e silêncio.'],
              ['n', 'Lá em cima, alguma coisa no encanamento faz: plic. Plic. Plic.'],
            ],
          },
        },
      },
      {
        id: 'v2', titulo: 'Plic, plic, plic', inicio: 'inicio',
        previa: { titulo: 'A infiltração', texto: 'Uma mancha no teto, um cano rebelde e três vizinhos dispostos a ajudar, cada um do seu jeito.', cenario: 'apartamento', personagem: 'hugo' },
        cenas: {
          inicio: {
            cenario: 'apartamento',
            falas: [
              ['n', 'Domingo, 6h. Plic. Plic. PLOFT.'],
              ['n', 'Uma goteira enorme cai bem em cima da caixa escrita “COISAS IMPORTANTES”.'],
              ['eu', 'Não. Não, não, não.', 'surpreso'],
              ['n', 'A mancha no teto cresce. A água vem do 304.'],
              { p: 'n', t: 'O Biscoito, que dormiu na sua sala, late para o teto como quem avisa.', se: { marca: 'cuida_biscoito' } },
            ],
            escolhas: [
              { t: 'Subir correndo até o apartamento da Nara.', af: { nara: 2 }, marca: 'ajuda_nara', ir: 'nara_cano' },
              { t: 'Ligar para o Caio, que conserta tudo na cozinha do café.', af: { caio: 2 }, marca: 'ajuda_caio', ir: 'caio_cano' },
              { t: 'Bater na porta do Hugo, que acabou de chegar do plantão.', af: { hugo: 2 }, marca: 'ajuda_hugo', ir: 'hugo_cano' },
            ],
          },
          nara_cano: {
            cenario: 'escada', mostra: ['nara'],
            falas: [
              ['nara', 'Foi a parede! Mexi num cano que não devia. Ai, eu vou pagar tudo.', 'triste'],
              { p: 'nara', t: 'E você ainda foi gentil comigo no primeiro dia. Que vergonha.', e: 'timido', se: { marca: 'nara_reforma' } },
            ],
            escolhas: [
              { t: 'Segurar o pano enquanto ela fecha o registro.', af: { nara: 2 },
                resp: [['n', 'A água para. Vocês ficam pingando, rindo de nervoso no meio do corredor.'], ['nara', 'Parceria de obra. A gente devia abrir uma empresa.', 'riso']] },
              { t: 'Dizer que acidentes acontecem e ajudar a planejar o conserto.', af: { nara: 1 }, marca: 'plano_reforma',
                resp: [['nara', 'Você me deu uma ideia… e se o cano novo passar por aqui, longe da parede?', 'feliz']] },
            ],
            ir: 'conserto',
          },
          caio_cano: {
            cenario: 'apartamento', mostra: ['caio'],
            falas: [
              ['caio', 'Cheguei com balde, fita e otimismo. Dois dos três funcionam.', 'riso'],
              ['n', 'Caio sobe no banquinho, examina o teto e coça a cabeça.'],
              ['caio', 'Isso aqui não é cozinha. Mas cano é cano. Me passa a fita.'],
            ],
            escolhas: [
              { t: 'Segurar o banquinho e confiar.', af: { caio: 2 },
                resp: [['caio', 'Se eu cair, cai junto a reputação do pão de queijo.', 'riso'], ['n', 'Ele não cai. A goteira diminui. Vocês comemoram como final de campeonato.']] },
              { t: 'Sugerir chamar um encanador de verdade.', af: { caio: 1 }, marca: 'encanador',
                resp: [['caio', 'Sábia decisão. Eu fico de assistente e de comediante.']] },
            ],
            ir: 'conserto',
          },
          hugo_cano: {
            cenario: 'apartamento', mostra: ['hugo'],
            falas: [
              ['hugo', 'Estou acordado há vinte horas, mas emergência é comigo.', 'riso'],
              ['hugo', 'Primeiro: desliga a energia desse cômodo. Água e tomada não combinam.'],
            ],
            escolhas: [
              { t: 'Seguir as instruções dele com calma.', af: { hugo: 2 },
                resp: [['hugo', 'Viu? Cabeça fria salva tudo. Até caixa de coisas importantes.', 'feliz']] },
              { t: 'Mandá-lo dormir e resolver por conta própria.', af: { hugo: 1 }, marca: 'hugo_dormiu',
                resp: [['hugo', 'Você manda em mim agora? … Tá. Mas me chama se precisar.', 'timido'], ['n', 'Ele dorme no seu sofá em três minutos. O Biscoito dorme em cima dele.']] },
            ],
            ir: 'conserto',
          },
          conserto: {
            cenario: 'apartamento', mostra: ['zeca'],
            falas: [
              ['zeca', 'O encanador vem na terça. Até lá, balde e fé.'],
              ['n', 'No fim do dia, a caixa de “COISAS IMPORTANTES” seca na janela.'],
              ['n', 'Dentro dela: fotos, cartas antigas e uma lista que você escreveu anos atrás, chamada “Coisas para fazer na vida adulta”.'],
            ],
            escolhas: [
              { t: 'Ler a lista e sorrir.', marca: 'lista_lida',
                resp: [['eu', 'Item 1: ter uma casa com plantas. Item 2: ter amigos na vizinhança. Item 3: me apaixonar sem medo.', 'timido']] },
              { t: 'Guardar a lista para outro dia.',
                resp: [['eu', 'Um dia eu leio. Hoje já teve emoção demais.']] },
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'rua', fim: true,
            falas: [
              ['n', 'Na segunda, um papel aparece em todas as portas do prédio:'],
              ['n', '“FESTA DA RUA DAS GLICÍNIAS — sábado. Tragam um prato, uma cadeira e boa vontade. Assinado: Zeca.”'],
            ],
          },
        },
      },
      {
        id: 'v3', titulo: 'Festa da rua', inicio: 'inicio',
        previa: { titulo: 'Festa da Rua das Glicínias', texto: 'Varal de lâmpadas, mesas na calçada e o bairro inteiro descobrindo quem combina com quem.', cenario: 'festa_rua', personagem: 'caio' },
        cenas: {
          inicio: {
            cenario: 'festa_rua',
            falas: [
              ['n', 'A rua foi fechada para carros. Varais de lâmpadas cruzam de um prédio ao outro.'],
              { p: 'n', t: 'Na banca do Café Esquina, o quadro diz: “Piada do dia, por {nome}”. E ela é melhor que as do Caio.', se: { marca: 'piada_sua' } },
              { p: 'n', t: 'Na fachada do 304, um banner: “Ateliê em obras — inauguração em breve”.', se: { alguma: ['nara_reforma', 'plano_reforma'] } },
              { p: 'n', t: 'O Biscoito usa uma gravatinha. Ele sabe que é a estrela da festa.', se: { marca: 'biscoito' } },
              ['zeca', 'Todo mundo trouxe um prato! Menos eu. Eu trouxe o discurso.', 'riso'],
            ],
            mapa: {
              texto: 'O bairro inteiro está na rua. Para onde você vai?', minimo: 1, sair: 'brinde', textoSair: 'Ir para o brinde do Zeca',
              locais: [
                { id: 'banca', nome: 'Banca do Café Esquina', descricao: 'Receita nova saindo do forno.', cena: 'f_caio' },
                { id: 'varanda', nome: 'Varanda do 304', descricao: 'A melhor vista da festa.', cena: 'f_nara' },
                { id: 'roda', nome: 'Roda de violão na praça', descricao: 'Alguém de folga pela primeira vez.', cena: 'f_hugo' },
              ],
            },
          },
          f_caio: {
            cenario: 'festa_rua', mostra: ['caio'],
            falas: [['caio', 'Experimenta: pão de queijo recheado de goiabada. Receita nova. Você é a cobaia oficial.', 'feliz']],
            escolhas: [
              { t: 'Experimentar e dar nota dez.', af: { caio: 2 }, resp: [['caio', 'Dez? Vou emoldurar essa avaliação.', 'feliz']] },
              { t: 'Ajudar a servir na banca.', af: { caio: 2 }, marca: 'serviu_banca',
                resp: [['caio', 'Quer saber? Você leva jeito pra isso. Pro café. Pra… tudo.', 'timido']] },
            ],
            revisita: [['caio', 'A goiabada acabou. A vontade de te ver, não.', 'timido']],
          },
          f_nara: {
            cenario: 'escada', mostra: ['nara'],
            falas: [
              ['nara', 'Daqui de cima dá pra ver a festa inteira. Vem!', 'feliz'],
              { p: 'nara', t: 'Olha: o cano novo passou exatamente onde você sugeriu.', e: 'riso', se: { marca: 'plano_reforma' } },
            ],
            escolhas: [
              { t: 'Ver a vista ao lado dela.', af: { nara: 2 }, resp: [['nara', 'Eu desenho prédios há dez anos e nunca reparei como essa rua é bonita.', 'timido']] },
              { t: 'Pedir para ver a planta do ateliê pronto.', af: { nara: 1 }, resp: [['nara', 'Tem um cantinho de leitura na planta… achei que você ia gostar.', 'timido']] },
            ],
            revisita: [['nara', 'A vista continua aqui. E eu também.', 'riso']],
          },
          f_hugo: {
            cenario: 'praca', mostra: ['hugo'],
            falas: [
              ['n', 'Na praça, alguém toca violão. Hugo está sentado no banco, de folga pela primeira vez em semanas.'],
              ['hugo', 'Noite de folga e eu não sei o que fazer com as mãos.', 'riso'],
            ],
            escolhas: [
              { t: 'Chamá-lo para dançar.', af: { hugo: 2 }, resp: [['hugo', 'Eu danço igual ao Biscoito correndo atrás do rabo. Já aviso.', 'riso']] },
              { t: 'Sentar no banco e só conversar.', af: { hugo: 2 }, marca: 'conversa_hugo',
                resp: [['hugo', 'Sabe o que eu mais gosto em você? Você não tem pressa.', 'timido']] },
            ],
            revisita: [['hugo', 'O Biscoito guardou seu lugar no banco.']],
          },
          brinde: {
            cenario: 'festa_rua', mostra: ['zeca'],
            falas: [
              ['zeca', 'Um brinde à Rua das Glicínias! Aos vizinhos antigos, aos novos e aos canos que finalmente pararam de pingar!', 'feliz'],
              ['n', 'Todo mundo ri. Os copos sobem.'],
              { p: 'eu', t: 'Item 2 da lista: ter amigos na vizinhança. Feito.', e: 'feliz', se: { marca: 'lista_lida' } },
            ],
            ramos: [
              { se: { maior: 'caio', afMin: { caio: 7 } }, ir: 'final_caio' },
              { se: { maior: 'nara', afMin: { nara: 7 } }, ir: 'final_nara' },
              { se: { maior: 'hugo', afMin: { hugo: 7 } }, ir: 'final_hugo' },
              { ir: 'final_amizade' },
            ],
          },
          final_caio: {
            cenario: 'cafe', mostra: ['caio'], fim: true, final: 'Final de Caio — Piada do dia',
            falas: [
              ['n', 'Depois da festa, o Café Esquina está fechado. Menos para você.'],
              ['caio', 'Inventei uma piada nova. A melhor que eu já fiz.', 'timido'],
              ['caio', '“O que o café disse para o pão de queijo?” … “Fica comigo.”', 'timido'],
              ['caio', 'Não é piada, na verdade.'],
              ['n', 'Você ri. Ele também. E dessa vez ninguém precisa de quadro.'],
            ],
          },
          final_nara: {
            cenario: 'rua', mostra: ['nara'], fim: true, final: 'Final de Nara — Planta baixa',
            falas: [
              ['n', 'Da varanda do 304, as lâmpadas da rua parecem estrelas penduradas.'],
              ['nara', 'Projetar uma casa é imaginar quem vai morar nela.'],
              ['nara', 'Eu fiquei imaginando você aqui. No cantinho de leitura. Todo dia.', 'timido'],
              ['n', 'Ela segura sua mão, ainda com um pouco de tinta nos dedos.'],
            ],
          },
          final_hugo: {
            cenario: 'praca', mostra: ['hugo'], fim: true, final: 'Final de Hugo — Plantão de folga',
            falas: [
              ['hugo', 'Amanhã eu volto pro plantão. Mas queria ter um motivo pra voltar pra casa correndo.', 'timido'],
              ['hugo', 'Além do Biscoito, claro.', 'riso'],
              { p: 'n', t: 'O Biscoito apoia a cabeça no seu joelho, como quem dá a própria bênção.', se: { marca: 'biscoito' } },
              ['n', 'O violão toca devagar. Vocês ficam até a última lâmpada se apagar.'],
            ],
          },
          final_amizade: {
            cenario: 'festa_rua', fim: true, final: 'Final da amizade — Rua das Glicínias',
            falas: [
              ['n', 'Caio traz o último pão de queijo. Nara desenha a festa num guardanapo. Hugo cochila com o Biscoito no colo.'],
              ['zeca', 'Esse prédio nunca teve vizinhos tão bons.', 'feliz'],
              ['eu', 'Acho que agora isso aqui é minha casa.', 'feliz'],
            ],
          },
        },
      },
    ],
  };
  (raiz.HISTORIAS = raiz.HISTORIAS || []).push(H);
})(typeof globalThis !== 'undefined' ? globalThis : this);
