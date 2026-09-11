/* desenvolvimento.js — trilha Desenvolvimento pessoal.
   4 fases, 10 modulos, 120 h.
   Pratica: reflexao guiada e experimento de sete dias. */

(function () {
  "use strict";

  var fases = [];

  /* ===================================================================== F1 */
  fases.push({
    id: "desenvolvimento.f1",
    n: 1,
    nome: "Atencao e produtividade",
    cor: "--f1",
    modulos: [
      {
        id: "desenvolvimento.m1",
        n: 1,
        titulo: "Foco e trabalho profundo",
        h: 12,
        objetivo: "Conseguir duas horas seguidas de trabalho dificil, sem interrupcao.",
        topicos: ["troca de contexto", "bloco de foco", "ambiente", "custo da notificacao"],
        aula: {
          objetivo: "Ao terminar, voce protege pelo menos dois blocos de foco por semana e sabe o custo real da interrupcao.",
          blocos: [
            { t: "texto", v: "Trabalho analitico exige carregar muita coisa na cabeca ao mesmo tempo: a estrutura do dado, a regra de negocio, o que ja foi testado. Uma interrupcao derruba tudo isso, e reconstruir leva mais tempo que a interrupcao durou." },
            { t: "destaque", v: "O custo de uma interrupcao de dois minutos nao e dois minutos. E o tempo de voltar ao mesmo ponto de concentracao, que costuma passar de quinze." },
            { t: "subtitulo", v: "Por que a manha rende mais" },
            { t: "texto", v: "Nao e mistica: e que a manha costuma ter menos demanda acumulada e menos decisao ja tomada. A capacidade de sustentar atencao diminui ao longo do dia, entao a tarefa mais dificil merece o horario de maior energia, e nao o que sobrou." },
            { t: "subtitulo", v: "Como criar o bloco" },
            { t: "lista", ordenada: true, v: [
              "Marque na agenda como compromisso, com nome do assunto.",
              "Feche e-mail e mensageiro. Fechar, nao silenciar.",
              "Deixe combinado como te alcancar em emergencia real.",
              "Comece com a tarefa definida, nao decidindo o que fazer.",
              "Duas horas e o alvo; noventa minutos ja mudam o dia."
            ] },
            { t: "subtitulo", v: "Multitarefa nao existe" },
            { t: "texto", v: "O que se chama de multitarefa e alternancia rapida entre tarefas, e cada alternancia cobra um pedaco de atencao. Duas tarefas alternadas levam mais tempo somado do que feitas em sequencia, e com mais erro." },
            { t: "aviso", v: "Notificacao visivel na tela consome atencao mesmo sem ser aberta. Parte da cabeca fica ocupada decidindo se aquilo e urgente. Feche a aba." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce reserva a tarde para modelar um dado complexo. Entre 14h e 18h chegam onze mensagens, tres delas urgentes de verdade. As quatro horas rendem o equivalente a quarenta minutos, e o modelo sai com um erro que so aparece na semana seguinte." },
              { t: "texto", v: "Na semana seguinte, o mesmo trabalho e feito das 8h as 10h com tudo fechado, e termina antes das 10h. As mensagens continuaram chegando; a diferenca foi so o momento em que voce as leu." }
            ]
          },
          resumo: [
            "Interrupcao curta custa muito mais que sua duracao.",
            "A tarefa mais dificil merece o horario de maior energia.",
            "Multitarefa e alternancia, e alternancia cobra pedaco.",
            "Notificacao visivel consome atencao mesmo fechada."
          ],
          aplicar: [
            "Marque dois blocos de duas horas na proxima semana, com assunto definido.",
            "Feche e-mail e mensageiro durante um bloco e anote a diferenca.",
            "Combine com o time como te alcancar em emergencia real."
          ]
        },
        itens: [
          { id: "desenvolvimento.m1.i1", tipo: "externo", titulo: "Como controlar seu tempo livre",
            fonte: "TED, Laura Vanderkam", url: "https://www.ted.com/talks/laura_vanderkam_how_to_gain_control_of_your_free_time", h: 1 },
          { id: "desenvolvimento.m1.i2", tipo: "externo", titulo: "Atencao, foco e produtividade",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/leadership/", h: 3 },
          { id: "desenvolvimento.m1.i3", tipo: "pratica",
            titulo: "Experimento de sete dias com dois blocos diarios de foco", h: 5 },
          { id: "desenvolvimento.m1.i4", tipo: "entregavel",
            titulo: "Registro do experimento com o que mudou na producao real", h: 3 }
        ],
        exercicios: [
          { id: "desenvolvimento.m1.e1", tipo: "reflexao",
            enunciado: "Mapeie sua atencao ao longo da semana.",
            perguntas: [
              "Em que horario do dia voce produz o trabalho dificil com mais facilidade?",
              "Quantas interrupcoes voce teve ontem, e quantas eram emergencia de verdade?",
              "O que impede voce de fechar o mensageiro por duas horas, concretamente?"
            ],
            minimoCaracteres: 300 }
        ]
      },
      {
        id: "desenvolvimento.m2",
        n: 2,
        titulo: "Sistema de tarefas",
        h: 12,
        objetivo: "Tirar tudo da cabeca e confiar em um sistema que voce revisa.",
        topicos: ["captura", "lista unica", "revisao semanal", "proxima acao"],
        aula: {
          objetivo: "Ao terminar, voce tem um sistema de tarefas com captura rapida e revisao semanal.",
          blocos: [
            { t: "texto", v: "Guardar compromisso na cabeca consome atencao continuamente, mesmo quando voce nao esta pensando nele. Sistema de tarefas nao serve para lembrar, serve para poder esquecer com seguranca." },
            { t: "destaque", v: "A cabeca e boa para ter ideia e pessima para guardar lista. Escreva tudo, no mesmo lugar, sempre." },
            { t: "subtitulo", v: "Tres regras que bastam" },
            { t: "lista", ordenada: true, v: [
              "Captura em segundos: se anotar da trabalho, voce nao vai anotar.",
              "Uma lista unica, nao cinco. Post-it, e-mail marcado, caderno e app ao mesmo tempo garantem que algo se perca.",
              "Revisao semanal: sem ela, qualquer sistema vira cemiterio de tarefas em tres semanas."
            ] },
            { t: "subtitulo", v: "Escreva a proxima acao, nao o assunto" },
            { t: "tabela", cab: ["Em vez de", "Escreva"], linhas: [
              ["Painel de vendas", "definir com o Joao as 3 metricas do painel"],
              ["Contratacao", "escrever a descricao da vaga de analista"],
              ["Estudar Python", "fazer os 3 primeiros exercicios do modulo 1"],
              ["Falar com o financeiro", "enviar e-mail marcando 30 min com a Ana"]
            ] },
            { t: "texto", v: "Tarefa escrita como assunto trava, porque exige decidir o que fazer no momento em que voce ja esta cansado. Tarefa escrita como acao concreta e executavel sem pensar." },
            { t: "subtitulo", v: "Revisao semanal, trinta minutos" },
            { t: "texto", v: "Sexta a tarde ou segunda de manha: esvazie a caixa de captura, olhe a agenda das duas semanas seguintes, revise as tarefas paradas e escolha as tres coisas que precisam acontecer na semana. Trinta minutos sustentam o sistema inteiro." },
            { t: "aviso", v: "Nao adote o metodo completo de nenhum livro de produtividade. Sistema complexo demais consome mais tempo do que economiza e e abandonado no primeiro mes corrido." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Suas pendencias estao em quatro lugares: e-mails marcados, um caderno, mensagens salvas e a memoria. Toda semana algo se perde, e voce descobre quando alguem cobra." },
              { t: "texto", v: "Uma lista unica com captura rapida e trinta minutos de revisao na sexta acabaram com a sensacao de estar esquecendo algo. O ganho maior nao foi produtividade: foi parar de pensar em trabalho no domingo a noite." }
            ]
          },
          resumo: [
            "Sistema serve para poder esquecer com seguranca.",
            "Uma lista unica, com captura em segundos.",
            "Escreva a proxima acao concreta, nao o assunto.",
            "Sem revisao semanal, todo sistema morre."
          ],
          aplicar: [
            "Escolha uma unica lista e migre tudo para ela hoje.",
            "Reescreva as cinco tarefas mais antigas como acao concreta.",
            "Marque trinta minutos semanais recorrentes de revisao."
          ]
        },
        itens: [
          { id: "desenvolvimento.m2.i1", tipo: "externo", titulo: "Metodo de organizacao pessoal",
            fonte: "Getting Things Done", url: "https://gettingthingsdone.com/what-is-gtd/", h: 3 },
          { id: "desenvolvimento.m2.i2", tipo: "externo", titulo: "Organizacao de trabalho em equipe",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "desenvolvimento.m2.i3", tipo: "pratica",
            titulo: "Consolidar todas as pendencias em uma lista unica", h: 4 },
          { id: "desenvolvimento.m2.i4", tipo: "entregavel",
            titulo: "Quatro revisoes semanais consecutivas realizadas e registradas", h: 3 }
        ],
        exercicios: [
          { id: "desenvolvimento.m2.e1", tipo: "reflexao",
            enunciado: "Diagnostique seu sistema atual.",
            perguntas: [
              "Em quantos lugares diferentes estao suas pendencias hoje?",
              "Qual foi a ultima coisa que voce esqueceu, e onde ela deveria estar registrada?",
              "Quais das suas tarefas atuais estao escritas como assunto e nao como acao?"
            ],
            minimoCaracteres: 300 }
        ]
      },
      {
        id: "desenvolvimento.m3",
        n: 3,
        titulo: "Reunioes e interrupcoes",
        h: 8,
        objetivo: "Reduzir o tempo gasto com o que nao produz resultado.",
        topicos: ["recusar com criterio", "assincrono", "janela de atendimento", "agenda do time"],
        aula: {
          objetivo: "Ao terminar, voce recusa e encurta reunioes sem prejudicar relacionamento.",
          blocos: [
            { t: "texto", v: "Reuniao e a unica atividade corporativa cujo custo e multiplicado pelo numero de participantes e que quase nunca e medido. Uma reuniao de uma hora com oito pessoas custa um dia de trabalho." },
            { t: "destaque", v: "Antes de aceitar, pergunte qual decisao sera tomada. Se nao houver decisao nem alinhamento necessario, a reuniao pode virar texto." },
            { t: "subtitulo", v: "O que resolve melhor por escrito" },
            { t: "tabela", cab: ["Situacao", "Melhor formato"], linhas: [
              ["Informar status", "resumo escrito"],
              ["Coletar opiniao", "documento com comentarios"],
              ["Decidir com divergencia", "reuniao"],
              ["Alinhar expectativa nova", "reuniao curta"],
              ["Resolver duvida pontual", "mensagem"]
            ] },
            { t: "subtitulo", v: "Como recusar sem atrito" },
            { t: "texto", v: "Nao recuse em silencio. Diga o que voce pode oferecer no lugar: nao consigo participar, mas leio a ata e respondo o que for da minha area ate quinta. A pessoa recebe uma solucao, nao uma porta fechada." },
            { t: "subtitulo", v: "Janela de atendimento" },
            { t: "texto", v: "Duas janelas fixas por dia para duvidas rapidas reduzem interrupcao sem tornar voce inacessivel. O time se adapta em duas semanas, e as duvidas que nao eram urgentes se resolvem sozinhas antes da janela." },
            { t: "aviso", v: "Cuidado com a agenda inteiramente aberta a quem quiser marcar. Ela transmite disponibilidade total e transforma sua semana no que os outros decidiram." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce participa de uma reuniao semanal de uma hora com nove pessoas, em que fala por cinco minutos. Sao 36 horas suas por ano e mais de 300 horas somadas do grupo." },
              { t: "texto", v: "Propor que a parte informativa vire um resumo escrito e a reuniao caia para vinte minutos com quem decide devolveu meio dia por mes para cada participante. Ninguem reclamou." }
            ]
          },
          resumo: [
            "Custo da reuniao e multiplicado pelos participantes.",
            "Sem decisao a tomar, costuma caber em texto.",
            "Recuse oferecendo alternativa, nunca em silencio.",
            "Janela de atendimento reduz interrupcao sem fechar a porta."
          ],
          aplicar: [
            "Calcule o custo em horas somadas de uma reuniao recorrente sua.",
            "Proponha transformar uma reuniao informativa em resumo escrito.",
            "Defina duas janelas diarias de atendimento e comunique ao time."
          ]
        },
        itens: [
          { id: "desenvolvimento.m3.i1", tipo: "externo", titulo: "Reunioes eficazes e alternativas assincronas",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "desenvolvimento.m3.i2", tipo: "pratica",
            titulo: "Auditar duas semanas de agenda e classificar cada reuniao", h: 3 },
          { id: "desenvolvimento.m3.i3", tipo: "entregavel",
            titulo: "Uma reuniao recorrente encurtada ou transformada em texto", h: 3 }
        ],
        exercicios: [
          { id: "desenvolvimento.m3.e1", tipo: "python",
            enunciado: "Escreva custo_reuniao(participantes, minutos, custo_hora): devolve o custo total arredondado em duas casas.",
            starter: "def custo_reuniao(participantes, minutos, custo_hora):\n    pass\n",
            teste: "assert custo_reuniao(8, 60, 100) == 800.0\nassert custo_reuniao(3, 30, 80) == 120.0\nassert custo_reuniao(0, 60, 100) == 0.0\n",
            gabarito: "def custo_reuniao(participantes, minutos, custo_hora):\n    return round(participantes * (minutos / 60) * custo_hora, 2)\n",
            dica: "Converta minutos em fracao de hora antes de multiplicar." }
        ]
      }
    ]
  });

  /* ===================================================================== F2 */
  fases.push({
    id: "desenvolvimento.f2",
    n: 2,
    nome: "Habitos",
    cor: "--f2",
    modulos: [
      {
        id: "desenvolvimento.m4",
        n: 4,
        titulo: "Formacao de habitos",
        h: 12,
        objetivo: "Construir rotina de estudo que sobreviva a semana ruim.",
        topicos: ["gatilho", "tamanho minimo", "ambiente", "recomeco"],
        aula: {
          objetivo: "Ao terminar, voce tem um habito de estudo definido por gatilho, tamanho e local.",
          blocos: [
            { t: "texto", v: "Estudar duas horas quando da vontade produz tres semanas boas e seis meses parados. Estudar vinte minutos todo dia util produz uma trilha concluida. O inimigo nao e a falta de tempo, e a dependencia de motivacao." },
            { t: "destaque", v: "Motivacao e consequencia de progresso, nao causa. Ela aparece depois que voce comeca, quase nunca antes." },
            { t: "subtitulo", v: "Gatilho, acao, recompensa" },
            { t: "texto", v: "Todo habito precisa de um gatilho concreto, ligado a algo que ja acontece: depois do cafe da manha, ao chegar na mesa, antes do almoco. Horario solto e gatilho fraco, porque depende de voce lembrar." },
            { t: "codigo", lang: "text", v: "Formula:\n  Depois de [algo que ja faco todo dia],\n  eu vou [acao minima],\n  em [local especifico].\n\nExemplo:\n  Depois de abrir o computador de manha,\n  eu vou ler uma aula do portal,\n  na propria mesa, antes de abrir o e-mail." },
            { t: "subtitulo", v: "Comece pequeno demais" },
            { t: "texto", v: "Vinte minutos parece pouco e e exatamente por isso que funciona. Meta pequena nao gera negociacao interna nos dias ruins, e dia ruim e o que decide se o habito sobrevive." },
            { t: "subtitulo", v: "Ambiente decide mais que forca de vontade" },
            { t: "lista", v: [
              "Deixe o portal aberto numa aba fixa do navegador.",
              "Mantenha o material a vista, nao dentro de uma pasta.",
              "Tire da tela inicial do celular o que rouba a hora do estudo.",
              "Estude sempre no mesmo lugar: o local vira parte do gatilho."
            ] },
            { t: "aviso", v: "Falhar um dia nao quebra o habito. Falhar dois seguidos comeca a quebrar. A regra pratica: nunca duas faltas seguidas, mesmo que o segundo dia seja de cinco minutos." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A meta era estudar duas horas por dia. Funcionou na primeira semana, caiu para tres dias na segunda e parou na terceira, quando veio o fechamento do mes." },
              { t: "texto", v: "A meta virou vinte minutos depois do cafe, antes do e-mail. Em tres meses, foram mais horas acumuladas do que na versao ambiciosa, porque o fechamento do mes nao derruba vinte minutos." }
            ]
          },
          resumo: [
            "Constancia pequena vence intensidade irregular.",
            "Motivacao vem depois do inicio, nao antes.",
            "Gatilho preso a algo que ja acontece funciona melhor que horario.",
            "Nunca duas faltas seguidas."
          ],
          aplicar: [
            "Escreva sua formula: depois de X, eu vou Y, em Z.",
            "Reduza sua meta diaria de estudo ate ela parecer facil demais.",
            "Prepare o ambiente hoje: aba fixa, material a vista."
          ]
        },
        itens: [
          { id: "desenvolvimento.m4.i1", tipo: "externo", titulo: "Como habitos se formam",
            fonte: "James Clear", url: "https://jamesclear.com/habits", h: 4 },
          { id: "desenvolvimento.m4.i2", tipo: "externo", titulo: "Mudanca de comportamento em pequenos passos",
            fonte: "BJ Fogg, Tiny Habits", url: "https://tinyhabits.com/", h: 2 },
          { id: "desenvolvimento.m4.i3", tipo: "pratica",
            titulo: "Experimento de 21 dias com meta minima diaria", h: 4 },
          { id: "desenvolvimento.m4.i4", tipo: "entregavel",
            titulo: "Registro dos 21 dias com faltas e o que causou cada uma", h: 2 }
        ],
        exercicios: [
          { id: "desenvolvimento.m4.e1", tipo: "python",
            enunciado: "Escreva maior_sequencia(dias): recebe uma lista de True e False e devolve o tamanho da maior sequencia de True.",
            starter: "def maior_sequencia(dias):\n    pass\n",
            teste: "assert maior_sequencia([True, True, False, True, True, True]) == 3\nassert maior_sequencia([]) == 0\nassert maior_sequencia([False, False]) == 0\n",
            gabarito: "def maior_sequencia(dias):\n    maior = 0\n    atual = 0\n    for d in dias:\n        atual = atual + 1 if d else 0\n        if atual > maior:\n            maior = atual\n    return maior\n",
            dica: "Zere o contador a cada falha e guarde o maximo ja visto." }
        ]
      },
      {
        id: "desenvolvimento.m5",
        n: 5,
        titulo: "Energia, sono e rotina",
        h: 10,
        objetivo: "Gerenciar energia, e nao apenas tempo.",
        topicos: ["sono", "ciclos de energia", "pausa", "limite sustentavel"],
        aula: {
          objetivo: "Ao terminar, voce organiza a semana pela sua energia, e nao apenas pelos horarios livres.",
          blocos: [
            { t: "texto", v: "Tempo livre na agenda nao significa capacidade de trabalhar bem. Duas horas as 16h de uma sexta-feira nao rendem como duas horas as 9h de uma terca. Planejar so por tempo ignora metade do problema." },
            { t: "destaque", v: "Trabalho dificil no horario de maior energia. Trabalho mecanico no horario de menor. Inverter isso desperdicia as duas coisas." },
            { t: "subtitulo", v: "Sono nao e variavel de ajuste" },
            { t: "texto", v: "Dormir menos para render mais funciona por poucos dias e cobra depois, em erro, irritabilidade e decisao ruim. Para quem trabalha com analise e com pessoas, sono insuficiente ataca exatamente as duas capacidades centrais." },
            { t: "subtitulo", v: "Pausa faz parte do trabalho" },
            { t: "lista", v: [
              "Pausa curta a cada noventa minutos sustenta a atencao ao longo do dia.",
              "Pausa de verdade e sair da tela; rolar rede social nao descansa.",
              "Almoco na frente do computador rouba a unica recuperacao longa do dia.",
              "Caminhar de dez minutos costuma resolver travamento em problema dificil."
            ] },
            { t: "subtitulo", v: "Limite sustentavel" },
            { t: "texto", v: "Semana de 60 horas por um mes e possivel. Por seis meses, produz erro, rotatividade e adoecimento. Quem lidera precisa saber a diferenca entre um esforco concentrado com fim marcado e um ritmo que virou norma sem ninguem decidir." },
            { t: "aviso", v: "Se todo mes tem uma semana de esforco excepcional, o excepcional virou o normal, e o problema nao e de esforco: e de dimensionamento ou de priorizacao." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce reserva as sextas a tarde para estudar, porque e o horario mais livre da agenda. Em dois meses, quase nao avancou, e conclui que falta disciplina." },
              { t: "texto", v: "O horario livre era o de menor energia da semana. Passar o estudo para trinta minutos de terca de manha, antes do expediente comecar de fato, resolveu o que dois meses de forca de vontade nao resolveram." }
            ]
          },
          resumo: [
            "Tempo livre nao e igual a capacidade de trabalhar bem.",
            "Sono e insumo do trabalho analitico, nao luxo.",
            "Pausa de verdade e sair da tela.",
            "Esforco excepcional todo mes virou norma."
          ],
          aplicar: [
            "Mapeie por uma semana em que horarios voce rende mais.",
            "Mova sua atividade de estudo para o horario de maior energia.",
            "Faca uma pausa longe da tela a cada noventa minutos por tres dias."
          ]
        },
        itens: [
          { id: "desenvolvimento.m5.i1", tipo: "externo", titulo: "Sono e desempenho cognitivo",
            fonte: "TED, Matt Walker", url: "https://www.ted.com/talks/matt_walker_sleep_is_your_superpower", h: 1 },
          { id: "desenvolvimento.m5.i2", tipo: "externo", titulo: "Gestao de energia no trabalho",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/leadership/", h: 2 },
          { id: "desenvolvimento.m5.i3", tipo: "pratica",
            titulo: "Mapear por uma semana os horarios de maior e menor energia", h: 4 },
          { id: "desenvolvimento.m5.i4", tipo: "entregavel",
            titulo: "Semana reorganizada com as tarefas dificeis no horario de maior energia", h: 3 }
        ],
        exercicios: [
          { id: "desenvolvimento.m5.e1", tipo: "reflexao",
            enunciado: "Avalie seu ritmo atual.",
            perguntas: [
              "Em quais horarios da semana voce consegue trabalho dificil, e o que esta agendado neles hoje?",
              "Quantas semanas dos ultimos seis meses foram de esforco excepcional?",
              "O que precisaria mudar na priorizacao para que isso deixasse de ser recorrente?"
            ],
            minimoCaracteres: 300 }
        ]
      }
    ]
  });

  /* ===================================================================== F3 */
  fases.push({
    id: "desenvolvimento.f3",
    n: 3,
    nome: "Aprender a aprender",
    cor: "--f3",
    modulos: [
      {
        id: "desenvolvimento.m6",
        n: 6,
        titulo: "Metacognicao",
        h: 12,
        objetivo: "Saber o que voce realmente sabe, em vez do que parece saber.",
        topicos: ["ilusao de competencia", "autoavaliacao", "dificuldade desejavel", "transferencia"],
        aula: {
          objetivo: "Ao terminar, voce distingue reconhecer de saber fazer, e testa isso antes de considerar um assunto aprendido.",
          blocos: [
            { t: "texto", v: "Assistir a uma aula e ficar com a sensacao de que entendeu tudo e a experiencia mais comum e mais enganosa do estudo adulto. Reconhecer um conteudo e facil; reproduzi-lo sem consulta e outra coisa." },
            { t: "destaque", v: "Se voce nao consegue explicar sem olhar o material, voce reconhece o assunto, mas nao sabe fazer." },
            { t: "subtitulo", v: "A ilusao de competencia" },
            { t: "texto", v: "Reler, grifar e assistir de novo aumentam a sensacao de dominio sem aumentar o dominio. Sao atividades passivas: o conteudo passa pelos olhos e a facilidade e confundida com aprendizado." },
            { t: "tabela", cab: ["Parece estudo", "E estudo"], linhas: [
              ["Reler o material", "fechar o material e escrever o que lembra"],
              ["Grifar", "reformular com as proprias palavras"],
              ["Assistir de novo", "resolver um exercicio sem consulta"],
              ["Copiar o codigo da aula", "escrever o codigo do zero, com erro e correcao"]
            ] },
            { t: "subtitulo", v: "Dificuldade desejavel" },
            { t: "texto", v: "O que custa mais na hora fixa melhor. Tentar lembrar antes de conferir, misturar tipos de exercicio em vez de repetir o mesmo, espacar as sessoes: tudo isso torna o estudo mais dificil e o resultado mais duradouro." },
            { t: "subtitulo", v: "Teste de transferencia" },
            { t: "texto", v: "Voce so sabe quando consegue usar em um contexto diferente do que aprendeu. Aprendeu media movel numa aula de series temporais? Aplique no seu dado de vendas. Se travar, o aprendizado estava preso ao exemplo." },
            { t: "aviso", v: "Cuidado com o vies de conclusao rapida: quando o exercicio sai de primeira, e comum concluir que o assunto esta dominado. Refaca dois dias depois, sem consulta, para saber." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce assistiu a doze horas de aula sobre regressao e se sentiu confortavel. Duas semanas depois, diante do dado real, nao sabia como comecar." },
              { t: "texto", v: "O que faltava nao era mais aula. Era ter fechado o material e escrito o passo a passo de memoria, uma vez, no dia seguinte a cada aula. Dez minutos por aula teriam mudado o resultado." }
            ]
          },
          resumo: [
            "Reconhecer nao e saber fazer.",
            "Reler e grifar aumentam a sensacao, nao o dominio.",
            "O que custa mais na hora fixa melhor.",
            "So sabe quem usa em contexto diferente do aprendido."
          ],
          aplicar: [
            "Depois da proxima aula, feche tudo e escreva o que lembra, por cinco minutos.",
            "Refaca em dois dias um exercicio que saiu de primeira.",
            "Aplique um conceito novo em um dado do seu trabalho."
          ]
        },
        itens: [
          { id: "desenvolvimento.m6.i1", tipo: "externo", titulo: "Learning How to Learn",
            fonte: "Coursera, Barbara Oakley", url: "https://www.coursera.org/learn/learning-how-to-learn", h: 8 },
          { id: "desenvolvimento.m6.i2", tipo: "externo", titulo: "Estrategias de estudo com evidencia",
            fonte: "The Learning Scientists", url: "https://www.learningscientists.org/downloadable-materials", h: 2 },
          { id: "desenvolvimento.m6.i3", tipo: "pratica",
            titulo: "Aplicar o resumo de memoria apos cada aula por duas semanas", h: 2 }
        ],
        exercicios: [
          { id: "desenvolvimento.m6.e1", tipo: "quiz",
            enunciado: "Voce leu tres vezes o capitulo sobre funcoes de janela e se sente seguro. Qual e a melhor forma de verificar se aprendeu?",
            alternativas: [
              { v: "Ler mais uma vez, com atencao", correta: false,
                explicacao: "Releitura aumenta a familiaridade e a sensacao de dominio, sem testar a capacidade de reproduzir." },
              { v: "Escrever do zero, sem consultar, uma consulta que resolva um problema do seu trabalho", correta: true,
                explicacao: "Junta recuperacao sem consulta com transferencia para contexto novo, que sao os dois testes que realmente informam." },
              { v: "Explicar o capitulo para um colega, com o material aberto", correta: false,
                explicacao: "Explicar e otimo; com o material aberto, o teste perde a parte que importa." },
              { v: "Fazer o exercicio do proprio capitulo de novo", correta: false,
                explicacao: "Exercicio ja visto testa memoria recente daquele exemplo, nao a capacidade de aplicar em outro." }
            ] }
        ]
      },
      {
        id: "desenvolvimento.m7",
        n: 7,
        titulo: "Revisao espacada e recuperacao ativa",
        h: 12,
        objetivo: "Fixar o que estudou usando intervalos crescentes, em vez de repeticao seguida.",
        topicos: ["curva do esquecimento", "intervalos", "flashcard", "pratica intercalada"],
        aula: {
          objetivo: "Ao terminar, voce mantem uma rotina de revisao que impede o esquecimento do que ja estudou.",
          blocos: [
            { t: "texto", v: "O esquecimento e rapido e previsivel. Sem revisao, boa parte do que voce estuda hoje some em uma semana. Com revisao em intervalos crescentes, o mesmo conteudo se sustenta por anos, com pouco tempo total investido." },
            { t: "destaque", v: "Revisar no momento em que voce esta quase esquecendo e o que fixa. Revisar o que ainda esta fresco quase nao produz efeito." },
            { t: "subtitulo", v: "Como funciona o intervalo" },
            { t: "texto", v: "Um cartao novo volta no dia seguinte. Se voce acertou, volta em seis dias. Depois, o intervalo cresce multiplicado por um fator, que aumenta com o acerto e diminui com o erro. Errar reinicia o ciclo, e isso e parte do metodo, nao falha." },
            { t: "codigo", lang: "text", v: "Cartao novo, acertou      -> revisar em 1 dia\nAcertou de novo           -> revisar em 6 dias\nAcertou                   -> 6 x fator (inicial 2,5) = 15 dias\nAcertou                   -> 15 x 2,6 = 39 dias\nErrou em qualquer ponto   -> volta para 1 dia, fator cai 0,2" },
            { t: "texto", v: "E exatamente esse algoritmo que o Portal do Conhecimento usa nos flashcards. Voce nao precisa calcular nada: a fila do dia ja chega ordenada." },
            { t: "subtitulo", v: "Recuperacao ativa" },
            { t: "texto", v: "O ganho nao esta em ver a resposta, esta no esforco de tentar lembrar antes de ver. Cartao virado rapido demais nao ensina. Tente lembrar por alguns segundos, mesmo quando parecer que nao sabe." },
            { t: "subtitulo", v: "O que vira cartao" },
            { t: "lista", v: [
              "Definicao que voce precisa usar sem consultar.",
              "Diferenca entre dois conceitos parecidos.",
              "Erro que voce ja cometeu e nao quer repetir.",
              "Comando ou sintaxe que voce esquece sempre.",
              "Numero de referencia do seu negocio."
            ] },
            { t: "aviso", v: "Nao transforme a aula inteira em cartao. Cartao demais vira fila impossivel e o metodo e abandonado. Cinco a dez cartoes por aula, sobre o que realmente importa lembrar." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce estudou funcoes de janela em janeiro e, em abril, precisou consultar a documentacao para escrever um ROW_NUMBER simples. As duas semanas de estudo renderam pouco." },
              { t: "texto", v: "Oito cartoes criados durante aquele estudo, revisados por cinco minutos por dia, teriam custado menos de duas horas no trimestre inteiro e mantido o conteudo disponivel." }
            ]
          },
          resumo: [
            "Sem revisao, a maior parte do estudo some em uma semana.",
            "Intervalo crescente e o que fixa; repeticao seguida nao.",
            "O ganho esta no esforco de lembrar, nao em ver a resposta.",
            "Cinco a dez cartoes por aula; mais que isso vira abandono."
          ],
          aplicar: [
            "Crie cinco cartoes sobre a ultima aula que voce estudou.",
            "Faca a fila de revisao do dia por cinco dias seguidos.",
            "Transforme em cartao um erro que voce ja cometeu duas vezes."
          ]
        },
        itens: [
          { id: "desenvolvimento.m7.i1", tipo: "externo", titulo: "Pratica de recuperacao e revisao espacada",
            fonte: "The Learning Scientists", url: "https://www.learningscientists.org/downloadable-materials", h: 3 },
          { id: "desenvolvimento.m7.i2", tipo: "externo", titulo: "Algoritmo de repeticao espacada",
            fonte: "SuperMemo", url: "https://super-memory.com/english/ol/sm2.htm", h: 2 },
          { id: "desenvolvimento.m7.i3", tipo: "pratica",
            titulo: "Manter a fila de revisao do portal zerada por duas semanas", h: 4 },
          { id: "desenvolvimento.m7.i4", tipo: "entregavel",
            titulo: "Conjunto de 30 cartoes sobre os assuntos que voce mais esquece", h: 3 }
        ],
        exercicios: [
          { id: "desenvolvimento.m7.e1", tipo: "python",
            enunciado: "Escreva proximo_intervalo(repeticoes, intervalo, fator, acertou): implementa a regra SM-2 simplificada. Erro devolve (0, 1, max(1.3, fator - 0.2)). Acerto: primeira vez 1 dia, segunda 6 dias, depois intervalo vezes fator arredondado.",
            starter: "def proximo_intervalo(repeticoes, intervalo, fator, acertou):\n    pass\n",
            teste: "assert proximo_intervalo(0, 0, 2.5, True) == (1, 1, 2.5)\nassert proximo_intervalo(1, 1, 2.5, True) == (2, 6, 2.5)\nassert proximo_intervalo(2, 6, 2.5, True) == (3, 15, 2.5)\nassert proximo_intervalo(3, 15, 2.5, False) == (0, 1, 2.3)\n",
            gabarito: "def proximo_intervalo(repeticoes, intervalo, fator, acertou):\n    if not acertou:\n        return (0, 1, max(1.3, round(fator - 0.2, 2)))\n    novas = repeticoes + 1\n    if novas == 1:\n        return (1, 1, fator)\n    if novas == 2:\n        return (2, 6, fator)\n    return (novas, round(intervalo * fator), fator)\n",
            dica: "Trate o erro primeiro; depois os dois casos iniciais e so entao a formula geral." }
        ]
      },
      {
        id: "desenvolvimento.m8",
        n: 8,
        titulo: "Leitura eficiente e anotacao",
        h: 12,
        objetivo: "Ler para usar, e nao para terminar o livro.",
        topicos: ["leitura com proposito", "destaque util", "ficha de leitura", "mapa mental"],
        aula: {
          objetivo: "Ao terminar, voce le um livro tecnico extraindo o que vai aplicar, sem precisar ler tudo.",
          blocos: [
            { t: "texto", v: "Livro tecnico nao e romance: nao precisa ser lido do inicio ao fim, na ordem. Precisa responder perguntas que voce tem. Ler com pergunta na cabeca muda completamente o rendimento." },
            { t: "destaque", v: "Antes de abrir o livro, escreva as tres perguntas que voce quer que ele responda. Sem elas, voce le tudo e nao usa nada." },
            { t: "subtitulo", v: "Roteiro de leitura tecnica" },
            { t: "lista", ordenada: true, v: [
              "Leia sumario e conclusao primeiro; descubra a estrutura do argumento.",
              "Escreva suas tres perguntas.",
              "Percorra os capitulos que respondem a elas.",
              "So depois decida se vale ler o resto.",
              "Ao final de cada capitulo util, feche o livro e escreva o que ficou."
            ] },
            { t: "subtitulo", v: "Destaque que serve para alguma coisa" },
            { t: "texto", v: "Destacar meia pagina nao seleciona nada. Destaque util e curto e vem acompanhado de uma nota sua dizendo por que aquilo importa ou onde voce aplicaria. Trecho sem nota, seis meses depois, e um misterio." },
            { t: "subtitulo", v: "Ficha de leitura em quatro campos" },
            { t: "tabela", cab: ["Campo", "Pergunta"], linhas: [
              ["Ideia central", "qual e a tese, em uma frase?"],
              ["O que aprendi", "o que eu nao sabia antes?"],
              ["Onde aplico", "em qual situacao minha isso entra?"],
              ["O que nao entendi", "o que ficou em aberto para investigar?"]
            ] },
            { t: "texto", v: "O campo do que nao entendi e o mais valioso e o mais pulado. Ele vira a lista do proximo estudo e impede que a duvida seja esquecida junto com o livro." },
            { t: "subtitulo", v: "Mapa mental" },
            { t: "texto", v: "Mapa mental serve para enxergar a estrutura do argumento, nao para bonito. Faca depois de ler, de memoria, e so entao confira. Se a estrutura nao sai da cabeca, a leitura foi passiva." },
            { t: "aviso", v: "Abandonar livro no meio e decisao legitima, nao fracasso. Se ele nao responde suas perguntas, terminar por obrigacao custa semanas que outro livro usaria melhor." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um livro de 400 paginas sobre engenharia de dados ficou seis meses na mesa, lido ate a pagina 80, sempre recomecando." },
              { t: "texto", v: "Com tres perguntas escritas antes, foram lidos quatro capitulos em duas semanas, com ficha de leitura de cada um. O resto foi consultado por indice quando surgiu a necessidade. O livro passou a ser util em vez de pendente." }
            ]
          },
          resumo: [
            "Livro tecnico se le por pergunta, nao por ordem.",
            "Destaque sem nota vira misterio.",
            "O campo do que nao entendi vira o proximo estudo.",
            "Abandonar livro que nao responde e decisao, nao fracasso."
          ],
          aplicar: [
            "Escreva tres perguntas antes de abrir o proximo livro.",
            "Preencha a ficha de quatro campos do ultimo capitulo que leu.",
            "Faca o mapa mental de memoria antes de conferir com o texto."
          ]
        },
        itens: [
          { id: "desenvolvimento.m8.i1", tipo: "externo", titulo: "Como ler um livro tecnico",
            fonte: "The Learning Scientists", url: "https://www.learningscientists.org/blog", h: 2 },
          { id: "desenvolvimento.m8.i2", tipo: "externo", titulo: "Acervo de livros de dominio publico",
            fonte: "Internet Archive", url: "https://archive.org/details/texts", h: 2 },
          { id: "desenvolvimento.m8.i3", tipo: "pratica",
            titulo: "Ler um livro tecnico pelo roteiro de cinco passos", h: 6 },
          { id: "desenvolvimento.m8.i4", tipo: "entregavel",
            titulo: "Ficha de leitura completa de um livro, com mapa mental", h: 2 }
        ],
        exercicios: [
          { id: "desenvolvimento.m8.e1", tipo: "reflexao",
            enunciado: "Planeje sua proxima leitura tecnica.",
            perguntas: [
              "Qual livro esta parado na sua mesa, e por que voce parou?",
              "Quais tres perguntas voce quer que ele responda?",
              "Quais capitulos provavelmente respondem essas perguntas?",
              "Se ele nao responder, o que voce faz?"
            ],
            minimoCaracteres: 300 }
        ]
      }
    ]
  });

  /* ===================================================================== F4 */
  fases.push({
    id: "desenvolvimento.f4",
    n: 4,
    nome: "Emocoes e carreira",
    cor: "--f4",
    modulos: [
      {
        id: "desenvolvimento.m9",
        n: 9,
        titulo: "Inteligencia emocional e resiliencia",
        h: 15,
        objetivo: "Manter clareza de julgamento sob pressao e se recuperar de reves.",
        topicos: ["reconhecer emocao", "pausa antes da resposta", "critica", "recuperacao"],
        aula: {
          objetivo: "Ao terminar, voce reconhece a propria reacao antes de agir sob ela, e trata critica sem se desorganizar.",
          blocos: [
            { t: "texto", v: "Quem lidera decide sob pressao e recebe critica com plateia. Nao existe carreira de lideranca sem isso. A questao nao e deixar de sentir, e nao decidir enquanto a reacao ainda esta no comando." },
            { t: "subtitulo", v: "Nomear reduz" },
            { t: "texto", v: "Perceber e nomear o que esta acontecendo, mesmo internamente, ja diminui a intensidade. Estou irritado com esse e-mail e uma frase que devolve parte do controle. Reagir sem nomear e agir no automatico." },
            { t: "destaque", v: "A regra mais util da carreira: nunca responda e-mail dificil no mesmo minuto. Escreva a resposta, salve como rascunho e releia em duas horas." },
            { t: "subtitulo", v: "Critica" },
            { t: "tabela", cab: ["Tipo", "Como tratar"], linhas: [
              ["Critica com fato", "aceite, agradeca e corrija"],
              ["Critica sem fato", "peca exemplo especifico"],
              ["Critica em publico", "reconheca o ponto, aprofunde depois em particular"],
              ["Critica injusta e repetida", "trate como conflito, nao como retorno"]
            ] },
            { t: "subtitulo", v: "Reves faz parte" },
            { t: "texto", v: "Projeto cancelado, promocao que nao veio, decisao revertida pela diretoria. A recuperacao passa por separar o que estava sob seu controle do que nao estava, e por extrair uma licao concreta em vez de uma conclusao sobre voce mesmo." },
            { t: "texto", v: "Perdi porque a diretoria mudou a prioridade e uma frase util. Nao sou bom nisso e uma conclusao que nao ajuda em nada e que costuma ser falsa." },
            { t: "aviso", v: "Isolamento piora tudo. Ter duas ou tres pessoas fora da sua cadeia hierarquica com quem conversar sobre trabalho e infraestrutura de carreira, nao luxo." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um diretor questiona em publico a qualidade do dado da sua area, com um exemplo que estava errado. A vontade e responder na hora, com o dado na mao." },
              { t: "texto", v: "Reconhecer o ponto na reuniao e levar a apuracao completa no dia seguinte, por escrito, resolveu melhor: o exemplo dele nao se sustentou, e voce ficou com a posicao de quem apura em vez de quem se defende." }
            ]
          },
          resumo: [
            "Nomear a reacao ja reduz a intensidade.",
            "Nunca responda e-mail dificil no mesmo minuto.",
            "Critica sem fato pede exemplo, nao defesa.",
            "Isolamento piora tudo; rede fora da hierarquia e infraestrutura."
          ],
          aplicar: [
            "Na proxima mensagem que gerar reacao, escreva a resposta e espere duas horas.",
            "Peca um exemplo especifico na proxima critica generica que receber.",
            "Liste duas pessoas fora da sua hierarquia com quem voce pode conversar."
          ]
        },
        itens: [
          { id: "desenvolvimento.m9.i1", tipo: "externo", titulo: "O poder da vulnerabilidade",
            fonte: "TED, Brene Brown", url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability", h: 1 },
          { id: "desenvolvimento.m9.i2", tipo: "externo", titulo: "Lidando com pressao e conflito",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/conflict-resolution/", h: 3 },
          { id: "desenvolvimento.m9.i3", tipo: "pratica",
            titulo: "Registrar por duas semanas as situacoes que geraram reacao forte", h: 5 },
          { id: "desenvolvimento.m9.i4", tipo: "entregavel",
            titulo: "Conversa com uma pessoa da sua rede sobre um reves recente", h: 4 }
        ],
        exercicios: [
          { id: "desenvolvimento.m9.e1", tipo: "reflexao",
            enunciado: "Analise sua reacao sob pressao.",
            perguntas: [
              "Qual foi a ultima vez que voce respondeu algo no calor do momento e se arrependeu?",
              "Que critica recente voce recebeu, e qual parte dela tinha fato?",
              "Quem sao as duas ou tres pessoas com quem voce conversa sobre trabalho fora da sua hierarquia?"
            ],
            minimoCaracteres: 350 }
        ]
      },
      {
        id: "desenvolvimento.m10",
        n: 10,
        titulo: "Carreira, marca pessoal e negociacao",
        h: 15,
        objetivo: "Conduzir a propria carreira em vez de esperar que ela aconteca.",
        topicos: ["direcao", "visibilidade", "rede", "negociacao salarial"],
        aula: {
          objetivo: "Ao terminar, voce tem uma direcao de carreira escrita e um plano de visibilidade do seu trabalho.",
          blocos: [
            { t: "texto", v: "Carreira sem direcao escrita e conduzida pelas oportunidades que aparecem. Algumas sao boas; a maioria e apenas o que a empresa precisava naquele mes." },
            { t: "subtitulo", v: "Direcao, nao destino fixo" },
            { t: "texto", v: "Nao e preciso saber o cargo daqui a dez anos. E preciso saber a direcao: mais profundidade tecnica ou mais gestao, mais analise ou mais engenharia, empresa grande ou pequena. A direcao filtra as oportunidades." },
            { t: "destaque", v: "Trabalho bom que ninguem conhece nao gera oportunidade. Visibilidade nao e autopromocao: e permitir que o resultado seja atribuido a quem o fez." },
            { t: "subtitulo", v: "Visibilidade honesta" },
            { t: "lista", v: [
              "Resumo periodico das entregas da area, com nomes de quem fez.",
              "Apresentar o proprio trabalho quando houver espaco, sem esperar convite.",
              "Escrever o que aprendeu, mesmo que so internamente.",
              "Deixar registrado o resultado, com numero, e nao so a atividade.",
              "Dar credito a outras pessoas; quem distribui credito e lembrado."
            ] },
            { t: "subtitulo", v: "Rede se constroi antes de precisar" },
            { t: "texto", v: "Procurar contato so quando esta desempregado ou infeliz e tarde e desconfortavel. Rede se mantem com pouca coisa: responder mensagem, ajudar quando pedem, aparecer em um encontro por trimestre, manter contato com ex-colegas." },
            { t: "subtitulo", v: "Negociacao salarial" },
            { t: "lista", ordenada: true, v: [
              "Pesquise faixa de mercado antes, com fonte.",
              "Liste seus resultados com numero, nao atividades.",
              "Peca reuniao especifica; nao misture com avaliacao de rotina.",
              "Diga um numero, e nao uma faixa: faixa vira o piso.",
              "Se a resposta for nao, pergunte o que precisaria mudar e ate quando."
            ] },
            { t: "aviso", v: "Nao use proposta externa como instrumento de negociacao se voce nao esta disposto a aceita-la. O blefe funciona uma vez e custa a relacao quando descoberto." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce automatizou o fechamento, reduziu o tempo de tres dias para quatro horas e ninguem fora da area soube. Meses depois, uma vaga interna de coordenacao foi para alguem com trabalho mais visivel." },
              { t: "texto", v: "Nao era questao de merito. Era que o resultado nunca tinha sido apresentado a quem decidia. Um resumo trimestral de meia pagina, com numeros, teria mudado a informacao disponivel na hora da decisao." }
            ]
          },
          resumo: [
            "Direcao escrita filtra oportunidade; sem ela, a empresa escolhe.",
            "Trabalho invisivel nao gera oportunidade.",
            "Rede se constroi antes de precisar.",
            "Em negociacao, leve numero e resultado, nao esforco."
          ],
          aplicar: [
            "Escreva sua direcao de carreira em tres frases.",
            "Monte o resumo trimestral das suas entregas, com numeros.",
            "Retome contato com duas pessoas da sua rede nesta semana."
          ]
        },
        itens: [
          { id: "desenvolvimento.m10.i1", tipo: "externo", titulo: "Negociacao baseada em interesses",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/negotiation-skills-daily/", h: 4 },
          { id: "desenvolvimento.m10.i2", tipo: "externo", titulo: "Pesquisa salarial de tecnologia no Brasil",
            fonte: "Stack Overflow Survey", url: "https://survey.stackoverflow.co/", h: 2 },
          { id: "desenvolvimento.m10.i3", tipo: "entregavel",
            titulo: "Direcao de carreira escrita e resumo trimestral de resultados com numeros", h: 5 },
          { id: "desenvolvimento.m10.i4", tipo: "entregavel",
            titulo: "Perfil profissional atualizado ligando cada competencia a um resultado", h: 4 }
        ],
        exercicios: [
          { id: "desenvolvimento.m10.e1", tipo: "reflexao",
            enunciado: "Defina a direcao da sua carreira.",
            perguntas: [
              "Em que direcao voce quer ir: mais profundidade tecnica ou mais gestao? Por que?",
              "Quais tres resultados seus dos ultimos doze meses podem ser descritos com um numero?",
              "Quem, fora da sua area, sabe desses resultados?",
              "O que voce precisaria demonstrar nos proximos seis meses para a proxima conversa de carreira?"
            ],
            minimoCaracteres: 450 }
        ]
      }
    ]
  });


  window.PDC.trilhas.registrar({
    id: "desenvolvimento",
    nome: "Desenvolvimento pessoal",
    desc: "Atencao, habitos, metodo de estudo e carreira. E a trilha que sustenta todas as outras.",
    icone: "lampada",
    cor1: "--t-desenvolvimento",
    cor2: "--t-desenvolvimento",
    tipoPratica: "reflexao",
    horas: 120,
    marcos: [
      { moduloId: "desenvolvimento.m8", rotulo: "Metodo proprio de estudo",
        texto: "Ao concluir a Fase 3 voce estuda com metodo: revisao espacada, recuperacao ativa e leitura que fixa. As outras trilhas passam a render mais." }
    ],
    fases: fases
  });
})();
