/* lideranca.js — trilha Lideranca.
   4 fases, 12 modulos, 165 h.
   Pratica: quiz de cenario, reflexao guiada e entregavel que se faz com gente. */

(function () {
  "use strict";

  var fases = [];

  /* ===================================================================== F1 */
  fases.push({
    id: "lideranca.f1",
    n: 1,
    nome: "Base do lider",
    cor: "--f1",
    modulos: [
      {
        id: "lideranca.m1",
        n: 1,
        titulo: "Autoconhecimento",
        h: 12,
        objetivo: "Reconhecer seus padroes de reacao antes que eles decidam por voce.",
        topicos: ["gatilhos", "vieses", "pontos cegos", "pedido de retorno"],
        aula: {
          objetivo: "Ao terminar, voce identifica seus tres gatilhos mais frequentes e o que costuma fazer sob eles.",
          blocos: [
            { t: "texto", v: "Quem lidera decide sob pressao, com informacao incompleta e gente olhando. Nessas horas, o padrao antigo assume o comando. Autoconhecimento nao e introspeccao: e saber qual padrao e esse antes de ele aparecer numa reuniao." },
            { t: "subtitulo", v: "Gatilho" },
            { t: "texto", v: "Gatilho e a situacao que produz reacao desproporcional. Ser interrompido, ser contrariado na frente de outros, receber demanda de ultima hora, ver trabalho malfeito. A reacao vem antes do pensamento, e por isso precisa ser mapeada com antecedencia." },
            { t: "destaque", v: "Voce nao controla o gatilho. Controla os cinco segundos entre ele e a sua resposta. Esses cinco segundos se treinam." },
            { t: "subtitulo", v: "A transicao mais dificil" },
            { t: "texto", v: "Quem vira lider por ser o melhor tecnico carrega um habito que agora atrapalha: resolver. Quando alguem traz um problema, a mao ja vai para o teclado. Cada vez que voce resolve no lugar da pessoa, ela aprende que basta trazer o problema." },
            { t: "tabela", cab: ["Antes", "Agora"], linhas: [
              ["Meu resultado", "resultado do time"],
              ["Resolver rapido", "fazer com que resolvam"],
              ["Saber a resposta", "fazer a pergunta certa"],
              ["Ser o melhor tecnico", "criar tres pessoas melhores que voce era"]
            ] },
            { t: "subtitulo", v: "Ponto cego" },
            { t: "texto", v: "Por definicao, voce nao enxerga o seu. A unica forma de descobrir e perguntar, e perguntar de um jeito que a pessoa consiga responder. Pergunta ampla como voce tem algum retorno para mim recebe um nao como resposta." },
            { t: "lista", v: [
              "O que eu faco que atrapalha voce?",
              "O que eu deveria comecar a fazer?",
              "Em que situacao voce sentiu falta de mim nas ultimas semanas?",
              "Quando eu reajo mal, o que acontece antes?"
            ] },
            { t: "aviso", v: "Se voce se defende na primeira resposta dificil, nao recebe a segunda. A resposta correta a um retorno duro e obrigado, me da um exemplo. Discordar, se for o caso, e conversa de outro dia." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Numa reuniao de fechamento, um analista apresenta um numero errado. Voce corrige na hora, na frente de todos, e explica o metodo certo. Tecnicamente irretocavel." },
              { t: "texto", v: "Nas duas semanas seguintes, esse analista para de trazer analise preliminar e so mostra o que ja esta certo. Voce perdeu a visibilidade do trabalho em andamento. O gatilho era ver erro em publico; o custo apareceu depois." }
            ]
          },
          resumo: [
            "O padrao antigo assume o comando sob pressao.",
            "O melhor tecnico vira o pior lider quando continua resolvendo tudo.",
            "Ponto cego so aparece com pergunta especifica.",
            "Defender-se no primeiro retorno encerra os proximos."
          ],
          aplicar: [
            "Liste os tres gatilhos que mais aparecem na sua semana e o que voce faz sob cada um.",
            "Pergunte a uma pessoa de confianca: o que eu faco que atrapalha voce?",
            "Na proxima vez que quiser resolver por alguem, faca uma pergunta em vez disso."
          ]
        },
        itens: [
          { id: "lideranca.m1.i1", tipo: "externo", titulo: "Ted Talk — Como grandes lideres inspiram acao",
            fonte: "TED, Simon Sinek", url: "https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action", h: 1 },
          { id: "lideranca.m1.i2", tipo: "externo", titulo: "Manager Tools — fundamentos da gestao de pessoas",
            fonte: "Manager Tools", url: "https://www.manager-tools.com/manager-tools-basics", h: 4 },
          { id: "lideranca.m1.i3", tipo: "pratica",
            titulo: "Mapear os tres gatilhos mais frequentes durante uma semana", h: 3 },
          { id: "lideranca.m1.i4", tipo: "entregavel",
            titulo: "Conversa de retorno com uma pessoa de confianca, com anotacao do que ouviu", h: 3 }
        ],
        exercicios: [
          { id: "lideranca.m1.e1", tipo: "reflexao",
            enunciado: "Mapeie os seus padroes.",
            perguntas: [
              "Qual foi a ultima vez que voce reagiu de forma desproporcional? O que aconteceu imediatamente antes?",
              "Em que situacao voce resolve por alguem em vez de fazer a pessoa resolver?",
              "Se sua equipe pudesse mudar uma coisa em voce sem risco nenhum, o que seria?"
            ],
            minimoCaracteres: 400 }
        ]
      },
      {
        id: "lideranca.m2",
        n: 2,
        titulo: "Estilos de lideranca",
        h: 12,
        objetivo: "Ajustar o seu jeito de conduzir ao nivel de maturidade de cada pessoa.",
        topicos: ["direcao e apoio", "maturidade da tarefa", "autonomia", "microgerenciamento"],
        aula: {
          objetivo: "Ao terminar, voce escolhe conscientemente quanta direcao e quanto apoio dar em cada situacao.",
          blocos: [
            { t: "texto", v: "Nao existe estilo de lideranca correto. Existe o ajuste entre o que a pessoa precisa naquela tarefa e o que voce oferece. A mesma pessoa pode precisar de direcao detalhada numa tarefa nova e de silencio total em outra que domina." },
            { t: "subtitulo", v: "Dois eixos" },
            { t: "tabela", cab: ["Situacao da pessoa na tarefa", "O que oferecer"], linhas: [
              ["Nova e motivada", "direcao alta, apoio baixo: mostre como se faz"],
              ["Ja tentou e travou", "direcao alta, apoio alto: explique e escute"],
              ["Sabe fazer e hesita", "direcao baixa, apoio alto: pergunte e encoraje"],
              ["Domina e tem confianca", "direcao baixa, apoio baixo: delegue e saia"]
            ] },
            { t: "destaque", v: "Microgerenciar e dar direcao alta a quem ja domina. Abandonar e dar autonomia a quem nunca fez. Os dois erros vem da mesma causa: nao olhar a situacao." },
            { t: "subtitulo", v: "O erro de tratar todos igual" },
            { t: "texto", v: "Tratar todos igual parece justo e nao e. A pessoa que esta comecando interpreta autonomia como abandono. A pessoa experiente interpreta acompanhamento detalhado como desconfianca. Justo e dar a cada uma o que ela precisa." },
            { t: "subtitulo", v: "Como calibrar sem adivinhar" },
            { t: "texto", v: "Pergunte. Nesta tarefa, voce prefere que eu acompanhe de perto ou que eu deixe voce tocar e me chame se travar? A resposta economiza semanas de ajuste por tentativa e erro, e ensina a pessoa a pedir o que precisa." },
            { t: "aviso", v: "Delegar sem combinar ponto de checagem nao e autonomia, e aposta. Combine quando voces vao conversar de novo, e ai sim saia do caminho." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um analista experiente em Power BI recebe a primeira tarefa de modelagem em Python. Voce delega como sempre delegou para ele, sem acompanhamento, porque ele e senior." },
              { t: "texto", v: "Duas semanas depois, o trabalho esta travado e ele nao pediu ajuda, porque pedir ajuda parecia admitir que nao era senior. A senioridade era na ferramenta anterior. A tarefa era nova, e pedia direcao alta no comeco." }
            ]
          },
          resumo: [
            "O estilo se ajusta a tarefa, nao a pessoa.",
            "Microgerenciar e abandonar sao o mesmo erro de calibragem.",
            "Tratar todos igual nao e tratar todos com justica.",
            "Autonomia sem ponto de checagem combinado e aposta."
          ],
          aplicar: [
            "Classifique cada pessoa do seu time nas tarefas atuais pelos dois eixos.",
            "Pergunte a duas pessoas quanto acompanhamento elas querem na tarefa atual."
          ]
        },
        itens: [
          { id: "lideranca.m2.i1", tipo: "externo", titulo: "Atlassian Team Playbook — praticas de time",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 4 },
          { id: "lideranca.m2.i2", tipo: "externo", titulo: "Cursos gratuitos de gestao e lideranca",
            fonte: "Escola Virtual Gov", url: "https://www.escolavirtual.gov.br/", h: 4 },
          { id: "lideranca.m2.i3", tipo: "entregavel",
            titulo: "Mapa do time por tarefa, com o nivel de direcao e apoio que cada um precisa", h: 4 }
        ],
        exercicios: [
          { id: "lideranca.m2.e1", tipo: "quiz",
            enunciado: "Uma analista domina SQL e sempre entregou sozinha. Voce a coloca para conduzir a primeira reuniao com a diretoria. Como conduzir?",
            alternativas: [
              { v: "Delegar como sempre: ela e experiente e vai se virar", correta: false,
                explicacao: "A experiencia dela e em SQL, nao em reuniao com diretoria. Tarefa nova pede direcao alta, mesmo para pessoa senior." },
              { v: "Combinar o roteiro com ela antes, ensaiar a abertura e definir o que voce faz se ela travar", correta: true,
                explicacao: "Direcao alta na tarefa nova, com apoio combinado e saida definida. Ela conduz de verdade, com rede." },
              { v: "Conduzir voce e deixar que ela observe desta vez", correta: false,
                explicacao: "Protege o resultado de hoje e adia o desenvolvimento. Observar ensina menos que fazer com apoio." },
              { v: "Avisar que voce assume se a coisa complicar", correta: false,
                explicacao: "Combina o resgate sem combinar a preparacao, e sinaliza baixa confianca antes de comecar." }
            ] }
        ]
      },
      {
        id: "lideranca.m3",
        n: 3,
        titulo: "Confianca e seguranca psicologica",
        h: 15,
        objetivo: "Criar um ambiente em que a pessoa fala do erro cedo, quando ainda e barato.",
        topicos: ["seguranca psicologica", "erro", "reacao do lider", "coerencia"],
        aula: {
          objetivo: "Ao terminar, voce sabe reconhecer os sinais de um time que esconde problema e o que fazer a respeito.",
          blocos: [
            { t: "texto", v: "Seguranca psicologica nao e ambiente confortavel nem ausencia de cobranca. E a certeza de que levantar a mao para dizer errei, nao sei ou discordo nao vai custar caro. Em area de dados isso e economico: erro escondido vira relatorio errado na diretoria." },
            { t: "destaque", v: "O custo de um erro descoberto cedo e um retrabalho. Descoberto tarde, e credibilidade da area inteira." },
            { t: "subtitulo", v: "Sinais de que falta" },
            { t: "lista", v: [
              "Ninguem discorda de voce em reuniao, e depois discordam no corredor.",
              "Erros aparecem sempre no ultimo dia do prazo.",
              "Pessoas pedem autorizacao para decisoes que poderiam tomar.",
              "Perguntas so chegam por mensagem privada, nunca no grupo.",
              "Retrospectiva sem nenhum ponto negativo."
            ] },
            { t: "subtitulo", v: "Como se constroi" },
            { t: "texto", v: "Nao se constroi com discurso. Constroi-se com a sua reacao no momento em que alguem traz uma noticia ruim. Essa reacao e observada por todos e define o que sera trazido no mes seguinte." },
            { t: "tabela", cab: ["Alguem diz", "Resposta que constroi", "Resposta que destroi"], linhas: [
              ["Errei o numero do relatorio", "obrigado por avisar agora; vamos corrigir", "como assim, de novo?"],
              ["Nao sei fazer isso", "otimo, vamos ver junto", "voce nao e senior?"],
              ["Discordo dessa decisao", "explica melhor, o que estou perdendo?", "a decisao ja foi tomada"],
              ["Nao vou entregar no prazo", "obrigado por antecipar; o que da para ajustar?", "isso era para ontem"]
            ] },
            { t: "subtitulo", v: "Coerencia" },
            { t: "texto", v: "Dizer que pode errar e reagir mal uma vez destroi seis meses de discurso. As pessoas confiam no padrao observado, nao no combinado verbal. E o padrao inclui os dias em que voce esta cansado." },
            { t: "aviso", v: "Seguranca psicologica nao significa ausencia de consequencia. Erro por descuido repetido e por falta de cuidado sao coisas diferentes, e tratar os dois igual desmotiva quem faz bem feito." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um analista percebeu na terca que a carga estava trazendo dado duplicado, mas so avisou na sexta, depois que o painel ja tinha ido para a diretoria. Perguntado, disse que queria resolver sozinho antes de trazer." },
              { t: "texto", v: "A conversa util nao foi sobre o erro tecnico. Foi sobre o que fez ele achar que trazer na terca seria pior. A resposta apontou para uma reacao sua, tres meses antes, num caso parecido." }
            ]
          },
          resumo: [
            "Seguranca psicologica e economica: erro cedo custa menos.",
            "Sua reacao a noticia ruim define o que sera trazido depois.",
            "As pessoas confiam no padrao observado, nao no discurso.",
            "Aceitar erro nao e abrir mao de consequencia."
          ],
          aplicar: [
            "Na proxima noticia ruim, comece com obrigado por avisar. Sem excecao.",
            "Traga um erro seu para a reuniao de equipe e conte o que aprendeu.",
            "Verifique se alguem do time discordou de voce em publico nos ultimos 30 dias."
          ]
        },
        itens: [
          { id: "lideranca.m3.i1", tipo: "externo", titulo: "Como transformar um grupo de estranhos em um time",
            fonte: "TED, Amy Edmondson", url: "https://www.ted.com/talks/amy_edmondson_how_to_turn_a_group_of_strangers_into_a_team", h: 1 },
          { id: "lideranca.m3.i2", tipo: "externo", titulo: "O poder da vulnerabilidade",
            fonte: "TED, Brene Brown", url: "https://www.ted.com/talks/brene_brown_the_power_of_vulnerability", h: 1 },
          { id: "lideranca.m3.i3", tipo: "pratica",
            titulo: "Observar por duas semanas quem discorda de voce em publico e quem so no privado", h: 4 },
          { id: "lideranca.m3.i4", tipo: "entregavel",
            titulo: "Reuniao de equipe em que voce apresenta um erro proprio e o que aprendeu", h: 4 }
        ],
        exercicios: [
          { id: "lideranca.m3.e1", tipo: "quiz",
            enunciado: "Um analista avisa, na frente do time, que o numero que voce apresentou ontem a diretoria estava errado. Qual e a melhor primeira reacao?",
            alternativas: [
              { v: "Perguntar por que ele nao avisou antes da apresentacao", correta: false,
                explicacao: "A primeira frase e a que o time inteiro registra. Comecar por cobranca ensina que avisar custa caro." },
              { v: "Agradecer o aviso, confirmar o erro e combinar em publico a correcao", correta: true,
                explicacao: "Agradecer primeiro protege o comportamento que voce quer que se repita. A conversa sobre por que nao veio antes existe, em separado, depois." },
              { v: "Pedir para ele te procurar depois, para nao expor o assunto", correta: false,
                explicacao: "Sinaliza que erro e assunto de bastidor, e ensina o time a nao trazer nada em publico." },
              { v: "Explicar que o metodo estava certo e o dado e que veio ruim", correta: false,
                explicacao: "Defender-se antes de confirmar o fato encerra a chance de receber o proximo aviso." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F2 */
  fases.push({
    id: "lideranca.f2",
    n: 2,
    nome: "Comunicacao",
    cor: "--f2",
    modulos: [
      {
        id: "lideranca.m4",
        n: 4,
        titulo: "Escuta e comunicacao clara",
        h: 15,
        objetivo: "Ser entendido na primeira vez e entender o que a pessoa nao disse.",
        topicos: ["escuta ativa", "clareza", "contexto antes da tarefa", "confirmacao"],
        aula: {
          objetivo: "Ao terminar, voce transmite uma demanda de forma que a pessoa saiba o que fazer e por que.",
          blocos: [
            { t: "texto", v: "A maior parte do retrabalho em area de dados nasce de um pedido mal transmitido, nao de erro tecnico. Alguem pediu um relatorio, o outro entendeu outra coisa, e duas semanas depois aparece a divergencia." },
            { t: "subtitulo", v: "Contexto antes da tarefa" },
            { t: "texto", v: "Pedir faca um relatorio de inadimplencia por regional produz um resultado. Pedir a diretoria quer decidir onde reforcar a cobranca no proximo trimestre, e preciso comparar regionais produz outro, geralmente melhor, e permite que a pessoa corrija o caminho sozinha." },
            { t: "destaque", v: "Quem sabe o porque consegue decidir sozinho quando o caminho combinado nao funciona. Quem so sabe o que fazer trava no primeiro imprevisto." },
            { t: "subtitulo", v: "Escutar e diferente de esperar a vez de falar" },
            { t: "lista", v: [
              "Nao formule a resposta enquanto a pessoa fala.",
              "Pergunte antes de opinar, mesmo quando ja sabe a resposta.",
              "Repita com suas palavras: entao o problema e que...",
              "Preste atencao no que foi dito de leve; o assunto dificil vem disfarcado de comentario lateral.",
              "Silencio de tres segundos costuma trazer a frase mais importante da conversa."
            ] },
            { t: "subtitulo", v: "Confirmar sem parecer desconfiado" },
            { t: "texto", v: "Perguntar entendeu? recebe sim automatico. Peca a versao da pessoa: so para eu ter certeza de que expliquei bem, como voce vai comecar? A responsabilidade fica na sua explicacao, nao na compreensao dela." },
            { t: "aviso", v: "Combinar por conversa e nao registrar e a origem de metade das divergencias. Depois da conversa, escreva tres linhas com o combinado e mande. Leva um minuto e economiza reuniao." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce pede um comparativo de vendas por regional. O analista entrega por regional e mes, com doze meses. A diretoria queria comparar duas regionais especificas no trimestre, para decidir um remanejamento de equipe." },
              { t: "texto", v: "Nao houve erro tecnico. Faltou uma frase de contexto no comeco, e uma pergunta de confirmacao no fim. Duas semanas de trabalho serviram pela metade." }
            ]
          },
          resumo: [
            "Retrabalho nasce mais de pedido mal transmitido que de erro tecnico.",
            "Contexto permite a pessoa corrigir o caminho sozinha.",
            "Entendeu? recebe sim automatico; peca a versao dela.",
            "Combinado sem registro vira divergencia."
          ],
          aplicar: [
            "No proximo pedido, comece pelo porque antes do o que.",
            "Termine tres conversas desta semana com um resumo escrito de tres linhas.",
            "Em uma reuniao, espere tres segundos antes de responder e veja o que aparece."
          ]
        },
        itens: [
          { id: "lideranca.m4.i1", tipo: "externo", titulo: "Atlassian Team Playbook — alinhamento e contexto",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 3 },
          { id: "lideranca.m4.i2", tipo: "externo", titulo: "Escrita clara no trabalho",
            fonte: "Plain Language", url: "https://digital.gov/guides/plain-language", h: 3 },
          { id: "lideranca.m4.i3", tipo: "pratica",
            titulo: "Registrar por escrito o combinado de cinco conversas na semana", h: 4 },
          { id: "lideranca.m4.i4", tipo: "entregavel",
            titulo: "Modelo curto de briefing de demanda usado pela sua area", h: 5 }
        ],
        exercicios: [
          { id: "lideranca.m4.e1", tipo: "quiz",
            enunciado: "Voce explicou uma demanda complexa e pergunta se ficou claro. A pessoa diz que sim. O que fazer?",
            alternativas: [
              { v: "Seguir em frente: ela confirmou", correta: false,
                explicacao: "Entendeu? quase sempre recebe sim, inclusive de quem nao entendeu. A confirmacao nao carrega informacao." },
              { v: "Pedir que ela conte como pretende comecar", correta: true,
                explicacao: "A versao dela revela o entendimento real, e a formulacao coloca a responsabilidade na clareza da sua explicacao, nao na capacidade dela." },
              { v: "Repetir a explicacao de outro jeito, por seguranca", correta: false,
                explicacao: "Repetir sem saber onde ficou a lacuna gasta tempo e pode soar como desconfianca." },
              { v: "Mandar tudo por escrito depois e considerar resolvido", correta: false,
                explicacao: "Registrar e otimo e nao substitui verificar o entendimento. Documento mal entendido continua mal entendido." }
            ] }
        ]
      },
      {
        id: "lideranca.m5",
        n: 5,
        titulo: "Feedback",
        h: 15,
        objetivo: "Dar retorno que muda comportamento, sem destruir a relacao.",
        topicos: ["comportamento e impacto", "frequencia", "elogio especifico", "receber feedback"],
        aula: {
          objetivo: "Ao terminar, voce da retorno especifico no mesmo dia, sem esperar a avaliacao semestral.",
          blocos: [
            { t: "texto", v: "Feedback guardado apodrece. O que era um ajuste de dez segundos em marco vira uma conversa dificil em setembro, com exemplos que a pessoa nem lembra." },
            { t: "subtitulo", v: "Comportamento, impacto, combinado" },
            { t: "texto", v: "Descreva o comportamento observavel, o impacto que ele causou e o que fica combinado. Sem adjetivo sobre a pessoa: voce e desorganizado nao e retorno, e rotulo, e ninguem muda de rotulo." },
            { t: "tabela", cab: ["Em vez de", "Diga"], linhas: [
              ["Voce e desorganizado", "os tres ultimos relatorios chegaram depois do prazo combinado"],
              ["Faltou capricho", "tres numeros da tabela nao batiam com a fonte"],
              ["Voce precisa se comunicar melhor", "na reuniao de ontem a diretoria nao entendeu a conclusao, e voce comecou pelo metodo"],
              ["Bom trabalho", "voce antecipou o problema do duplicado antes de chegar no painel, isso evitou retrabalho de todo mundo"]
            ] },
            { t: "destaque", v: "Elogio generico nao ensina nada. Elogio especifico ensina exatamente o que repetir." },
            { t: "subtitulo", v: "Frequencia importa mais que tecnica" },
            { t: "texto", v: "Retorno frequente e pequeno dispensa a conversa grande e tensa. Quem recebe ajuste toda semana nao se assusta com um ponto de melhoria; quem so ouve na avaliacao anual entra em modo de defesa antes da segunda frase." },
            { t: "subtitulo", v: "Receber" },
            { t: "texto", v: "A qualidade do retorno que voce recebe depende do que aconteceu na ultima vez. Se voce explicou, justificou ou corrigiu quem falou, encerrou o canal. Anote, agradeca, e leve uma resposta depois, se houver." },
            { t: "aviso", v: "Nao empacote critica entre dois elogios. As pessoas aprendem o padrao, param de ouvir o elogio e ficam esperando o mas. Voce perde as duas coisas." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um analista domina a parte tecnica e apresenta mal: comeca pela metodologia, chega na conclusao no minuto onze, e a diretoria ja perdeu o fio. Voce percebe isso ha meses e nunca falou, porque parecia detalhe." },
              { t: "texto", v: "Na avaliacao semestral, o ponto aparece como comunicacao a desenvolver, generico e tarde. Dito no mesmo dia, com o exemplo fresco e uma sugestao concreta de comecar pela conclusao, teria custado dois minutos e mudado as dez apresentacoes seguintes." }
            ]
          },
          resumo: [
            "Feedback guardado apodrece e vira conversa dificil.",
            "Comportamento e impacto; rotulo nao muda ninguem.",
            "Elogio especifico ensina o que repetir.",
            "Como voce recebe define o que vao te dizer depois."
          ],
          aplicar: [
            "De um retorno especifico, positivo ou de ajuste, ainda esta semana.",
            "Substitua o proximo bom trabalho por uma frase dizendo exatamente o que foi bom.",
            "Pergunte a alguem o que voce poderia fazer diferente e apenas agradeca."
          ]
        },
        itens: [
          { id: "lideranca.m5.i1", tipo: "externo", titulo: "Radical Candor — recursos gratuitos",
            fonte: "Radical Candor", url: "https://www.radicalcandor.com/blog", h: 4 },
          { id: "lideranca.m5.i2", tipo: "externo", titulo: "Manager Tools — feedback",
            fonte: "Manager Tools", url: "https://www.manager-tools.com/manager-tools-basics", h: 3 },
          { id: "lideranca.m5.i3", tipo: "pratica",
            titulo: "Dar tres retornos especificos por semana durante um mes", h: 4 },
          { id: "lideranca.m5.i4", tipo: "entregavel",
            titulo: "Registro de um mes de retornos dados, com o efeito observado", h: 4 }
        ],
        exercicios: [
          { id: "lideranca.m5.e1", tipo: "quiz",
            enunciado: "Um analista entregou tres relatorios com atraso no mes. Qual formulacao funciona melhor?",
            alternativas: [
              { v: "Voce anda desorganizado, precisa melhorar isso", correta: false,
                explicacao: "Rotulo sobre a pessoa, sem fato observavel. Gera defesa e nao indica o que mudar." },
              { v: "Os tres ultimos relatorios chegaram depois do prazo. Isso atrasou o fechamento da diretoria. O que esta acontecendo?", correta: true,
                explicacao: "Fato observavel, impacto concreto e uma pergunta aberta que abre espaco para a causa, que pode nem ser da pessoa." },
              { v: "Preciso que voce se comprometa mais com os prazos", correta: false,
                explicacao: "Presume falta de comprometimento sem investigar. Se a causa for excesso de demanda, a conversa comeca errada." },
              { v: "Deixa comigo os proximos, para nao atrasar de novo", correta: false,
                explicacao: "Remove o problema da pessoa, tira o aprendizado e sobrecarrega voce." }
            ] }
        ]
      },
      {
        id: "lideranca.m6",
        n: 6,
        titulo: "Conversas dificeis",
        h: 15,
        objetivo: "Conduzir conversas que voce vem adiando, sem rodeio e sem crueldade.",
        topicos: ["preparacao", "abertura", "escuta sob tensao", "combinado final"],
        aula: {
          objetivo: "Ao terminar, voce tem um roteiro para conduzir a conversa que esta adiando ha semanas.",
          blocos: [
            { t: "texto", v: "Toda pessoa que lidera tem uma conversa adiada. Desempenho abaixo, comportamento que incomoda o time, expectativa de promocao que nao vai acontecer. Adiar parece gentileza e e o contrario: a pessoa perde tempo sem saber." },
            { t: "destaque", v: "Clareza no momento certo e o ato mais generoso de quem lidera. Ambiguidade prolongada custa a carreira do outro." },
            { t: "subtitulo", v: "Preparacao, quinze minutos" },
            { t: "lista", ordenada: true, v: [
              "Escreva o fato em uma frase, sem adjetivo.",
              "Escreva o impacto, concreto.",
              "Escreva o resultado que voce quer da conversa.",
              "Liste o que voce ainda nao sabe e precisa perguntar.",
              "Decida o que e negociavel e o que nao e."
            ] },
            { t: "subtitulo", v: "Abertura" },
            { t: "texto", v: "Va direto, com respeito. Preciso conversar sobre uma coisa dificil, e prefiro te falar agora a deixar acumular. A abertura longa ou o rodeio aumentam a ansiedade e pioram a escuta." },
            { t: "subtitulo", v: "No meio" },
            { t: "tabela", cab: ["A pessoa", "Voce"], linhas: [
              ["Fica em silencio", "espere. Nao preencha o silencio."],
              ["Chora ou se emociona", "reconheca, ofereca pausa, nao mude o conteudo"],
              ["Discorda do fato", "volte ao dado concreto; se estiver errado, corrija-se"],
              ["Culpa outra pessoa", "registre e traga de volta para o que esta na mao dela"],
              ["Ataca", "encerre e remarque; nada de util acontece a partir dai"]
            ] },
            { t: "subtitulo", v: "Fechamento" },
            { t: "texto", v: "Toda conversa dificil termina com um combinado concreto e uma data. Sem isso, foi desabafo. Escreva o combinado e mande no mesmo dia, em duas ou tres linhas." },
            { t: "aviso", v: "Nao comece uma conversa dificil sexta as 18h. A pessoa passa o fim de semana com aquilo e sem ninguem para conversar. Segunda ou terca, de manha." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um analista espera promocao ha oito meses e menciona isso em toda conversa. Voce sabe que nao vai sair este ano e vem desviando do assunto para nao desmotivar." },
              { t: "texto", v: "Ele recusou uma proposta externa em abril contando com a promocao. Quando a conversa finalmente acontece, o dano nao e a noticia: e ter deixado a pessoa decidir a carreira dela com informacao que voce ja tinha." }
            ]
          },
          resumo: [
            "Adiar nao e gentileza; e transferir o custo para o outro.",
            "Quinze minutos de preparacao mudam a conversa inteira.",
            "Silencio nao precisa ser preenchido.",
            "Sem combinado e data, foi desabafo."
          ],
          aplicar: [
            "Liste as conversas que voce esta adiando e escreva o fato de cada uma em uma frase.",
            "Marque a mais antiga para os proximos sete dias.",
            "Escreva o combinado no mesmo dia da conversa."
          ]
        },
        itens: [
          { id: "lideranca.m6.i1", tipo: "externo", titulo: "Conversas dificeis — material de apoio",
            fonte: "Harvard Negotiation Project", url: "https://www.pon.harvard.edu/category/daily/conflict-resolution/", h: 4 },
          { id: "lideranca.m6.i2", tipo: "externo", titulo: "Radical Candor — desafiar diretamente",
            fonte: "Radical Candor", url: "https://www.radicalcandor.com/blog", h: 3 },
          { id: "lideranca.m6.i3", tipo: "entregavel",
            titulo: "Conduzir a conversa mais antiga da sua lista de adiadas", h: 4 },
          { id: "lideranca.m6.i4", tipo: "pratica",
            titulo: "Escrever o roteiro de preparacao de tres conversas pendentes", h: 4 }
        ],
        exercicios: [
          { id: "lideranca.m6.e1", tipo: "reflexao",
            enunciado: "Prepare a conversa que voce esta adiando.",
            perguntas: [
              "Qual conversa voce esta adiando ha mais tempo, e ha quanto tempo?",
              "Qual e o fato concreto, em uma frase, sem nenhum adjetivo?",
              "Qual o custo para a outra pessoa de continuar sem saber disso?",
              "Qual e o combinado que voce quer ter ao final da conversa?"
            ],
            minimoCaracteres: 400 }
        ]
      }
    ]
  });

  /* ===================================================================== F3 */
  fases.push({
    id: "lideranca.f3",
    n: 3,
    nome: "Desenvolver pessoas",
    cor: "--f3",
    modulos: [
      {
        id: "lideranca.m7",
        n: 7,
        titulo: "Reuniao individual eficaz",
        h: 12,
        objetivo: "Usar a conversa individual para desenvolver, e nao para acompanhar tarefa.",
        topicos: ["pauta", "frequencia", "escuta", "registro"],
        aula: {
          objetivo: "Ao terminar, voce conduz uma reuniao individual que a pessoa considera util.",
          blocos: [
            { t: "texto", v: "A reuniao individual e o principal instrumento de quem lidera, e o mais desperdicado. Quando vira relatorio de status, duplica o que ja esta no quadro de tarefas e todo mundo passa a querer cancelar." },
            { t: "destaque", v: "A reuniao individual e da pessoa, nao sua. Se voce falou mais da metade do tempo, foi reuniao de status." },
            { t: "subtitulo", v: "Estrutura de trinta minutos" },
            { t: "tabela", cab: ["Tempo", "Assunto", "Quem conduz"], linhas: [
              ["10 min", "o que a pessoa quiser trazer", "ela"],
              ["10 min", "obstaculos e o que voce pode destravar", "ela"],
              ["5 min", "o que voce precisa dizer", "voce"],
              ["5 min", "desenvolvimento e proximos passos", "os dois"]
            ] },
            { t: "subtitulo", v: "Frequencia e constancia" },
            { t: "texto", v: "Quinzenal cumprida vale mais que semanal cancelada. Remarcar sempre comunica prioridade baixa, e a pessoa para de guardar assunto para a conversa. Uma vez marcada, a individual so cai por emergencia real." },
            { t: "subtitulo", v: "Perguntas que funcionam" },
            { t: "lista", v: [
              "O que esta te travando esta semana?",
              "Tem algo que voce esta evitando me contar?",
              "O que voce faria diferente se pudesse decidir sozinho?",
              "O que voce quer estar fazendo daqui a um ano?",
              "Como eu posso ajudar mais? E o que eu deveria parar de fazer?"
            ] },
            { t: "subtitulo", v: "Registro" },
            { t: "texto", v: "Anote combinados e temas recorrentes. Retomar na conversa seguinte um assunto que a pessoa levantou ha duas semanas e a demonstracao mais concreta de que voce escuta." },
            { t: "aviso", v: "Nao transforme a individual em cobranca de prazo. Prazo se acompanha no ritual da equipe. Misturar os dois faz a pessoa chegar defensiva e a conversa perde a funcao." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "As individuais do time viraram trinta minutos de leitura do quadro de tarefas. Em tres meses, duas pessoas pediram para reduzir a frequencia, e uma pediu demissao citando falta de perspectiva." },
              { t: "texto", v: "Mudar a primeira pergunta de como estao as tarefas para o que esta te travando mudou a conversa inteira, sem mudar a duracao nem a frequencia." }
            ]
          },
          resumo: [
            "A individual e da pessoa; status tem outro ritual.",
            "Quinzenal cumprida vale mais que semanal cancelada.",
            "Se voce falou mais da metade, nao foi individual.",
            "Retomar assunto antigo prova que voce escutou."
          ],
          aplicar: [
            "Comece a proxima individual com o que esta te travando.",
            "Anote os combinados e retome-os na conversa seguinte.",
            "Verifique quantas individuais voce remarcou nos ultimos dois meses."
          ]
        },
        itens: [
          { id: "lideranca.m7.i1", tipo: "externo", titulo: "Manager Tools — reunioes individuais",
            fonte: "Manager Tools", url: "https://www.manager-tools.com/manager-tools-basics", h: 4 },
          { id: "lideranca.m7.i2", tipo: "externo", titulo: "Atlassian — praticas de acompanhamento de time",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "lideranca.m7.i3", tipo: "entregavel",
            titulo: "Modelo de pauta de individual, testado por um mes com o time", h: 6 }
        ],
        exercicios: [
          { id: "lideranca.m7.e1", tipo: "quiz",
            enunciado: "Sua individual de trinta minutos vira sempre relatorio de status. Qual e o ajuste mais eficaz?",
            alternativas: [
              { v: "Reduzir para quinze minutos, ja que e so status", correta: false,
                explicacao: "Encolhe o sintoma e elimina de vez o espaco de desenvolvimento." },
              { v: "Comecar pedindo que a pessoa traga a pauta, e acompanhar status no ritual da equipe", correta: true,
                explicacao: "Devolve a conversa para a pessoa e move o status para onde ele pertence, sem perder nenhum dos dois." },
              { v: "Mandar um formulario antes para ela preencher o status", correta: false,
                explicacao: "Melhora a eficiencia do status e continua sem abrir espaco para desenvolvimento." },
              { v: "Cancelar as individuais e falar no dia a dia", correta: false,
                explicacao: "O dia a dia trata do urgente. Assunto de carreira e obstaculo raramente aparece sem espaco reservado." }
            ] }
        ]
      },
      {
        id: "lideranca.m8",
        n: 8,
        titulo: "PDI e carreira",
        h: 15,
        objetivo: "Construir com cada pessoa um plano de desenvolvimento que ela realmente siga.",
        topicos: ["diagnostico", "objetivo", "acao concreta", "acompanhamento"],
        aula: {
          objetivo: "Ao terminar, voce monta um plano de desenvolvimento curto, especifico e acompanhado.",
          blocos: [
            { t: "texto", v: "Plano de desenvolvimento morre por dois motivos: e generico demais para virar acao, ou e ambicioso demais para caber na semana. O bom plano tem poucas frentes e prazos curtos." },
            { t: "destaque", v: "Tres objetivos por semestre, com acao mensal, valem mais que dez objetivos anuais que ninguem revisita." },
            { t: "subtitulo", v: "Diagnostico antes do plano" },
            { t: "texto", v: "Onde a pessoa esta hoje, onde ela quer chegar, e qual e a distancia. Sem os tres, o plano vira lista de cursos. E a resposta de onde quer chegar e dela, nao sua, mesmo quando voce discorda do destino." },
            { t: "subtitulo", v: "Setenta, vinte, dez" },
            { t: "tabela", cab: ["Proporcao", "Forma", "Exemplo em dados"], linhas: [
              ["70%", "no trabalho real", "assumir a modelagem do proximo projeto"],
              ["20%", "com outras pessoas", "revisao de codigo com alguem mais experiente"],
              ["10%", "estudo formal", "curso de estatistica inferencial"]
            ] },
            { t: "texto", v: "Plano feito so de curso e o mais comum e o menos eficaz. A pessoa faz o curso, nao aplica, e seis meses depois nao lembra. A pergunta que fecha o plano e: em qual entrega real isso vai ser usado?" },
            { t: "subtitulo", v: "Acompanhamento" },
            { t: "texto", v: "Plano sem revisao mensal e documento de gaveta. Cinco minutos na individual, uma vez por mes, sustentam o plano inteiro. Sem esse ritual, nenhum formato de PDI funciona." },
            { t: "aviso", v: "Nao prometa promocao em PDI. Prometa desenvolvimento e clareza sobre criterios. Promocao depende de vaga, orcamento e momento, coisas que voce nao controla sozinho." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "O PDI de uma analista listava seis cursos e nenhuma aplicacao. Ao final do semestre, tres cursos concluidos e nenhuma mudanca perceptivel no trabalho." },
              { t: "texto", v: "A versao seguinte tinha um objetivo: conduzir sozinha o relatorio gerencial trimestral. O curso de comunicacao entrou como apoio, e a evolucao ficou visivel para ela e para a diretoria." }
            ]
          },
          resumo: [
            "Plano generico nao vira acao; plano longo nao cabe na semana.",
            "O destino e da pessoa, mesmo quando voce discorda.",
            "A maior parte do desenvolvimento acontece no trabalho real.",
            "Sem revisao mensal, o plano e documento de gaveta."
          ],
          aplicar: [
            "Monte com uma pessoa do time um plano de tres objetivos para o semestre.",
            "Para cada objetivo, defina em qual entrega real ele sera aplicado.",
            "Reserve cinco minutos mensais na individual para revisar o plano."
          ]
        },
        itens: [
          { id: "lideranca.m8.i1", tipo: "externo", titulo: "Modelo 70-20-10 de desenvolvimento",
            fonte: "Center for Creative Leadership", url: "https://www.ccl.org/articles/leading-effectively-articles/70-20-10-rule/", h: 2 },
          { id: "lideranca.m8.i2", tipo: "externo", titulo: "Cursos gratuitos para desenvolvimento de equipe",
            fonte: "Escola Virtual Gov", url: "https://www.escolavirtual.gov.br/", h: 4 },
          { id: "lideranca.m8.i3", tipo: "entregavel",
            titulo: "PDI construido com uma pessoa do time, com revisao mensal marcada", h: 6 }
        ],
        exercicios: [
          { id: "lideranca.m8.e1", tipo: "quiz",
            enunciado: "Um analista quer virar cientista de dados, area onde nao ha vaga prevista na empresa. Como conduzir o PDI?",
            alternativas: [
              { v: "Redirecionar o plano para o que a empresa precisa hoje", correta: false,
                explicacao: "Ignora o objetivo da pessoa. Ela vai buscar o desenvolvimento fora, e sem te contar." },
              { v: "Ser claro sobre a ausencia de vaga e construir o plano com projetos internos que usem essas habilidades", correta: true,
                explicacao: "Junta honestidade sobre a realidade com desenvolvimento real. Se a vaga surgir, ela esta pronta; se ela sair, sai bem preparada e sem ressentimento." },
              { v: "Prometer a vaga quando o orcamento permitir", correta: false,
                explicacao: "Promessa sobre o que voce nao controla e a forma mais rapida de perder credibilidade." },
              { v: "Sugerir que ela procure oportunidade fora", correta: false,
                explicacao: "Empurra a pessoa para fora antes de tentar aproveitar internamente uma capacidade que a empresa poderia usar." }
            ] }
        ]
      },
      {
        id: "lideranca.m9",
        n: 9,
        titulo: "Delegar para desenvolver",
        h: 12,
        objetivo: "Passar trabalho de um jeito que forme gente, e nao apenas tire tarefa da sua mesa.",
        topicos: ["nivel de delegacao", "criterio de escolha", "acompanhamento", "erro tolerado"],
        aula: {
          objetivo: "Ao terminar, voce delega definindo explicitamente o nivel de autonomia.",
          blocos: [
            { t: "texto", v: "Delegar mal e mais caro que nao delegar. A tarefa volta errada, voce refaz, e a pessoa aprende que nao adianta tentar. Delegar bem exige combinar tres coisas: resultado esperado, autonomia e ponto de checagem." },
            { t: "subtitulo", v: "Niveis de autonomia" },
            { t: "tabela", cab: ["Nivel", "Combinado"], linhas: [
              ["1", "faca exatamente como combinamos"],
              ["2", "levante as opcoes e me traga para decidirmos"],
              ["3", "decida, me avise antes de executar"],
              ["4", "decida, execute e me avise depois"],
              ["5", "decida, execute e me conte se der problema"]
            ] },
            { t: "destaque", v: "A maior parte dos conflitos de delegacao e desalinhamento de nivel: voce achou que era 4 e a pessoa achou que era 2." },
            { t: "subtitulo", v: "O que delegar primeiro" },
            { t: "lista", v: [
              "O que voce faz por habito, mas outra pessoa faria igual.",
              "O que desenvolve alguem em uma direcao que ela quer.",
              "O que aparece com frequencia, para o aprendizado se pagar.",
              "O que voce faz mal ou com atraso por falta de tempo."
            ] },
            { t: "texto", v: "Nao delegue apenas a tarefa chata. Delegar so o desagradavel destroi a confianca e sinaliza que autonomia e castigo." },
            { t: "subtitulo", v: "Erro tolerado" },
            { t: "texto", v: "Defina antes qual o tamanho de erro aceitavel nessa delegacao. Se nenhum erro e aceitavel, o nivel de autonomia e baixo e voce precisa acompanhar de perto. Se ha margem, diga isso: prefiro que voce tente e erre a que voce me pergunte tudo." },
            { t: "aviso", v: "Retomar a tarefa no primeiro tropeco ensina que delegacao e teste, nao confianca. Se o custo do erro permite, deixe seguir e converse depois." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce delega a construcao de um painel e pede para ver antes de publicar. A pessoa entende que deve trazer cada decisao, e passa a perguntar cor, titulo e ordem dos visuais." },
              { t: "texto", v: "O combinado que faltava era o nivel: decida a construcao inteira, me mostre antes de publicar apenas o resultado final. Uma frase resolve semanas de idas e vindas." }
            ]
          },
          resumo: [
            "Delegar mal custa mais que nao delegar.",
            "Conflito de delegacao e quase sempre desalinhamento de nivel.",
            "Delegar so o desagradavel destroi a confianca.",
            "Retomar no primeiro tropeco ensina que era teste."
          ],
          aplicar: [
            "Na proxima delegacao, diga em voz alta qual e o nivel de autonomia.",
            "Liste tres tarefas suas que outra pessoa faria igual e delegue uma.",
            "Defina o erro tolerado antes de entregar a tarefa."
          ]
        },
        itens: [
          { id: "lideranca.m9.i1", tipo: "externo", titulo: "Niveis de delegacao",
            fonte: "Management 3.0", url: "https://management30.com/practice/delegation-poker/", h: 2 },
          { id: "lideranca.m9.i2", tipo: "externo", titulo: "Atlassian Team Playbook — papeis e responsabilidades",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "lideranca.m9.i3", tipo: "entregavel",
            titulo: "Tres delegacoes feitas com nivel declarado e ponto de checagem combinado", h: 6 }
        ],
        exercicios: [
          { id: "lideranca.m9.e1", tipo: "reflexao",
            enunciado: "Revise sua delegacao atual.",
            perguntas: [
              "Quais tres tarefas voce faz hoje que outra pessoa do time faria igual ou melhor?",
              "Em qual delegacao recente houve desalinhamento de nivel de autonomia?",
              "Que tamanho de erro voce consegue tolerar na proxima delegacao, e ja disse isso a pessoa?"
            ],
            minimoCaracteres: 350 }
        ]
      }
    ]
  });

  /* ===================================================================== F4 */
  fases.push({
    id: "lideranca.f4",
    n: 4,
    nome: "Influencia e mudanca",
    cor: "--f4",
    modulos: [
      {
        id: "lideranca.m10",
        n: 10,
        titulo: "Influencia sem autoridade",
        h: 15,
        objetivo: "Fazer acontecer com areas que nao se reportam a voce.",
        topicos: ["interesse do outro", "aliados", "moeda de troca", "timing"],
        aula: {
          objetivo: "Ao terminar, voce prepara uma proposta a partir do interesse de quem precisa aprova-la.",
          blocos: [
            { t: "texto", v: "Lider de dados depende de TI, financeiro, comercial e diretoria, e nao manda em nenhum deles. Influencia deixa de ser habilidade desejavel e vira condicao de trabalho." },
            { t: "destaque", v: "Ninguem adota uma ideia pelos motivos de quem propoe. Adota pelos proprios motivos. Descobrir esses motivos e o trabalho." },
            { t: "subtitulo", v: "Antes de propor" },
            { t: "lista", ordenada: true, v: [
              "Qual problema essa pessoa tem hoje que a minha proposta resolve?",
              "O que ela perde se isso acontecer? Tempo, controle, visibilidade?",
              "Quem ela escuta antes de decidir?",
              "O que eu posso oferecer em troca?",
              "Qual o pior momento para falar disso, e quando e o melhor?"
            ] },
            { t: "subtitulo", v: "Traduza para a moeda do outro" },
            { t: "tabela", cab: ["Area", "O que importa para ela"], linhas: [
              ["TI", "estabilidade, seguranca, nao virar plantao"],
              ["Financeiro", "previsibilidade, custo, conformidade"],
              ["Comercial", "velocidade, autonomia, meta batida"],
              ["Diretoria", "risco, resultado, comparacao com o mercado"]
            ] },
            { t: "texto", v: "Levar para TI uma proposta que fala de agilidade analitica nao emplaca. A mesma proposta apresentada como reduz em 80% os chamados de extracao manual emplaca. O projeto e o mesmo." },
            { t: "subtitulo", v: "Aliado antes da reuniao" },
            { t: "texto", v: "Proposta apresentada pela primeira vez em reuniao grande morre. Converse antes, individualmente, com quem tem peso na decisao. Chegue na reuniao com dois apoios ja combinados e as objecoes ja ouvidas." },
            { t: "aviso", v: "Nao confunda influencia com insistencia. Repetir a mesma proposta com mais enfase transforma um nao circunstancial em um nao definitivo." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma proposta de padronizar as extracoes foi recusada tres vezes pela TI, apresentada sempre como melhoria da governanca de dados." },
              { t: "texto", v: "Na quarta, foi apresentada como reducao dos chamados de extracao, que ocupavam duas pessoas da TI por semana, com o numero de chamados do trimestre ao lado. Foi aprovada na mesma reuniao. O projeto nao mudou; mudou a moeda." }
            ]
          },
          resumo: [
            "As pessoas adotam ideias pelos proprios motivos.",
            "Traduza a proposta para a moeda de quem decide.",
            "Converse antes; reuniao grande nao e lugar de estreia.",
            "Insistir com mais enfase transforma nao em nunca."
          ],
          aplicar: [
            "Pegue uma proposta travada e escreva o que a outra area ganha com ela.",
            "Antes da proxima reuniao decisoria, converse com duas pessoas em separado."
          ]
        },
        itens: [
          { id: "lideranca.m10.i1", tipo: "externo", titulo: "Program on Negotiation — artigos gratuitos",
            fonte: "Harvard PON", url: "https://www.pon.harvard.edu/category/daily/negotiation-skills-daily/", h: 4 },
          { id: "lideranca.m10.i2", tipo: "externo", titulo: "Atlassian Team Playbook — alinhamento entre times",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "lideranca.m10.i3", tipo: "entregavel",
            titulo: "Proposta travada reescrita na linguagem da area que precisa aprovar", h: 6 }
        ],
        exercicios: [
          { id: "lideranca.m10.e1", tipo: "quiz",
            enunciado: "A TI recusou duas vezes o seu pedido de acesso a uma base. Qual e o proximo passo mais eficaz?",
            alternativas: [
              { v: "Escalar para a diretoria e pedir que determinem o acesso", correta: false,
                explicacao: "Pode funcionar uma vez e cria um adversario permanente numa area de que voce depende toda semana." },
              { v: "Conversar com quem recusou para entender o risco que preocupa, e propor um caminho que enderece esse risco", correta: true,
                explicacao: "Recusa repetida costuma esconder um risco nao dito, como seguranca ou carga no servidor. Enderecar o risco transforma o nao em como." },
              { v: "Refazer o pedido com mais detalhes tecnicos", correta: false,
                explicacao: "Se a objecao nao era falta de detalhe, mais detalhe nao muda nada." },
              { v: "Buscar o dado por outro caminho, sem envolver a TI", correta: false,
                explicacao: "Contorna o controle, cria risco real e queima a relacao quando for descoberto." }
            ] }
        ]
      },
      {
        id: "lideranca.m11",
        n: 11,
        titulo: "Liderar mudanca",
        h: 15,
        objetivo: "Conduzir mudanca de processo ou ferramenta sem perder o time no caminho.",
        topicos: ["resistencia", "adocao", "comunicacao da mudanca", "primeiros resultados"],
        aula: {
          objetivo: "Ao terminar, voce planeja uma mudanca considerando o custo dela para quem vai viver com ela.",
          blocos: [
            { t: "texto", v: "Toda mudanca de ferramenta ou processo pede que alguem abandone algo que ja domina para virar iniciante de novo. Resistencia raramente e teimosia: e uma avaliacao racional desse custo." },
            { t: "destaque", v: "Antes de chamar de resistencia, pergunte o que a pessoa perde com a mudanca. Quase sempre existe uma resposta concreta, e quase sempre ela tem razao em parte." },
            { t: "subtitulo", v: "O que faz uma mudanca pegar" },
            { t: "lista", ordenada: true, v: [
              "Um problema que quem vai mudar reconhece como problema.",
              "Um ganho visivel nas primeiras semanas, nao no ano que vem.",
              "Alguem respeitado pelo grupo usando primeiro.",
              "Caminho de volta declarado, para reduzir o medo.",
              "Tempo de aprendizado reservado na agenda, nao no fim de semana."
            ] },
            { t: "subtitulo", v: "Comunicar" },
            { t: "texto", v: "Explique o problema antes da solucao. Quem so ouve vamos migrar para a ferramenta X entende que alguem se empolgou. Quem ouve gastamos 12 horas por semana consolidando planilha na mao e por isso vamos migrar entende a razao e ajuda." },
            { t: "subtitulo", v: "Comece pequeno" },
            { t: "texto", v: "Um piloto com uma equipe e um processo, com resultado medido, vale mais que uma migracao geral anunciada em reuniao. O piloto gera prova, gera aprendizado e reduz o custo do erro." },
            { t: "aviso", v: "Nao anuncie mudanca sem plano de transicao. Duas semanas de sistema antigo e novo funcionando ao mesmo tempo custam menos que uma semana de operacao parada." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A migracao dos relatorios de Excel para Power BI foi anunciada com data e treinamento coletivo. Tres meses depois, metade da area continuava usando as planilhas em paralelo." },
              { t: "texto", v: "O motivo apareceu numa conversa individual: no Excel a pessoa conseguia ajustar o numero na hora, antes de uma reuniao. O painel nao permitia. A solucao foi criar uma visao editavel para esse caso, e a adocao aconteceu em semanas." }
            ]
          },
          resumo: [
            "Resistencia costuma ser avaliacao racional de perda.",
            "Ganho visivel cedo importa mais que ganho grande depois.",
            "Explique o problema antes da solucao.",
            "Piloto medido vale mais que anuncio geral."
          ],
          aplicar: [
            "Em uma mudanca em andamento, pergunte a tres pessoas o que elas perdem com ela.",
            "Defina o ganho que aparece nas primeiras duas semanas.",
            "Escolha uma equipe piloto e meca o resultado antes de expandir."
          ]
        },
        itens: [
          { id: "lideranca.m11.i1", tipo: "externo", titulo: "Gestao de mudanca — fundamentos",
            fonte: "MIT Sloan Management Review", url: "https://sloanreview.mit.edu/topic/leadership/", h: 4 },
          { id: "lideranca.m11.i2", tipo: "externo", titulo: "Adocao de ferramentas e mudanca de processo",
            fonte: "Atlassian", url: "https://www.atlassian.com/team-playbook", h: 2 },
          { id: "lideranca.m11.i3", tipo: "entregavel",
            titulo: "Plano de piloto para uma mudanca da sua area, com metrica e caminho de volta", h: 8 }
        ],
        exercicios: [
          { id: "lideranca.m11.e1", tipo: "quiz",
            enunciado: "Tres meses apos a migracao para um novo painel, metade da area continua usando as planilhas antigas. Qual o primeiro passo?",
            alternativas: [
              { v: "Desativar as planilhas antigas para forcar a adocao", correta: false,
                explicacao: "Remove a alternativa sem remover o motivo. Quem usava por necessidade real fica sem saida e o problema vira crise." },
              { v: "Perguntar a quem nao migrou o que a planilha faz que o painel nao faz", correta: true,
                explicacao: "Uso paralelo persistente e sinal de lacuna funcional, nao de teimosia. A resposta costuma ser especifica e resolvivel." },
              { v: "Repetir o treinamento", correta: false,
                explicacao: "Trata como falta de conhecimento algo que provavelmente e falta de recurso." },
              { v: "Escalar para a diretoria cobrar a adocao", correta: false,
                explicacao: "Cobranca de cima gera adocao aparente: a pessoa abre o painel e continua decidindo pela planilha." }
            ] }
        ]
      },
      {
        id: "lideranca.m12",
        n: 12,
        titulo: "Lideranca em crise",
        h: 12,
        objetivo: "Conduzir o time quando algo grave acontece, sem piorar a situacao.",
        topicos: ["prioridade", "comunicacao sob pressao", "protecao do time", "aprendizado depois"],
        aula: {
          objetivo: "Ao terminar, voce sabe o que fazer nas primeiras duas horas de um incidente e o que fazer depois.",
          blocos: [
            { t: "texto", v: "Em area de dados, crise tem cara conhecida: numero errado na diretoria, base indisponivel no fechamento, vazamento de informacao. O que voce faz nas primeiras duas horas define o estrago." },
            { t: "subtitulo", v: "Primeiras duas horas" },
            { t: "lista", ordenada: true, v: [
              "Estabilize antes de investigar. Pare de piorar.",
              "Comunique o que se sabe, o que nao se sabe e quando havera nova informacao.",
              "Defina uma pessoa responsavel pela correcao e outra pela comunicacao.",
              "Registre o que esta sendo feito, em ordem, com horario.",
              "Adie a busca por culpado. Ela atrapalha a correcao."
            ] },
            { t: "destaque", v: "Comunicar cedo com informacao incompleta e melhor que comunicar tarde com informacao completa. O silencio e preenchido por especulacao." },
            { t: "subtitulo", v: "O que dizer quando ainda nao se sabe" },
            { t: "texto", v: "Identificamos divergencia no relatorio de recebiveis publicado hoje. Estamos apurando a causa. Ate as 15h enviamos uma atualizacao, com ou sem conclusao. Recomendamos nao usar o numero ate la. Esse texto pode ser escrito em cinco minutos e evita decisao errada." },
            { t: "subtitulo", v: "Proteger o time" },
            { t: "texto", v: "Publicamente, o erro e da area. Individualmente, a conversa acontece depois e em particular. Expor a pessoa na hora nao corrige nada e garante que o proximo erro sera escondido." },
            { t: "subtitulo", v: "Depois: aprender sem punir" },
            { t: "texto", v: "Analise de incidente serve para achar a falha do processo, nao a pessoa. Todo erro humano que derruba um processo revela um processo que dependia de ninguem errar. A pergunta util e: o que permitiu que esse erro chegasse ate aqui?" },
            { t: "aviso", v: "Analise de incidente que termina em falta de atencao nao produz nenhuma melhoria. Atencao nao e controle: ela falha, e o processo precisa sobreviver a isso." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um relatorio de recebiveis foi publicado com valores duplicados e circulou por duas horas antes de alguem notar. A primeira reacao do time foi procurar quem tinha rodado a carga." },
              { t: "texto", v: "A analise depois mostrou que a carga podia ser executada duas vezes sem protecao nenhuma, por qualquer pessoa, sem aviso. A correcao foi tecnica e permanente. Se tivesse parado no nome de quem executou, o mesmo erro voltaria." }
            ]
          },
          resumo: [
            "Estabilize antes de investigar.",
            "Comunicar cedo e incompleto vence comunicar tarde e completo.",
            "Publicamente o erro e da area; a conversa individual vem depois.",
            "Analise que termina em falta de atencao nao melhora nada."
          ],
          aplicar: [
            "Escreva o modelo de comunicado de incidente da sua area, com campos a preencher.",
            "Faca a analise do ultimo incidente perguntando o que permitiu que ele chegasse ate ali.",
            "Defina quem comunica e quem corrige, antes do proximo incidente acontecer."
          ]
        },
        itens: [
          { id: "lideranca.m12.i1", tipo: "externo", titulo: "Postmortem sem culpados",
            fonte: "Google SRE", url: "https://sre.google/sre-book/postmortem-culture/", h: 3 },
          { id: "lideranca.m12.i2", tipo: "externo", titulo: "Gestao de incidentes",
            fonte: "Atlassian", url: "https://www.atlassian.com/incident-management", h: 3 },
          { id: "lideranca.m12.i3", tipo: "entregavel",
            titulo: "Modelo de comunicado de incidente e definicao de papeis da sua area", h: 6 }
        ],
        exercicios: [
          { id: "lideranca.m12.e1", tipo: "reflexao",
            enunciado: "Prepare a sua area para o proximo incidente.",
            perguntas: [
              "Qual foi o ultimo incidente de dado da sua area, e quanto tempo levou ate alguem perceber?",
              "O que permitiu que aquele erro chegasse ate quem usou o numero?",
              "Quem comunica e quem corrige, no proximo incidente? Isso ja esta combinado com essas pessoas?"
            ],
            minimoCaracteres: 400 }
        ]
      }
    ]
  });


  window.PDC.trilhas.registrar({
    id: "lideranca",
    nome: "Lideranca",
    desc: "O lado humano da lideranca tecnica: confianca, comunicacao, desenvolvimento de pessoas e influencia.",
    icone: "usuario",
    cor1: "--t-lideranca",
    cor2: "--t-lideranca",
    tipoPratica: "quiz",
    horas: 165,
    marcos: [
      { moduloId: "lideranca.m6", rotulo: "Conversas dificeis sem adiar",
        texto: "Ao concluir a Fase 2 voce conduz feedback e conversa dificil sem adiar por semanas. E a mudanca que o time percebe primeiro." }
    ],
    fases: fases
  });
})();
