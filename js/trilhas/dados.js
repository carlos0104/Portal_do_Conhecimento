/* dados.js — trilha Ciencia de Dados aplicada.
   6 fases, 18 modulos, 560 h. Marco "pronto para atuar" no modulo 12.
   Padrao editorial em docs/CONTEUDO.md. Contratos em docs/ARQUITETURA.md §3. */

(function () {
  "use strict";

  var fases = [];

  /* ===================================================================== F1 */
  fases.push({
    id: "dados.f1",
    n: 1,
    nome: "Fundamentos",
    cor: "--f1",
    modulos: [
      {
        id: "dados.m1",
        n: 1,
        titulo: "Python para dados",
        h: 40,
        objetivo: "Escrever scripts que leem, transformam e salvam dados sem depender de planilha.",
        topicos: ["tipos e estruturas", "funcoes", "arquivos", "ambiente"],
        aula: {
          objetivo: "Ao terminar, voce le um arquivo, transforma os dados e salva o resultado, tudo em codigo que roda de novo amanha.",
          blocos: [
            { t: "texto", v: "Quem vem do Excel ja pensa em tabela, formula e resultado. Python nao muda esse raciocinio, muda o registro dele: cada passo fica escrito, revisavel e repetivel. A troca nao e por velocidade, e por controle." },
            { t: "destaque", v: "A pergunta certa nao e \"Python e melhor que Excel\". E \"esse trabalho vai se repetir?\". Se vai, ele merece codigo." },
            { t: "subtitulo", v: "As quatro estruturas que resolvem quase tudo" },
            { t: "lista", v: [
              "Lista: sequencia ordenada, aceita repetido. E a coluna.",
              "Dicionario: par chave e valor. E a linha, ou o registro.",
              "Conjunto: sem repetido, sem ordem. Serve para deduplicar e comparar.",
              "Tupla: sequencia que nao muda. Serve para retornar mais de um valor."
            ] },
            { t: "codigo", lang: "python", v: "vendas = [1200, 890, 4300]\ncliente = {\"nome\": \"ACME\", \"uf\": \"GO\", \"valor\": 4300}\nufs = {\"GO\", \"SP\", \"GO\"}   # vira {\"GO\", \"SP\"}\n\ntotal = sum(vendas)\nmaior = max(vendas)" },
            { t: "subtitulo", v: "Funcao e o nome que voce da a uma decisao" },
            { t: "texto", v: "Toda vez que voce copia e cola tres linhas com uma pequena diferenca, ali tem uma funcao esperando para nascer. Funcao nao serve para economizar digitacao, serve para dar nome a uma regra de negocio e ter um lugar unico para corrigi-la." },
            { t: "codigo", lang: "python", v: "def classificar_ticket(valor):\n    if valor >= 5000:\n        return \"alto\"\n    if valor >= 1500:\n        return \"medio\"\n    return \"baixo\"\n\nclassificar_ticket(4300)   # 'medio'" },
            { t: "subtitulo", v: "Ler e escrever arquivo" },
            { t: "texto", v: "A maior parte do trabalho real comeca em um CSV ou XLSX que alguem exportou de um sistema. Ler com codigo obriga voce a declarar o separador, a codificacao e o tipo das colunas. Isso parece burocracia ate o dia em que a planilha transforma um CNPJ em notacao cientifica." },
            { t: "aviso", v: "Erro classico de quem vem do Excel: deixar o Python adivinhar o tipo. Codigo de cliente, CPF, CNPJ e CEP sao texto, nunca numero. Declare como texto na leitura ou perde o zero a esquerda." },
            { t: "subtitulo", v: "Ambiente" },
            { t: "texto", v: "Um ambiente virtual por projeto, com as versoes anotadas. Sem isso, o script que funcionava em marco quebra em junho porque uma biblioteca mudou. Custa dois comandos e evita uma tarde perdida." },
            { t: "codigo", lang: "python", v: "# no terminal\npython -m venv .venv\n.venv\\Scripts\\activate      # Windows\npip install pandas openpyxl\npip freeze > requirements.txt" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Todo mes voce baixa tres extracoes do ERP, cola numa planilha, aplica PROCV, filtra o que nao presta e manda para a diretoria. Sao duas horas. No mes seguinte voce refaz, e na terceira vez ja nao lembra por que aquela linha foi excluida." },
              { t: "texto", v: "Em Python isso vira um script de quarenta linhas com um comentario em cada regra de exclusao. A primeira execucao demora mais que as duas horas. A segunda demora dois minutos, e a regra de exclusao esta escrita, nao na sua memoria." },
              { t: "texto", v: "O ganho real nao e tempo. E que agora existe uma resposta para \"por que esse cliente saiu do relatorio?\"." }
            ]
          },
          resumo: [
            "Codigo vale a pena quando o trabalho se repete.",
            "Funcao e o lugar unico onde uma regra de negocio mora.",
            "Codigo de cliente, CPF e CNPJ sao texto. Sempre.",
            "Um ambiente virtual por projeto evita quebra silenciosa."
          ],
          aplicar: [
            "Instale o Python e crie um ambiente virtual para um projeto seu.",
            "Escolha o relatorio que voce mais repete e escreva so a leitura do arquivo em Python.",
            "Transforme uma regra de negocio que voce repete em uma funcao com nome claro."
          ]
        },
        itens: [
          { id: "dados.m1.i1", tipo: "playlist", titulo: "Curso em Video — Python 3 Mundo 1",
            fonte: "Curso em Video", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
            embed: "PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6", h: 14 },
          { id: "dados.m1.i2", tipo: "externo", titulo: "Tutorial oficial de Python em portugues",
            fonte: "python.org", url: "https://docs.python.org/pt-br/3/tutorial/", h: 8 },
          { id: "dados.m1.i3", tipo: "pratica",
            titulo: "Reescrever em Python a leitura de uma extracao que voce ja usa", h: 6 },
          { id: "dados.m1.i4", tipo: "entregavel",
            titulo: "Script que le um arquivo, aplica uma regra e salva o resultado", h: 8 }
        ],
        exercicios: [
          { id: "dados.m1.e1", tipo: "python",
            enunciado: "Escreva classificar_ticket(valor): devolve 'alto' para 5000 ou mais, 'medio' de 1500 a 4999, e 'baixo' abaixo disso.",
            starter: "def classificar_ticket(valor):\n    pass\n",
            teste: "assert classificar_ticket(9000) == 'alto'\nassert classificar_ticket(5000) == 'alto'\nassert classificar_ticket(1500) == 'medio'\nassert classificar_ticket(10) == 'baixo'\n",
            gabarito: "def classificar_ticket(valor):\n    if valor >= 5000:\n        return 'alto'\n    if valor >= 1500:\n        return 'medio'\n    return 'baixo'\n",
            dica: "Cuidado com os limites: 5000 e 1500 pertencem a faixa de cima." },
          { id: "dados.m1.e2", tipo: "python",
            enunciado: "Escreva ufs_distintas(registros): recebe uma lista de dicionarios com a chave 'uf' e devolve a lista de UFs sem repeticao, em ordem alfabetica.",
            starter: "def ufs_distintas(registros):\n    pass\n",
            teste: "dados = [{'uf': 'SP'}, {'uf': 'GO'}, {'uf': 'SP'}]\nassert ufs_distintas(dados) == ['GO', 'SP']\nassert ufs_distintas([]) == []\n",
            gabarito: "def ufs_distintas(registros):\n    return sorted({r['uf'] for r in registros})\n",
            dica: "Conjunto remove repetido; sorted devolve lista ordenada." }
        ]
      },
      {
        id: "dados.m2",
        n: 2,
        titulo: "Logica e estruturas de dados",
        h: 25,
        objetivo: "Escolher a estrutura certa e escrever codigo que continua rapido quando o dado cresce.",
        topicos: ["complexidade", "busca", "ordenacao", "dicionario como indice"],
        aula: {
          objetivo: "Ao terminar, voce percebe quando um codigo vai ficar lento antes de ele ficar lento.",
          blocos: [
            { t: "texto", v: "Codigo de analista costuma funcionar com dez mil linhas e travar com dois milhoes. Quase sempre a causa e a mesma: procurar dentro de uma lista, dentro de um laco." },
            { t: "subtitulo", v: "O custo de procurar" },
            { t: "texto", v: "Procurar um item numa lista obriga o computador a olhar item por item. Se voce faz isso para cada linha de outra tabela, o custo multiplica. Dez mil vezes dez mil sao cem milhoes de comparacoes." },
            { t: "codigo", lang: "python", v: "# lento: para cada venda, varre a lista de clientes\nfor venda in vendas:\n    for cliente in clientes:\n        if cliente['id'] == venda['cliente_id']:\n            venda['nome'] = cliente['nome']\n\n# rapido: monta um indice uma vez e consulta direto\nindice = {c['id']: c['nome'] for c in clientes}\nfor venda in vendas:\n    venda['nome'] = indice.get(venda['cliente_id'])" },
            { t: "destaque", v: "Dicionario e o PROCV que nao fica lento. Monte o indice uma vez, consulte quantas vezes quiser." },
            { t: "subtitulo", v: "Como pensar em custo sem virar cientista da computacao" },
            { t: "tabela", cab: ["Operacao", "Custo", "Traducao"], linhas: [
              ["Acessar por chave no dicionario", "constante", "nao piora quando o dado cresce"],
              ["Procurar numa lista", "linear", "dobra o dado, dobra o tempo"],
              ["Ordenar", "quase linear", "aceitavel, mas nao dentro de um laco"],
              ["Laco dentro de laco", "quadratico", "dobra o dado, quadruplica o tempo"]
            ] },
            { t: "aviso", v: "Armadilha: usar `in` numa lista dentro de um laco. Troque a lista por conjunto e o custo cai de linear para constante, com uma unica linha de mudanca." },
            { t: "subtitulo", v: "Ordenacao com criterio" },
            { t: "codigo", lang: "python", v: "# maior valor primeiro; empate desempata pelo nome\nvendas.sort(key=lambda v: (-v['valor'], v['nome']))" },
            { t: "texto", v: "Ordenar por mais de um criterio e o que resolve a maior parte dos rankings pedidos pela diretoria. O sinal de menos inverte a ordem de um campo numerico sem precisar de duas passagens." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um script de conciliacao rodava em quarenta segundos com o teste e passou de trinta minutos com a base real. O codigo procurava o contrato numa lista de sessenta mil registros, para cada uma das oitenta mil linhas de pagamento." },
              { t: "texto", v: "Trocar a lista por um dicionario indexado pelo numero do contrato levou tres linhas. O tempo caiu para nove segundos. Nenhuma regra de negocio mudou." }
            ]
          },
          resumo: [
            "Procurar dentro de laco e a causa mais comum de lentidao.",
            "Dicionario e conjunto trocam busca linear por acesso direto.",
            "Ordenar por varios criterios resolve quase todo ranking pedido."
          ],
          aplicar: [
            "Procure no seu codigo um laco dentro de outro e veja se um dicionario resolve.",
            "Troque um `in lista` por `in conjunto` e meca o tempo antes e depois."
          ]
        },
        itens: [
          { id: "dados.m2.i1", tipo: "externo", titulo: "Estruturas de dados — documentacao oficial",
            fonte: "python.org", url: "https://docs.python.org/pt-br/3/tutorial/datastructures.html", h: 4 },
          { id: "dados.m2.i2", tipo: "externo", titulo: "Exercicios de logica em Python",
            fonte: "Exercism", url: "https://exercism.org/tracks/python", h: 12 },
          { id: "dados.m2.i3", tipo: "pratica",
            titulo: "Medir o tempo de um script seu antes e depois de trocar lista por dicionario", h: 4 }
        ],
        exercicios: [
          { id: "dados.m2.e1", tipo: "python",
            enunciado: "Escreva indexar(registros, chave): devolve um dicionario que mapeia o valor da chave para o registro inteiro.",
            starter: "def indexar(registros, chave):\n    pass\n",
            teste: "dados = [{'id': 1, 'nome': 'ACME'}, {'id': 2, 'nome': 'Beta'}]\nidx = indexar(dados, 'id')\nassert idx[2]['nome'] == 'Beta'\nassert len(idx) == 2\n",
            gabarito: "def indexar(registros, chave):\n    return {r[chave]: r for r in registros}\n",
            dica: "Uma compreensao de dicionario resolve em uma linha." },
          { id: "dados.m2.e2", tipo: "python",
            enunciado: "Escreva ranking(vendas, n): devolve os n maiores valores, do maior para o menor, desempatando pelo nome em ordem alfabetica.",
            starter: "def ranking(vendas, n):\n    pass\n",
            teste: "v = [{'nome': 'B', 'valor': 10}, {'nome': 'A', 'valor': 10}, {'nome': 'C', 'valor': 30}]\nassert [x['nome'] for x in ranking(v, 2)] == ['C', 'A']\nassert ranking(v, 0) == []\n",
            gabarito: "def ranking(vendas, n):\n    return sorted(vendas, key=lambda v: (-v['valor'], v['nome']))[:n]\n",
            dica: "Use uma tupla como chave de ordenacao e fatie o resultado." }
        ]
      },
      {
        id: "dados.m3",
        n: 3,
        titulo: "Estatistica descritiva",
        h: 30,
        objetivo: "Resumir um conjunto de dados sem enganar quem le o relatorio.",
        topicos: ["tendencia central", "dispersao", "percentis", "outlier"],
        aula: {
          objetivo: "Ao terminar, voce escolhe a medida certa para cada dado e sabe explicar quando a media mente.",
          blocos: [
            { t: "texto", v: "Resumir dado e escolher o que jogar fora. Toda medida resumo descarta informacao de proposito. A questao e descartar o que nao importa para a decisao em jogo." },
            { t: "subtitulo", v: "Media, mediana e moda" },
            { t: "texto", v: "A media distribui o total igualmente entre todos. A mediana parte o conjunto ao meio. A moda e o valor mais frequente. Em distribuicao simetrica as tres coincidem. Quando nao coincidem, a diferenca entre elas e a informacao mais util que voce tem em maos." },
            { t: "destaque", v: "Se media e mediana estao longe uma da outra, existe cauda. Investigue a cauda antes de reportar qualquer numero." },
            { t: "lista", v: [
              "Media: sensivel a valor extremo. Boa para grandeza que soma, como faturamento total.",
              "Mediana: resistente a extremo. Boa para valor tipico, como ticket ou tempo de atendimento.",
              "Moda: util em dado categorico. Quase inutil em dado continuo."
            ] },
            { t: "subtitulo", v: "Dispersao" },
            { t: "texto", v: "Media sem dispersao e meia informacao. Duas regionais com ticket medio de R$ 3.000 podem ser muito diferentes: uma com todos os clientes perto de 3.000, outra com metade em 500 e metade em 5.500. A decisao comercial para cada uma e outra." },
            { t: "texto", v: "Desvio padrao diz o quanto os valores costumam se afastar da media, na mesma unidade do dado. Amplitude interquartil, a distancia entre o percentil 25 e o 75, e mais robusta quando ha extremos." },
            { t: "codigo", lang: "python", v: "df['ticket'].describe()\n# count, mean, std, min, 25%, 50%, 75%, max\n\niqr = df['ticket'].quantile(.75) - df['ticket'].quantile(.25)" },
            { t: "subtitulo", v: "Outlier nao e erro" },
            { t: "texto", v: "Valor extremo pode ser digitacao errada, pode ser fraude e pode ser o melhor cliente da empresa. Excluir sem olhar e o caminho mais rapido para um relatorio bonito e falso. Marque, investigue e reporte separadamente." },
            { t: "aviso", v: "Erro comum: reportar media de dado com cauda longa, como ticket de venda, tempo de atendimento ou prazo de entrega. Use mediana e mostre os percentis 25, 50 e 75." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um relatorio de vendas mostra ticket medio de R$ 4.200 e a diretoria define a meta com base nisso. A mediana e R$ 1.800: tres contratos grandes puxaram a media. A meta nasce inalcancavel para a maior parte do time comercial." },
              { t: "texto", v: "A correcao nao e trocar media por mediana e pronto. E mostrar as duas, com percentis 25 e 75, e deixar claro que a distribuicao e torta. A diretoria decide melhor sabendo disso, e voce nao vira o responsavel pela meta impossivel." }
            ]
          },
          resumo: [
            "Toda medida resumo descarta informacao de proposito.",
            "Distancia entre media e mediana denuncia cauda.",
            "Media sem dispersao nao deveria sair do seu computador.",
            "Outlier se investiga, nao se apaga."
          ],
          aplicar: [
            "Pegue um indicador do seu painel e calcule media, mediana e percentis 25 e 75.",
            "Se media e mediana divergirem mais de 20%, acrescente a mediana ao painel.",
            "Escreva uma frase explicando a diferenca para quem le o relatorio."
          ]
        },
        itens: [
          { id: "dados.m3.i1", tipo: "playlist", titulo: "StatQuest — Statistics Fundamentals",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            embed: "PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", h: 10 },
          { id: "dados.m3.i2", tipo: "externo", titulo: "Seeing Theory — estatistica visual e interativa",
            fonte: "Brown University", url: "https://seeing-theory.brown.edu/index.html#firstPage", h: 4 },
          { id: "dados.m3.i3", tipo: "pratica",
            titulo: "Refazer um indicador seu com mediana e percentis ao lado da media", h: 6 },
          { id: "dados.m3.i4", tipo: "entregavel",
            titulo: "Paragrafo explicando a distribuicao de um indicador para a diretoria", h: 4 }
        ],
        exercicios: [
          { id: "dados.m3.e1", tipo: "python",
            enunciado: "Escreva resumo(valores): devolve um dicionario com 'media' e 'mediana'. Lista vazia devolve zero nos dois campos.",
            starter: "def resumo(valores):\n    pass\n",
            teste: "assert resumo([1, 2, 3])['media'] == 2\nassert resumo([1, 2, 3, 100])['mediana'] == 2.5\nassert resumo([])['media'] == 0\n",
            gabarito: "def resumo(valores):\n    if not valores:\n        return {'media': 0, 'mediana': 0}\n    ordenados = sorted(valores)\n    n = len(ordenados)\n    meio = n // 2\n    mediana = ordenados[meio] if n % 2 else (ordenados[meio - 1] + ordenados[meio]) / 2\n    return {'media': sum(ordenados) / n, 'mediana': mediana}\n",
            dica: "Trate a lista vazia antes de dividir por zero." },
          { id: "dados.m3.e2", tipo: "python",
            enunciado: "Escreva fora_da_curva(valores): devolve os valores abaixo de Q1 - 1.5*IQR ou acima de Q3 + 1.5*IQR, na ordem original.",
            starter: "def fora_da_curva(valores):\n    pass\n",
            teste: "assert fora_da_curva([10, 11, 12, 13, 14, 200]) == [200]\nassert fora_da_curva([1, 2, 3]) == []\n",
            gabarito: "def fora_da_curva(valores):\n    if len(valores) < 4:\n        return []\n    ordenados = sorted(valores)\n    n = len(ordenados)\n    q1 = ordenados[n // 4]\n    q3 = ordenados[(3 * n) // 4]\n    iqr = q3 - q1\n    baixo = q1 - 1.5 * iqr\n    alto = q3 + 1.5 * iqr\n    return [v for v in valores if v < baixo or v > alto]\n",
            dica: "Calcule os quartis sobre a lista ordenada, mas devolva na ordem original." }
        ]
      }
    ]
  });

  /* ===================================================================== F2 */
  fases.push({
    id: "dados.f2",
    n: 2,
    nome: "Analise e visualizacao",
    cor: "--f2",
    modulos: [
      {
        id: "dados.m4",
        n: 4,
        titulo: "pandas",
        h: 40,
        objetivo: "Fazer em pandas tudo o que voce faz hoje em tabela dinamica e PROCV.",
        topicos: ["DataFrame", "filtro", "groupby", "merge", "pivot"],
        aula: {
          objetivo: "Ao terminar, voce carrega, junta, agrupa e exporta tabelas de qualquer tamanho sem abrir o Excel.",
          blocos: [
            { t: "texto", v: "pandas e uma planilha sem interface. Quem ja pensa em tabela aprende rapido: a diferenca esta em que cada operacao devolve uma tabela nova, em vez de alterar a que estava la." },
            { t: "tabela", cab: ["Excel", "pandas", "Observacao"], linhas: [
              ["Filtro", "df[df.uf == 'GO']", "devolve outra tabela"],
              ["PROCV", "df.merge(outra, on='id', how='left')", "declare o tipo de juncao"],
              ["Tabela dinamica", "df.groupby('uf')['valor'].sum()", "agrupa e agrega"],
              ["Remover duplicados", "df.drop_duplicates('id')", "escolha a coluna"],
              ["Formatar celula", "nao existe", "formatacao e da apresentacao, nao do dado"]
            ] },
            { t: "destaque", v: "A diferenca cultural: no Excel voce trabalha no dado. Em pandas voce escreve a receita que produz o dado." },
            { t: "subtitulo", v: "groupby resolve a maior parte" },
            { t: "codigo", lang: "python", v: "resumo = (df\n    .query(\"status == 'faturado'\")\n    .groupby(['uf', 'produto'])\n    .agg(total=('valor', 'sum'), pedidos=('id', 'count'))\n    .sort_values('total', ascending=False)\n    .reset_index())" },
            { t: "texto", v: "Encadear operacoes com parenteses deixa a receita legivel de cima para baixo: filtra, agrupa, agrega, ordena, achata o indice. Cada linha e um passo que voce explicaria em voz alta." },
            { t: "subtitulo", v: "merge e o PROCV honesto" },
            { t: "texto", v: "O PROCV esconde o que acontece quando a chave nao existe ou aparece duas vezes. O merge obriga voce a declarar: `left` mantem tudo da esquerda, `inner` mantem so o que casa. E o resultado pode crescer se a chave repetir do outro lado." },
            { t: "aviso", v: "Armadilha silenciosa: merge com chave duplicada multiplica linhas. Sempre compare `len(df)` antes e depois. Se cresceu, a chave nao era unica." },
            { t: "codigo", lang: "python", v: "antes = len(vendas)\nvendas = vendas.merge(clientes, on='cliente_id', how='left')\nassert len(vendas) == antes, 'o merge multiplicou linhas'" },
            { t: "subtitulo", v: "Tipos e nulos" },
            { t: "texto", v: "Coluna com nulo vira ponto flutuante e o codigo de cliente 00123 vira 123.0. Declare os tipos na leitura, especialmente de identificadores. Nulo nao e zero: soma ignora, contagem ignora, e a media muda de denominador sem avisar." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "O relatorio de contas a receber junta a base de titulos com a de clientes. No Excel, o PROCV trouxe um cliente para cada titulo e ninguem percebeu que dois cadastros tinham o mesmo CNPJ." },
              { t: "texto", v: "Em pandas, o `assert len(df) == antes` estoura na hora. O erro aparece no dia da construcao, nao na reuniao de fechamento." }
            ]
          },
          resumo: [
            "pandas e a receita que produz a tabela, nao a tabela.",
            "merge te obriga a declarar o que o PROCV escondia.",
            "Confira o numero de linhas antes e depois de todo merge.",
            "Declare o tipo de identificadores na leitura."
          ],
          aplicar: [
            "Reproduza uma tabela dinamica sua com groupby e agg.",
            "Refaca um PROCV com merge e adicione a checagem de numero de linhas.",
            "Liste as colunas de identificador dos seus dados e force o tipo texto."
          ]
        },
        itens: [
          { id: "dados.m4.i1", tipo: "externo", titulo: "10 minutes to pandas",
            fonte: "pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", h: 4 },
          { id: "dados.m4.i2", tipo: "externo", titulo: "Comparacao com Excel na documentacao oficial",
            fonte: "pandas", url: "https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_spreadsheets.html", h: 3 },
          { id: "dados.m4.i3", tipo: "pratica",
            titulo: "Reproduzir um relatorio mensal inteiro em pandas", h: 16 },
          { id: "dados.m4.i4", tipo: "entregavel",
            titulo: "Script que substitui uma planilha recorrente sua, com as regras comentadas", h: 12 }
        ],
        exercicios: [
          { id: "dados.m4.e1", tipo: "python",
            enunciado: "Sem usar pandas, escreva agrupar_soma(registros, chave, campo): devolve um dicionario com a soma de 'campo' por 'chave'.",
            starter: "def agrupar_soma(registros, chave, campo):\n    pass\n",
            teste: "r = [{'uf': 'GO', 'v': 10}, {'uf': 'SP', 'v': 5}, {'uf': 'GO', 'v': 7}]\nassert agrupar_soma(r, 'uf', 'v') == {'GO': 17, 'SP': 5}\nassert agrupar_soma([], 'uf', 'v') == {}\n",
            gabarito: "def agrupar_soma(registros, chave, campo):\n    saida = {}\n    for r in registros:\n        saida[r[chave]] = saida.get(r[chave], 0) + r[campo]\n    return saida\n",
            dica: "get com valor padrao evita testar se a chave ja existe." },
          { id: "dados.m4.e2", tipo: "python",
            enunciado: "Escreva juntar(esquerda, direita, chave): junta duas listas de dicionarios pela chave, mantendo todos os registros da esquerda. Sem correspondencia, os campos da direita nao entram.",
            starter: "def juntar(esquerda, direita, chave):\n    pass\n",
            teste: "e = [{'id': 1, 'v': 10}, {'id': 2, 'v': 20}]\nd = [{'id': 1, 'nome': 'ACME'}]\nr = juntar(e, d, 'id')\nassert len(r) == 2\nassert r[0]['nome'] == 'ACME'\nassert 'nome' not in r[1]\n",
            gabarito: "def juntar(esquerda, direita, chave):\n    indice = {d[chave]: d for d in direita}\n    saida = []\n    for e in esquerda:\n        novo = dict(e)\n        par = indice.get(e[chave])\n        if par:\n            for k, v in par.items():\n                if k != chave:\n                    novo[k] = v\n        saida.append(novo)\n    return saida\n",
            dica: "Indexe a direita primeiro; copie o registro da esquerda antes de alterar." }
        ]
      },
      {
        id: "dados.m5",
        n: 5,
        titulo: "Analise exploratoria",
        h: 35,
        objetivo: "Conhecer um conjunto de dados desconhecido antes de tirar qualquer conclusao dele.",
        topicos: ["qualidade do dado", "distribuicao", "correlacao", "hipotese inicial"],
        aula: {
          objetivo: "Ao terminar, voce tem um roteiro fixo para abrir qualquer base nova e saber no que confiar.",
          blocos: [
            { t: "texto", v: "Analise exploratoria nao e a parte criativa antes do trabalho serio. E a parte que impede voce de construir um modelo, um painel ou uma recomendacao em cima de dado quebrado." },
            { t: "subtitulo", v: "Roteiro de abertura" },
            { t: "lista", ordenada: true, v: [
              "Quantas linhas e colunas, e o que cada linha representa.",
              "Tipo de cada coluna, e se bate com o significado.",
              "Nulos: quantos, em quais colunas, e se tem padrao.",
              "Duplicados: a chave e mesmo unica?",
              "Faixa de valores: minimo e maximo fazem sentido no negocio?",
              "Distribuicao das colunas numericas e das categorias.",
              "Periodo coberto: ha buracos no tempo?"
            ] },
            { t: "destaque", v: "A pergunta que evita o maior numero de erros: o que exatamente uma linha desta tabela representa?" },
            { t: "codigo", lang: "python", v: "df.shape\ndf.dtypes\ndf.isna().mean().sort_values(ascending=False)\ndf.duplicated(subset='id').sum()\ndf.describe(include='all')" },
            { t: "subtitulo", v: "Nulo tem significado" },
            { t: "texto", v: "Nulo em data de cancelamento provavelmente significa que o contrato esta ativo. Nulo em valor de venda pode ser erro de integracao. A mesma ausencia tem leituras opostas dependendo da coluna, e essa leitura e conhecimento de negocio, nao de estatistica." },
            { t: "aviso", v: "Preencher nulo com zero e a decisao mais destrutiva e mais comum da analise de dados. Zero e um valor; ausencia e outra coisa. Media com zeros inventados fica errada e ninguem percebe." },
            { t: "subtitulo", v: "Correlacao" },
            { t: "texto", v: "Correlacao mede se duas variaveis andam juntas, nao se uma causa a outra. Vale como pista de onde olhar, nunca como conclusao. E correlacao linear proxima de zero nao significa ausencia de relacao: pode ser relacao em curva." },
            { t: "codigo", lang: "python", v: "df[['ticket', 'prazo', 'desconto']].corr(numeric_only=True)" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma base de contratos parece ter 40% de inadimplencia. Na exploracao, aparece que 30% das linhas sao parcelas do mesmo contrato duplicadas pela integracao do ERP, sempre nos dias de reprocessamento." },
              { t: "texto", v: "Sem a exploracao, o painel iria para a diretoria com um numero que nao existe. Com ela, o achado vira uma conversa com o time de sistemas e um filtro documentado." }
            ]
          },
          resumo: [
            "Explorar antes evita construir sobre dado quebrado.",
            "Sempre responda o que uma linha representa.",
            "Nulo nao e zero, e o significado dele e de negocio.",
            "Correlacao aponta onde olhar, nao o que concluir."
          ],
          aplicar: [
            "Aplique o roteiro de sete passos em uma base que voce usa toda semana.",
            "Liste as colunas com nulo e escreva o significado de cada ausencia.",
            "Verifique se a chave que voce considera unica e mesmo unica."
          ]
        },
        itens: [
          { id: "dados.m5.i1", tipo: "externo", titulo: "Kaggle Learn — Data Cleaning",
            fonte: "Kaggle", url: "https://www.kaggle.com/learn/data-cleaning", h: 6 },
          { id: "dados.m5.i2", tipo: "playlist", titulo: "StatQuest — Statistics Fundamentals (revisao aplicada)",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            embed: "PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", h: 5 },
          { id: "dados.m5.i3", tipo: "pratica",
            titulo: "Rodar o roteiro de exploracao em uma base do seu trabalho", h: 10 },
          { id: "dados.m5.i4", tipo: "entregavel",
            titulo: "Documento de uma pagina com os achados de qualidade de uma base", h: 8 }
        ],
        exercicios: [
          { id: "dados.m5.e1", tipo: "python",
            enunciado: "Escreva perfil_nulos(registros): devolve um dicionario com a fracao de valores None por chave, considerando todas as chaves que aparecem.",
            starter: "def perfil_nulos(registros):\n    pass\n",
            teste: "r = [{'a': 1, 'b': None}, {'a': None, 'b': None}]\np = perfil_nulos(r)\nassert p['a'] == 0.5\nassert p['b'] == 1.0\nassert perfil_nulos([]) == {}\n",
            gabarito: "def perfil_nulos(registros):\n    if not registros:\n        return {}\n    chaves = set()\n    for r in registros:\n        chaves.update(r.keys())\n    total = len(registros)\n    return {k: sum(1 for r in registros if r.get(k) is None) / total for k in chaves}\n",
            dica: "Junte as chaves de todos os registros antes de contar." },
          { id: "dados.m5.e2", tipo: "python",
            enunciado: "Escreva duplicados(registros, chave): devolve a lista de valores de chave que aparecem mais de uma vez, em ordem.",
            starter: "def duplicados(registros, chave):\n    pass\n",
            teste: "r = [{'id': 1}, {'id': 2}, {'id': 1}, {'id': 3}, {'id': 3}]\nassert duplicados(r, 'id') == [1, 3]\nassert duplicados([{'id': 1}], 'id') == []\n",
            gabarito: "def duplicados(registros, chave):\n    contagem = {}\n    for r in registros:\n        contagem[r[chave]] = contagem.get(r[chave], 0) + 1\n    return sorted(k for k, v in contagem.items() if v > 1)\n",
            dica: "Conte primeiro, filtre depois." }
        ]
      },
      {
        id: "dados.m6",
        n: 6,
        titulo: "Visualizacao e storytelling",
        h: 30,
        objetivo: "Mostrar o dado de um jeito que leve a uma decisao, e nao a uma duvida.",
        topicos: ["escolha do grafico", "eixo e escala", "narrativa", "painel executivo"],
        aula: {
          objetivo: "Ao terminar, voce escolhe o grafico pela pergunta e defende essa escolha.",
          blocos: [
            { t: "texto", v: "Grafico nao serve para mostrar dado, serve para responder pergunta. A pergunta define a forma, e nao o contrario." },
            { t: "tabela", cab: ["Pergunta", "Forma"], linhas: [
              ["Quem e maior?", "barra, ordenada pelo valor"],
              ["Como mudou no tempo?", "linha"],
              ["Do que e feito?", "barra empilhada ou tabela"],
              ["Ha relacao entre A e B?", "dispersao"],
              ["Como se distribui?", "histograma ou boxplot"],
              ["Qual e o numero?", "numero grande, sem grafico"]
            ] },
            { t: "destaque", v: "Se a resposta e um numero so, escreva o numero. Grafico de um valor unico e decoracao." },
            { t: "subtitulo", v: "Eixo e escala" },
            { t: "texto", v: "Barra sempre comeca no zero, porque a comparacao e de area. Linha pode comecar em outro ponto, porque a comparacao e de inclinacao. Cortar o eixo de uma barra e a forma mais rapida de exagerar uma diferenca sem mentir explicitamente." },
            { t: "aviso", v: "Pizza com mais de tres fatias e quase sempre uma tabela disfarcada. O olho compara comprimento bem e angulo mal." },
            { t: "subtitulo", v: "Cor tem funcao" },
            { t: "lista", v: [
              "Cor para categoria: no maximo seis, e sempre a mesma cor para a mesma categoria em todo o painel.",
              "Cor para intensidade: uma escala continua, do claro ao escuro.",
              "Cor para alerta: vermelho so quando algo esta de fato errado.",
              "Cinza e uma cor: use para o que e contexto, deixando a cor viva para o que importa."
            ] },
            { t: "subtitulo", v: "Painel executivo" },
            { t: "texto", v: "Um painel com doze visuais nao responde melhor que um com quatro. O diretor tem uma pergunta principal e duas de acompanhamento. Um visual grande responde a principal, tres pequenos respondem o resto, e o detalhe fica um clique adiante." },
            { t: "citacao", v: "Acima de tudo, mostre os dados.", fonte: "Edward Tufte, The Visual Display of Quantitative Information",
              url: "https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um painel de acompanhamento comercial tem catorze visuais e ninguem usa. Em entrevista, o diretor diz que so quer saber duas coisas: se vai bater a meta do mes e qual regional esta atrasada." },
              { t: "texto", v: "A versao nova tem um numero grande com a projecao do mes, uma barra ordenada por regional e uma linha de evolucao. Os outros onze visuais viraram uma pagina de detalhe. O painel passou a ser aberto todo dia." }
            ]
          },
          resumo: [
            "A pergunta escolhe o grafico.",
            "Barra comeca no zero; linha nao precisa.",
            "Cinza para contexto, cor para o que importa.",
            "Menos visuais por tela, mais resposta por visual."
          ],
          aplicar: [
            "Abra um painel seu e escreva a pergunta que cada visual responde.",
            "Apague ou mova para o detalhe os visuais que nao responderem nenhuma.",
            "Padronize a cor de cada categoria em todo o painel."
          ]
        },
        itens: [
          { id: "dados.m6.i1", tipo: "externo", titulo: "From Data to Viz — escolha do grafico pela pergunta",
            fonte: "data-to-viz.com", url: "https://www.data-to-viz.com/", h: 4 },
          { id: "dados.m6.i2", tipo: "externo", titulo: "Financial Times Visual Vocabulary",
            fonte: "Financial Times", url: "https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary", h: 2 },
          { id: "dados.m6.i3", tipo: "pratica",
            titulo: "Refazer um painel seu com metade dos visuais", h: 12 },
          { id: "dados.m6.i4", tipo: "entregavel",
            titulo: "Painel revisado, apresentado a quem o usa, com o antes e o depois", h: 10 }
        ],
        exercicios: [
          { id: "dados.m6.e1", tipo: "quiz",
            enunciado: "A diretoria pergunta: qual das cinco regionais cresceu mais nos ultimos doze meses? Qual visual responde melhor?",
            alternativas: [
              { v: "Cinco linhas no mesmo grafico, uma por regional", correta: false,
                explicacao: "Mostra a evolucao, mas obriga o leitor a calcular o crescimento de cabeca comparando inclinacoes." },
              { v: "Barra ordenada com a variacao percentual de cada regional no periodo", correta: true,
                explicacao: "A pergunta e de comparacao entre categorias, e a resposta e uma ordem. Barra ordenada entrega a ordem pronta." },
              { v: "Pizza com a participacao de cada regional", correta: false,
                explicacao: "Pizza mostra composicao num instante, nao crescimento ao longo do tempo." },
              { v: "Tabela com os doze meses das cinco regionais", correta: false,
                explicacao: "Tem todo o dado e nenhuma resposta. Serve como detalhe, nao como visual principal." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F3 */
  fases.push({
    id: "dados.f3",
    n: 3,
    nome: "Inferencia e experimentacao",
    cor: "--f3",
    modulos: [
      {
        id: "dados.m7",
        n: 7,
        titulo: "Probabilidade",
        h: 30,
        objetivo: "Raciocinar sobre incerteza sem cair nas armadilhas de intuicao mais comuns.",
        topicos: ["probabilidade condicional", "independencia", "Bayes", "distribuicoes"],
        aula: {
          objetivo: "Ao terminar, voce calcula a chance de algo dado que outra coisa aconteceu, e sabe por que isso quase nunca e o que a intuicao diz.",
          blocos: [
            { t: "texto", v: "Probabilidade e a linguagem para falar do que ainda nao aconteceu ou do que voce nao observou. Em analise de dados ela aparece disfarcada: taxa de conversao, chance de inadimplencia, risco de churn." },
            { t: "subtitulo", v: "Condicional e o que importa no trabalho" },
            { t: "texto", v: "Quase nenhuma pergunta de negocio e sobre probabilidade solta. E sempre condicional: qual a chance de inadimplencia dado que o cliente atrasou uma vez, dado que e do segmento X, dado que o contrato tem menos de seis meses." },
            { t: "codigo", lang: "python", v: "# P(inadimplente | atrasou antes)\ncom_atraso = df[df.atrasou_antes]\np = com_atraso.inadimplente.mean()" },
            { t: "destaque", v: "Inverter a condicional e o erro mais caro da area. P(atraso | fraude) nao e P(fraude | atraso)." },
            { t: "subtitulo", v: "Por que a inversao engana" },
            { t: "texto", v: "Suponha um teste de fraude que acerta 99% das fraudes e da 1% de alarme falso. Se apenas 1 em 10.000 transacoes e fraude, entre 10.000 transacoes o teste aponta cerca de 100 alarmes falsos e 1 fraude verdadeira. A chance de uma transacao apontada ser realmente fraude e proxima de 1%, nao de 99%." },
            { t: "texto", v: "O que muda tudo e a frequencia de base. Evento raro faz teste bom produzir muito alarme falso. Isso vale para fraude, para doenca e para qualquer alerta automatico que voce colocar num painel." },
            { t: "subtitulo", v: "Independencia" },
            { t: "texto", v: "Dois eventos sao independentes quando saber de um nao muda a chance do outro. Em dado de empresa isso quase nunca acontece: pedidos do mesmo cliente, meses seguidos da mesma regional e parcelas do mesmo contrato sao dependentes. Tratar como independente subestima o risco." },
            { t: "aviso", v: "Armadilha: multiplicar probabilidades assumindo independencia. Se dez contratos sao do mesmo grupo economico, eles quebram juntos, nao um a um." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Voce cria um alerta de risco no painel de cobranca. Ele acerta 95% dos casos ruins. Na primeira semana a equipe recebe 300 alertas e confirma 12. O time perde a confianca no alerta em duas semanas." },
              { t: "texto", v: "O problema nao era o modelo, era a raridade do evento combinada ao volume. A correcao foi elevar o corte, alertar so os 50 casos de maior risco e mostrar a probabilidade estimada ao lado. O time voltou a usar." }
            ]
          },
          resumo: [
            "Toda pergunta de negocio e condicional.",
            "P(A dado B) nao e P(B dado A).",
            "Evento raro gera muito alarme falso, mesmo com teste bom.",
            "Dado de empresa raramente e independente."
          ],
          aplicar: [
            "Pegue um alerta do seu painel e estime quantos falsos positivos ele gera por semana.",
            "Escreva a frequencia de base do evento que voce quer prever antes de construir qualquer modelo."
          ]
        },
        itens: [
          { id: "dados.m7.i1", tipo: "externo", titulo: "Seeing Theory — probabilidade basica e Bayes",
            fonte: "Brown University", url: "https://seeing-theory.brown.edu/basic-probability/index.html", h: 4 },
          { id: "dados.m7.i2", tipo: "playlist", titulo: "StatQuest — Statistics Fundamentals",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            embed: "PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", h: 8 },
          { id: "dados.m7.i3", tipo: "pratica",
            titulo: "Calcular a frequencia de base de um evento que voce acompanha", h: 6 }
        ],
        exercicios: [
          { id: "dados.m7.e1", tipo: "python",
            enunciado: "Escreva prob_condicional(registros, condicao, alvo): fracao de registros com alvo verdadeiro entre os que tem condicao verdadeira. Sem nenhum caso da condicao, devolve 0.",
            starter: "def prob_condicional(registros, condicao, alvo):\n    pass\n",
            teste: "r = [{'atraso': True, 'mau': True}, {'atraso': True, 'mau': False}, {'atraso': False, 'mau': True}]\nassert prob_condicional(r, 'atraso', 'mau') == 0.5\nassert prob_condicional(r, 'inexistente', 'mau') == 0\n",
            gabarito: "def prob_condicional(registros, condicao, alvo):\n    base = [r for r in registros if r.get(condicao)]\n    if not base:\n        return 0\n    return sum(1 for r in base if r.get(alvo)) / len(base)\n",
            dica: "Filtre pela condicao primeiro; o denominador e o tamanho desse filtro." },
          { id: "dados.m7.e2", tipo: "python",
            enunciado: "Escreva valor_preditivo(sensibilidade, alarme_falso, prevalencia): devolve a probabilidade de o caso ser real dado que o teste apontou positivo.",
            starter: "def valor_preditivo(sensibilidade, alarme_falso, prevalencia):\n    pass\n",
            teste: "r = valor_preditivo(0.99, 0.01, 0.0001)\nassert 0.009 < r < 0.011\nassert valor_preditivo(1.0, 0.0, 0.5) == 1.0\n",
            gabarito: "def valor_preditivo(sensibilidade, alarme_falso, prevalencia):\n    verdadeiros = sensibilidade * prevalencia\n    falsos = alarme_falso * (1 - prevalencia)\n    if verdadeiros + falsos == 0:\n        return 0\n    return verdadeiros / (verdadeiros + falsos)\n",
            dica: "Verdadeiros positivos sobre o total de positivos apontados." }
        ]
      },
      {
        id: "dados.m8",
        n: 8,
        titulo: "Testes de hipotese",
        h: 30,
        objetivo: "Decidir se a diferenca observada e real ou e variacao normal.",
        topicos: ["p-valor", "erro tipo I e II", "poder", "tamanho de efeito"],
        aula: {
          objetivo: "Ao terminar, voce sabe o que o p-valor diz, o que ele nao diz, e por que tamanho de efeito importa mais.",
          blocos: [
            { t: "texto", v: "Toda vez que voce compara dois numeros de um relatorio, faz um teste de hipotese informal. A pergunta e sempre a mesma: essa diferenca aparece porque algo mudou, ou porque o mundo varia?" },
            { t: "subtitulo", v: "O que o p-valor e" },
            { t: "texto", v: "P-valor e a probabilidade de observar uma diferenca pelo menos tao grande quanto a que voce viu, assumindo que nao existe diferenca real. E uma medida de surpresa sob a hipotese de que nada mudou." },
            { t: "destaque", v: "P-valor nao e a probabilidade de a hipotese ser verdadeira, e nao mede o tamanho do efeito. Ele responde apenas: isso seria surpreendente se nada tivesse mudado?" },
            { t: "subtitulo", v: "Os dois erros" },
            { t: "tabela", cab: ["", "Nao existe diferenca", "Existe diferenca"], linhas: [
              ["Voce diz que existe", "erro tipo I (alarme falso)", "acerto"],
              ["Voce diz que nao existe", "acerto", "erro tipo II (deixou passar)"]
            ] },
            { t: "texto", v: "Escolher o corte de significancia e escolher qual erro voce prefere cometer. Em teste de campanha, alarme falso custa dinheiro gasto a toa. Em controle de qualidade, deixar passar custa produto defeituoso no cliente." },
            { t: "subtitulo", v: "Amostra grande transforma tudo em significativo" },
            { t: "texto", v: "Com um milhao de linhas, uma diferenca de 0,1% na conversao vira estatisticamente significativa. Estatisticamente significativa e diferente de relevante para o negocio. Sempre reporte o tamanho do efeito e o intervalo de confianca junto do p-valor." },
            { t: "aviso", v: "Armadilha grave: testar varias metricas ate uma dar significativa. Com vinte metricas e corte de 5%, uma dara significativa por puro acaso. Declare a metrica principal antes de olhar o resultado." },
            { t: "codigo", lang: "python", v: "from scipy import stats\n\nt, p = stats.ttest_ind(grupo_a, grupo_b, equal_var=False)\nefeito = grupo_b.mean() - grupo_a.mean()\nprint(f\"diferenca={efeito:.2f}  p={p:.4f}\")" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "O time comercial mudou o script de abordagem e a conversao subiu de 12,0% para 12,4% no mes. Com 200 mil contatos, o p-valor da 0,01 e alguem propoe mudar o script em todas as regionais." },
              { t: "texto", v: "A diferenca real e de 0,4 ponto, ou cerca de 800 vendas ao ano. O custo de treinar todas as regionais e maior que isso. O teste esta certo, a decisao seria errada. O que faltava era colocar o tamanho do efeito e o custo lado a lado." }
            ]
          },
          resumo: [
            "P-valor mede surpresa, nao verdade e nem tamanho.",
            "Escolher o corte e escolher qual erro voce prefere.",
            "Amostra grande torna significativo o irrelevante.",
            "Declare a metrica principal antes de olhar o resultado."
          ],
          aplicar: [
            "Pegue uma comparacao recente do seu relatorio e calcule o tamanho do efeito, nao so a diferenca percentual.",
            "Escreva, antes do proximo teste, qual e a metrica principal e qual diferenca seria relevante para o negocio."
          ]
        },
        itens: [
          { id: "dados.m8.i1", tipo: "playlist", titulo: "StatQuest — p-values e testes",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9",
            embed: "PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", h: 8 },
          { id: "dados.m8.i2", tipo: "externo", titulo: "Declaracao da ASA sobre p-valores",
            fonte: "American Statistical Association", url: "https://www.amstat.org/asa/files/pdfs/p-valuestatement.pdf", h: 2 },
          { id: "dados.m8.i3", tipo: "entregavel",
            titulo: "Reanalise de uma comparacao do seu relatorio, com efeito e intervalo", h: 8 }
        ],
        exercicios: [
          { id: "dados.m8.e1", tipo: "python",
            enunciado: "Escreva diferenca_relativa(antes, depois): variacao percentual de antes para depois, arredondada em duas casas. Se antes for zero, devolve None.",
            starter: "def diferenca_relativa(antes, depois):\n    pass\n",
            teste: "assert diferenca_relativa(120, 150) == 25.0\nassert diferenca_relativa(100, 99) == -1.0\nassert diferenca_relativa(0, 10) is None\n",
            gabarito: "def diferenca_relativa(antes, depois):\n    if antes == 0:\n        return None\n    return round((depois - antes) / antes * 100, 2)\n",
            dica: "Trate a divisao por zero antes de calcular." },
          { id: "dados.m8.e2", tipo: "python",
            enunciado: "Escreva decidir(p_valor, efeito, efeito_minimo, corte=0.05): devolve 'adotar' so quando o p-valor esta abaixo do corte e o efeito atinge o minimo relevante; 'sem efeito relevante' quando e significativo mas pequeno; 'inconclusivo' no resto.",
            starter: "def decidir(p_valor, efeito, efeito_minimo, corte=0.05):\n    pass\n",
            teste: "assert decidir(0.01, 5, 3) == 'adotar'\nassert decidir(0.01, 1, 3) == 'sem efeito relevante'\nassert decidir(0.40, 9, 3) == 'inconclusivo'\n",
            gabarito: "def decidir(p_valor, efeito, efeito_minimo, corte=0.05):\n    if p_valor >= corte:\n        return 'inconclusivo'\n    if efeito < efeito_minimo:\n        return 'sem efeito relevante'\n    return 'adotar'\n",
            dica: "Trate primeiro o caso em que o teste nao passou do corte." }
        ]
      },
      {
        id: "dados.m9",
        n: 9,
        titulo: "Experimentacao e teste A/B",
        h: 25,
        objetivo: "Desenhar um experimento que responde a pergunta em vez de confirmar a expectativa.",
        topicos: ["aleatorizacao", "tamanho de amostra", "duracao", "leitura de resultado"],
        aula: {
          objetivo: "Ao terminar, voce planeja um teste com criterio de parada definido antes de comecar.",
          blocos: [
            { t: "texto", v: "Experimento e a unica forma barata de estabelecer causa. Analise observacional mostra que duas coisas andam juntas; experimento mostra que mexer numa muda a outra." },
            { t: "subtitulo", v: "O que faz um teste valer" },
            { t: "lista", ordenada: true, v: [
              "Aleatorizacao: quem vai para cada grupo e sorteado, nao escolhido.",
              "Metrica principal declarada antes.",
              "Tamanho de amostra calculado antes, a partir do efeito minimo relevante.",
              "Duracao fixada antes, cobrindo ciclos completos de comportamento.",
              "Criterio de parada escrito antes."
            ] },
            { t: "destaque", v: "Tudo que importa num experimento e decidido antes de ele comecar. Depois so se le o resultado." },
            { t: "subtitulo", v: "Espiar o resultado quebra o teste" },
            { t: "texto", v: "Olhar o painel todo dia e parar quando fica bonito multiplica o alarme falso. Cada olhada e uma nova chance de encontrar diferenca por acaso. Se precisa acompanhar, use um metodo desenhado para isso e declare no plano." },
            { t: "subtitulo", v: "Duracao e ciclo" },
            { t: "texto", v: "Uma semana cobre a variacao entre dias uteis e fim de semana. Menos que isso mede o dia, nao o efeito. Em venda B2B, o ciclo pode ser de um mes, e um teste de tres dias nao mede nada." },
            { t: "aviso", v: "Armadilha comum: mudar a campanha no meio do teste. Isso cria um terceiro tratamento e invalida a comparacao. Se precisou mudar, o teste recomeca." },
            { t: "subtitulo", v: "Quando nao da para sortear" },
            { t: "texto", v: "As vezes nao e possivel aleatorizar. Ai existem alternativas, como comparar com uma regional parecida que nao recebeu a mudanca, ou analisar o antes e depois com um grupo de controle natural. Sao mais fracos que o experimento e precisam ser apresentados como tal." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A area de cobranca quer testar uma nova mensagem de lembrete. A proposta inicial e aplicar em uma regional e comparar com as outras. Regionais diferem em perfil de cliente, entao qualquer diferenca seria ambigua." },
              { t: "texto", v: "A versao correta sorteia clientes dentro de todas as regionais, define recuperacao em 30 dias como metrica principal, calcula que precisa de 4 mil clientes por grupo e fixa a duracao em seis semanas. O plano cabe em meia pagina e evita uma discussao de dois meses depois." }
            ]
          },
          resumo: [
            "Experimento e a forma barata de estabelecer causa.",
            "Tudo se decide antes; depois so se le.",
            "Espiar e parar quando fica bonito inventa resultado.",
            "Sem aleatorizacao, a conclusao vem com ressalva declarada."
          ],
          aplicar: [
            "Escreva um plano de teste de meia pagina para uma mudanca que sua area quer fazer.",
            "Defina a metrica principal e o efeito minimo relevante antes de qualquer numero aparecer."
          ]
        },
        itens: [
          { id: "dados.m9.i1", tipo: "externo", titulo: "Guia pratico de testes A/B",
            fonte: "Evan Miller", url: "https://www.evanmiller.org/ab-testing/", h: 3 },
          { id: "dados.m9.i2", tipo: "externo", titulo: "Calculadora de tamanho de amostra",
            fonte: "Evan Miller", url: "https://www.evanmiller.org/ab-testing/sample-size.html", h: 1 },
          { id: "dados.m9.i3", tipo: "entregavel",
            titulo: "Plano de experimento de meia pagina para uma mudanca real da sua area", h: 8 }
        ],
        exercicios: [
          { id: "dados.m9.e1", tipo: "python",
            enunciado: "Escreva alocar(clientes, semente): distribui os clientes em 'A' e 'B' de forma determinada pela semente, devolvendo um dicionario id para grupo. A mesma semente deve dar sempre o mesmo resultado.",
            starter: "import random\n\ndef alocar(clientes, semente):\n    pass\n",
            teste: "ids = list(range(100))\nx = alocar(ids, 42)\ny = alocar(ids, 42)\nassert x == y\nassert set(x.values()) == {'A', 'B'}\nassert len(x) == 100\n",
            gabarito: "import random\n\ndef alocar(clientes, semente):\n    sorteador = random.Random(semente)\n    return {c: sorteador.choice(['A', 'B']) for c in clientes}\n",
            dica: "random.Random(semente) cria um sorteador reprodutivel." },
          { id: "dados.m9.e2", tipo: "quiz",
            enunciado: "No decimo dia de um teste de 6 semanas, o grupo B esta 8% acima e o p-valor deu 0,03. O gerente quer encerrar e implantar. O que voce responde?",
            alternativas: [
              { v: "Encerrar: o resultado ja e significativo", correta: false,
                explicacao: "Parar ao ver o resultado bonito e exatamente o que infla o alarme falso. O corte de 5% so vale para uma leitura no fim." },
              { v: "Manter ate a data planejada, mostrando o resultado parcial como parcial", correta: true,
                explicacao: "A duracao foi definida para cobrir o ciclo de comportamento. Encerrar antes troca rigor por pressa, e o parcial pode ser comunicado sem virar decisao." },
              { v: "Estender o teste ate o resultado ficar mais forte", correta: false,
                explicacao: "Estender ate agradar tem o mesmo problema de parar ao agradar: a regra muda conforme o resultado." },
              { v: "Encerrar e implantar so em uma regional para confirmar", correta: false,
                explicacao: "Cria um segundo teste sem aleatorizacao, mais fraco que o que ja esta rodando." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F4 */
  fases.push({
    id: "dados.f4",
    n: 4,
    nome: "Machine learning supervisionado",
    cor: "--f4",
    modulos: [
      {
        id: "dados.m10",
        n: 10,
        titulo: "Fundamentos de machine learning",
        h: 35,
        objetivo: "Entender o que um modelo faz, o que ele nao faz, e como saber se esta funcionando.",
        topicos: ["treino e teste", "sobreajuste", "validacao cruzada", "vazamento de dado"],
        aula: {
          objetivo: "Ao terminar, voce avalia um modelo de forma honesta e reconhece vazamento de dado.",
          blocos: [
            { t: "texto", v: "Modelo aprende padrao de dado passado para responder sobre dado novo. Toda a dificuldade esta na palavra novo: e facil acertar o que ja se viu, e isso nao serve para nada." },
            { t: "subtitulo", v: "Separar antes de olhar" },
            { t: "texto", v: "Divida os dados em treino e teste antes de qualquer analise. O conjunto de teste existe para simular o futuro, e so pode ser usado uma vez, no fim. Se voce ajusta o modelo olhando o teste, ele deixou de ser teste." },
            { t: "destaque", v: "Erro no treino mede memoria. Erro no teste mede aprendizado. So o segundo interessa." },
            { t: "subtitulo", v: "Sobreajuste" },
            { t: "texto", v: "Modelo complexo demais decora ruido. Fica excelente no treino e ruim no novo. O sinal e sempre o mesmo: distancia grande entre desempenho de treino e de teste." },
            { t: "tabela", cab: ["Treino", "Teste", "Diagnostico"], linhas: [
              ["ruim", "ruim", "modelo simples demais ou dado sem sinal"],
              ["otimo", "ruim", "sobreajuste"],
              ["bom", "bom", "o que se busca"],
              ["ruim", "otimo", "erro na separacao, quase sempre"]
            ] },
            { t: "subtitulo", v: "Vazamento de dado" },
            { t: "texto", v: "Vazamento e quando o modelo enxerga informacao que nao existiria no momento da previsao. E o erro mais comum e mais dificil de perceber, porque produz resultado espetacular." },
            { t: "lista", v: [
              "Usar data de pagamento para prever inadimplencia.",
              "Usar valor de desconto negociado para prever se a venda fecha.",
              "Normalizar a base inteira antes de separar treino e teste.",
              "Incluir uma coluna que so e preenchida depois do desfecho."
            ] },
            { t: "aviso", v: "Se o modelo acertou 99% de primeira, procure o vazamento antes de comemorar. Em problema de negocio real, 99% quase sempre significa que uma coluna conta a resposta." },
            { t: "codigo", lang: "python", v: "from sklearn.model_selection import train_test_split, cross_val_score\n\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=.2, random_state=42, stratify=y)\nscores = cross_val_score(modelo, X_tr, y_tr, cv=5)" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um modelo de risco de inadimplencia chega a 97% de acerto no primeiro teste. Ao listar as colunas mais importantes, a primeira e quantidade de acordos de renegociacao, que so existe depois que o cliente ja ficou inadimplente." },
              { t: "texto", v: "Sem essa coluna o acerto cai para 71%. E o numero verdadeiro, e o unico que sobrevive quando o modelo for usado em cliente novo." }
            ]
          },
          resumo: [
            "So o desempenho em dado nao visto conta.",
            "Distancia entre treino e teste denuncia sobreajuste.",
            "Resultado espetacular geralmente e vazamento.",
            "Separe treino e teste antes de qualquer transformacao."
          ],
          aplicar: [
            "Liste, para um problema seu, quais colunas so existem depois do desfecho.",
            "Monte a separacao treino e teste antes de qualquer analise no proximo projeto."
          ]
        },
        itens: [
          { id: "dados.m10.i1", tipo: "playlist", titulo: "StatQuest — Machine Learning",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
            embed: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", h: 12 },
          { id: "dados.m10.i2", tipo: "externo", titulo: "scikit-learn — guia de validacao cruzada",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/cross_validation.html", h: 4 },
          { id: "dados.m10.i3", tipo: "pratica",
            titulo: "Auditar um problema seu procurando colunas que vazam a resposta", h: 6 }
        ],
        exercicios: [
          { id: "dados.m10.e1", tipo: "python",
            enunciado: "Escreva separar(dados, fracao_teste, semente): divide a lista em treino e teste de forma reprodutivel, devolvendo a tupla (treino, teste).",
            starter: "import random\n\ndef separar(dados, fracao_teste, semente):\n    pass\n",
            teste: "d = list(range(100))\ntr, te = separar(d, 0.2, 1)\nassert len(te) == 20 and len(tr) == 80\nassert sorted(tr + te) == d\nassert separar(d, 0.2, 1) == separar(d, 0.2, 1)\n",
            gabarito: "import random\n\ndef separar(dados, fracao_teste, semente):\n    copia = list(dados)\n    random.Random(semente).shuffle(copia)\n    corte = int(len(copia) * fracao_teste)\n    return copia[corte:], copia[:corte]\n",
            dica: "Embaralhe uma copia; nao altere a lista original." },
          { id: "dados.m10.e2", tipo: "python",
            enunciado: "Escreva diagnosticar(erro_treino, erro_teste): devolve 'sobreajuste' quando o erro de teste supera o de treino em mais de 50%, 'subajuste' quando os dois passam de 0.3, e 'ok' no resto.",
            starter: "def diagnosticar(erro_treino, erro_teste):\n    pass\n",
            teste: "assert diagnosticar(0.05, 0.30) == 'sobreajuste'\nassert diagnosticar(0.40, 0.42) == 'subajuste'\nassert diagnosticar(0.10, 0.12) == 'ok'\n",
            gabarito: "def diagnosticar(erro_treino, erro_teste):\n    if erro_treino > 0 and erro_teste > erro_treino * 1.5:\n        return 'sobreajuste'\n    if erro_treino > 0.3 and erro_teste > 0.3:\n        return 'subajuste'\n    return 'ok'\n",
            dica: "Teste a condicao de sobreajuste primeiro." }
        ]
      },
      {
        id: "dados.m11",
        n: 11,
        titulo: "Regressao",
        h: 30,
        objetivo: "Prever um numero e explicar de onde veio a previsao.",
        topicos: ["regressao linear", "residuos", "interpretacao de coeficiente", "metricas de erro"],
        aula: {
          objetivo: "Ao terminar, voce ajusta uma regressao, le os residuos e explica o coeficiente para quem nao e tecnico.",
          blocos: [
            { t: "texto", v: "Regressao linear e o modelo mais antigo e ainda o mais util em ambiente corporativo, porque e o unico que voce consegue explicar inteiro numa reuniao." },
            { t: "subtitulo", v: "O que o coeficiente diz" },
            { t: "texto", v: "Cada coeficiente e a variacao esperada no resultado quando aquela variavel sobe uma unidade e as outras ficam paradas. A parte final e a que todo mundo esquece: mantidas as outras constantes." },
            { t: "destaque", v: "Coeficiente e associacao com as outras variaveis controladas, nao efeito causal. Trocar uma coisa pela outra numa reuniao gera decisao errada." },
            { t: "subtitulo", v: "Residuo e onde mora a informacao" },
            { t: "texto", v: "Residuo e a diferenca entre o observado e o previsto. Se os residuos formam padrao, o modelo esta deixando estrutura para tras: pode faltar uma variavel, pode haver relacao em curva, pode haver efeito de tempo." },
            { t: "lista", v: [
              "Residuo em funil: variancia cresce com o valor, considere transformar a escala.",
              "Residuo em curva: a relacao nao era reta.",
              "Residuo com padrao no tempo: falta uma variavel de periodo.",
              "Poucos residuos gigantes: outliers dominando o ajuste."
            ] },
            { t: "subtitulo", v: "Metricas de erro" },
            { t: "tabela", cab: ["Metrica", "Le-se como", "Quando usar"], linhas: [
              ["MAE", "erro medio na unidade do dado", "quando todo erro custa igual"],
              ["RMSE", "penaliza erro grande", "quando erro grande custa muito mais"],
              ["MAPE", "erro percentual", "cuidado: explode perto de zero"],
              ["R2", "fracao da variacao explicada", "comparar modelos no mesmo dado"]
            ] },
            { t: "aviso", v: "R2 sempre sobe quando voce adiciona variavel, mesmo variavel aleatoria. Comparar modelos por R2 sem penalizar complexidade leva a modelo inchado." },
            { t: "codigo", lang: "python", v: "from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\nmodelo = LinearRegression().fit(X_tr, y_tr)\nprevisto = modelo.predict(X_te)\nmae = mean_absolute_error(y_te, previsto)" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um modelo estima o prazo de conclusao de obras a partir de area, numero de unidades e regiao. O coeficiente de area da 0,8 dia por metro quadrado, e alguem conclui que reduzir a area reduz o prazo proporcionalmente." },
              { t: "texto", v: "O modelo nao autoriza essa conclusao: obras menores tambem tem equipes menores e fornecedores diferentes. O coeficiente descreve o padrao historico, nao promete o resultado de uma mudanca. Dizer isso na reuniao e parte do trabalho." }
            ]
          },
          resumo: [
            "Coeficiente e associacao com as outras controladas.",
            "Residuo com padrao significa modelo incompleto.",
            "Escolha a metrica de erro pelo custo do erro no negocio.",
            "R2 sobe com variavel inutil."
          ],
          aplicar: [
            "Ajuste uma regressao simples em um dado seu e plote os residuos.",
            "Escreva a interpretacao de um coeficiente em uma frase que um diretor entenda."
          ]
        },
        itens: [
          { id: "dados.m11.i1", tipo: "playlist", titulo: "StatQuest — Linear Regression",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
            embed: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", h: 8 },
          { id: "dados.m11.i2", tipo: "externo", titulo: "scikit-learn — modelos lineares",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/linear_model.html", h: 4 },
          { id: "dados.m11.i3", tipo: "entregavel",
            titulo: "Modelo de regressao para um numero que sua area precisa prever", h: 12 }
        ],
        exercicios: [
          { id: "dados.m11.e1", tipo: "python",
            enunciado: "Escreva erro_medio_absoluto(reais, previstos): media do valor absoluto das diferencas. Listas vazias devolvem 0.",
            starter: "def erro_medio_absoluto(reais, previstos):\n    pass\n",
            teste: "assert erro_medio_absoluto([10, 20], [12, 18]) == 2.0\nassert erro_medio_absoluto([], []) == 0\n",
            gabarito: "def erro_medio_absoluto(reais, previstos):\n    if not reais:\n        return 0\n    return sum(abs(r - p) for r, p in zip(reais, previstos)) / len(reais)\n",
            dica: "zip percorre as duas listas em paralelo." },
          { id: "dados.m11.e2", tipo: "python",
            enunciado: "Escreva reta(xs, ys): ajusta y = a*x + b por minimos quadrados e devolve a tupla (a, b) arredondada em quatro casas.",
            starter: "def reta(xs, ys):\n    pass\n",
            teste: "a, b = reta([1, 2, 3], [2, 4, 6])\nassert round(a, 2) == 2.0 and round(b, 2) == 0.0\na2, b2 = reta([1, 2, 3], [3, 5, 7])\nassert round(a2, 2) == 2.0 and round(b2, 2) == 1.0\n",
            gabarito: "def reta(xs, ys):\n    n = len(xs)\n    mx = sum(xs) / n\n    my = sum(ys) / n\n    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))\n    den = sum((x - mx) ** 2 for x in xs)\n    a = num / den\n    b = my - a * mx\n    return (round(a, 4), round(b, 4))\n",
            dica: "A inclinacao e a covariancia dividida pela variancia de x." }
        ]
      },
      {
        id: "dados.m12",
        n: 12,
        titulo: "Classificacao",
        h: 35,
        objetivo: "Prever uma categoria e escolher o ponto de corte pelo custo do erro.",
        topicos: ["regressao logistica", "matriz de confusao", "precisao e revocacao", "classe desbalanceada"],
        aula: {
          objetivo: "Ao terminar, voce avalia um classificador sem olhar acuracia e define o corte pelo custo do negocio.",
          blocos: [
            { t: "texto", v: "Classificacao responde perguntas de sim ou nao: o cliente vai cancelar, a transacao e fraude, o titulo vai atrasar. O modelo nao devolve sim ou nao, devolve uma probabilidade. Quem transforma probabilidade em decisao e voce, escolhendo o corte." },
            { t: "destaque", v: "O modelo entrega probabilidade. O corte e decisao de negocio, e quase nunca deve ser 50%." },
            { t: "subtitulo", v: "Por que acuracia engana" },
            { t: "texto", v: "Se 2% dos clientes cancelam, um modelo que diz que ninguem cancela acerta 98%. Acuracia alta em classe rara nao significa nada. Use a matriz de confusao." },
            { t: "tabela", cab: ["", "Previu sim", "Previu nao"], linhas: [
              ["E sim", "verdadeiro positivo", "falso negativo (deixou passar)"],
              ["E nao", "falso positivo (alarme falso)", "verdadeiro negativo"]
            ] },
            { t: "lista", v: [
              "Precisao: entre os que apontei, quantos eram de fato. Importa quando agir custa caro.",
              "Revocacao: entre os que eram, quantos apontei. Importa quando deixar passar custa caro.",
              "F1: media harmonica das duas, util quando as duas pesam parecido.",
              "AUC: qualidade do ordenamento, independente do corte."
            ] },
            { t: "subtitulo", v: "Escolher o corte pelo custo" },
            { t: "texto", v: "Se ligar para um cliente custa R$ 5 e reter um cliente vale R$ 800, vale muito a pena ligar para muita gente. Se a acao for cortar o credito, o falso positivo tem custo alto e o corte sobe. O corte sai da conta de custo, nao do padrao da biblioteca." },
            { t: "aviso", v: "Armadilha: balancear a base artificialmente e depois reportar as metricas na base balanceada. As metricas precisam ser lidas na proporcao real, senao prometem um desempenho que nao vai acontecer." },
            { t: "codigo", lang: "python", v: "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report\n\nmodelo = LogisticRegression(max_iter=1000, class_weight='balanced').fit(X_tr, y_tr)\nprob = modelo.predict_proba(X_te)[:, 1]\nprevisto = (prob >= 0.25).astype(int)   # corte escolhido pelo custo\nprint(classification_report(y_te, previsto))" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um modelo de churn com corte padrao de 50% aponta 80 clientes por mes, e a equipe de retencao consegue falar com 300. Metade do esforco disponivel fica ocioso e clientes que iriam sair nao sao contatados." },
              { t: "texto", v: "Baixar o corte para 22% faz o modelo apontar cerca de 300, exatamente a capacidade da equipe. A precisao cai, a revocacao sobe, e o resultado financeiro melhora porque a acao e barata. O corte virou uma decisao de capacidade." }
            ]
          },
          resumo: [
            "Modelo devolve probabilidade; o corte e seu.",
            "Acuracia nao serve para classe rara.",
            "Precisao importa quando agir custa; revocacao quando deixar passar custa.",
            "Reporte metricas na proporcao real da base."
          ],
          aplicar: [
            "Monte a matriz de confusao de um alerta que sua area ja usa.",
            "Calcule o corte que faz o numero de alertas caber na capacidade da equipe."
          ]
        },
        itens: [
          { id: "dados.m12.i1", tipo: "playlist", titulo: "StatQuest — Logistic Regression e ROC",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
            embed: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", h: 10 },
          { id: "dados.m12.i2", tipo: "externo", titulo: "scikit-learn — metricas de classificacao",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", h: 4 },
          { id: "dados.m12.i3", tipo: "entregavel",
            titulo: "Classificador para um evento da sua area, com corte justificado pelo custo", h: 14 }
        ],
        exercicios: [
          { id: "dados.m12.e1", tipo: "python",
            enunciado: "Escreva matriz(reais, previstos): devolve um dicionario com vp, fp, vn e fn, considerando 1 como positivo.",
            starter: "def matriz(reais, previstos):\n    pass\n",
            teste: "m = matriz([1, 1, 0, 0], [1, 0, 1, 0])\nassert m == {'vp': 1, 'fn': 1, 'fp': 1, 'vn': 1}\n",
            gabarito: "def matriz(reais, previstos):\n    m = {'vp': 0, 'fp': 0, 'vn': 0, 'fn': 0}\n    for r, p in zip(reais, previstos):\n        if r == 1 and p == 1:\n            m['vp'] += 1\n        elif r == 1 and p == 0:\n            m['fn'] += 1\n        elif r == 0 and p == 1:\n            m['fp'] += 1\n        else:\n            m['vn'] += 1\n    return m\n",
            dica: "Percorra os pares e classifique cada um nos quatro casos." },
          { id: "dados.m12.e2", tipo: "python",
            enunciado: "Escreva melhor_corte(probabilidades, reais, custo_fp, custo_fn): testa cortes de 0.05 a 0.95 de 0.05 em 0.05 e devolve o corte de menor custo total. Empate fica com o menor corte.",
            starter: "def melhor_corte(probabilidades, reais, custo_fp, custo_fn):\n    pass\n",
            teste: "p = [0.1, 0.4, 0.6, 0.9]\nr = [0, 0, 1, 1]\nc = melhor_corte(p, r, custo_fp=1, custo_fn=1)\nassert 0.4 < c <= 0.6\nc2 = melhor_corte(p, r, custo_fp=1, custo_fn=100)\nassert c2 <= 0.6\n",
            gabarito: "def melhor_corte(probabilidades, reais, custo_fp, custo_fn):\n    melhor = None\n    menor = None\n    corte = 0.05\n    while corte <= 0.95001:\n        fp = sum(1 for p, r in zip(probabilidades, reais) if p >= corte and r == 0)\n        fn = sum(1 for p, r in zip(probabilidades, reais) if p < corte and r == 1)\n        total = fp * custo_fp + fn * custo_fn\n        if menor is None or total < menor:\n            menor = total\n            melhor = round(corte, 2)\n        corte += 0.05\n    return melhor\n",
            dica: "Para cada corte, conte falsos positivos e falsos negativos e some os custos." }
        ]
      }
    ]
  });

  /* ===================================================================== F5 */
  fases.push({
    id: "dados.f5",
    n: 5,
    nome: "Machine learning avancado",
    cor: "--f5",
    modulos: [
      {
        id: "dados.m13",
        n: 13,
        titulo: "Ensembles e ajuste de modelo",
        h: 30,
        objetivo: "Usar arvores em conjunto e ajustar hiperparametros sem enganar a si mesmo.",
        topicos: ["arvore de decisao", "random forest", "gradient boosting", "busca de hiperparametros"],
        aula: {
          objetivo: "Ao terminar, voce treina um modelo de arvores, ajusta seus parametros com validacao correta e explica quais variaveis pesam.",
          blocos: [
            { t: "texto", v: "Uma arvore de decisao sozinha e facil de explicar e ruim de prever: ela decora. Varias arvores juntas, cada uma vendo uma parte do problema, produzem o modelo que mais entrega resultado em dado tabular de empresa." },
            { t: "subtitulo", v: "Duas formas de juntar arvores" },
            { t: "tabela", cab: ["Abordagem", "Como funciona", "Quando preferir"], linhas: [
              ["Random forest", "muitas arvores independentes, media dos votos", "baseline rapido, pouco ajuste, dificil de piorar"],
              ["Gradient boosting", "arvores em sequencia, cada uma corrige o erro da anterior", "quando cada ponto de desempenho importa"]
            ] },
            { t: "destaque", v: "Em dado tabular de empresa, arvores em conjunto ganham de rede neural na maior parte das vezes, com menos esforco e mais explicabilidade." },
            { t: "subtitulo", v: "Ajuste de hiperparametros" },
            { t: "texto", v: "Hiperparametro e a configuracao que voce escolhe, nao a que o modelo aprende: profundidade, numero de arvores, taxa de aprendizado. Ajustar significa testar combinacoes e ficar com a melhor, e o perigo esta em usar o conjunto de teste para escolher." },
            { t: "aviso", v: "Se voce escolhe hiperparametro olhando o teste, o teste vira treino disfarcado e o desempenho reportado fica otimista. Use validacao cruzada dentro do treino e guarde o teste para o fim." },
            { t: "codigo", lang: "python", v: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import RandomizedSearchCV\n\ngrade = {'n_estimators': [200, 400], 'max_depth': [4, 8, None], 'min_samples_leaf': [1, 5, 20]}\nbusca = RandomizedSearchCV(RandomForestClassifier(random_state=42), grade, n_iter=8, cv=5, random_state=42)\nbusca.fit(X_tr, y_tr)\nbusca.best_params_" },
            { t: "subtitulo", v: "Importancia de variavel, com ressalva" },
            { t: "texto", v: "A importancia que a biblioteca devolve por padrao favorece variaveis com muitos valores distintos e se confunde quando duas colunas dizem a mesma coisa. Para uso serio, prefira importancia por permutacao, que mede quanto o desempenho piora ao embaralhar aquela coluna." },
            { t: "texto", v: "Importancia mostra no que o modelo se apoia. Nao mostra causa, e nao autoriza dizer que mexer naquela variavel muda o resultado." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um random forest de previsao de atraso de pagamento aponta o codigo da filial como a variavel mais importante. Parece descoberta de negocio ate alguem notar que sao 180 filiais, e que a metrica padrao premia justamente colunas com muitas categorias." },
              { t: "texto", v: "Com importancia por permutacao, a filial cai para o setimo lugar e o historico de atraso do proprio cliente sobe para o primeiro. A conversa com a diretoria muda completamente." }
            ]
          },
          resumo: [
            "Arvore sozinha decora; em conjunto, generaliza.",
            "Random forest e o baseline dificil de estragar.",
            "Ajuste hiperparametro com validacao cruzada, nunca no teste.",
            "Importancia padrao engana; prefira permutacao."
          ],
          aplicar: [
            "Treine um random forest como baseline de um problema seu antes de tentar algo mais complexo.",
            "Recalcule a importancia por permutacao e compare com a padrao."
          ]
        },
        itens: [
          { id: "dados.m13.i1", tipo: "playlist", titulo: "StatQuest — Random Forest e Gradient Boost",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
            embed: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", h: 10 },
          { id: "dados.m13.i2", tipo: "externo", titulo: "scikit-learn — importancia por permutacao",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/permutation_importance.html", h: 3 },
          { id: "dados.m13.i3", tipo: "pratica",
            titulo: "Comparar random forest e regressao logistica no mesmo problema", h: 10 }
        ],
        exercicios: [
          { id: "dados.m13.e1", tipo: "python",
            enunciado: "Escreva votacao(previsoes): recebe uma lista de listas com o voto de cada modelo por observacao e devolve a lista com o voto majoritario. Empate fica com o menor valor.",
            starter: "def votacao(previsoes):\n    pass\n",
            teste: "p = [[1, 0, 1], [1, 1, 0], [0, 0, 1]]\nassert votacao(p) == [1, 0, 1]\nassert votacao([[1], [0]]) == [0]\n",
            gabarito: "def votacao(previsoes):\n    saida = []\n    for votos in zip(*previsoes):\n        contagem = {}\n        for v in votos:\n            contagem[v] = contagem.get(v, 0) + 1\n        maximo = max(contagem.values())\n        saida.append(min(k for k, c in contagem.items() if c == maximo))\n    return saida\n",
            dica: "zip(*previsoes) agrupa os votos de cada observacao." },
          { id: "dados.m13.e2", tipo: "python",
            enunciado: "Escreva melhor_config(resultados): recebe uma lista de dicionarios com 'config' e 'scores' (lista de notas por dobra) e devolve a config de maior media. Empate fica com a de menor desvio.",
            starter: "def melhor_config(resultados):\n    pass\n",
            teste: "r = [{'config': 'a', 'scores': [0.8, 0.8]}, {'config': 'b', 'scores': [0.9, 0.7]}]\nassert melhor_config(r) == 'a'\n",
            gabarito: "def melhor_config(resultados):\n    def media(s):\n        return sum(s) / len(s)\n\n    def desvio(s):\n        m = media(s)\n        return (sum((x - m) ** 2 for x in s) / len(s)) ** 0.5\n\n    melhor = sorted(resultados, key=lambda r: (-media(r['scores']), desvio(r['scores'])))\n    return melhor[0]['config']\n",
            dica: "Ordene por media decrescente e desvio crescente." }
        ]
      },
      {
        id: "dados.m14",
        n: 14,
        titulo: "Series temporais",
        h: 30,
        objetivo: "Prever valores no tempo respeitando a ordem dos acontecimentos.",
        topicos: ["tendencia e sazonalidade", "validacao temporal", "baseline ingenuo", "previsao com incerteza"],
        aula: {
          objetivo: "Ao terminar, voce faz previsao no tempo sem embaralhar o passado com o futuro e sempre compara com um baseline honesto.",
          blocos: [
            { t: "texto", v: "Serie temporal quebra a regra basica de machine learning: as observacoes nao sao independentes e a ordem importa. Tudo o que voce aprendeu sobre separar treino e teste aleatoriamente vale o contrario aqui." },
            { t: "destaque", v: "Em serie temporal, treino e sempre passado e teste e sempre futuro. Embaralhar cria um modelo que ve o amanha para prever o ontem." },
            { t: "subtitulo", v: "Decompor antes de modelar" },
            { t: "lista", v: [
              "Tendencia: para onde a serie caminha no longo prazo.",
              "Sazonalidade: padrao que se repete em periodo fixo, como mes ou dia da semana.",
              "Ciclo: oscilacao sem periodo fixo, ligada a economia ou ao setor.",
              "Ruido: o que sobra."
            ] },
            { t: "subtitulo", v: "Baseline ingenuo, sempre" },
            { t: "texto", v: "Antes de qualquer modelo, calcule duas previsoes bobas: repetir o ultimo valor e repetir o mesmo periodo do ano passado. Muitos modelos elaborados perdem para essas duas, e descobrir isso cedo economiza semanas." },
            { t: "codigo", lang: "python", v: "# baseline 1: ultimo valor\nprev_ingenua = serie.shift(1)\n\n# baseline 2: mesmo mes do ano anterior\nprev_sazonal = serie.shift(12)\n\n# so vale seguir se o modelo bater os dois" },
            { t: "subtitulo", v: "Validacao que respeita o tempo" },
            { t: "texto", v: "Use janelas crescentes: treina com os doze primeiros meses e testa no decimo terceiro, depois treina com treze e testa no decimo quarto, e assim por diante. E o unico jeito de simular como o modelo se comportaria em producao." },
            { t: "aviso", v: "Armadilha frequente: calcular media movel ou normalizacao usando a serie inteira antes de separar. A media do futuro vaza para o passado e o resultado fica bom demais." },
            { t: "subtitulo", v: "Previsao sem intervalo e chute" },
            { t: "texto", v: "Numero unico de previsao passa uma confianca que nao existe. Entregue faixa: o mais provavel, o cenario pessimista e o otimista. Quem decide precisa saber o tamanho da incerteza." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A previsao de recebimentos do trimestre e feita com media dos ultimos tres meses. Em dezembro ela erra feio todo ano, porque dezembro nao se parece com setembro, outubro e novembro." },
              { t: "texto", v: "Comparar com o baseline sazonal, o mesmo mes do ano anterior corrigido pelo crescimento, reduziu o erro pela metade sem nenhum modelo sofisticado. O ganho veio de respeitar a sazonalidade, nao de tecnica avancada." }
            ]
          },
          resumo: [
            "Treino e passado, teste e futuro. Nunca embaralhe.",
            "Comece pelos baselines ingenuo e sazonal.",
            "Transformacao calculada na serie inteira vaza o futuro.",
            "Entregue faixa de previsao, nao numero unico."
          ],
          aplicar: [
            "Calcule os dois baselines para um indicador que sua area preve.",
            "Refaca a validacao de uma previsao sua usando janelas crescentes."
          ]
        },
        itens: [
          { id: "dados.m14.i1", tipo: "externo", titulo: "Forecasting: Principles and Practice",
            fonte: "Hyndman e Athanasopoulos", url: "https://otexts.com/fpp3/", h: 12 },
          { id: "dados.m14.i2", tipo: "externo", titulo: "scikit-learn — validacao com TimeSeriesSplit",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/cross_validation.html#time-series-split", h: 2 },
          { id: "dados.m14.i3", tipo: "entregavel",
            titulo: "Previsao de um indicador seu com faixa e comparacao contra baseline", h: 12 }
        ],
        exercicios: [
          { id: "dados.m14.e1", tipo: "python",
            enunciado: "Escreva media_movel(serie, janela): devolve a lista de medias moveis; posicoes sem janela completa recebem None.",
            starter: "def media_movel(serie, janela):\n    pass\n",
            teste: "assert media_movel([1, 2, 3, 4], 2) == [None, 1.5, 2.5, 3.5]\nassert media_movel([1], 2) == [None]\n",
            gabarito: "def media_movel(serie, janela):\n    saida = []\n    for i in range(len(serie)):\n        if i + 1 < janela:\n            saida.append(None)\n        else:\n            trecho = serie[i + 1 - janela:i + 1]\n            saida.append(sum(trecho) / janela)\n    return saida\n",
            dica: "A janela termina na posicao atual e inclui os anteriores." },
          { id: "dados.m14.e2", tipo: "python",
            enunciado: "Escreva janelas_temporais(n, minimo): devolve a lista de tuplas (indices de treino, indice de teste) em janela crescente, comecando com 'minimo' pontos de treino.",
            starter: "def janelas_temporais(n, minimo):\n    pass\n",
            teste: "assert janelas_temporais(5, 3) == [([0,1,2], 3), ([0,1,2,3], 4)]\nassert janelas_temporais(3, 3) == []\n",
            gabarito: "def janelas_temporais(n, minimo):\n    saida = []\n    for corte in range(minimo, n):\n        saida.append((list(range(corte)), corte))\n    return saida\n",
            dica: "Cada janela treina com tudo antes do ponto testado." }
        ]
      },
      {
        id: "dados.m15",
        n: 15,
        titulo: "Aprendizado nao supervisionado",
        h: 25,
        objetivo: "Encontrar grupos em dados sem rotulo e saber quando o agrupamento significa algo.",
        topicos: ["k-means", "escolha de k", "reducao de dimensao", "leitura de segmento"],
        aula: {
          objetivo: "Ao terminar, voce segmenta uma base e defende por que aqueles grupos existem.",
          blocos: [
            { t: "texto", v: "Sem rotulo, nao existe resposta certa. O algoritmo sempre devolve grupos, inclusive quando nao ha grupo nenhum. A avaliacao passa a ser humana: os segmentos fazem sentido para quem conhece o negocio?" },
            { t: "destaque", v: "k-means sempre entrega k grupos, mesmo que os dados sejam uma nuvem uniforme. O algoritmo nao avisa quando nao ha estrutura." },
            { t: "subtitulo", v: "Antes de agrupar" },
            { t: "lista", ordenada: true, v: [
              "Escolha as variaveis pensando na decisao que o segmento vai apoiar.",
              "Padronize a escala, senao a variavel de maior magnitude domina a distancia.",
              "Trate outliers, que puxam centros inteiros.",
              "Reduza dimensao se houver muitas colunas correlacionadas."
            ] },
            { t: "subtitulo", v: "Escolher o numero de grupos" },
            { t: "texto", v: "O metodo do cotovelo e a silhueta ajudam, mas nao decidem. Quem decide e a utilidade: cinco segmentos que o time comercial consegue tratar de forma diferente valem mais que doze estatisticamente melhores e operacionalmente inuteis." },
            { t: "codigo", lang: "python", v: "from sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\n\nX = StandardScaler().fit_transform(dados)\nfor k in range(2, 8):\n    rotulos = KMeans(n_clusters=k, n_init=10, random_state=42).fit_predict(X)\n    print(k, round(silhouette_score(X, rotulos), 3))" },
            { t: "subtitulo", v: "Descrever o segmento" },
            { t: "texto", v: "Segmento sem nome nao e usado. Depois de agrupar, compare a media de cada variavel dentro do grupo com a media geral e escreva uma frase por segmento. Nomear e o que transforma o resultado tecnico em decisao comercial." },
            { t: "aviso", v: "Nao apresente segmentacao com nome de cluster 0, 1 e 2. Ninguem age sobre cluster 2. Age sobre clientes grandes de compra irregular." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma segmentacao de clientes por valor, frequencia e recencia devolve seis grupos. Dois deles tem menos de 40 clientes cada e comportamento parecido com um terceiro." },
              { t: "texto", v: "Reduzir para quatro segmentos, com nomes que o comercial reconhece, fez a segmentacao ser adotada. A versao de seis, estatisticamente um pouco melhor, tinha ficado no relatorio." }
            ]
          },
          resumo: [
            "Sem rotulo nao ha resposta certa; a validacao e de negocio.",
            "Padronize a escala antes de calcular distancia.",
            "O numero de grupos e limitado pela capacidade de tratar cada um.",
            "Segmento sem nome nao vira acao."
          ],
          aplicar: [
            "Segmente uma base sua por tres variaveis de comportamento.",
            "Escreva uma frase de nome e descricao para cada segmento e leve para quem opera."
          ]
        },
        itens: [
          { id: "dados.m15.i1", tipo: "playlist", titulo: "StatQuest — Clustering e PCA",
            fonte: "StatQuest", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF",
            embed: "PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF", h: 8 },
          { id: "dados.m15.i2", tipo: "externo", titulo: "scikit-learn — guia de clustering",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/clustering.html", h: 4 },
          { id: "dados.m15.i3", tipo: "entregavel",
            titulo: "Segmentacao de clientes com nomes e acao sugerida por segmento", h: 10 }
        ],
        exercicios: [
          { id: "dados.m15.e1", tipo: "python",
            enunciado: "Escreva padronizar(valores): devolve a lista com media zero e desvio um, arredondada em quatro casas. Desvio zero devolve zeros.",
            starter: "def padronizar(valores):\n    pass\n",
            teste: "r = padronizar([2, 4, 6])\nassert round(sum(r), 4) == 0\nassert padronizar([5, 5, 5]) == [0.0, 0.0, 0.0]\n",
            gabarito: "def padronizar(valores):\n    n = len(valores)\n    media = sum(valores) / n\n    desvio = (sum((v - media) ** 2 for v in valores) / n) ** 0.5\n    if desvio == 0:\n        return [0.0] * n\n    return [round((v - media) / desvio, 4) for v in valores]\n",
            dica: "Trate o desvio zero antes de dividir." },
          { id: "dados.m15.e2", tipo: "python",
            enunciado: "Escreva perfil_segmento(registros, rotulos, campo): devolve a media do campo por rotulo.",
            starter: "def perfil_segmento(registros, rotulos, campo):\n    pass\n",
            teste: "r = [{'v': 10}, {'v': 20}, {'v': 30}]\nassert perfil_segmento(r, ['a', 'a', 'b'], 'v') == {'a': 15.0, 'b': 30.0}\n",
            gabarito: "def perfil_segmento(registros, rotulos, campo):\n    soma = {}\n    cont = {}\n    for reg, rot in zip(registros, rotulos):\n        soma[rot] = soma.get(rot, 0) + reg[campo]\n        cont[rot] = cont.get(rot, 0) + 1\n    return {k: soma[k] / cont[k] for k in soma}\n",
            dica: "Acumule soma e contagem por rotulo." }
        ]
      }
    ]
  });

  /* ===================================================================== F6 */
  fases.push({
    id: "dados.f6",
    n: 6,
    nome: "Projeto e portfolio",
    cor: "--f6",
    modulos: [
      {
        id: "dados.m16",
        n: 16,
        titulo: "Engenharia de atributos e pipeline",
        h: 25,
        objetivo: "Transformar dado bruto em variaveis uteis, de forma reproduzivel.",
        topicos: ["criacao de variavel", "codificacao de categoria", "pipeline", "reprodutibilidade"],
        aula: {
          objetivo: "Ao terminar, voce monta um pipeline que aplica as mesmas transformacoes no treino e em producao.",
          blocos: [
            { t: "texto", v: "A diferenca entre um modelo mediano e um bom raramente esta no algoritmo. Esta nas variaveis. Conhecimento de negocio vira desempenho por meio da engenharia de atributos." },
            { t: "subtitulo", v: "Variaveis que costumam funcionar" },
            { t: "lista", v: [
              "Razoes: valor por unidade, ticket por pedido, atraso por contrato.",
              "Tempo desde o ultimo evento: dias desde a ultima compra, desde o ultimo atraso.",
              "Agregados historicos: media dos ultimos tres meses, maximo do ano.",
              "Contagens: quantos pedidos, quantos contatos, quantas alteracoes.",
              "Sinalizadores: primeiro pedido, cliente novo, mes de fechamento."
            ] },
            { t: "destaque", v: "Toda variavel criada precisa responder: essa informacao existiria no momento em que a previsao seria feita?" },
            { t: "subtitulo", v: "Categoria" },
            { t: "tabela", cab: ["Situacao", "Tecnica"], linhas: [
              ["Poucas categorias", "one-hot"],
              ["Muitas categorias", "agrupar as raras em 'outros'"],
              ["Categoria com ordem", "codificar preservando a ordem"],
              ["Categoria nova em producao", "reservar uma classe 'desconhecido' desde o treino"]
            ] },
            { t: "subtitulo", v: "Pipeline" },
            { t: "texto", v: "Pipeline junta transformacoes e modelo num objeto so. O ganho nao e elegancia: e garantir que a mesma sequencia rode em producao, na ordem certa, sem passo esquecido, e que a estatistica usada na normalizacao venha so do treino." },
            { t: "codigo", lang: "python", v: "from sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\npre = ColumnTransformer([\n    ('num', StandardScaler(), colunas_num),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), colunas_cat)\n])\nfluxo = Pipeline([('pre', pre), ('modelo', modelo)])\nfluxo.fit(X_tr, y_tr)" },
            { t: "aviso", v: "handle_unknown='ignore' evita que o modelo quebre em producao quando aparece uma categoria que nao existia no treino. Sem isso, uma filial nova derruba o processo." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um modelo de risco melhorou 9 pontos ao ganhar tres variaveis simples: dias desde o ultimo atraso, razao entre valor da parcela e ticket medio do cliente, e contagem de renegociacoes nos ultimos doze meses." },
              { t: "texto", v: "Nenhuma delas exigiu tecnica nova. Exigiu conversar com o time de cobranca e perguntar no que eles olham antes de ligar." }
            ]
          },
          resumo: [
            "Variavel boa vale mais que algoritmo sofisticado.",
            "Toda variavel precisa existir no momento da previsao.",
            "Pipeline garante a mesma sequencia em treino e producao.",
            "Prepare o modelo para categoria desconhecida."
          ],
          aplicar: [
            "Converse com quem opera e liste cinco sinais que essa pessoa usa na decisao.",
            "Transforme dois desses sinais em variaveis e meca o ganho."
          ]
        },
        itens: [
          { id: "dados.m16.i1", tipo: "externo", titulo: "scikit-learn — pipelines e ColumnTransformer",
            fonte: "scikit-learn", url: "https://scikit-learn.org/stable/modules/compose.html", h: 4 },
          { id: "dados.m16.i2", tipo: "externo", titulo: "Kaggle Learn — Feature Engineering",
            fonte: "Kaggle", url: "https://www.kaggle.com/learn/feature-engineering", h: 6 },
          { id: "dados.m16.i3", tipo: "pratica",
            titulo: "Criar tres variaveis novas a partir de conversa com quem opera o processo", h: 8 }
        ],
        exercicios: [
          { id: "dados.m16.e1", tipo: "python",
            enunciado: "Escreva agrupar_raras(valores, minimo): substitui por 'outros' as categorias que aparecem menos de 'minimo' vezes.",
            starter: "def agrupar_raras(valores, minimo):\n    pass\n",
            teste: "v = ['a', 'a', 'a', 'b', 'c']\nassert agrupar_raras(v, 2) == ['a', 'a', 'a', 'outros', 'outros']\nassert agrupar_raras([], 2) == []\n",
            gabarito: "def agrupar_raras(valores, minimo):\n    contagem = {}\n    for v in valores:\n        contagem[v] = contagem.get(v, 0) + 1\n    return [v if contagem[v] >= minimo else 'outros' for v in valores]\n",
            dica: "Conte primeiro, depois substitua." },
          { id: "dados.m16.e2", tipo: "python",
            enunciado: "Escreva dias_desde(eventos, referencia): recebe uma lista de inteiros representando dias e um dia de referencia; devolve quantos dias se passaram desde o evento mais recente anterior ou igual a referencia. Sem evento valido, devolve None.",
            starter: "def dias_desde(eventos, referencia):\n    pass\n",
            teste: "assert dias_desde([10, 20, 35], 30) == 10\nassert dias_desde([40], 30) is None\nassert dias_desde([], 30) is None\n",
            gabarito: "def dias_desde(eventos, referencia):\n    anteriores = [e for e in eventos if e <= referencia]\n    if not anteriores:\n        return None\n    return referencia - max(anteriores)\n",
            dica: "Descarte eventos futuros: eles vazariam informacao." }
        ]
      },
      {
        id: "dados.m17",
        n: 17,
        titulo: "Projeto ponta a ponta",
        h: 40,
        objetivo: "Levar um problema real da pergunta ate a entrega utilizavel.",
        topicos: ["definicao do problema", "execucao", "avaliacao", "entrega"],
        aula: {
          objetivo: "Ao terminar, voce tem um projeto completo, com limitacoes declaradas e resultado que alguem usa.",
          blocos: [
            { t: "texto", v: "Projeto de ciencia de dados nao termina no modelo. Termina quando alguem toma uma decisao diferente por causa dele. Tudo entre uma coisa e outra e trabalho de traducao." },
            { t: "subtitulo", v: "A ordem que funciona" },
            { t: "lista", ordenada: true, v: [
              "Escreva a pergunta em uma frase e mostre para quem vai usar.",
              "Defina como sera medido o sucesso, em termos de negocio.",
              "Levante o dado e explore antes de prometer prazo.",
              "Construa o baseline mais bobo possivel.",
              "So entao tente algo melhor, comparando sempre com o baseline.",
              "Avalie no dado que simula o futuro.",
              "Entregue de um jeito que caiba na rotina de quem decide.",
              "Escreva o que o projeto nao responde."
            ] },
            { t: "destaque", v: "O baseline bobo e a coisa mais valiosa do projeto: ele define se o esforco seguinte vale a pena." },
            { t: "subtitulo", v: "Escopo" },
            { t: "texto", v: "Projeto de tres meses sem entrega intermediaria morre. Corte em pedacos que entregam algo sozinhos: primeiro a analise descritiva, depois o baseline, depois o modelo, depois a automacao. Cada pedaco pode ser interrompido sem perda total." },
            { t: "subtitulo", v: "Entrega" },
            { t: "texto", v: "A entrega raramente e um notebook. Costuma ser uma lista priorizada no painel que a equipe ja abre, um arquivo semanal no lugar certo ou um alerta com quantidade compativel com a capacidade do time. Perguntar onde a pessoa quer receber e parte do projeto." },
            { t: "aviso", v: "Nao entregue modelo em producao sem combinar quem monitora. Modelo sem dono e sem acompanhamento degrada em silencio e destroi a confianca da area em dados." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um projeto de previsao de inadimplencia foi entregue como notebook com 94% de AUC. Tres meses depois ninguem usava, porque a equipe de cobranca trabalha numa fila dentro do sistema e nao abre notebook." },
              { t: "texto", v: "A segunda versao gerava um arquivo diario com os 200 casos de maior risco, no formato que o sistema importa. AUC igual, uso total. A tecnica foi a mesma; o que mudou foi a entrega." }
            ]
          },
          resumo: [
            "Projeto termina quando muda uma decisao.",
            "Baseline bobo primeiro, sempre.",
            "Corte o escopo em pedacos que entregam sozinhos.",
            "Modelo sem dono e sem monitoramento apodrece."
          ],
          aplicar: [
            "Escreva em uma frase a pergunta do seu projeto e valide com quem vai usar.",
            "Defina o baseline e o criterio de sucesso antes de escrever qualquer modelo."
          ]
        },
        itens: [
          { id: "dados.m17.i1", tipo: "externo", titulo: "Rules of Machine Learning — boas praticas do Google",
            fonte: "Google", url: "https://developers.google.com/machine-learning/guides/rules-of-ml", h: 6 },
          { id: "dados.m17.i2", tipo: "externo", titulo: "Kaggle — datasets publicos para projeto",
            fonte: "Kaggle", url: "https://www.kaggle.com/datasets", h: 2 },
          { id: "dados.m17.i3", tipo: "entregavel",
            titulo: "Projeto completo, da pergunta a entrega, com limitacoes escritas", h: 28 }
        ],
        exercicios: [
          { id: "dados.m17.e1", tipo: "quiz",
            enunciado: "Voce tem duas semanas para um projeto de previsao de demanda. O que faz primeiro?",
            alternativas: [
              { v: "Testar tres algoritmos e escolher o de melhor metrica", correta: false,
                explicacao: "Sem baseline nao ha como saber se qualquer um deles vale o esforco de manter." },
              { v: "Calcular o baseline sazonal e conversar com quem usa a previsao hoje", correta: true,
                explicacao: "Define o piso a ser superado e revela como a previsao entra na rotina. Sem isso, o projeto pode entregar algo melhor e ainda assim inutil." },
              { v: "Levantar todas as variaveis possiveis antes de comecar", correta: false,
                explicacao: "Consome as duas semanas em coleta e chega ao fim sem nenhuma entrega." },
              { v: "Montar o pipeline de producao para ja entregar automatizado", correta: false,
                explicacao: "Automatizar antes de saber se ha ganho e otimizar algo que pode ser descartado." }
            ] }
        ]
      },
      {
        id: "dados.m18",
        n: 18,
        titulo: "Portfolio e comunicacao de resultado",
        h: 25,
        objetivo: "Mostrar o que voce sabe fazer de um jeito que abra porta.",
        topicos: ["portfolio", "README", "apresentacao executiva", "posicionamento"],
        aula: {
          objetivo: "Ao terminar, voce tem um portfolio pequeno e forte, e sabe apresentar um resultado em cinco minutos.",
          blocos: [
            { t: "texto", v: "Portfolio nao e prova de que voce sabe usar bibliotecas. E prova de que voce resolve problema e comunica o resultado. Tres projetos inteiros valem mais que quinze notebooks pela metade." },
            { t: "subtitulo", v: "O que um bom projeto de portfolio tem" },
            { t: "lista", v: [
              "Uma pergunta que alguem realmente faria.",
              "Dado publico ou proprio, nunca dado da empresa.",
              "Conclusao escrita em linguagem de negocio, logo no comeco.",
              "Codigo legivel, com o passo a passo comentado.",
              "Limitacoes declaradas."
            ] },
            { t: "destaque", v: "A primeira coisa que alguem le e o README. Se ele nao diz a pergunta e a conclusao nos primeiros paragrafos, o resto nao sera lido." },
            { t: "subtitulo", v: "Apresentar em cinco minutos" },
            { t: "lista", ordenada: true, v: [
              "A pergunta e por que ela importa, em 30 segundos.",
              "A resposta, direto, sem suspense.",
              "Como voce chegou nela, em tres passos.",
              "O que muda na pratica.",
              "O que ainda nao esta respondido."
            ] },
            { t: "texto", v: "Diretor decide com a resposta na frente, nao com a jornada. Guardar a conclusao para o final e habito academico e atrapalha em reuniao de negocio." },
            { t: "aviso", v: "Nunca use dado da empresa em projeto publico, nem anonimizado por conta propria. Alem do risco de vazamento, e um sinal ruim para qualquer recrutador serio." },
            { t: "subtitulo", v: "Posicionamento" },
            { t: "texto", v: "Analista com experiencia em ERP, Power BI e SQL que aprende ciencia de dados nao esta comecando do zero: esta somando modelagem a um conhecimento de negocio que quem vem da faculdade nao tem. Esse e o texto do seu perfil." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um perfil listava dez tecnologias e nenhum resultado. A versao nova trazia tres linhas: reduziu em 40% o tempo de fechamento mensal automatizando o relatorio X, construiu o painel Y usado pela diretoria, e desenvolveu o modelo Z de previsao de inadimplencia." },
              { t: "texto", v: "As mesmas tecnologias continuam la, agora ligadas ao que elas produziram. Foi a mudanca que gerou as primeiras conversas." }
            ]
          },
          resumo: [
            "Tres projetos inteiros valem mais que quinze pela metade.",
            "README diz a pergunta e a conclusao no comeco.",
            "Em reuniao, a resposta vem antes da jornada.",
            "Experiencia de negocio e diferencial, nao atraso."
          ],
          aplicar: [
            "Escreva o README de um projeto seu comecando pela conclusao.",
            "Reescreva o resumo do seu LinkedIn ligando cada tecnologia a um resultado.",
            "Apresente um projeto para alguem em cinco minutos, cronometrados."
          ]
        },
        itens: [
          { id: "dados.m18.i1", tipo: "externo", titulo: "Guia de escrita de README",
            fonte: "makeareadme.com", url: "https://www.makeareadme.com/", h: 2 },
          { id: "dados.m18.i2", tipo: "externo", titulo: "GitHub Skills — publicar e documentar projeto",
            fonte: "GitHub", url: "https://skills.github.com/", h: 4 },
          { id: "dados.m18.i3", tipo: "entregavel",
            titulo: "Portfolio publicado com tres projetos e README que comeca pela conclusao", h: 12 },
          { id: "dados.m18.i4", tipo: "entregavel",
            titulo: "Perfil do LinkedIn reescrito ligando tecnologia a resultado", h: 4 }
        ],
        exercicios: [
          { id: "dados.m18.e1", tipo: "reflexao",
            enunciado: "Prepare o seu posicionamento profissional.",
            perguntas: [
              "Qual problema de negocio voce resolveu que alguem que so sabe modelagem nao conseguiria resolver?",
              "Quais tres resultados seus podem ser descritos com um numero?",
              "O que voce quer estar fazendo daqui a dois anos, e qual dessas tres coisas mais aproxima disso?"
            ],
            minimoCaracteres: 400 }
        ]
      }
    ]
  });



  window.PDC.trilhas.registrar({
    id: "dados",
    nome: "Ciencia de Dados aplicada",
    desc: "De analista de dados a cientista de dados, com projeto e portfolio. Marco de empregabilidade no modulo 12.",
    icone: "grafico",
    cor1: "--t-dados",
    cor2: "--t-dados",
    tipoPratica: "python",
    horas: 560,
    marcos: [
      { moduloId: "dados.m12", rotulo: "Pronto para atuar",
        texto: "Base suficiente para assumir demanda de ciencia de dados com apoio. Ao chegar aqui: revisar curriculo e LinkedIn e conversar sobre a transicao interna." }
    ],
    fases: fases
  });
})();
