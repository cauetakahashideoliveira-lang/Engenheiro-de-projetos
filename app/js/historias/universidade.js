/* História 2 — Maré Alta (universidade). Roteiro original. */
(function (raiz) {
  const H = {
    id: 'universidade',
    rota: 'universidade',
    nome: 'Maré Alta',
    subtitulo: 'Vida universitária na Universidade Litoral Sul',
    ambientacao: 'Universidade Litoral Sul, em Porto Sereno',
    cor: '#2EA8A0',
    capa: 'campus',
    destaque: 'luna',
    tipoSeletor: 'episodio',
    intro: 'Uma república barulhenta, um campus de frente para o mar e matérias que ninguém explicou direito no vestibular. Encontre seu ritmo antes do luau de fim de semestre.',
    novidades: [
      'Escolha seu curso e veja as conversas mudarem',
      'A prova de Cálculo depende de como você passou a semana',
      'Luau com três finais românticos e um de amizade',
    ],
    elenco: [
      { id: 'rafael', nome: 'Rafael Okada', papel: 'Monitor de Cálculo',
        descricao: 'Organiza as canetas por cor e cuida de vinte e três plantas no quarto. Explica limite como quem conta uma história.',
        aparencia: { pele: 'p2', cabelo: 'curto', corCabelo: 'preto', olhos: 'castanho', roupa: 'sueter', corRoupa: 'verde', acessorio: 'oculos' } },
      { id: 'bento', nome: 'Bento Lira', papel: 'Locutor da rádio universitária',
        descricao: 'Tem opinião sobre tudo e um apelido para todo mundo. Faz o programa da madrugada e nunca dorme antes das três.',
        aparencia: { pele: 'p6', cabelo: 'black', corCabelo: 'preto', olhos: 'castanho', roupa: 'moletom', corRoupa: 'laranja', acessorio: 'fone' } },
      { id: 'luna', nome: 'Luna Ferraz', papel: 'Estudante de Oceanografia',
        descricao: 'Surfa antes da aula das sete, conhece cada peixe da baía pelo nome científico e não tem paciência para enrolação.',
        aparencia: { pele: 'p3', cabelo: 'longo', corCabelo: 'mel', olhos: 'verde', roupa: 'camiseta', corRoupa: 'azul', acessorio: 'brinco' } },
    ],
    extras: {
      gabi: { nome: 'Gabi', aparencia: { pele: 'p4', cabelo: 'tranca', corCabelo: 'castanho', olhos: 'mel', roupa: 'camiseta', corRoupa: 'rosa', acessorio: 'nenhum' } },
    },
    episodios: [
      {
        id: 'u1', titulo: 'Semana de recepção', inicio: 'inicio',
        previa: { titulo: 'Chegada à República Maresia', texto: 'Uma mala, um colchão emprestado e três convites para a mesma noite.', cenario: 'republica', personagem: 'bento' },
        cenas: {
          inicio: {
            cenario: 'republica',
            falas: [
              ['n', 'A República Maresia fica a duas quadras do campus e a dez segundos do mar, se você correr.'],
              ['gabi', 'Seu quarto é o do fim do corredor. A janela não fecha, mas a vista compensa.', 'riso'],
              ['gabi', 'Qual curso você escolheu mesmo?'],
            ],
            escolhas: [
              { t: 'Oceanografia.', marca: 'curso_oceano', af: { luna: 1 },
                resp: [['gabi', 'Então você vai conhecer a Luna. Ela praticamente mora no mar.']] },
              { t: 'Comunicação.', marca: 'curso_comunicacao', af: { bento: 1 },
                resp: [['gabi', 'Comunicação! Prepare-se: o Bento vai tentar te recrutar pra rádio.', 'riso']] },
              { t: 'Engenharia.', marca: 'curso_engenharia', af: { rafael: 1 },
                resp: [['gabi', 'Engenharia… Vai precisar do Rafael. Ele é o monitor de Cálculo e salva vidas.']] },
            ],
            ir: 'mapa',
          },
          mapa: {
            cenario: 'campus',
            falas: [['n', 'O campus é enorme, com prédios de vidro e coqueiros que ninguém plantou de propósito.']],
            mapa: {
              texto: 'Por onde começar?', minimo: 2, sair: 'noite', textoSair: 'Voltar para a república',
              locais: [
                { id: 'biblioteca', nome: 'Biblioteca central', descricao: 'Terceiro andar, perto das estantes de exatas.', cena: 'l_bib' },
                { id: 'radio', nome: 'Rádio Maré FM', descricao: 'A luz de NO AR está acesa.', cena: 'l_radio' },
                { id: 'praia', nome: 'Praia do campus', descricao: 'Ondas boas e lixo na areia.', cena: 'l_praia' },
              ],
            },
          },
          l_bib: {
            cenario: 'biblioteca', mostra: ['rafael'],
            falas: [
              ['n', 'No terceiro andar, um rapaz de óculos rega um vaso de samambaia escondido atrás das estantes.'],
              ['rafael', 'Não conta pra bibliotecária. A Dona Samambaia é clandestina.', 'surpreso'],
              ['rafael', 'Rafael, monitor de Cálculo I. Se você está no primeiro período, vai me ver bastante.'],
              { p: 'rafael', t: 'Engenharia? Meus pêsames e meus parabéns.', e: 'riso', se: { marca: 'curso_engenharia' } },
            ],
            escolhas: [
              { t: 'Prometer guardar o segredo da samambaia.', af: { rafael: 2 }, marca: 'samambaia',
                resp: [['rafael', 'Ela agradece. Eu também.', 'feliz']] },
              { t: 'Pedir dicas de estudo.', af: { rafael: 1 },
                resp: [['rafael', 'Faça os exercícios antes de olhar a resposta. Parece óbvio. Ninguém faz.']] },
              { t: 'Lembrar que plantas na biblioteca são contra as regras.', af: { rafael: -1 },
                resp: [['rafael', 'Tecnicamente, é um vaso. Vasos não estão no regulamento.', 'bravo']] },
            ],
            revisita: [['rafael', 'A samambaia está bem, obrigado por perguntar. Você ia perguntar.', 'riso']],
          },
          l_radio: {
            cenario: 'radio', mostra: ['bento'],
            falas: [
              ['n', 'Uma luz vermelha diz NO AR. Lá dentro, alguém fala como se estivesse num estádio.'],
              ['bento', 'E atenção, Porto Sereno: temos visita no estúdio!', 'feliz'],
              ['bento', 'Fala seu nome no microfone. Vai, o público é pequeno. Umas onze pessoas. Duas são minha mãe.', 'riso'],
              { p: 'bento', t: 'Comunicação? Então é estágio obrigatório. Acabei de inventar.', e: 'riso', se: { marca: 'curso_comunicacao' } },
            ],
            escolhas: [
              { t: 'Falar seu nome e mandar um alô para a cidade.', af: { bento: 2 }, marca: 'no_ar',
                resp: [['bento', '{nome}, a mais nova voz da Maré FM! Não, sério, você leva jeito.', 'feliz']] },
              { t: 'Fugir do microfone, rindo de nervoso.', af: { bento: 1 },
                resp: [['bento', 'Timidez no ar também é conteúdo! Fica pra próxima.', 'riso']] },
              { t: 'Pedir uma música para tocar.', af: { bento: 1 },
                resp: [['bento', 'Pedido aceito. Mas a próxima eu escolho, e vai ser brega.']] },
            ],
            revisita: [['bento', 'O microfone ainda está quente com a sua voz.', 'riso']],
          },
          l_praia: {
            cenario: 'praia', mostra: ['luna'],
            falas: [
              ['n', 'A praia do campus está quase vazia. Uma garota sai do mar com uma prancha e uma garrafa plástica.'],
              ['luna', 'Lixo na arrebentação. Toda semana.', 'bravo'],
              ['luna', 'Luna, da Oceanografia. Já que está aqui, segura isso.'],
              { p: 'luna', t: 'Oceanografia também? Ótimo. A praia precisa de mais gente com mãos.', e: 'feliz', se: { marca: 'curso_oceano' } },
            ],
            escolhas: [
              { t: 'Ajudar a recolher o lixo da areia.', af: { luna: 2 }, marca: 'limpeza',
                resp: [['luna', 'Gostei de você. Não reclamou da areia no tênis.', 'riso']] },
              { t: 'Pedir uma aula de surfe.', af: { luna: 1 },
                resp: [['luna', 'Às seis da manhã. Se você aparecer, eu ensino.']] },
              { t: 'Perguntar se ela não tem medo de tubarão.',
                resp: [['luna', 'Tenho mais medo de canudo.']] },
            ],
            revisita: [['luna', 'Ainda aqui? A maré está subindo. Literalmente.']],
          },
          noite: {
            cenario: 'republica',
            falas: [
              ['n', 'À noite, a república está cheia de gente e de pizza.'],
              ['gabi', 'Três convites pra hoje: sessão de estudo, festa na rádio e luau improvisado. Escolhe um, que eu fico com os outros dois.', 'riso'],
            ],
            escolhas: [
              { t: 'Sessão de estudo com o Rafael.', se: { visitou: 'biblioteca' }, af: { rafael: 2 }, marca: 'noite_rafael',
                resp: [['n', 'Vocês resolvem doze limites e um mistério: quem rega a Dona Samambaia no fim de semana.']] },
              { t: 'Festa no estúdio da rádio.', se: { visitou: 'radio' }, af: { bento: 2 }, marca: 'noite_bento',
                resp: [['n', 'Bento toca três músicas bregas seguidas e dedica todas a você.']] },
              { t: 'Luau improvisado com a Luna.', se: { visitou: 'praia' }, af: { luna: 2 }, marca: 'noite_luna',
                resp: [['n', 'Luna conta histórias de tartarugas marinhas até a fogueira virar brasa.']] },
              { t: 'Ficar e dormir cedo.',
                resp: [['gabi', 'Escolha madura. Chata, mas madura.', 'riso']] },
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'republica', fim: true,
            falas: [
              ['n', 'Primeira semana sobrevivida. Na porta do quarto, alguém colou um post-it: “Prova de Cálculo na sexta. Sem pânico.”'],
              { p: 'n', t: 'Embaixo, em outra letra: “Pânico só um pouco, vai. — B.”', se: { afMin: { bento: 3 } } },
            ],
          },
        },
      },
      {
        id: 'u2', titulo: 'Prova surpresa', inicio: 'inicio',
        previa: { titulo: 'Prova de Cálculo', texto: 'Sexta tem prova, quinta tem plantão na rádio e amanhã cedo tem mutirão na praia. Não dá pra estar em todo lugar.', cenario: 'biblioteca', personagem: 'rafael' },
        cenas: {
          inicio: {
            cenario: 'campus',
            falas: [
              ['n', 'Quarta-feira. Faltam dois dias para a prova de Cálculo.'],
              ['gabi', 'Você está com cara de quem está fazendo conta de cabeça. Ou de fome.'],
              { p: 'gabi', t: 'O Rafael passou procurando você. Disse que guardou uma mesa na biblioteca.', se: { alguma: ['noite_rafael', 'samambaia'] } },
              ['n', 'No celular, chegam duas mensagens.'],
              ['bento', '“Preciso de alguém pro plantão de quinta na rádio. Socorro. É você. Já decidi.”'],
              ['luna', '“Mutirão de limpeza amanhã cedo. A maré trouxe uma rede de pesca inteira.”'],
            ],
            escolhas: [
              { t: 'Estudar com o Rafael na biblioteca.', af: { rafael: 3 }, marca: ['estudou', 'foco_rafael'], ir: 'estudo' },
              { t: 'Cobrir o plantão da rádio com o Bento.', af: { bento: 3 }, marca: 'foco_bento', ir: 'plantao' },
              { t: 'Ir ao mutirão da praia com a Luna.', af: { luna: 3 }, marca: 'foco_luna', ir: 'mutirao' },
            ],
          },
          estudo: {
            cenario: 'biblioteca', mostra: ['rafael'],
            falas: [
              ['rafael', 'Regra número um: ninguém decora fórmula. A gente entende de onde ela veio.'],
              ['n', 'Três horas depois, a derivada faz sentido pela primeira vez.'],
              ['rafael', 'Viu? Você sabia. Só não sabia que sabia.', 'feliz'],
            ],
            escolhas: [
              { t: 'Agradecer com um café da cantina.', af: { rafael: 1 },
                resp: [['rafael', 'Café com açúcar? Você me conhece pouco e já me conhece bem.', 'timido']] },
              { t: 'Perguntar por que ele gosta tanto de ensinar.', af: { rafael: 2 }, marca: 'rafael_historia',
                resp: [['rafael', 'Eu quase desisti no primeiro período. Alguém sentou comigo, como eu sentei com você.', 'triste'], ['rafael', 'Estou só devolvendo.']] },
            ],
            ir: 'prova',
          },
          plantao: {
            cenario: 'radio', mostra: ['bento'],
            falas: [
              ['bento', 'Quinta, 23h. Ninguém ouve rádio nesse horário. Por isso é o melhor horário.', 'riso'],
              ['n', 'Às 23h40, a primeira ligação: uma senhora pede uma música para o marido, que trabalha de vigia.'],
              ['bento', 'Vai, atende você.'],
            ],
            escolhas: [
              { t: 'Atender e oferecer a música com um recado bonito.', af: { bento: 2 }, marca: 'recado_radio',
                resp: [['bento', 'Você falou melhor do que eu falo em três anos.', 'feliz']] },
              { t: 'Deixar o Bento atender e só observar.', af: { bento: 1 },
                resp: [['bento', 'Um dia você assume. Eu sinto essas coisas.']] },
            ],
            ir: 'prova',
          },
          mutirao: {
            cenario: 'praia', mostra: ['luna'],
            falas: [
              ['n', 'Seis da manhã. A rede de pesca está enroscada em pedras e num caranguejo muito irritado.'],
              ['luna', 'Puxa no três. Um, dois…'],
            ],
            escolhas: [
              { t: 'Puxar com força junto com ela.', af: { luna: 1 },
                resp: [['n', 'A rede sai de uma vez. Vocês caem sentados na areia, rindo.'], ['luna', 'Parceria aprovada.', 'riso']] },
              { t: 'Soltar o caranguejo primeiro, com cuidado.', af: { luna: 2 }, marca: 'caranguejo',
                resp: [['luna', 'Ele não vai agradecer. Mas eu agradeço.', 'feliz']] },
            ],
            ir: 'prova',
          },
          prova: {
            cenario: 'sala',
            falas: [
              ['n', 'Sexta-feira, 8h. A prova tem cinco questões e nenhuma piedade.'],
              { p: 'n', t: 'Você chega com olheiras de quem saiu do estúdio às duas da manhã.', se: { marca: 'foco_bento' } },
              { p: 'n', t: 'Seus braços ainda doem da rede de pesca, mas a cabeça está leve.', se: { marca: 'foco_luna' } },
              { p: 'n', t: 'As fórmulas aparecem na sua cabeça como velhas conhecidas.', se: { marca: 'estudou' } },
            ],
            escolhas: [
              { t: 'Começar pela questão mais difícil.', se: { marca: 'estudou' }, af: { rafael: 1 }, marca: 'nota_alta',
                resp: [['n', 'Você resolve a questão cinco em dez minutos. O Rafael ia ficar orgulhoso.']] },
              { t: 'Começar pelas mais fáceis, com calma.', marca: 'nota_ok',
                resp: [['n', 'Você termina quatro questões. Não é perfeito, mas é honesto.']] },
              { t: 'Desenhar uma tartaruga no rascunho para se acalmar.', marca: 'nota_baixa',
                resp: [['n', 'A tartaruga ficou ótima. A prova, nem tanto.']] },
            ],
            ir: 'fim',
          },
          fim: {
            cenario: 'campus', fim: true,
            falas: [
              { p: 'rafael', t: 'A nota saiu. Você foi muito bem. Eu… fiquei mais feliz do que deveria.', e: 'timido', se: { marca: 'nota_alta' } },
              { p: 'gabi', t: 'Nota média, cabeça inteira. É assim que se sobrevive ao primeiro semestre.', se: { nao: 'nota_alta' } },
              ['n', 'No mural do centro acadêmico, um cartaz novo: “Luau de fim de semestre — sábado, praia do campus”.'],
            ],
          },
        },
      },
      {
        id: 'u3', titulo: 'Luau de fim de semestre', inicio: 'inicio',
        previa: { titulo: 'Luau na praia do campus', texto: 'Violão, fogueira e uma lua cheia que não ajuda ninguém a esconder o que sente.', cenario: 'luau', personagem: 'luna' },
        cenas: {
          inicio: {
            cenario: 'luau',
            falas: [
              ['n', 'A praia do campus está iluminada por lanternas de papel e uma fogueira de verdade.'],
              ['bento', 'Atenção, areia! Hoje a Maré FM transmite ao vivo do luau!', 'feliz'],
              { p: 'n', t: 'Num canto, protegida do vento por uma cadeira de praia, está a Dona Samambaia. O Rafael trouxe a planta para o luau.', se: { marca: 'samambaia' } },
              { p: 'n', t: 'Uma placa do centro acadêmico diz: “Praia limpa graças ao mutirão”.', se: { marca: 'foco_luna' } },
              ['gabi', 'Alguém está te procurando. Não vou dizer quem. Tá, vou: olha pra trás.', 'riso'],
            ],
            ramos: [
              { se: { maior: 'rafael', afMin: { rafael: 5 } }, ir: 'encontro_rafael' },
              { se: { maior: 'bento', afMin: { bento: 5 } }, ir: 'encontro_bento' },
              { se: { maior: 'luna', afMin: { luna: 5 } }, ir: 'encontro_luna' },
              { ir: 'encontro_gabi' },
            ],
          },
          encontro_rafael: {
            cenario: 'luau', mostra: ['rafael'],
            falas: [['rafael', 'Eu nunca venho em festa. Vim porque… bom, você disse que vinha.', 'timido']],
            escolhas: [
              { t: 'Chamá-lo para caminhar na beira da água.', af: { rafael: 2 }, resp: [['rafael', 'Só se a gente não falar de derivadas.', 'riso']] },
              { t: 'Brincar que ele trouxe a planta como acompanhante.', af: { rafael: 1 }, resp: [['rafael', 'Ela precisava de ar fresco. E eu precisava de coragem.', 'timido']] },
            ],
            ir: 'final',
          },
          encontro_bento: {
            cenario: 'luau', mostra: ['bento'],
            falas: [
              ['bento', 'Vou tocar a última música da noite. Escolhi uma brega. Óbvio.', 'riso'],
              { p: 'bento', t: 'Mas o recado é seu. Aquele da senhora do vigia nunca saiu da minha cabeça.', se: { marca: 'recado_radio' } },
            ],
            escolhas: [
              { t: 'Dedicar a música, ao vivo, para ele.', af: { bento: 2 }, resp: [['bento', 'Você acabou de me deixar sem palavras. Ao vivo. Nunca aconteceu.', 'surpreso']] },
              { t: 'Pedir para dividir o microfone.', af: { bento: 1 }, resp: [['bento', 'Dupla de locução? Gostei do som disso.', 'feliz']] },
            ],
            ir: 'final',
          },
          encontro_luna: {
            cenario: 'luau', mostra: ['luna'],
            falas: [['luna', 'A maré está baixa. Dá pra ver as piscinas naturais com a lanterna.']],
            escolhas: [
              { t: 'Ir com ela até as pedras.', af: { luna: 2 }, resp: [['luna', 'Olha: um polvo. Não conta pra ninguém, ele é tímido.', 'feliz']] },
              { t: 'Perguntar se ela ainda ensina surfe às seis.', af: { luna: 1 }, resp: [['luna', 'Pra você, ensino até às cinco.', 'riso']] },
            ],
            ir: 'final',
          },
          encontro_gabi: {
            cenario: 'luau', mostra: ['gabi'],
            falas: [
              ['gabi', 'Tá, era eu mesma. Ninguém passa o luau sozinho na minha república.', 'riso'],
              ['n', 'Vocês dividem espetinhos de queijo olhando o mar.'],
            ],
            ir: 'final',
          },
          final: {
            cenario: 'luau',
            falas: [['n', 'A fogueira estala. A lua sobe acima das lanternas.']],
            ramos: [
              { se: { maior: 'rafael', afMin: { rafael: 7 } }, ir: 'final_rafael' },
              { se: { maior: 'bento', afMin: { bento: 7 } }, ir: 'final_bento' },
              { se: { maior: 'luna', afMin: { luna: 7 } }, ir: 'final_luna' },
              { ir: 'final_amizade' },
            ],
          },
          final_rafael: {
            cenario: 'luau', mostra: ['rafael'], fim: true, final: 'Final de Rafael — Sem demonstração',
            falas: [
              ['rafael', 'Posso dizer uma coisa sem explicar de onde ela veio?', 'timido'],
              ['rafael', 'Eu gosto de você. Simples assim. Sem demonstração.', 'timido'],
              { p: 'rafael', t: 'Alguém sentou comigo quando eu precisava. Agora eu quero sentar do seu lado por outros motivos.', se: { marca: 'rafael_historia' } },
              ['n', 'Ele ri de nervoso. A Dona Samambaia, se pudesse, também riria.'],
            ],
          },
          final_bento: {
            cenario: 'luau', mostra: ['bento'], fim: true, final: 'Final de Bento — Fim da transmissão',
            falas: [
              ['bento', 'Porto Sereno, uma notícia de última hora:', 'feliz'],
              ['bento', 'O locutor da madrugada está apaixonado. Fim da transmissão.', 'timido'],
              ['n', 'A luz vermelha do equipamento portátil se apaga. Ele pega sua mão como se fosse a coisa mais natural do mundo.'],
            ],
          },
          final_luna: {
            cenario: 'luau', mostra: ['luna'], fim: true, final: 'Final de Luna — Maré cheia',
            falas: [
              ['luna', 'Eu não sou boa com discurso. Então vou ser direta.'],
              ['luna', 'Quero você na água comigo amanhã cedo. E depois de amanhã. E no semestre que vem.', 'timido'],
              { p: 'luna', t: 'Quem solta um caranguejo com tanto cuidado merece uma chance.', e: 'riso', se: { marca: 'caranguejo' } },
              ['n', 'A onda chega até os seus pés e volta, devagar.'],
            ],
          },
          final_amizade: {
            cenario: 'luau', fim: true, final: 'Final da amizade — República Maresia',
            falas: [
              ['n', 'Bento toca uma música brega, Luna puxa todo mundo para o mar e Rafael segura os chinelos de todos.'],
              ['gabi', 'Primeiro semestre: concluído. Ninguém reprovou em amizade.', 'feliz'],
              ['eu', 'Que venha o segundo.', 'feliz'],
            ],
          },
        },
      },
    ],
  };
  (raiz.HISTORIAS = raiz.HISTORIAS || []).push(H);
})(typeof globalThis !== 'undefined' ? globalThis : this);
