/* exemplo.js — TRILHA DE DEMONSTRACAO.

   Existe apenas para a Etapa 5, para exercitar as telas com dados reais de
   estrutura. O conteudo verdadeiro das 5 trilhas entra na Etapa 6, em
   js/trilhas/dados.js, engenharia.js, gestao.js, lideranca.js e
   desenvolvimento.js. Este arquivo sai do index.html quando isso acontecer.

   Segue integralmente os contratos de docs/ARQUITETURA.md §3. */

(function () {
  "use strict";

  window.PDC.trilhas.registrar({
    id: "exemplo",
    nome: "Trilha de demonstracao",
    desc: "Conteudo de exemplo para conferir as telas. Sai do ar na Etapa 6, quando entram as trilhas de verdade.",
    icone: "trilha",
    cor1: "--t-dados",
    cor2: "--t-engenharia",
    tipoPratica: "python",
    horas: 80,
    marcos: [
      { moduloId: "exemplo.m3", rotulo: "Meio do caminho",
        texto: "Exemplo de marco: aqui o portal mostra um recado seu para voce mesmo." }
    ],
    fases: [
      {
        id: "exemplo.f1",
        n: 1,
        nome: "Fundamentos",
        cor: "--f1",
        modulos: [
          {
            id: "exemplo.m1",
            n: 1,
            titulo: "Estatistica descritiva",
            h: 30,
            objetivo: "Descrever um conjunto de dados sem enganar quem le.",
            topicos: ["media e mediana", "dispersao", "distribuicao"],
            aula: {
              objetivo: "Ao terminar, voce escolhe a medida certa para resumir um dado e sabe dizer quando a media mente.",
              blocos: [
                { t: "texto", v: "Resumir dado e escolher o que jogar fora. Toda medida resumo descarta informacao: a questao e descartar o que nao importa para a decisao em jogo." },
                { t: "subtitulo", v: "Media, mediana e moda" },
                { t: "texto", v: "A media distribui o total igualmente entre todos. A mediana parte o conjunto ao meio. A moda e o valor mais frequente. Quando a distribuicao e simetrica as tres coincidem; quando nao e, a diferenca entre elas e a informacao mais util que voce tem." },
                { t: "destaque", v: "Se media e mediana estao longe uma da outra, existe cauda. Investigue a cauda antes de reportar qualquer numero." },
                { t: "lista", v: [
                  "Media: sensivel a valor extremo, boa para grandeza que soma.",
                  "Mediana: resistente a extremo, boa para valor tipico.",
                  "Moda: util em dado categorico, quase inutil em continuo."
                ] },
                { t: "subtitulo", v: "Dispersao" },
                { t: "texto", v: "Media sem dispersao e meia informacao. Desvio padrao diz o quanto os valores costumam se afastar da media, na mesma unidade do dado." },
                { t: "codigo", lang: "python", v: "df[\"ticket\"].describe()\n# count, mean, std, min, 25%, 50%, 75%, max" },
                { t: "aviso", v: "Erro comum: reportar media de um dado com cauda longa, como ticket de venda ou tempo de atendimento. Use mediana e mostre os percentis." }
              ],
              exemplo: {
                titulo: "No seu dia a dia",
                blocos: [
                  { t: "texto", v: "Um relatorio de vendas mostra ticket medio de R$ 4.200. A diretoria decide a meta com base nisso. Ao olhar a mediana, ela e R$ 1.800: alguns contratos grandes puxaram a media para cima e a meta virou inalcancavel para a maior parte do time." },
                  { t: "texto", v: "A correcao nao e trocar a media pela mediana e pronto. E mostrar as duas, com os percentis 25 e 75, e deixar a diretoria decidir sabendo que a distribuicao e torta." }
                ]
              },
              resumo: [
                "Toda medida resumo descarta informacao de proposito.",
                "Distancia entre media e mediana denuncia cauda.",
                "Media sem dispersao nao deveria sair do seu computador."
              ],
              aplicar: [
                "Pegue um indicador do seu painel atual e calcule media, mediana e percentis 25 e 75.",
                "Se media e mediana divergirem mais de 20%, acrescente a mediana ao painel.",
                "Escreva uma frase explicando a diferenca para quem le o relatorio."
              ]
            },
            itens: [
              { id: "exemplo.m1.i1", tipo: "playlist", titulo: "StatQuest — Statistics Fundamentals",
                fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
                embed: "PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", h: 6 },
              { id: "exemplo.m1.i2", tipo: "leitura", titulo: "Medidas de tendencia central",
                fonte: "Wikipedia", url: "https://pt.wikipedia.org/wiki/Medida_de_tend%C3%AAncia_central", h: 1 },
              { id: "exemplo.m1.i3", tipo: "pratica",
                titulo: "Calcular media, mediana e percentis de um indicador real do seu trabalho", h: 2 },
              { id: "exemplo.m1.i4", tipo: "entregavel",
                titulo: "Escrever um paragrafo explicando a distribuicao para a diretoria", h: 1 }
            ],
            exercicios: [
              { id: "exemplo.m1.e1", tipo: "python",
                enunciado: "Escreva a funcao resumo(valores) que devolve um dicionario com media e mediana.",
                starter: "def resumo(valores):\n    pass\n",
                teste: "assert resumo([1, 2, 3])[\"media\"] == 2\nassert resumo([1, 2, 3, 100])[\"mediana\"] == 2.5\n",
                gabarito: "def resumo(valores):\n    ordenados = sorted(valores)\n    n = len(ordenados)\n    meio = n // 2\n    mediana = ordenados[meio] if n % 2 else (ordenados[meio - 1] + ordenados[meio]) / 2\n    return {\"media\": sum(ordenados) / n, \"mediana\": mediana}\n",
                dica: "Lembre que a mediana de uma lista par e a media dos dois centrais." }
            ]
          },
          {
            id: "exemplo.m2",
            n: 2,
            titulo: "Python para dados",
            h: 20,
            objetivo: "Manipular tabelas em Python sem depender de planilha.",
            topicos: ["listas e dicionarios", "pandas", "leitura de arquivo"],
            aula: {
              objetivo: "Ao terminar, voce carrega um arquivo, filtra, agrupa e exporta o resultado.",
              blocos: [
                { t: "texto", v: "Quem vem do Excel ja pensa em tabela. A mudanca nao e conceitual, e de controle: em Python cada passo da transformacao fica escrito e pode ser repetido amanha, no mesmo arquivo ou em outro." },
                { t: "destaque", v: "A vantagem nao e velocidade. E reprodutibilidade: o mesmo codigo, o mesmo resultado, sempre." },
                { t: "codigo", lang: "python", v: "import pandas as pd\n\ndf = pd.read_csv(\"vendas.csv\")\nporUf = df.groupby(\"uf\")[\"valor\"].sum().sort_values(ascending=False)\nporUf.head(10)" },
                { t: "tabela", cab: ["Excel", "pandas"], linhas: [
                  ["PROCV", "merge"], ["Tabela dinamica", "groupby"], ["Filtro", "query ou mascara booleana"]
                ] }
              ],
              exemplo: {
                titulo: "No seu dia a dia",
                blocos: [
                  { t: "texto", v: "O relatorio mensal que voce monta na mao em duas horas vira um script de trinta linhas. No mes seguinte sao dois minutos, e o resultado nao depende de voce lembrar a ordem dos passos." }
                ]
              },
              resumo: [
                "Codigo troca esforco repetido por esforco unico.",
                "groupby resolve a maior parte do que a tabela dinamica faz."
              ],
              aplicar: [
                "Escolha um relatorio que voce refaz todo mes e escreva a leitura do arquivo em Python.",
                "Reproduza uma unica tabela dinamica com groupby."
              ]
            },
            itens: [
              { id: "exemplo.m2.i1", tipo: "playlist", titulo: "Curso em Video — Python",
                fonte: "Curso em Video", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
                embed: "PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6", h: 10 },
              { id: "exemplo.m2.i2", tipo: "externo", titulo: "Documentacao do pandas — 10 minutes to pandas",
                fonte: "pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", h: 2 },
              { id: "exemplo.m2.i3", tipo: "pratica", titulo: "Reproduzir um relatorio seu em pandas", h: 4 }
            ],
            exercicios: []
          }
        ]
      },
      {
        id: "exemplo.f2",
        n: 2,
        nome: "Aplicacao",
        cor: "--f2",
        modulos: [
          {
            id: "exemplo.m3",
            n: 3,
            titulo: "Visualizacao e storytelling",
            h: 20,
            objetivo: "Mostrar o dado de um jeito que leve a uma decisao.",
            topicos: ["escolha de grafico", "eixo e escala", "narrativa"],
            aula: {
              objetivo: "Ao terminar, voce escolhe o grafico pela pergunta, nao pelo habito.",
              blocos: [
                { t: "texto", v: "Grafico nao serve para mostrar dado, serve para responder pergunta. A pergunta define a forma: comparacao pede barra, evolucao pede linha, composicao pede empilhamento ou tabela, relacao pede dispersao." },
                { t: "aviso", v: "Grafico de pizza com mais de tres fatias e quase sempre uma tabela disfarcada." },
                { t: "citacao", v: "Acima de tudo, mostre os dados.", fonte: "Edward Tufte, The Visual Display of Quantitative Information",
                  url: "https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/" }
              ],
              exemplo: {
                titulo: "No seu dia a dia",
                blocos: [
                  { t: "texto", v: "Um painel de Power BI com doze visuais na mesma tela quase nunca responde a pergunta do diretor. Um visual grande com a resposta e tres pequenos com o detalhe respondem." }
                ]
              },
              resumo: ["A pergunta escolhe o grafico.", "Menos visuais por tela, mais resposta por visual."],
              aplicar: ["Abra um painel seu e escreva a pergunta que cada visual responde. Apague os que nao responderem nenhuma."]
            },
            itens: [
              { id: "exemplo.m3.i1", tipo: "playlist", titulo: "3Blue1Brown — Essence of Linear Algebra",
                fonte: "3Blue1Brown", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
                embed: "PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", h: 4 },
              { id: "exemplo.m3.i2", tipo: "entregavel", titulo: "Refazer um painel seu com metade dos visuais", h: 4 }
            ],
            exercicios: []
          },
          {
            id: "exemplo.m4",
            n: 4,
            titulo: "Projeto de fechamento",
            h: 10,
            objetivo: "Juntar tudo em uma entrega que da para mostrar.",
            topicos: ["escopo", "execucao", "apresentacao"],
            aula: {
              objetivo: "Ao terminar, voce tem um projeto pequeno, completo e apresentavel.",
              blocos: [
                { t: "texto", v: "Projeto de portfolio nao precisa ser grande, precisa ser inteiro: pergunta, dado, analise, conclusao e limitacao declarada." },
                { t: "lista", ordenada: true, v: [
                  "Escolha uma pergunta que alguem realmente faria.",
                  "Use dado publico ou dado seu, nunca dado da empresa.",
                  "Escreva a conclusao em uma frase antes de fazer o grafico.",
                  "Declare o que a analise nao responde."
                ] }
              ],
              exemplo: {
                titulo: "No seu dia a dia",
                blocos: [{ t: "texto", v: "Uma analise de dois graficos que responde uma pergunta clara vale mais numa entrevista do que um notebook de trezentas celulas sem conclusao." }]
              },
              resumo: ["Inteiro vale mais que grande.", "Limitacao declarada e sinal de maturidade."],
              aplicar: ["Escreva hoje a pergunta do seu projeto, em uma frase."]
            },
            itens: [
              { id: "exemplo.m4.i1", tipo: "entregavel", titulo: "Publicar o projeto no GitHub com README explicando a pergunta", h: 6 },
              { id: "exemplo.m4.i2", tipo: "pratica", titulo: "Apresentar o resultado para alguem em 5 minutos", h: 1 }
            ],
            exercicios: []
          }
        ]
      }
    ]
  });
})();
