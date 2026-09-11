/* gestao.js — trilha Gestao de area de dados.
   4 fases, 12 modulos, 173 h.
   Pratica: quiz de cenario, reflexao e entregaveis que viram documento de gestao. */

(function () {
  "use strict";

  var fases = [];

  /* ===================================================================== F1 */
  fases.push({
    id: "gestao.f1",
    n: 1,
    nome: "Fundamentos do gestor",
    cor: "--f1",
    modulos: [
      {
        id: "gestao.m1",
        n: 1,
        titulo: "O papel do gestor",
        h: 12,
        objetivo: "Separar o que so voce pode fazer do que voce faz por habito.",
        topicos: ["responsabilidade", "resultado do time", "agenda", "armadilha do tecnico"],
        aula: {
          objetivo: "Ao terminar, voce identifica quais atividades da sua semana so voce pode fazer.",
          blocos: [
            { t: "texto", v: "Gestor e avaliado pelo resultado de um grupo, nao pelo proprio. Isso parece obvio e produz a maior crise da transicao: as atividades que davam sensacao de produtividade agora sao justamente as que voce deveria estar delegando." },
            { t: "subtitulo", v: "O que so voce pode fazer" },
            { t: "lista", v: [
              "Definir prioridade quando duas areas pedem a mesma pessoa.",
              "Dizer nao para demanda que nao cabe, e assumir esse nao.",
              "Contratar, desenvolver e, quando preciso, desligar.",
              "Representar a area onde ela nao esta presente.",
              "Proteger o time do ruido que nao gera resultado."
            ] },
            { t: "destaque", v: "Se voce esta fazendo algo que outra pessoa do time faria em uma semana de aprendizado, provavelmente esta no lugar errado da sua agenda." },
            { t: "subtitulo", v: "A armadilha do gestor tecnico" },
            { t: "texto", v: "Voce escreve a consulta mais rapido que qualquer um do time. Escrever a consulta e o que da prazer, resultado imediato e reconhecimento. Enquanto isso, a priorizacao do trimestre fica sem dono e o analista que ia aprender aquilo continua sem aprender." },
            { t: "tabela", cab: ["Sinal", "O que costuma indicar"], linhas: [
              ["Sua agenda esta cheia de tarefa tecnica", "voce nao delegou o que devia"],
              ["Todo mundo espera sua aprovacao", "faltou combinar autonomia"],
              ["Voce e o unico que sabe algo critico", "risco concentrado, e o time nao cresce"],
              ["Voce trabalha mais que todos", "provavelmente esta absorvendo o que deveria priorizar"]
            ] },
            { t: "subtitulo", v: "Continuar tecnico o suficiente" },
            { t: "texto", v: "Nao se trata de abandonar a tecnica. Um gestor de dados que nao entende o trabalho perde a capacidade de estimar, de avaliar qualidade e de defender o time. O ponto de equilibrio e manter profundidade para julgar, sem ser o gargalo da execucao." },
            { t: "aviso", v: "Ser o unico que sabe operar algo critico nao e seguranca de emprego. E risco para a empresa, e impede voce de tirar ferias, de ser promovido e de mudar de area." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce continua responsavel pelo fechamento mensal porque e o mais rapido e ninguem mais conhece as regras. Sao tres dias por mes, sempre os mesmos, sempre com prazo apertado." },
              { t: "texto", v: "Sao 36 dias por ano em que voce nao esta priorizando, desenvolvendo ninguem nem conversando com a diretoria. E, se voce adoecer no dia 28, ninguem fecha." }
            ]
          },
          resumo: [
            "Gestor e medido pelo resultado do grupo.",
            "Cinco atividades so podem ser feitas por voce; o resto e candidato a delegacao.",
            "Ser o unico que sabe e risco, nao seguranca.",
            "Mantenha profundidade tecnica para julgar, sem ser gargalo."
          ],
          aplicar: [
            "Anote sua semana em blocos de uma hora e marque o que so voce poderia ter feito.",
            "Escolha a atividade tecnica recorrente mais cara e planeje passa-la em 60 dias."
          ]
        },
        itens: [
          { id: "gestao.m1.i1", tipo: "externo", titulo: "Manager Tools — fundamentos do papel",
            fonte: "Manager Tools", url: "https://www.manager-tools.com/manager-tools-basics", h: 4 },
          { id: "gestao.m1.i2", tipo: "externo", titulo: "Cursos gratuitos de gestao publica e privada",
            fonte: "Escola Virtual Gov", url: "https://www.escolavirtual.gov.br/", h: 3 },
          { id: "gestao.m1.i3", tipo: "pratica",
            titulo: "Registrar uma semana de agenda em blocos e classificar cada bloco", h: 3 },
          { id: "gestao.m1.i4", tipo: "entregavel",
            titulo: "Plano de transferencia de uma rotina tecnica critica, com prazo", h: 2 }
        ],
        exercicios: [
          { id: "gestao.m1.e1", tipo: "reflexao",
            enunciado: "Analise a sua semana real.",
            perguntas: [
              "Quais atividades da sua ultima semana so voce poderia ter feito?",
              "Qual atividade tecnica recorrente ocupa mais tempo seu e poderia ser de outra pessoa?",
              "O que acontece com a area se voce ficar duas semanas fora, sem acesso?"
            ],
            minimoCaracteres: 350 }
        ]
      },
      {
        id: "gestao.m2",
        n: 2,
        titulo: "Prioridade e delegacao",
        h: 15,
        objetivo: "Decidir o que nao sera feito, e sustentar essa decisao.",
        topicos: ["criterio de priorizacao", "custo do sim", "fila unica", "dizer nao"],
        aula: {
          objetivo: "Ao terminar, voce tem um criterio explicito de priorizacao que pode ser mostrado a qualquer solicitante.",
          blocos: [
            { t: "texto", v: "Priorizar nao e escolher o que fazer primeiro. E escolher o que nao sera feito. Enquanto a lista tiver tudo com prioridade alta, ninguem priorizou nada e quem decide de fato e quem grita mais alto." },
            { t: "destaque", v: "Todo sim e um nao para outra coisa. A diferenca e que o nao costuma ser invisivel, e quem paga por ele nao esta na sala." },
            { t: "subtitulo", v: "Criterio explicito" },
            { t: "texto", v: "Escreva o criterio, divulgue e aplique na frente das pessoas. Criterio escrito transforma discussao de poder em discussao de fato, e permite que o solicitante entenda por que ficou em quinto lugar." },
            { t: "tabela", cab: ["Dimensao", "Pergunta"], linhas: [
              ["Valor", "quanto muda em resultado ou risco se for feito?"],
              ["Urgencia real", "o que acontece se sair daqui a 30 dias?"],
              ["Esforco", "quantos dias de qual pessoa?"],
              ["Reversibilidade", "e facil desfazer se estiver errado?"],
              ["Dependencia", "isso destrava outras coisas?"]
            ] },
            { t: "subtitulo", v: "Fila unica" },
            { t: "texto", v: "Varias filas paralelas por area escondem o conflito, que reaparece na pessoa que atende todas elas. Uma fila unica, visivel, com ordem justificada, expoe a escolha e transfere a discussao para quem tem poder de resolve-la." },
            { t: "subtitulo", v: "Como dizer nao sem virar obstaculo" },
            { t: "lista", v: [
              "Nao diga apenas nao: mostre a fila e pergunte o que sai para isso entrar.",
              "Ofereca uma versao menor que caiba antes.",
              "Diga quando seria possivel, com data.",
              "Registre o pedido, para nao parecer descarte.",
              "Se a resposta e nao definitivo, diga isso com clareza, sem deixar em aberto."
            ] },
            { t: "aviso", v: "Aceitar tudo e a forma mais rapida de perder credibilidade. Quem aceita tudo atrasa tudo, e a area passa a ser lembrada pelos atrasos, nao pelas entregas." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Tres diretorias pedem relatorios na mesma semana, todos urgentes. Voce aceita os tres, o time trabalha ate tarde e os tres saem com um dia de atraso e com erro." },
              { t: "texto", v: "Com uma fila unica visivel, a conversa muda de figura: os tres pedidos aparecem lado a lado com o esforco estimado, e a decisao de ordem sobe para quem tem autoridade sobre as tres areas. Voce deixa de ser o gargalo e passa a ser quem organiza a escolha." }
            ]
          },
          resumo: [
            "Priorizar e decidir o que nao sera feito.",
            "Criterio escrito transforma disputa de poder em conversa de fato.",
            "Fila unica expoe o conflito onde ele pode ser resolvido.",
            "Aceitar tudo destroi a credibilidade da area."
          ],
          aplicar: [
            "Escreva o criterio de priorizacao da sua area em cinco linhas e divulgue.",
            "Monte a fila unica das demandas atuais, com esforco estimado.",
            "Na proxima demanda urgente, pergunte o que sai da fila para ela entrar."
          ]
        },
        itens: [
          { id: "gestao.m2.i1", tipo: "externo", titulo: "Priorizacao e gestao de demanda",
            fonte: "Atlassian", url: "https://www.atlassian.com/agile/product-management/prioritization-framework", h: 3 },
          { id: "gestao.m2.i2", tipo: "externo", titulo: "Custo da demora e priorizacao economica",
            fonte: "Scaled Agile", url: "https://framework.scaledagile.com/wsjf/", h: 3 },
          { id: "gestao.m2.i3", tipo: "entregavel",
            titulo: "Criterio de priorizacao escrito e fila unica publicada para as areas", h: 9 }
        ],
        exercicios: [
          { id: "gestao.m2.e1", tipo: "quiz",
            enunciado: "Um diretor pede um relatorio urgente que consumiria a semana inteira do seu unico analista de SQL, ja alocado num projeto com prazo. Qual e a melhor resposta?",
            alternativas: [
              { v: "Aceitar e pedir que o time compense as horas depois", correta: false,
                explicacao: "Transfere o custo para o time, atrasa o projeto em silencio e ensina que urgencia sempre fura fila." },
              { v: "Mostrar o que esta na fila, o custo em dias e perguntar o que ele prefere adiar", correta: true,
                explicacao: "Devolve a decisao para quem tem autoridade, com informacao. O nao nao e seu: e uma consequencia visivel da escolha dele." },
              { v: "Recusar por causa do projeto em andamento", correta: false,
                explicacao: "Pode estar certo no merito e coloca voce como obstaculo, sem dar ao diretor a chance de decidir." },
              { v: "Fazer voce mesmo, fora do horario", correta: false,
                explicacao: "Resolve hoje, esconde o problema de capacidade e garante que o pedido se repita." }
            ] }
        ]
      },
      {
        id: "gestao.m3",
        n: 3,
        titulo: "Gestao do proprio tempo",
        h: 12,
        objetivo: "Proteger tempo para o trabalho que so voce pode fazer.",
        topicos: ["agenda", "reuniao", "interrupcao", "delegacao de decisao"],
        aula: {
          objetivo: "Ao terminar, voce tem blocos protegidos na agenda e menos reunioes sem funcao.",
          blocos: [
            { t: "texto", v: "A agenda de quem lidera enche sozinha. Se voce nao decidir o que ocupa o seu tempo, outras pessoas decidem, e elas otimizam o problema delas, nao o seu." },
            { t: "subtitulo", v: "Reuniao" },
            { t: "lista", v: [
              "Sem pauta enviada antes, nao ha reuniao.",
              "Sem decisao a tomar nem informacao a alinhar, cabe em uma mensagem.",
              "Quem nao decide nem contribui nao precisa estar presente, so informado.",
              "Trinta minutos como padrao; uma hora exige justificativa.",
              "Toda reuniao termina com combinado, responsavel e data."
            ] },
            { t: "destaque", v: "Recusar uma reuniao com educacao e explicando o motivo e uma habilidade de gestao, nao uma falta." },
            { t: "subtitulo", v: "Blocos protegidos" },
            { t: "texto", v: "Trabalho de gestao que exige pensar, como planejamento e analise de capacidade, nao acontece em intervalos de quinze minutos entre reunioes. Marque blocos de duas horas na propria agenda e trate como compromisso com terceiro." },
            { t: "subtitulo", v: "Interrupcao" },
            { t: "texto", v: "Estar disponivel o tempo todo parece boa lideranca e produz um time que nao decide nada sozinho. Combine janelas de disponibilidade e criterios claros de quando interromper. Emergencia de verdade interrompe; duvida pode esperar duas horas." },
            { t: "aviso", v: "Se toda decisao passa por voce, o gargalo e voce. Delegue a decisao, nao apenas a tarefa: defina limites de valor, risco e escopo em que a pessoa decide sozinha." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Sua agenda tem 28 horas semanais de reuniao. Sobram 12 horas fragmentadas para planejar, acompanhar pessoas e pensar na area. O planejamento trimestral sempre acaba sendo feito de madrugada, no ultimo dia." },
              { t: "texto", v: "Ao listar as reunioes, sete eram informativas e poderiam ser um resumo escrito. Recusar essas sete devolveu seis horas por semana, e o planejamento passou a caber no expediente." }
            ]
          },
          resumo: [
            "Se voce nao decide sua agenda, outros decidem por voce.",
            "Reuniao sem pauta e sem decisao cabe numa mensagem.",
            "Trabalho de pensar precisa de bloco protegido.",
            "Delegue decisao, nao so tarefa."
          ],
          aplicar: [
            "Liste suas reunioes recorrentes e marque as que poderiam ser um resumo escrito.",
            "Reserve dois blocos de duas horas por semana e defenda-os.",
            "Defina em que faixa de valor e risco cada pessoa decide sem consultar voce."
          ]
        },
        itens: [
          { id: "gestao.m3.i1", tipo: "externo", titulo: "Reunioes eficazes",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 3 },
          { id: "gestao.m3.i2", tipo: "externo", titulo: "Trabalho concentrado e agenda",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/leadership/", h: 3 },
          { id: "gestao.m3.i3", tipo: "entregavel",
            titulo: "Agenda semanal reorganizada com blocos protegidos e reunioes revisadas", h: 6 }
        ],
        exercicios: [
          { id: "gestao.m3.e1", tipo: "quiz",
            enunciado: "Voce e chamado para uma reuniao semanal de uma hora em que apenas ouve informacoes de outra area. Qual a melhor conduta?",
            alternativas: [
              { v: "Continuar indo: e importante manter relacionamento", correta: false,
                explicacao: "Relacionamento se constroi em varias formas, e quatro horas por mes e um preco alto para presenca passiva." },
              { v: "Pedir para receber o resumo escrito e participar apenas quando houver decisao que envolva a sua area", correta: true,
                explicacao: "Preserva a informacao, devolve quatro horas por mes e sinaliza um padrao saudavel de uso de reuniao." },
              { v: "Mandar alguem do time no seu lugar", correta: false,
                explicacao: "Transfere o custo para quem tem menos margem, sem resolver o problema da reuniao." },
              { v: "Parar de ir sem avisar", correta: false,
                explicacao: "Resolve seu tempo e queima relacionamento; o mesmo resultado seria obtido com uma conversa." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F2 */
  fases.push({
    id: "gestao.f2",
    n: 2,
    nome: "Gestao do time de dados",
    cor: "--f2",
    modulos: [
      {
        id: "gestao.m4",
        n: 4,
        titulo: "Rituais e fluxo de demanda",
        h: 15,
        objetivo: "Organizar a entrada e o andamento do trabalho sem burocratizar.",
        topicos: ["entrada unica", "quadro visivel", "rituais minimos", "trabalho nao planejado"],
        aula: {
          objetivo: "Ao terminar, voce tem um fluxo de demanda com entrada unica e um quadro que reflete a realidade.",
          blocos: [
            { t: "texto", v: "Area de dados recebe pedido por e-mail, mensagem, corredor e reuniao. Sem entrada unica, ninguem sabe o tamanho real da fila, e a resposta para quanto tempo leva vira chute." },
            { t: "destaque", v: "Entrada unica nao e burocracia. E a unica forma de mostrar, com numero, que a area recebe mais do que consegue entregar." },
            { t: "subtitulo", v: "O minimo de ritual que funciona" },
            { t: "tabela", cab: ["Ritual", "Frequencia", "Funcao"], linhas: [
              ["Alinhamento curto", "diario ou 3x por semana", "destravar, nao reportar status"],
              ["Priorizacao da fila", "semanal", "decidir o que entra e o que sai"],
              ["Revisao com solicitantes", "quinzenal", "mostrar entregue e proximo"],
              ["Retrospectiva", "mensal", "melhorar o processo, nao as pessoas"]
            ] },
            { t: "subtitulo", v: "Quadro que reflete a realidade" },
            { t: "texto", v: "Quadro com quarenta itens em andamento nao e quadro, e lista de desejos. Limite explicito de trabalho simultaneo por pessoa e o que faz o quadro dizer a verdade e o que expoe o custo de comecar mais uma coisa." },
            { t: "subtitulo", v: "Trabalho nao planejado" },
            { t: "texto", v: "Correcao de carga, duvida urgente e ajuste de painel consomem parte fixa da semana. Se voce planeja 100% da capacidade, o nao planejado atropela o planejado toda semana. Reserve entre 20% e 30% e meca quanto realmente e usado." },
            { t: "aviso", v: "Nao adote cerimonia so porque tem nome bonito. Ritual que nao muda decisao nenhuma vira teatro, e o time percebe em duas semanas." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A area recebia pedidos por quatro canais. Ninguem sabia dizer quantas demandas existiam, e a diretoria achava que o time estava ocioso porque as entregas nao apareciam." },
              { t: "texto", v: "Uma unica planilha compartilhada, com data de entrada, solicitante e status, mostrou 61 pedidos abertos para tres pessoas. A conversa sobre contratacao aconteceu na semana seguinte, com dado em vez de percepcao." }
            ]
          },
          resumo: [
            "Sem entrada unica, o tamanho da fila e chute.",
            "Limite de trabalho simultaneo faz o quadro dizer a verdade.",
            "Reserve capacidade para o nao planejado, ele existe.",
            "Ritual que nao muda decisao vira teatro."
          ],
          aplicar: [
            "Crie uma entrada unica, mesmo que seja uma planilha compartilhada.",
            "Meca por duas semanas quanto da capacidade vai para o nao planejado.",
            "Estabeleca limite de itens em andamento por pessoa."
          ]
        },
        itens: [
          { id: "gestao.m4.i1", tipo: "externo", titulo: "Kanban e limite de trabalho em andamento",
            fonte: "Atlassian", url: "https://www.atlassian.com/agile/kanban", h: 4 },
          { id: "gestao.m4.i2", tipo: "externo", titulo: "Retrospectivas que funcionam",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook/plays/retrospective", h: 2 },
          { id: "gestao.m4.i3", tipo: "entregavel",
            titulo: "Fluxo de demanda com entrada unica implantado e comunicado as areas", h: 9 }
        ],
        exercicios: [
          { id: "gestao.m4.e1", tipo: "quiz",
            enunciado: "Seu quadro tem 38 itens em andamento para 4 pessoas. Qual e a primeira acao?",
            alternativas: [
              { v: "Cobrar velocidade nas entregas", correta: false,
                explicacao: "O problema nao e ritmo, e excesso de trabalho comecado ao mesmo tempo. Cobrar aumenta a troca de contexto e piora." },
              { v: "Definir limite de itens simultaneos por pessoa e concluir antes de comecar novos", correta: true,
                explicacao: "Trabalho comecado e trabalho sem valor entregue. Limitar o simultaneo reduz troca de contexto e faz as entregas aparecerem." },
              { v: "Dividir o quadro por area solicitante", correta: false,
                explicacao: "Esconde o conflito em varias filas e mantem o mesmo volume sobre as mesmas pessoas." },
              { v: "Pedir contratacao imediata", correta: false,
                explicacao: "Pode ser necessario depois, mas sem limitar o simultaneo o novo integrante entra no mesmo caos." }
            ] }
        ]
      },
      {
        id: "gestao.m5",
        n: 5,
        titulo: "Capacidade e estimativa",
        h: 15,
        objetivo: "Responder quanto tempo leva com base em historico, nao em otimismo.",
        topicos: ["capacidade real", "estimativa por faixa", "historico", "compromisso"],
        aula: {
          objetivo: "Ao terminar, voce estima em faixas apoiadas no historico da propria area.",
          blocos: [
            { t: "texto", v: "Estimativa em area de dados erra por um motivo estrutural: o trabalho comeca com exploracao, e ninguem consegue estimar bem o que ainda nao conhece. A saida nao e estimar melhor, e estimar diferente." },
            { t: "subtitulo", v: "Capacidade real" },
            { t: "texto", v: "Uma pessoa nao entrega quarenta horas de projeto por semana. Descontando reuniao, suporte, correcao e contexto, sobram entre vinte e vinte e cinco. Planejar com quarenta garante atraso todas as semanas." },
            { t: "tabela", cab: ["Item", "Semanal por pessoa"], linhas: [
              ["Horas contratadas", "40"],
              ["Reunioes e rituais", "-6"],
              ["Suporte e nao planejado", "-8"],
              ["Troca de contexto", "-4"],
              ["Capacidade util", "~22"]
            ] },
            { t: "destaque", v: "Prometer com base em capacidade nominal e prometer atraso. Use a capacidade util, medida na sua area." },
            { t: "subtitulo", v: "Estime em faixa" },
            { t: "texto", v: "Entre 8 e 12 dias e uma estimativa honesta. Dez dias e um numero inventado com aparencia de precisao. A faixa comunica incerteza e permite conversar sobre o que a reduziria." },
            { t: "subtitulo", v: "Historico vence intuicao" },
            { t: "texto", v: "Guarde quanto tempo levou cada tipo de demanda. Depois de vinte registros, a media e a dispersao da sua area valem mais que qualquer tecnica de estimativa. Painel novo simples costuma levar tanto; integracao nova, tanto." },
            { t: "aviso", v: "Nao transforme estimativa em compromisso sem avisar. Se a diretoria vai anunciar a data para o cliente, isso muda tudo: e preciso margem, e a conversa deve deixar isso explicito." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Perguntado sobre um painel novo, voce responde uma semana. O painel leva tres, porque a base tinha duplicidade, o solicitante mudou de ideia e apareceram dois chamados urgentes no meio." },
              { t: "texto", v: "Com historico, a resposta teria sido: paineis desse tipo levaram entre 12 e 18 dias uteis nos ultimos seis meses. Posso reduzir para 8 se voce aceitar a primeira versao sem o detalhamento por vendedor. A conversa muda de tom e a confianca aumenta." }
            ]
          },
          resumo: [
            "Capacidade util e cerca de metade da nominal.",
            "Faixa comunica incerteza; numero unico finge precisao.",
            "Vinte registros de historico valem mais que qualquer tecnica.",
            "Estimativa que vira promessa externa precisa de margem declarada."
          ],
          aplicar: [
            "Meca a capacidade util da sua area por duas semanas.",
            "Comece a registrar o tempo real de cada tipo de demanda.",
            "Na proxima estimativa, responda em faixa e explique o que a reduziria."
          ]
        },
        itens: [
          { id: "gestao.m5.i1", tipo: "externo", titulo: "Estimativa e previsibilidade",
            fonte: "Atlassian", url: "https://www.atlassian.com/agile/project-management/estimation", h: 3 },
          { id: "gestao.m5.i2", tipo: "externo", titulo: "Metricas de fluxo e previsibilidade",
            fonte: "Scaled Agile", url: "https://framework.scaledagile.com/metrics/", h: 3 },
          { id: "gestao.m5.i3", tipo: "entregavel",
            titulo: "Planilha de historico de demandas com tempo real por tipo", h: 9 }
        ],
        exercicios: [
          { id: "gestao.m5.e1", tipo: "python",
            enunciado: "Escreva faixa_estimativa(historico): devolve a tupla (minimo, maximo) usando media menos e mais um desvio padrao, arredondados. Historico com menos de tres registros devolve None.",
            starter: "def faixa_estimativa(historico):\n    pass\n",
            teste: "assert faixa_estimativa([10, 10, 10]) == (10, 10)\nf = faixa_estimativa([8, 10, 12, 14, 16])\nassert f[0] < 12 < f[1]\nassert faixa_estimativa([5, 5]) is None\n",
            gabarito: "def faixa_estimativa(historico):\n    n = len(historico)\n    if n < 3:\n        return None\n    media = sum(historico) / n\n    desvio = (sum((x - media) ** 2 for x in historico) / n) ** 0.5\n    return (round(media - desvio), round(media + desvio))\n",
            dica: "Calcule media e desvio padrao populacional e arredonde no final." }
        ]
      },
      {
        id: "gestao.m6",
        n: 6,
        titulo: "Contratacao e integracao de novatos",
        h: 12,
        objetivo: "Contratar com criterio e fazer a pessoa produzir rapido sem sofrer.",
        topicos: ["perfil", "entrevista", "teste pratico", "primeiros 30 dias"],
        aula: {
          objetivo: "Ao terminar, voce estrutura um processo de selecao justo e um plano de integracao de 30 dias.",
          blocos: [
            { t: "texto", v: "Contratacao errada custa meses de salario, o tempo de todo mundo e a energia do time. Contratacao boa comeca antes da vaga: sabendo qual lacuna real existe." },
            { t: "subtitulo", v: "Perfil antes da vaga" },
            { t: "texto", v: "Descreva o que a pessoa vai fazer nos primeiros seis meses, em atividades concretas. Se isso e dificil de escrever, a vaga ainda nao esta pronta, e o processo vai selecionar por simpatia ou por lista de tecnologias." },
            { t: "destaque", v: "Selecione pelo que a pessoa vai fazer, nao pela lista de ferramentas do curriculo. Ferramenta se aprende; raciocinio e cuidado com dado, muito mais devagar." },
            { t: "subtitulo", v: "Teste pratico justo" },
            { t: "lista", v: [
              "Curto: no maximo duas ou tres horas.",
              "Parecido com o trabalho real, sem pegadinha.",
              "Com dado publico ou ficticio, nunca dado da empresa.",
              "Avaliado com criterio escrito antes, igual para todos.",
              "Com devolutiva, mesmo para quem nao passar."
            ] },
            { t: "subtitulo", v: "Primeiros 30 dias" },
            { t: "tabela", cab: ["Periodo", "Objetivo"], linhas: [
              ["Semana 1", "acessos, contexto do negocio e uma entrega pequena de verdade"],
              ["Semana 2", "acompanhar uma rotina existente com alguem"],
              ["Semana 3", "assumir uma demanda pequena inteira"],
              ["Semana 4", "conversa de ajuste: o que esta claro, o que nao esta"]
            ] },
            { t: "texto", v: "Entrega pequena na primeira semana e o que transforma inseguranca em pertencimento. Duas semanas so lendo documentacao produzem o efeito contrario." },
            { t: "aviso", v: "Nao deixe a integracao por conta do acaso. Sem plano, o novato fica dependente de interromper alguem o dia inteiro, e conclui que atrapalha." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um analista contratado por dominio de Power BI passou tres semanas sem acesso ao banco, lendo documentacao desatualizada, e comecou a duvidar da propria escolha." },
              { t: "texto", v: "No segundo mes, com acesso e uma demanda pequena por semana, entregou mais que o esperado. O gargalo nunca foi capacidade: foi a ausencia de um plano de trinta dias e de um pedido de acesso feito com antecedencia." }
            ]
          },
          resumo: [
            "Se a vaga e dificil de descrever, ela ainda nao esta pronta.",
            "Ferramenta se aprende; cuidado com dado, nem tanto.",
            "Teste pratico curto, realista e com devolutiva.",
            "Entrega pequena na primeira semana cria pertencimento."
          ],
          aplicar: [
            "Escreva o que a proxima contratacao fara nos primeiros seis meses.",
            "Monte um plano de trinta dias reutilizavel para novos integrantes.",
            "Solicite os acessos antes do primeiro dia, nao depois."
          ]
        },
        itens: [
          { id: "gestao.m6.i1", tipo: "externo", titulo: "Entrevistas estruturadas e vies",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/business-negotiations/", h: 3 },
          { id: "gestao.m6.i2", tipo: "externo", titulo: "Integracao de novos membros",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "gestao.m6.i3", tipo: "entregavel",
            titulo: "Plano de integracao de 30 dias, reutilizavel, com checklist de acessos", h: 7 }
        ],
        exercicios: [
          { id: "gestao.m6.e1", tipo: "quiz",
            enunciado: "Dois candidatos: um domina todas as ferramentas que voce usa hoje e explica mal o raciocinio; o outro conhece metade das ferramentas e investiga bem os dados no teste pratico. Qual escolher para um time pequeno?",
            alternativas: [
              { v: "O que domina as ferramentas: produz desde o primeiro dia", correta: false,
                explicacao: "Produtividade imediata perde valor rapido se a pessoa nao consegue explicar o que fez nem investigar dado suspeito." },
              { v: "O que investiga bem, desde que haja tempo e apoio para aprender as ferramentas", correta: true,
                explicacao: "Ferramenta se aprende em semanas; cuidado com dado e raciocinio levam anos. Em time pequeno, quem investiga evita os erros mais caros." },
              { v: "Nenhum dos dois: procurar quem tenha as duas coisas", correta: false,
                explicacao: "Defensavel em tese e caro na pratica: a vaga fica aberta, o time sobrecarregado, e o candidato ideal pode nao aparecer." },
              { v: "O que domina as ferramentas, e treinar comunicacao depois", correta: false,
                explicacao: "Confunde comunicacao com raciocinio. O sinal do teste era investigacao dos dados, nao apresentacao." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F3 */
  fases.push({
    id: "gestao.f3",
    n: 3,
    nome: "Stakeholders e produto de dados",
    cor: "--f3",
    modulos: [
      {
        id: "gestao.m7",
        n: 7,
        titulo: "Gestao de stakeholders",
        h: 15,
        objetivo: "Manter as areas certas informadas e envolvidas, no grau certo.",
        topicos: ["mapeamento", "expectativa", "comunicacao periodica", "conflito entre areas"],
        aula: {
          objetivo: "Ao terminar, voce tem um mapa de quem precisa ser envolvido em que grau, e uma rotina de comunicacao.",
          blocos: [
            { t: "texto", v: "Area de dados atende todo mundo e nao se reporta a quase ninguem. Isso cria uma armadilha: quem fala mais alto recebe mais atencao, e areas silenciosas mas estrategicas ficam sem servico." },
            { t: "subtitulo", v: "Mapeie por influencia e interesse" },
            { t: "tabela", cab: ["Perfil", "Como tratar"], linhas: [
              ["Alta influencia, alto interesse", "envolver nas decisoes, conversa frequente"],
              ["Alta influencia, baixo interesse", "manter satisfeito, resumo curto e periodico"],
              ["Baixa influencia, alto interesse", "manter informado, canal aberto"],
              ["Baixa influencia, baixo interesse", "comunicacao geral, sem esforco dedicado"]
            ] },
            { t: "destaque", v: "O stakeholder mais perigoso e o de alta influencia e baixo interesse: ele nao acompanha nada e aparece no pior momento, com uma opiniao forte." },
            { t: "subtitulo", v: "Expectativa se administra, nao se adivinha" },
            { t: "texto", v: "Pergunte no inicio o que a pessoa espera receber, com que frequencia e em que formato. Metade dos conflitos de entrega nasce de expectativa nunca declarada, e nao de entrega ruim." },
            { t: "subtitulo", v: "Comunicacao periodica" },
            { t: "texto", v: "Um resumo quinzenal curto, com entregue, em andamento e proximo, reduz drasticamente a cobranca avulsa. Quem sabe o que esta acontecendo pergunta menos, e cobra melhor quando cobra." },
            { t: "subtitulo", v: "Conflito entre areas" },
            { t: "texto", v: "Quando duas areas querem a mesma pessoa na mesma semana, a decisao nao e sua: e de quem tem autoridade sobre as duas. Seu papel e apresentar as opcoes e o custo de cada uma, e nao escolher qual diretor contrariar." },
            { t: "aviso", v: "Nao prometa para agradar. Um sim rapido compra duas semanas de paz e gera meses de desconfianca quando a data nao se cumpre." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A diretoria financeira reclamou de falta de atendimento no comite. Nos tres meses anteriores, a area de dados entregou quatro projetos para eles, todos no prazo." },
              { t: "texto", v: "O problema era invisibilidade: ninguem sabia que aquilo tinha sido feito. Um resumo quinzenal de meia pagina encerrou a reclamacao sem mudar nada na entrega." }
            ]
          },
          resumo: [
            "Quem fala mais alto tende a receber mais, e isso precisa ser corrigido de proposito.",
            "Alta influencia e baixo interesse e o perfil mais perigoso.",
            "Expectativa nao declarada e a maior fonte de conflito.",
            "Resumo periodico reduz cobranca avulsa."
          ],
          aplicar: [
            "Monte o mapa de stakeholders da sua area nos dois eixos.",
            "Pergunte a dois deles o que esperam receber e com que frequencia.",
            "Comece um resumo quinzenal de meia pagina."
          ]
        },
        itens: [
          { id: "gestao.m7.i1", tipo: "externo", titulo: "Mapeamento e engajamento de stakeholders",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook/plays", h: 3 },
          { id: "gestao.m7.i2", tipo: "externo", titulo: "Negociacao e relacionamento entre areas",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/business-negotiations/", h: 3 },
          { id: "gestao.m7.i3", tipo: "entregavel",
            titulo: "Mapa de stakeholders e primeiro resumo quinzenal enviado", h: 9 }
        ],
        exercicios: [
          { id: "gestao.m7.e1", tipo: "quiz",
            enunciado: "Um diretor que nunca participou do projeto aparece na apresentacao final e questiona a premissa central. O que isso indica?",
            alternativas: [
              { v: "Falta de preparo dele: bastava ter acompanhado", correta: false,
                explicacao: "Pode ser verdade e nao resolve nada. Ele tem influencia, e a premissa continua questionada na frente de todos." },
              { v: "Falha de mapeamento: alta influencia e baixo interesse exige resumo periodico e validacao de premissa no inicio", correta: true,
                explicacao: "Esse perfil aparece tarde por definicao. A prevencao e envolver na validacao inicial e manter um resumo curto chegando, mesmo sem ele pedir." },
              { v: "Problema do patrocinador do projeto", correta: false,
                explicacao: "Terceirizar a responsabilidade nao evita a repeticao no proximo projeto." },
              { v: "Sinal de que o projeto estava errado", correta: false,
                explicacao: "Pode estar certo tecnicamente e ainda assim falhar por nao ter validado premissa com quem tem poder de veto." }
            ] }
        ]
      },
      {
        id: "gestao.m8",
        n: 8,
        titulo: "Dados como produto",
        h: 18,
        objetivo: "Tratar painel, base e indicador como produto com dono, usuario e ciclo de vida.",
        topicos: ["dono", "contrato", "ciclo de vida", "descontinuar"],
        aula: {
          objetivo: "Ao terminar, voce define dono, contrato e criterio de aposentadoria para os ativos de dados da area.",
          blocos: [
            { t: "texto", v: "Toda area de dados madura chega no mesmo problema: 200 paineis, 40 usados, ninguem sabe quais podem ser desligados e todos precisam ser mantidos. Tratar dado como produto e o que evita esse acumulo." },
            { t: "subtitulo", v: "Todo ativo precisa de tres coisas" },
            { t: "lista", v: [
              "Dono do negocio: quem decide o que ele significa e se continua existindo.",
              "Dono tecnico: quem mantem, corrige e responde quando quebra.",
              "Contrato: o que entrega, com que frequencia, com que qualidade."
            ] },
            { t: "destaque", v: "Ativo de dados sem dono nao e patrimonio, e passivo. Ele custa manutencao todo mes e ninguem sabe dizer se ainda vale." },
            { t: "subtitulo", v: "Contrato de dado" },
            { t: "texto", v: "Escreva o que o consumidor pode esperar: colunas e seus significados, frequencia de atualizacao, atraso maximo aceitavel, o que acontece em caso de falha, e como sera avisada uma mudanca de esquema. Uma pagina resolve." },
            { t: "subtitulo", v: "Medir uso" },
            { t: "texto", v: "Registre quem abre cada painel e com que frequencia. Sem esse dado, nenhuma conversa sobre descontinuar acontece, porque sempre havera alguem afirmando que usa muito." },
            { t: "subtitulo", v: "Aposentar" },
            { t: "texto", v: "Defina um criterio, comunique com antecedencia, marque como obsoleto, espere e desligue. Painel sem acesso ha noventa dias e candidato natural. O que reaparece com reclamacao volta; o resto some sem que ninguem note." },
            { t: "aviso", v: "Manter tudo por seguranca parece prudente e nao e. Cada painel vivo consome atualizacao, custo de consulta e atencao do time quando quebra na madrugada." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma carga quebrou as 3h e o time passou a manha corrigindo. Ao final, descobriu-se que ela alimentava um painel que ninguem abria havia sete meses." },
              { t: "texto", v: "Depois disso, a area passou a publicar uma lista trimestral de ativos sem uso e a desligar apos aviso. Em dois trimestres, 30% das rotinas noturnas deixaram de existir, e as madrugadas ficaram tranquilas." }
            ]
          },
          resumo: [
            "Ativo sem dono e passivo.",
            "Contrato de dado cabe em uma pagina e evita discussao.",
            "Sem medir uso, nada e desligado.",
            "Manter tudo por seguranca custa caro todo mes."
          ],
          aplicar: [
            "Liste os ativos de dados da area e marque os que nao tem dono definido.",
            "Escreva o contrato de uma tabela ou painel critico.",
            "Levante quais paineis nao tem acesso ha noventa dias."
          ]
        },
        itens: [
          { id: "gestao.m8.i1", tipo: "externo", titulo: "Data mesh e dado como produto",
            fonte: "Martin Fowler", url: "https://martinfowler.com/articles/data-monolith-to-mesh.html", h: 4 },
          { id: "gestao.m8.i2", tipo: "externo", titulo: "Governanca e ciclo de vida de ativos",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/purview/data-governance-overview", h: 4 },
          { id: "gestao.m8.i3", tipo: "entregavel",
            titulo: "Inventario dos ativos de dados com dono e ultimo acesso", h: 10 }
        ],
        exercicios: [
          { id: "gestao.m8.e1", tipo: "python",
            enunciado: "Escreva candidatos_aposentadoria(ativos, dias): devolve os nomes dos ativos com ultimo acesso maior que 'dias', em ordem alfabetica. Ativo sem ultimo acesso conta como candidato.",
            starter: "def candidatos_aposentadoria(ativos, dias):\n    pass\n",
            teste: "a = [{'nome': 'painel_b', 'dias_sem_acesso': 120}, {'nome': 'painel_a', 'dias_sem_acesso': 10}, {'nome': 'painel_c', 'dias_sem_acesso': None}]\nassert candidatos_aposentadoria(a, 90) == ['painel_b', 'painel_c']\nassert candidatos_aposentadoria([], 90) == []\n",
            gabarito: "def candidatos_aposentadoria(ativos, dias):\n    saida = []\n    for a in ativos:\n        d = a.get('dias_sem_acesso')\n        if d is None or d > dias:\n            saida.append(a['nome'])\n    return sorted(saida)\n",
            dica: "Ausencia de informacao de acesso tambem e sinal de abandono." }
        ]
      },
      {
        id: "gestao.m9",
        n: 9,
        titulo: "Negociacao de escopo e prazo",
        h: 12,
        objetivo: "Negociar entrega usando escopo como variavel, em vez de horas do time.",
        topicos: ["variaveis da negociacao", "versao minima", "custo do prazo", "registro"],
        aula: {
          objetivo: "Ao terminar, voce conduz negociacoes mostrando alternativas em vez de aceitar ou recusar.",
          blocos: [
            { t: "texto", v: "Toda entrega tem tres variaveis: escopo, prazo e recurso. Quando o prazo e fixo e o recurso e o mesmo, so resta o escopo. Negociar bem e trazer isso para a mesa antes de prometer." },
            { t: "destaque", v: "A pergunta que muda a conversa: o que dessa lista voce prefere que fique para a segunda versao?" },
            { t: "subtitulo", v: "Versao minima util" },
            { t: "texto", v: "Quase toda demanda tem um nucleo que resolve 80% da necessidade com 30% do esforco. Encontrar esse nucleo e a habilidade central: entrega mais cedo, gera retorno antes e evita construir o que ninguem usaria." },
            { t: "subtitulo", v: "Mostre alternativas, nao veredito" },
            { t: "tabela", cab: ["Opcao", "Entrega", "Prazo"], linhas: [
              ["A", "painel completo com detalhamento por vendedor", "18 dias"],
              ["B", "painel com totais por regional e filtro de periodo", "8 dias"],
              ["C", "planilha atualizada semanalmente, sem painel", "3 dias"]
            ] },
            { t: "texto", v: "Tres opcoes com prazo mudam a conversa de posso ou nao posso para qual delas. E deixam claro que o prazo curto tem preco, sem que voce precise dizer nao." },
            { t: "subtitulo", v: "Prazo apertado tem custo, e ele precisa aparecer" },
            { t: "lista", v: [
              "Menos teste, mais chance de erro no numero.",
              "Sem documentacao, a manutencao fica dependente de uma pessoa.",
              "Outra entrega atrasa, e alguem vai sentir.",
              "Divida tecnica que sera paga com juros depois."
            ] },
            { t: "aviso", v: "Aceitar prazo impossivel em silencio nao protege ninguem. Quando atrasar, a conversa sera sobre o atraso, e nao sobre a impossibilidade que voce ja conhecia no comeco." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A diretoria pede o painel completo para a reuniao de quinta. Estimativa realista: dezoito dias. Faltam cinco." },
              { t: "texto", v: "Em vez de recusar ou prometer, voce leva tres opcoes com prazos. A diretoria escolhe a versao com totais por regional, que atende a decisao daquela reuniao. O detalhamento entra duas semanas depois, e ninguem trabalha no fim de semana." }
            ]
          },
          resumo: [
            "Com prazo e recurso fixos, so o escopo negocia.",
            "Quase toda demanda tem um nucleo de 80% com 30% do esforco.",
            "Tres opcoes com prazo mudam a conversa de sim ou nao para qual.",
            "Aceitar prazo impossivel em silencio adia o problema e piora."
          ],
          aplicar: [
            "Na proxima demanda com prazo curto, apresente tres opcoes com prazos.",
            "Para uma demanda atual, escreva qual seria a versao minima util.",
            "Registre por escrito o escopo combinado no fim de cada negociacao."
          ]
        },
        itens: [
          { id: "gestao.m9.i1", tipo: "externo", titulo: "Negociacao baseada em interesses",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/negotiation-skills-daily/", h: 4 },
          { id: "gestao.m9.i2", tipo: "externo", titulo: "Escopo e produto minimo",
            fonte: "Atlassian", url: "https://www.atlassian.com/agile/product-management/minimum-viable-product", h: 2 },
          { id: "gestao.m9.i3", tipo: "entregavel",
            titulo: "Negociacao real conduzida com tres opcoes documentadas", h: 6 }
        ],
        exercicios: [
          { id: "gestao.m9.e1", tipo: "reflexao",
            enunciado: "Prepare uma negociacao de escopo real.",
            perguntas: [
              "Qual demanda atual tem prazo mais apertado que a estimativa honesta?",
              "Qual e a versao minima util dela, que resolve a maior parte da necessidade?",
              "Quais tres opcoes com prazos diferentes voce pode apresentar?",
              "Qual o custo concreto do prazo curto, e quem vai senti-lo?"
            ],
            minimoCaracteres: 400 }
        ]
      }
    ]
  });

  /* ===================================================================== F4 */
  fases.push({
    id: "gestao.f4",
    n: 4,
    nome: "Resultado e comunicacao executiva",
    cor: "--f4",
    modulos: [
      {
        id: "gestao.m10",
        n: 10,
        titulo: "Metricas e OKR",
        h: 15,
        objetivo: "Medir a area por resultado, e nao por volume de entregas.",
        topicos: ["metrica de resultado", "metrica de vaidade", "OKR", "efeito colateral"],
        aula: {
          objetivo: "Ao terminar, voce define de tres a cinco metricas que mostram se a area esta gerando valor.",
          blocos: [
            { t: "texto", v: "Area de dados costuma se medir por quantidade: paineis publicados, chamados atendidos, extracoes entregues. Todas crescem quando a area trabalha mal, entao nenhuma serve para dizer se ela vai bem." },
            { t: "destaque", v: "Se a metrica melhora quando o trabalho piora, ela e metrica de vaidade. Numero de extracoes manuais e o exemplo perfeito." },
            { t: "subtitulo", v: "Metricas que dizem alguma coisa" },
            { t: "tabela", cab: ["Dimensao", "Exemplo"], linhas: [
              ["Valor gerado", "decisoes tomadas com base em dado, economia gerada"],
              ["Confiabilidade", "incidentes de dado por mes, tempo ate correcao"],
              ["Velocidade", "tempo medio da demanda entrar ate ser entregue"],
              ["Autonomia do usuario", "proporcao de perguntas respondidas sem a area"],
              ["Saude do time", "rotatividade, horas extras, satisfacao"]
            ] },
            { t: "subtitulo", v: "OKR sem virar burocracia" },
            { t: "texto", v: "Objetivo e uma frase que diz onde se quer chegar. Resultados-chave sao dois ou tres numeros que provam a chegada. Se o resultado-chave for uma lista de tarefas, virou plano de acao com nome novo." },
            { t: "codigo", lang: "text", v: "Objetivo: a diretoria confia nos numeros do fechamento.\n  RC1: reduzir de 6 para 1 os incidentes de divergencia por trimestre.\n  RC2: fechamento disponivel ate o 3o dia util, em 3 de 3 meses.\n  RC3: 100% das bases criticas com teste automatico de qualidade." },
            { t: "subtitulo", v: "Toda metrica tem efeito colateral" },
            { t: "texto", v: "Medir tempo de atendimento faz o time priorizar o facil. Medir quantidade de entregas faz fatiar demanda. Escolha sempre um par: uma metrica de velocidade com uma de qualidade, para que uma segure a outra." },
            { t: "aviso", v: "Nao meca pessoas com metricas de area. Numero individual de chamados atendidos gera competicao interna e destroi cooperacao num time pequeno." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "O relatorio da area mostrava 47 entregas no trimestre, um recorde. Na mesma reuniao, um diretor perguntou por que ainda precisava pedir a mesma planilha toda semana." },
              { t: "texto", v: "As 47 entregas incluiam 30 extracoes manuais repetidas. A metrica que passou a valer foi outra: quantas perguntas recorrentes viraram autoatendimento. Caiu para 12 entregas no trimestre seguinte, e a percepcao da area melhorou." }
            ]
          },
          resumo: [
            "Metrica que melhora quando o trabalho piora e vaidade.",
            "Resultado-chave e numero, nao lista de tarefas.",
            "Toda metrica tem efeito colateral; use pares.",
            "Nao meca pessoas com metricas de area."
          ],
          aplicar: [
            "Liste as metricas atuais da sua area e marque quais sao de vaidade.",
            "Escreva um objetivo com tres resultados-chave numericos para o trimestre.",
            "Para cada metrica de velocidade, defina a de qualidade que a equilibra."
          ]
        },
        itens: [
          { id: "gestao.m10.i1", tipo: "externo", titulo: "Guia de OKR",
            fonte: "Atlassian", url: "https://www.atlassian.com/agile/agile-at-scale/okr", h: 3 },
          { id: "gestao.m10.i2", tipo: "externo", titulo: "Metricas de engenharia e entrega",
            fonte: "Google DORA", url: "https://dora.dev/guides/dora-metrics/", h: 4 },
          { id: "gestao.m10.i3", tipo: "entregavel",
            titulo: "Painel de metricas da area com cinco indicadores e seus pares de equilibrio", h: 8 }
        ],
        exercicios: [
          { id: "gestao.m10.e1", tipo: "quiz",
            enunciado: "Sua area quer medir eficiencia. Qual metrica escolher?",
            alternativas: [
              { v: "Numero de extracoes manuais entregues por mes", correta: false,
                explicacao: "Sobe quando o autoatendimento falha. Melhora justamente quando a area vai pior." },
              { v: "Tempo medio entre a entrada e a entrega da demanda, acompanhado de incidentes de qualidade", correta: true,
                explicacao: "Mede fluxo real e vem acompanhado do par que impede otimizar velocidade em troca de erro." },
              { v: "Horas trabalhadas pelo time", correta: false,
                explicacao: "Mede esforco, nao resultado, e premia hora extra." },
              { v: "Quantidade de paineis publicados", correta: false,
                explicacao: "Incentiva multiplicar painel, exatamente o que gera o acervo inutilizavel de manter." }
            ] }
        ]
      },
      {
        id: "gestao.m11",
        n: 11,
        titulo: "Apresentacao executiva",
        h: 12,
        objetivo: "Levar dado para a diretoria de um jeito que produza decisao.",
        topicos: ["conclusao primeiro", "uma mensagem", "antecipar pergunta", "anexo"],
        aula: {
          objetivo: "Ao terminar, voce estrutura qualquer apresentacao comecando pela resposta.",
          blocos: [
            { t: "texto", v: "Diretoria tem pouco tempo e muitos assuntos. A apresentacao que comeca pela metodologia perde a atencao antes da conclusao. A que comeca pela conclusao ganha tempo para discutir o que importa." },
            { t: "destaque", v: "Primeiro slide: a resposta e a recomendacao. Todo o resto e apoio, e boa parte cabe em anexo." },
            { t: "subtitulo", v: "Estrutura de cinco minutos" },
            { t: "lista", ordenada: true, v: [
              "A recomendacao, em uma frase.",
              "O numero que a sustenta.",
              "As duas ou tres razoes, sem detalhe tecnico.",
              "O que voce precisa da diretoria: decisao, recurso ou apenas ciencia.",
              "Riscos e o que ainda nao esta respondido."
            ] },
            { t: "subtitulo", v: "Uma mensagem por apresentacao" },
            { t: "texto", v: "Se a apresentacao tem tres mensagens, nenhuma sera lembrada. Escolha a principal e transforme as demais em anexo ou em outra reuniao. A pergunta util antes de montar: se so uma frase sobreviver, qual deve ser?" },
            { t: "subtitulo", v: "Antecipe as tres perguntas" },
            { t: "texto", v: "Antes de apresentar, escreva as tres perguntas mais provaveis e a resposta de cada uma, com o dado a mao. Costumam ser: de onde vem esse numero, o que acontece se nao fizermos nada, e quanto custa." },
            { t: "subtitulo", v: "Anexo existe para isso" },
            { t: "texto", v: "Metodologia, premissas e detalhamento vao para o anexo. Nao mostrar nao e esconder: e respeitar a atencao de quem decide e ter a informacao pronta se for pedida." },
            { t: "aviso", v: "Nunca apresente numero que voce nao consiga explicar de onde veio. Uma pergunta de origem sem resposta custa mais credibilidade que uma conclusao errada assumida." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma analise de inadimplencia foi apresentada com dezoito slides: base, tratamento, metodo, validacao e, no slide dezessete, a conclusao. A diretoria interrompeu no slide seis, e a recomendacao nunca foi discutida." },
              { t: "texto", v: "A mesma analise, com a recomendacao no primeiro slide e a metodologia em anexo, foi decidida em oito minutos. O trabalho tecnico era identico." }
            ]
          },
          resumo: [
            "Conclusao primeiro, apoio depois, detalhe em anexo.",
            "Uma mensagem por apresentacao.",
            "Antecipe as tres perguntas com dado a mao.",
            "Numero sem origem explicavel custa credibilidade."
          ],
          aplicar: [
            "Reescreva sua ultima apresentacao comecando pela recomendacao.",
            "Antes da proxima, escreva as tres perguntas provaveis e as respostas.",
            "Mova metodologia e premissas para anexo."
          ]
        },
        itens: [
          { id: "gestao.m11.i1", tipo: "externo", titulo: "Comunicacao com executivos",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/leadership/", h: 3 },
          { id: "gestao.m11.i2", tipo: "externo", titulo: "Visualizacao para decisao",
            fonte: "Financial Times", url: "https://github.com/Financial-Times/chart-doctor", h: 2 },
          { id: "gestao.m11.i3", tipo: "entregavel",
            titulo: "Apresentacao real reestruturada com a recomendacao no primeiro slide", h: 7 }
        ],
        exercicios: [
          { id: "gestao.m11.e1", tipo: "quiz",
            enunciado: "Voce tem dez minutos com a diretoria para apresentar uma analise que levou tres semanas. Como comeca?",
            alternativas: [
              { v: "Pelo contexto e pela metodologia, para dar credibilidade", correta: false,
                explicacao: "Credibilidade vem da qualidade da recomendacao e da capacidade de responder perguntas, nao da exposicao previa do metodo." },
              { v: "Pela recomendacao e pelo numero que a sustenta", correta: true,
                explicacao: "Garante que a mensagem principal seja transmitida mesmo se a reuniao for interrompida, e libera o tempo restante para a discussao que importa." },
              { v: "Pelo esforco investido, para dimensionar o trabalho", correta: false,
                explicacao: "Esforco nao e resultado. Diretoria decide sobre consequencia, nao sobre horas gastas." },
              { v: "Pelas limitacoes, para evitar mal-entendido", correta: false,
                explicacao: "Limitacao precisa ser dita, no fim. Abrir por ela enfraquece a mensagem antes de ela existir." }
            ] }
        ]
      },
      {
        id: "gestao.m12",
        n: 12,
        titulo: "Projeto: plano de gestao da area",
        h: 20,
        objetivo: "Escrever o plano que organiza a area para os proximos seis meses.",
        topicos: ["diagnostico", "prioridades", "estrutura", "acompanhamento"],
        aula: {
          objetivo: "Ao terminar, voce tem um documento de gestao que pode ser apresentado a diretoria e seguido pelo time.",
          blocos: [
            { t: "texto", v: "Este modulo junta a trilha inteira em um documento. Nao e plano estrategico de trinta paginas: sao cinco a oito paginas que qualquer pessoa da area consegue ler e usar." },
            { t: "subtitulo", v: "O que o plano contem" },
            { t: "lista", ordenada: true, v: [
              "Diagnostico: o que funciona, o que nao funciona, com evidencia.",
              "Demanda e capacidade: quanto entra, quanto sai, qual a lacuna.",
              "Prioridades do semestre: no maximo tres frentes.",
              "O que nao sera feito, declarado.",
              "Metricas: como saberemos que melhorou.",
              "Time: quem faz o que, lacunas e plano de desenvolvimento.",
              "Riscos: o que pode dar errado e o que fazer.",
              "Ritual de acompanhamento: quando o plano sera revisto."
            ] },
            { t: "destaque", v: "A secao mais valiosa e a do que nao sera feito. E a unica que protege o time e evita a expectativa de que tudo cabe." },
            { t: "subtitulo", v: "Diagnostico com evidencia" },
            { t: "texto", v: "Nao escreva o time esta sobrecarregado. Escreva entraram 61 demandas no trimestre, foram entregues 38, e a fila cresce 23 por trimestre. Numero muda conversa; adjetivo nao." },
            { t: "subtitulo", v: "Tres frentes, no maximo" },
            { t: "texto", v: "Um semestre comporta tres frentes de melhoria estrutural, alem da operacao. Cinco frentes viram cinco coisas pela metade, e ao final ninguem consegue apontar o que mudou." },
            { t: "aviso", v: "Plano que fica na gaveta nao existe. Marque a revisao mensal na agenda no mesmo dia em que terminar de escrever." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um pedido de contratacao foi negado duas vezes por falta de justificativa. Na terceira, veio acompanhado do plano: entrada de demanda, capacidade util medida, fila crescente e o custo do atraso para as areas solicitantes." },
              { t: "texto", v: "A vaga foi aprovada na mesma reuniao. O que mudou nao foi a necessidade, que ja existia: foi a existencia de evidencia organizada." }
            ]
          },
          resumo: [
            "Cinco a oito paginas que o time consegue usar.",
            "Diagnostico com numero, nao com adjetivo.",
            "Tres frentes por semestre, no maximo.",
            "A secao do que nao sera feito e a que protege o time."
          ],
          aplicar: [
            "Escreva o diagnostico da sua area com tres numeros reais.",
            "Escolha as tres frentes do semestre e escreva o que fica de fora.",
            "Marque a revisao mensal do plano na agenda hoje."
          ]
        },
        itens: [
          { id: "gestao.m12.i1", tipo: "externo", titulo: "Planejamento de area e estrategia",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/strategy/", h: 3 },
          { id: "gestao.m12.i2", tipo: "externo", titulo: "Documentos de decisao e alinhamento",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "gestao.m12.i3", tipo: "entregavel",
            titulo: "Plano de gestao da area, escrito e apresentado a diretoria", h: 15 }
        ],
        exercicios: [
          { id: "gestao.m12.e1", tipo: "reflexao",
            enunciado: "Rascunhe o plano da sua area.",
            perguntas: [
              "Quais tres numeros descrevem hoje a demanda e a capacidade da sua area?",
              "Quais sao as tres frentes de melhoria do proximo semestre?",
              "O que ficara declaradamente de fora, e como voce comunica isso?",
              "Que metricas mostrarao, em seis meses, que o plano funcionou?"
            ],
            minimoCaracteres: 500 }
        ]
      }
    ]
  });


  window.PDC.trilhas.registrar({
    id: "gestao",
    nome: "Gestao de area de dados",
    desc: "Organizar demanda, capacidade, stakeholders e resultado de uma area de dados que entrega e e reconhecida.",
    icone: "grade",
    cor1: "--t-gestao",
    cor2: "--t-gestao",
    tipoPratica: "quiz",
    horas: 173,
    marcos: [
      { moduloId: "gestao.m6", rotulo: "Area organizada",
        texto: "Ao concluir a Fase 2, a area tem fila unica, capacidade medida e plano de integracao. E a base para negociar qualquer coisa com a diretoria." }
    ],
    fases: fases
  });
})();
