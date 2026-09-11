/* engenharia.js — trilha Engenharia de Dados.
   5 fases, 15 modulos, 400 h.

   Base de exemplo dos exercicios de SQL: "vendas" (clientes, produtos, pedidos,
   itens). Escolhida por ser neutra e transferivel. Decide a questao QT-01 da
   arquitetura; trocar a base afeta apenas os exercicios desta trilha. */

(function () {
  "use strict";

  var fases = [];

  /* ===================================================================== F1 */
  fases.push({
    id: "engenharia.f1",
    n: 1,
    nome: "Fundamentos",
    cor: "--f1",
    modulos: [
      {
        id: "engenharia.m1",
        n: 1,
        titulo: "SQL avancado e funcoes de janela",
        h: 35,
        objetivo: "Resolver com uma consulta o que hoje voce resolve com varias e uma planilha.",
        topicos: ["funcoes de janela", "CTE", "agregacao condicional", "plano de execucao"],
        aula: {
          objetivo: "Ao terminar, voce escreve consultas com ranking, acumulado e comparacao entre linhas sem exportar nada.",
          blocos: [
            { t: "texto", v: "Quem usa SQL para extrair e depois termina no Excel costuma parar em GROUP BY. Funcao de janela e o que falta: ela agrega sem colapsar as linhas, e resolve ranking, acumulado, variacao mes a mes e primeira ou ultima ocorrencia." },
            { t: "subtitulo", v: "A diferenca entre agregar e janelar" },
            { t: "texto", v: "GROUP BY transforma muitas linhas em uma. Funcao de janela mantem todas as linhas e acrescenta uma coluna calculada sobre um grupo. Voce continua vendo o pedido, e ao lado dele o total do cliente." },
            { t: "codigo", lang: "sql", v: "SELECT\n  pedido_id,\n  cliente_id,\n  valor,\n  SUM(valor)  OVER (PARTITION BY cliente_id)                          AS total_cliente,\n  ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC)      AS ordem_recente,\n  LAG(valor)   OVER (PARTITION BY cliente_id ORDER BY data)           AS valor_anterior\nFROM pedidos;" },
            { t: "destaque", v: "PARTITION BY define o grupo. ORDER BY dentro do OVER define a ordem do calculo. Sao coisas diferentes do GROUP BY e do ORDER BY da consulta." },
            { t: "subtitulo", v: "As tres que resolvem quase tudo" },
            { t: "tabela", cab: ["Funcao", "Uso tipico"], linhas: [
              ["ROW_NUMBER()", "pegar o registro mais recente por cliente"],
              ["LAG() e LEAD()", "comparar com o periodo anterior ou seguinte"],
              ["SUM() OVER (ORDER BY ...)", "acumulado ao longo do tempo"],
              ["RANK() e DENSE_RANK()", "ranking com tratamento de empate"]
            ] },
            { t: "subtitulo", v: "CTE em vez de consulta aninhada" },
            { t: "texto", v: "WITH cria etapas nomeadas. Uma consulta de cinco niveis aninhados vira cinco blocos com nome, na ordem em que voce pensaria. Nao e so estetica: e a diferenca entre um colega conseguir manter a consulta ou reescrever tudo." },
            { t: "codigo", lang: "sql", v: "WITH faturado AS (\n  SELECT * FROM pedidos WHERE status = 'faturado'\n),\npor_cliente AS (\n  SELECT cliente_id, SUM(valor) AS total FROM faturado GROUP BY cliente_id\n)\nSELECT c.nome, p.total\nFROM por_cliente p\nJOIN clientes c ON c.id = p.cliente_id\nORDER BY p.total DESC;" },
            { t: "subtitulo", v: "Agregacao condicional" },
            { t: "codigo", lang: "sql", v: "SELECT\n  cliente_id,\n  SUM(CASE WHEN status = 'faturado' THEN valor ELSE 0 END) AS faturado,\n  SUM(CASE WHEN status = 'cancelado' THEN valor ELSE 0 END) AS cancelado\nFROM pedidos\nGROUP BY cliente_id;" },
            { t: "aviso", v: "Armadilha: filtrar no WHERE o que deveria estar no ON de um LEFT JOIN. O filtro no WHERE transforma o LEFT JOIN em INNER JOIN sem aviso, e as linhas sem correspondencia somem." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "O relatorio de ultima compra por cliente era feito com duas extracoes e um PROCV: uma consulta trazia os pedidos, outra o maximo por cliente, e o Excel juntava." },
              { t: "texto", v: "Com ROW_NUMBER particionado por cliente e ordenado por data, virou uma consulta unica que o Power BI le direto. Sumiram duas exportacoes manuais por semana e a chance de alguem usar o arquivo velho." }
            ]
          },
          resumo: [
            "Funcao de janela agrega sem colapsar linha.",
            "PARTITION BY e o grupo; o ORDER BY do OVER e a ordem do calculo.",
            "CTE transforma consulta aninhada em etapas com nome.",
            "Filtro no WHERE anula o LEFT JOIN."
          ],
          aplicar: [
            "Reescreva com ROW_NUMBER um relatorio seu que hoje usa duas extracoes.",
            "Troque a consulta aninhada mais confusa que voce mantem por CTEs nomeadas."
          ]
        },
        itens: [
          { id: "engenharia.m1.i1", tipo: "externo", titulo: "Tutorial de SQL — janelas e analitico",
            fonte: "ThoughtSpot, antigo Mode", url: "https://www.thoughtspot.com/sql-tutorial", h: 8 },
          { id: "engenharia.m1.i2", tipo: "externo", titulo: "LeetCode SQL 50",
            fonte: "LeetCode", url: "https://leetcode.com/studyplan/top-sql-50/", h: 12 },
          { id: "engenharia.m1.i3", tipo: "externo", titulo: "Funcoes de janela no SQL Server",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/sql/t-sql/queries/select-over-clause-transact-sql", h: 4 },
          { id: "engenharia.m1.i4", tipo: "entregavel",
            titulo: "Consulta unica que substitui um relatorio seu de duas extracoes", h: 8 }
        ],
        exercicios: [
          { id: "engenharia.m1.e1", tipo: "sql", base: "vendas",
            enunciado: "Liste o total faturado por UF, do maior para o menor. Considere apenas pedidos com status 'faturado'.",
            starter: "SELECT uf, valor\nFROM pedidos;",
            esperado: { colunas: ["uf", "total"], linhas: [["GO", 9800], ["SP", 7200], ["MG", 3100]] },
            ordemImporta: true,
            gabarito: "SELECT c.uf, SUM(p.valor) AS total\nFROM pedidos p\nJOIN clientes c ON c.id = p.cliente_id\nWHERE p.status = 'faturado'\nGROUP BY c.uf\nORDER BY total DESC;",
            dica: "A UF esta em clientes, o valor em pedidos. Junte antes de agrupar." },
          { id: "engenharia.m1.e2", tipo: "sql", base: "vendas",
            enunciado: "Traga o pedido mais recente de cada cliente, com id do cliente, id do pedido e data.",
            starter: "SELECT cliente_id, id, data\nFROM pedidos;",
            esperado: { colunas: ["cliente_id", "id", "data"], linhas: [[1, 104, "2026-03-11"], [2, 106, "2026-03-20"], [3, 103, "2026-02-20"]] },
            ordemImporta: false,
            gabarito: "WITH ordenado AS (\n  SELECT id, cliente_id, data,\n         ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY data DESC) AS ordem\n  FROM pedidos\n)\nSELECT cliente_id, id, data FROM ordenado WHERE ordem = 1;",
            dica: "ROW_NUMBER particionado por cliente, ordenado por data decrescente, filtrando ordem = 1." }
        ]
      },
      {
        id: "engenharia.m2",
        n: 2,
        titulo: "Modelagem de dados",
        h: 30,
        objetivo: "Desenhar tabelas que aguentam mudanca de regra sem virar remendo.",
        topicos: ["normalizacao", "chaves", "cardinalidade", "historico"],
        aula: {
          objetivo: "Ao terminar, voce escolhe entre normalizar e desnormalizar com criterio, e modela historico corretamente.",
          blocos: [
            { t: "texto", v: "Modelo de dados e a decisao mais duradoura de um sistema. Codigo se reescreve num fim de semana; estrutura de tabela com dois anos de dado dentro, nao." },
            { t: "subtitulo", v: "Normalizar e separar responsabilidade" },
            { t: "texto", v: "Normalizar significa que cada fato mora em um lugar so. O endereco do cliente fica na tabela de clientes, nao repetido em cada pedido. Quando o cliente muda de endereco, muda em um lugar." },
            { t: "destaque", v: "Normalize para escrever com seguranca; desnormalize para ler com velocidade. Sistema transacional normaliza, analitico desnormaliza." },
            { t: "subtitulo", v: "Chaves" },
            { t: "lista", v: [
              "Chave primaria: identifica a linha, nunca muda, nao tem significado de negocio.",
              "Chave natural: CNPJ, matricula, codigo do ERP. Serve para conferir, nao para relacionar.",
              "Chave estrangeira: garante que o pedido aponta para um cliente que existe.",
              "Chave composta: use quando a combinacao e que identifica, como pedido mais item."
            ] },
            { t: "texto", v: "Usar CNPJ como chave primaria parece economico ate o dia em que a empresa muda de CNPJ ou o cadastro veio com erro de digitacao. Chave tecnica sem significado evita esse dia." },
            { t: "subtitulo", v: "Historico: o erro mais caro" },
            { t: "texto", v: "Se voce sobrescreve o endereco do cliente, perde a resposta para onde o pedido do ano passado foi entregue. Guardar historico significa registrar o periodo de validade de cada versao do dado." },
            { t: "tabela", cab: ["Abordagem", "Como", "Quando"], linhas: [
              ["Sobrescrever", "atualiza o registro", "dado sem valor historico, como telefone"],
              ["Nova linha com vigencia", "valido_de e valido_ate", "dado que muda e importa no tempo"],
              ["Coluna de valor anterior", "guarda so a versao anterior", "quando basta o penultimo"],
              ["Congelar no fato", "grava o valor no pedido", "preco e endereco no momento da venda"]
            ] },
            { t: "aviso", v: "Preco do produto no pedido tem que ser gravado no pedido. Buscar o preco atual da tabela de produtos ao reemitir uma nota de dois anos atras produz um documento errado." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um relatorio de comissao passou a divergir do historico. A causa: o percentual de comissao do vendedor era lido da tabela de cadastro, e um vendedor havia sido promovido em marco." },
              { t: "texto", v: "Todos os relatorios anteriores a marco passaram a usar o percentual novo. A correcao foi gravar o percentual vigente no proprio registro da venda. Cinco minutos de modelagem no inicio teriam evitado tres dias de conferencia." }
            ]
          },
          resumo: [
            "Normalize para escrever, desnormalize para ler.",
            "Chave primaria nao carrega significado de negocio.",
            "Dado que muda e importa no tempo pede vigencia.",
            "Preco e condicao se congelam no fato."
          ],
          aplicar: [
            "Escolha uma tabela sua e identifique quais campos precisariam de historico.",
            "Procure um relatorio que possa divergir por causa de dado sobrescrito."
          ]
        },
        itens: [
          { id: "engenharia.m2.i1", tipo: "externo", titulo: "Normalizacao de banco de dados",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/troubleshoot/office/access/database-normalization-description", h: 3 },
          { id: "engenharia.m2.i2", tipo: "externo", titulo: "Dimensoes que mudam com o tempo",
            fonte: "Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", h: 5 },
          { id: "engenharia.m2.i3", tipo: "entregavel",
            titulo: "Diagrama de um modelo seu apontando onde falta historico", h: 10 }
        ],
        exercicios: [
          { id: "engenharia.m2.e1", tipo: "sql", base: "vendas",
            enunciado: "Encontre clientes cadastrados que nunca fizeram pedido. Traga id e nome.",
            starter: "SELECT id, nome FROM clientes;",
            esperado: { colunas: ["id", "nome"], linhas: [[4, "Delta Servicos"]] },
            ordemImporta: false,
            gabarito: "SELECT c.id, c.nome\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nWHERE p.id IS NULL;",
            dica: "LEFT JOIN com filtro de nulo do lado direito, ou NOT EXISTS." },
          { id: "engenharia.m2.e2", tipo: "quiz",
            enunciado: "O time quer usar o CNPJ como chave primaria da tabela de clientes, porque ja e unico. Qual e o principal risco?",
            alternativas: [
              { v: "CNPJ ocupa mais espaco que um inteiro", correta: false,
                explicacao: "Verdade, mas espaco e o menor dos problemas em base corporativa." },
              { v: "O CNPJ pode mudar ou ter sido cadastrado errado, e a correcao exigiria atualizar todas as tabelas que o referenciam", correta: true,
                explicacao: "Chave primaria com significado de negocio herda todos os problemas do negocio: correcao de cadastro, fusao de empresas, troca de CNPJ. A propagacao e o custo real." },
              { v: "O banco nao permite texto como chave primaria", correta: false,
                explicacao: "Permite. A limitacao e de projeto, nao tecnica." },
              { v: "Impede o uso de chave estrangeira", correta: false,
                explicacao: "Nao impede; a chave estrangeira apenas passaria a carregar o CNPJ." }
            ] }
        ]
      },
      {
        id: "engenharia.m3",
        n: 3,
        titulo: "Linha de comando e ambiente",
        h: 20,
        objetivo: "Trabalhar no terminal e versionar o que voce escreve.",
        topicos: ["terminal", "git", "variaveis de ambiente", "agendamento"],
        aula: {
          objetivo: "Ao terminar, voce versiona seus scripts, guarda credencial fora do codigo e agenda uma rotina.",
          blocos: [
            { t: "texto", v: "Engenharia de dados acontece em servidor, e servidor nao tem interface. Terminal deixa de ser preferencia e vira requisito." },
            { t: "subtitulo", v: "O basico que resolve o dia" },
            { t: "codigo", lang: "bash", v: "cd caminho          # entrar na pasta\nls -la              # listar, inclusive ocultos\ncat arquivo.csv     # ver conteudo\nhead -5 arquivo.csv # ver as cinco primeiras linhas\ngrep \"erro\" log.txt  # procurar texto\nwc -l arquivo.csv   # contar linhas" },
            { t: "texto", v: "Contar linhas antes e depois de um processo, com wc, e a checagem de qualidade mais barata que existe. Procurar 'erro' num log com grep economiza abrir arquivo de 500 MB." },
            { t: "subtitulo", v: "Git nao e so para programador" },
            { t: "texto", v: "Todo script que roda em producao precisa estar versionado. Sem isso nao existe resposta para o que mudou desde a semana passada, e a unica copia da logica pode estar no computador de uma pessoa." },
            { t: "codigo", lang: "bash", v: "git init\ngit add .\ngit commit -m \"Adiciona carga diaria de pedidos\"\ngit log --oneline" },
            { t: "destaque", v: "Se o script roda em producao e nao esta no git, ele nao existe oficialmente. Existe por sorte." },
            { t: "subtitulo", v: "Credencial nunca no codigo" },
            { t: "texto", v: "Senha, string de conexao e token ficam em variavel de ambiente ou em cofre de segredo, jamais no arquivo versionado. Um segredo commitado em repositorio publico e considerado vazado no minuto seguinte, mesmo que voce apague depois." },
            { t: "codigo", lang: "python", v: "import os\n\nsenha = os.environ[\"BD_SENHA\"]      # falha alto se nao existir\nservidor = os.environ.get(\"BD_HOST\", \"localhost\")" },
            { t: "aviso", v: "Apagar o segredo num commit posterior nao resolve: ele continua no historico do git. O procedimento correto e trocar a credencial imediatamente." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma rotina de carga rodava havia dois anos na maquina de um analista, em Tarefas Agendadas do Windows, com a senha do banco escrita dentro do script." },
              { t: "texto", v: "Quando essa pessoa saiu de ferias, a carga quebrou e ninguem sabia onde estava o codigo. Versionar e mover o segredo para variavel de ambiente levou uma tarde e acabou com uma dependencia de pessoa." }
            ]
          },
          resumo: [
            "Terminal e requisito, nao preferencia.",
            "Contar linhas antes e depois e a checagem mais barata.",
            "Script de producao sem git existe por sorte.",
            "Segredo commitado e segredo vazado; troque a credencial."
          ],
          aplicar: [
            "Versione hoje um script seu que ja roda em producao.",
            "Procure senha escrita dentro de codigo seu e mova para variavel de ambiente."
          ]
        },
        itens: [
          { id: "engenharia.m3.i1", tipo: "externo", titulo: "Pro Git — livro completo em portugues",
            fonte: "git-scm", url: "https://git-scm.com/book/pt-br/v2", h: 8 },
          { id: "engenharia.m3.i2", tipo: "externo", titulo: "GitHub Skills — cursos praticos",
            fonte: "GitHub", url: "https://skills.github.com/", h: 4 },
          { id: "engenharia.m3.i3", tipo: "pratica",
            titulo: "Versionar um script existente e escrever o primeiro README", h: 4 },
          { id: "engenharia.m3.i4", tipo: "entregavel",
            titulo: "Script sem nenhuma credencial no codigo, com README de execucao", h: 4 }
        ],
        exercicios: [
          { id: "engenharia.m3.e1", tipo: "python",
            enunciado: "Escreva ler_config(ambiente, obrigatorias): recebe um dicionario simulando variaveis de ambiente e a lista de chaves obrigatorias. Devolve o dicionario filtrado, ou levanta ValueError listando o que falta.",
            starter: "def ler_config(ambiente, obrigatorias):\n    pass\n",
            teste: "amb = {'BD_HOST': 'x', 'BD_SENHA': 'y', 'OUTRO': 'z'}\nassert ler_config(amb, ['BD_HOST', 'BD_SENHA']) == {'BD_HOST': 'x', 'BD_SENHA': 'y'}\ntry:\n    ler_config({'BD_HOST': 'x'}, ['BD_HOST', 'BD_SENHA'])\n    assert False, 'deveria ter falhado'\nexcept ValueError as e:\n    assert 'BD_SENHA' in str(e)\n",
            gabarito: "def ler_config(ambiente, obrigatorias):\n    faltando = [c for c in obrigatorias if c not in ambiente]\n    if faltando:\n        raise ValueError('faltam variaveis: ' + ', '.join(faltando))\n    return {c: ambiente[c] for c in obrigatorias}\n",
            dica: "Falhe alto e cedo: melhor erro claro na largada que conexao sem senha." }
        ]
      }
    ]
  });

  /* ===================================================================== F2 */
  fases.push({
    id: "engenharia.f2",
    n: 2,
    nome: "Ingestao e transformacao",
    cor: "--f2",
    modulos: [
      {
        id: "engenharia.m4",
        n: 4,
        titulo: "Python para volume",
        h: 30,
        objetivo: "Processar arquivos grandes sem estourar a memoria da maquina.",
        topicos: ["leitura em blocos", "geradores", "tipos economicos", "paralelismo simples"],
        aula: {
          objetivo: "Ao terminar, voce processa arquivos maiores que a memoria disponivel e sabe medir onde o tempo vai.",
          blocos: [
            { t: "texto", v: "O script que funciona com a amostra de 50 mil linhas trava com o arquivo real de 20 milhoes. A causa quase sempre e a mesma: carregar tudo na memoria de uma vez." },
            { t: "subtitulo", v: "Leia em blocos" },
            { t: "codigo", lang: "python", v: "import pandas as pd\n\ntotal = 0\nfor bloco in pd.read_csv('vendas.csv', chunksize=200_000):\n    bloco = bloco[bloco.status == 'faturado']\n    total += bloco.valor.sum()" },
            { t: "destaque", v: "Se voce so precisa do resultado agregado, nunca precisou do arquivo inteiro na memoria ao mesmo tempo." },
            { t: "subtitulo", v: "Gerador e o padrao do processamento continuo" },
            { t: "texto", v: "Um gerador entrega um item por vez, sem montar a lista completa. Encadear geradores forma um fluxo em que cada registro atravessa todas as etapas e sai, em vez de cada etapa materializar tudo." },
            { t: "codigo", lang: "python", v: "def ler(caminho):\n    with open(caminho, encoding='utf-8') as f:\n        for linha in f:\n            yield linha.rstrip('\\n')\n\ndef sem_cabecalho(linhas):\n    proximo = iter(linhas)\n    next(proximo, None)\n    for l in proximo:\n        yield l\n\nfor registro in sem_cabecalho(ler('vendas.csv')):\n    processar(registro)" },
            { t: "subtitulo", v: "Tipos custam memoria" },
            { t: "tabela", cab: ["Situacao", "Economia"], linhas: [
              ["Coluna categorica repetitiva", "converter para category"],
              ["Inteiro pequeno guardado como int64", "downcast para int32 ou int16"],
              ["Coluna que nao sera usada", "usecols na leitura"],
              ["Data como texto", "parse_dates na leitura"]
            ] },
            { t: "aviso", v: "Antes de otimizar, meca. O gargalo costuma estar em uma unica linha, e quase nunca e a que voce imaginou. Meia hora otimizando a parte errada e meia hora perdida." },
            { t: "codigo", lang: "python", v: "import time\n\ninicio = time.perf_counter()\nresultado = etapa_pesada(dados)\nprint(f\"etapa levou {time.perf_counter() - inicio:.1f}s\")" }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A carga mensal de movimentacoes do ERP passou a falhar por falta de memoria depois que a base cresceu. A solucao proposta era pedir mais memoria no servidor." },
              { t: "texto", v: "Ler em blocos de 200 mil linhas, filtrando o que interessava dentro do laco, resolveu com quatro linhas de mudanca. O consumo caiu de 11 GB para 400 MB, e o pedido de servidor foi cancelado." }
            ]
          },
          resumo: [
            "Resultado agregado nao exige o arquivo inteiro na memoria.",
            "Gerador processa um registro por vez.",
            "Escolher tipo e a economia mais barata.",
            "Meca antes de otimizar."
          ],
          aplicar: [
            "Meca o tempo de cada etapa de uma rotina sua e ache o gargalo real.",
            "Converta uma leitura completa em leitura por blocos."
          ]
        },
        itens: [
          { id: "engenharia.m4.i1", tipo: "externo", titulo: "pandas — escalando para conjuntos grandes",
            fonte: "pandas", url: "https://pandas.pydata.org/docs/user_guide/scale.html", h: 4 },
          { id: "engenharia.m4.i2", tipo: "externo", titulo: "Geradores e iteradores",
            fonte: "python.org", url: "https://docs.python.org/pt-br/3/howto/functional.html", h: 4 },
          { id: "engenharia.m4.i3", tipo: "entregavel",
            titulo: "Rotina sua reescrita para processar em blocos, com o consumo medido antes e depois", h: 10 }
        ],
        exercicios: [
          { id: "engenharia.m4.e1", tipo: "python",
            enunciado: "Escreva somar_em_blocos(numeros, tamanho): soma a lista processando por blocos do tamanho indicado, devolvendo a soma total.",
            starter: "def somar_em_blocos(numeros, tamanho):\n    pass\n",
            teste: "assert somar_em_blocos([1, 2, 3, 4, 5], 2) == 15\nassert somar_em_blocos([], 3) == 0\n",
            gabarito: "def somar_em_blocos(numeros, tamanho):\n    total = 0\n    for i in range(0, len(numeros), tamanho):\n        total += sum(numeros[i:i + tamanho])\n    return total\n",
            dica: "range com passo percorre os inicios de cada bloco." },
          { id: "engenharia.m4.e2", tipo: "python",
            enunciado: "Escreva contar_por(linhas, indice, separador): conta ocorrencias do campo na posicao indicada, sem carregar tudo em uma lista intermediaria.",
            starter: "def contar_por(linhas, indice, separador):\n    pass\n",
            teste: "l = ['a;GO', 'b;SP', 'c;GO']\nassert contar_por(l, 1, ';') == {'GO': 2, 'SP': 1}\nassert contar_por([], 0, ';') == {}\n",
            gabarito: "def contar_por(linhas, indice, separador):\n    contagem = {}\n    for linha in linhas:\n        campos = linha.split(separador)\n        if len(campos) > indice:\n            chave = campos[indice]\n            contagem[chave] = contagem.get(chave, 0) + 1\n    return contagem\n",
            dica: "Acumule direto no dicionario, sem lista intermediaria." }
        ]
      },
      {
        id: "engenharia.m5",
        n: 5,
        titulo: "APIs e integracao",
        h: 25,
        objetivo: "Consumir e expor dados por API sem derrubar o sistema do outro lado.",
        topicos: ["REST", "paginacao", "autenticacao", "repeticao com espera"],
        aula: {
          objetivo: "Ao terminar, voce escreve um cliente de API que trata erro, respeita limite e continua de onde parou.",
          blocos: [
            { t: "texto", v: "Integracao por API substituiu a troca de arquivos em boa parte dos sistemas. A diferenca de mentalidade e importante: arquivo ou existe ou nao existe, API pode responder devagar, responder pela metade ou recusar por excesso de chamadas." },
            { t: "subtitulo", v: "O que sempre precisa ser tratado" },
            { t: "lista", v: [
              "Paginacao: a API quase nunca devolve tudo de uma vez.",
              "Limite de chamadas: HTTP 429 significa espere e tente de novo.",
              "Tempo limite: chamada sem timeout trava o processo para sempre.",
              "Erro temporario: 502 e 503 pedem nova tentativa; 400 e 401 nao.",
              "Continuidade: guarde ate onde leu, para retomar sem repetir."
            ] },
            { t: "destaque", v: "Repetir erro temporario com espera crescente e o que separa uma integracao que aguenta o dia a dia de uma que quebra toda semana." },
            { t: "codigo", lang: "python", v: "import time\nimport requests\n\ndef buscar(url, tentativas=4):\n    espera = 1\n    for tentativa in range(tentativas):\n        r = requests.get(url, timeout=30)\n        if r.status_code == 200:\n            return r.json()\n        if r.status_code in (429, 502, 503):\n            time.sleep(espera)\n            espera *= 2\n            continue\n        r.raise_for_status()\n    raise RuntimeError(f'falhou apos {tentativas} tentativas: {url}')" },
            { t: "subtitulo", v: "Paginacao" },
            { t: "codigo", lang: "python", v: "def todas_paginas(base):\n    pagina = 1\n    while True:\n        dados = buscar(f'{base}?page={pagina}&per_page=100')\n        if not dados:\n            return\n        for item in dados:\n            yield item\n        pagina += 1" },
            { t: "aviso", v: "Nunca escreva um laco de paginacao sem limite maximo. Se a API ignorar o parametro de pagina, o laco roda para sempre e voce descobre pelo custo ou pelo bloqueio do fornecedor." },
            { t: "subtitulo", v: "Carga incremental" },
            { t: "texto", v: "Puxar tudo todo dia funciona ate a base crescer. Guarde a data e hora do ultimo registro lido e peca so o que mudou depois disso. Deixe uma margem de sobreposicao, porque relogio de servidor diferente atrasa registro." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A integracao com o sistema de boletos falhava toda segunda-feira de manha. O log mostrava HTTP 429: o processo disparava 600 chamadas em um minuto, no exato horario de pico do fornecedor." },
              { t: "texto", v: "Espera crescente entre tentativas e uma pausa de 200 ms entre chamadas resolveram. A carga passou de dois minutos para nove, e parou de falhar. Nove minutos de rotina noturna nao incomodam ninguem." }
            ]
          },
          resumo: [
            "API responde devagar, pela metade ou recusa. Trate os tres.",
            "Repita erro temporario com espera crescente; erro de cliente nao se repete.",
            "Laco de paginacao sem limite e laco infinito esperando acontecer.",
            "Carga incremental com margem de sobreposicao."
          ],
          aplicar: [
            "Revise uma integracao sua e verifique se ha timeout em todas as chamadas.",
            "Implemente carga incremental em uma rotina que hoje puxa a base inteira."
          ]
        },
        itens: [
          { id: "engenharia.m5.i1", tipo: "externo", titulo: "Codigos de status HTTP",
            fonte: "MDN", url: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status", h: 2 },
          { id: "engenharia.m5.i2", tipo: "externo", titulo: "requests — documentacao",
            fonte: "requests", url: "https://requests.readthedocs.io/en/latest/", h: 4 },
          { id: "engenharia.m5.i3", tipo: "entregavel",
            titulo: "Cliente de API com paginacao, repeticao e carga incremental", h: 10 }
        ],
        exercicios: [
          { id: "engenharia.m5.e1", tipo: "python",
            enunciado: "Escreva espera_crescente(tentativa, base=1, teto=30): devolve a espera em segundos dobrando a cada tentativa, limitada ao teto. Tentativa 0 devolve a base.",
            starter: "def espera_crescente(tentativa, base=1, teto=30):\n    pass\n",
            teste: "assert espera_crescente(0) == 1\nassert espera_crescente(3) == 8\nassert espera_crescente(10) == 30\n",
            gabarito: "def espera_crescente(tentativa, base=1, teto=30):\n    return min(base * (2 ** tentativa), teto)\n",
            dica: "Dobrar e multiplicar por dois elevado a tentativa; min aplica o teto." },
          { id: "engenharia.m5.e2", tipo: "python",
            enunciado: "Escreva deve_repetir(status): devolve True apenas para 429, 500, 502, 503 e 504.",
            starter: "def deve_repetir(status):\n    pass\n",
            teste: "assert deve_repetir(429) is True\nassert deve_repetir(503) is True\nassert deve_repetir(404) is False\nassert deve_repetir(200) is False\n",
            gabarito: "def deve_repetir(status):\n    return status in (429, 500, 502, 503, 504)\n",
            dica: "Erro do cliente, na faixa 400, quase nunca melhora repetindo." }
        ]
      },
      {
        id: "engenharia.m6",
        n: 6,
        titulo: "ETL e ELT na pratica",
        h: 35,
        objetivo: "Construir um fluxo de carga que pode ser executado de novo sem duplicar dado.",
        topicos: ["idempotencia", "carga incremental", "staging", "ETL contra ELT"],
        aula: {
          objetivo: "Ao terminar, voce escreve cargas que podem rodar duas vezes sem estragar nada.",
          blocos: [
            { t: "texto", v: "A propriedade mais importante de uma carga nao e velocidade nem elegancia: e poder rodar de novo. Toda rotina falha um dia no meio, e alguem vai reexecutar." },
            { t: "destaque", v: "Idempotente: rodar duas vezes produz o mesmo resultado que rodar uma. Sem isso, cada falha vira uma limpeza manual." },
            { t: "subtitulo", v: "Como tornar uma carga reexecutavel" },
            { t: "lista", v: [
              "Apagar e reinserir a particao do periodo, em vez de so inserir.",
              "Usar MERGE ou UPSERT com chave de negocio bem definida.",
              "Gravar em area de staging e so promover ao final, dentro de transacao.",
              "Registrar em uma tabela de controle o que ja foi processado."
            ] },
            { t: "codigo", lang: "sql", v: "BEGIN TRANSACTION;\n\nDELETE FROM fato_vendas WHERE data_ref = '2026-03-01';\n\nINSERT INTO fato_vendas (data_ref, cliente_id, valor)\nSELECT data_ref, cliente_id, valor\nFROM staging_vendas\nWHERE data_ref = '2026-03-01';\n\nCOMMIT;" },
            { t: "subtitulo", v: "ETL ou ELT" },
            { t: "tabela", cab: ["", "ETL", "ELT"], linhas: [
              ["Transforma", "antes de carregar", "depois, no proprio banco"],
              ["Vantagem", "carrega so o necessario", "guarda o bruto, permite refazer"],
              ["Custo", "reprocessar exige reextrair", "exige banco com capacidade"],
              ["Quando usar", "origem lenta ou cara", "quando o destino aguenta"]
            ] },
            { t: "texto", v: "A tendencia atual e ELT, porque armazenamento ficou barato e ter o dado bruto guardado permite corrigir uma regra e reprocessar sem incomodar o sistema de origem." },
            { t: "subtitulo", v: "Camadas" },
            { t: "texto", v: "Bruto guarda o dado como veio, sem tratamento, com a data de carga. Tratado aplica limpeza, tipos e regras. Consumo entrega o modelo pronto para o painel. Cada camada tem um dono e um contrato claro." },
            { t: "aviso", v: "Nunca deixe o painel ler a camada bruta. No dia em que a origem mudar uma coluna, todos os relatorios quebram ao mesmo tempo, e nao havera camada nenhuma protegendo." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma carga diaria falhou na metade e foi reexecutada. Metade dos pedidos do dia ficou duplicada, e a duplicidade so apareceu no fechamento, uma semana depois." },
              { t: "texto", v: "Trocar o INSERT direto por apagar e reinserir a particao do dia, tudo dentro de uma transacao, encerrou a classe inteira desse problema. A carga passou a poder ser reexecutada por qualquer pessoa, sem medo." }
            ]
          },
          resumo: [
            "Carga precisa poder rodar de novo sem estragar.",
            "Apagar e reinserir a particao resolve a maior parte dos casos.",
            "Guardar o bruto permite corrigir regra e reprocessar.",
            "Painel nunca le a camada bruta."
          ],
          aplicar: [
            "Escolha uma carga sua e responda: o que acontece se rodar duas vezes?",
            "Torne essa carga idempotente e teste rodando duas vezes seguidas."
          ]
        },
        itens: [
          { id: "engenharia.m6.i1", tipo: "externo", titulo: "Conceitos de ETL e ELT",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/azure/architecture/data-guide/relational-data/etl", h: 4 },
          { id: "engenharia.m6.i2", tipo: "externo", titulo: "dbt — fundamentos de transformacao",
            fonte: "dbt Labs", url: "https://docs.getdbt.com/docs/introduction", h: 8 },
          { id: "engenharia.m6.i3", tipo: "entregavel",
            titulo: "Carga idempotente, testada com duas execucoes seguidas", h: 12 }
        ],
        exercicios: [
          { id: "engenharia.m6.e1", tipo: "python",
            enunciado: "Escreva aplicar_upsert(destino, novos, chave): atualiza registros existentes e insere os novos, devolvendo a lista final ordenada pela chave.",
            starter: "def aplicar_upsert(destino, novos, chave):\n    pass\n",
            teste: "d = [{'id': 1, 'v': 10}, {'id': 2, 'v': 20}]\nn = [{'id': 2, 'v': 99}, {'id': 3, 'v': 30}]\nr = aplicar_upsert(d, n, 'id')\nassert [x['v'] for x in r] == [10, 99, 30]\nassert aplicar_upsert([], [], 'id') == []\n",
            gabarito: "def aplicar_upsert(destino, novos, chave):\n    indice = {d[chave]: dict(d) for d in destino}\n    for n in novos:\n        indice[n[chave]] = dict(n)\n    return [indice[k] for k in sorted(indice)]\n",
            dica: "Indexe o destino, sobrescreva com os novos e devolva ordenado." },
          { id: "engenharia.m6.e2", tipo: "quiz",
            enunciado: "A carga diaria caiu no meio e o time reexecutou. O painel passou a mostrar faturamento dobrado no dia. Qual e a correcao estrutural?",
            alternativas: [
              { v: "Apagar as linhas duplicadas com uma consulta de limpeza", correta: false,
                explicacao: "Resolve hoje e nao evita a proxima vez. Limpeza manual e sintoma, nao correcao." },
              { v: "Tornar a carga idempotente, apagando a particao do dia antes de inserir, dentro de transacao", correta: true,
                explicacao: "Ataca a causa: a carga passa a produzir o mesmo resultado rodando uma ou dez vezes, e qualquer pessoa pode reexecutar sem risco." },
              { v: "Impedir a reexecucao manual da carga", correta: false,
                explicacao: "Falha vai acontecer e alguem vai precisar reexecutar. Bloquear cria dependencia de quem sabe destravar." },
              { v: "Criar uma chave unica no banco para recusar duplicados", correta: false,
                explicacao: "Ajuda a detectar, mas faz a carga falhar por completo em vez de completar. Melhor que nada, ainda nao e a solucao." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F3 */
  fases.push({
    id: "engenharia.f3",
    n: 3,
    nome: "Armazenamento",
    cor: "--f3",
    modulos: [
      {
        id: "engenharia.m7",
        n: 7,
        titulo: "Data warehouse e modelagem dimensional",
        h: 35,
        objetivo: "Modelar fatos e dimensoes que respondem perguntas de negocio rapido.",
        topicos: ["fato e dimensao", "esquema estrela", "granularidade", "dimensao lenta"],
        aula: {
          objetivo: "Ao terminar, voce projeta um esquema estrela e define a granularidade certa do fato.",
          blocos: [
            { t: "texto", v: "Modelo transacional e otimizado para gravar uma venda por vez. Modelo dimensional e otimizado para responder quanto vendemos por regional no trimestre. Sao objetivos diferentes e por isso convivem." },
            { t: "subtitulo", v: "Fato e dimensao" },
            { t: "lista", v: [
              "Fato: o que aconteceu, com metricas somaveis. Uma linha por evento.",
              "Dimensao: o contexto do evento. Cliente, produto, tempo, vendedor, filial.",
              "O fato guarda chaves para as dimensoes e as metricas.",
              "A dimensao guarda os atributos usados para filtrar e agrupar."
            ] },
            { t: "destaque", v: "A primeira decisao e a granularidade: o que uma linha do fato representa. Errar isso obriga a refazer o modelo inteiro depois." },
            { t: "subtitulo", v: "Granularidade" },
            { t: "texto", v: "Item de pedido, pedido ou total diario por cliente? Quanto mais fina a granularidade, mais perguntas o modelo responde e mais espaco ocupa. Agregar depois e facil; desagregar depois e impossivel. Na duvida, va mais fino." },
            { t: "codigo", lang: "sql", v: "-- fato na granularidade de item de pedido\nCREATE TABLE fato_venda (\n  data_id      INT     NOT NULL,\n  cliente_id   INT     NOT NULL,\n  produto_id   INT     NOT NULL,\n  pedido_id    INT     NOT NULL,\n  quantidade   INT     NOT NULL,\n  valor        DECIMAL(12,2) NOT NULL,\n  desconto     DECIMAL(12,2) NOT NULL\n);" },
            { t: "subtitulo", v: "Dimensao de tempo" },
            { t: "texto", v: "Parece dispensavel e nao e. Uma tabela de datas com ano, mes, trimestre, dia da semana, feriado e mes fiscal evita repetir logica de calendario em cada consulta e permite responder perguntas sobre dia util sem gambiarra." },
            { t: "subtitulo", v: "Dimensao que muda com o tempo" },
            { t: "tabela", cab: ["Tipo", "Comportamento", "Uso"], linhas: [
              ["Tipo 1", "sobrescreve", "correcao de erro de cadastro"],
              ["Tipo 2", "nova linha com vigencia", "mudanca real que importa no historico"],
              ["Tipo 3", "coluna com valor anterior", "quando basta comparar com o anterior"]
            ] },
            { t: "aviso", v: "Se o vendedor mudou de regional em maio, e a dimensao e do tipo 1, todo o historico dele migra para a regional nova. O relatorio do ano passado muda sozinho, e ninguem entende por que." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um data mart de vendas foi construido na granularidade de pedido. Seis meses depois, a diretoria pediu analise por produto, e a informacao simplesmente nao estava la." },
              { t: "texto", v: "Refazer na granularidade de item custou tres semanas. Se a decisao inicial tivesse ido para o nivel mais fino, o espaco a mais teria sido de 40% e a analise sairia em um dia." }
            ]
          },
          resumo: [
            "Fato guarda evento e metrica; dimensao guarda contexto.",
            "Granularidade e a primeira e mais cara decisao.",
            "Agregar depois e facil, desagregar e impossivel.",
            "Dimensao tipo 1 reescreve o passado sem avisar."
          ],
          aplicar: [
            "Escreva a granularidade de um fato que voce ja mantem, em uma frase.",
            "Identifique uma dimensao sua que deveria ser tipo 2 e hoje e tipo 1."
          ]
        },
        itens: [
          { id: "engenharia.m7.i1", tipo: "externo", titulo: "Tecnicas de modelagem dimensional",
            fonte: "Kimball Group", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/", h: 8 },
          { id: "engenharia.m7.i2", tipo: "externo", titulo: "Esquema estrela no Power BI",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/power-bi/guidance/star-schema", h: 4 },
          { id: "engenharia.m7.i3", tipo: "entregavel",
            titulo: "Modelo estrela de um assunto da sua area, com granularidade declarada", h: 14 }
        ],
        exercicios: [
          { id: "engenharia.m7.e1", tipo: "sql", base: "vendas",
            enunciado: "Traga o total vendido por produto, incluindo produtos sem nenhuma venda, com zero no total.",
            starter: "SELECT nome, 0 AS total FROM produtos;",
            esperado: { colunas: ["nome", "total"], linhas: [["Terreno 250m", 9800], ["Terreno 360m", 7200], ["Consultoria", 3100], ["Servico avulso", 0]] },
            ordemImporta: false,
            gabarito: "SELECT pr.nome, COALESCE(SUM(i.valor), 0) AS total\nFROM produtos pr\nLEFT JOIN itens i ON i.produto_id = pr.id\nGROUP BY pr.nome;",
            dica: "LEFT JOIN a partir de produtos e COALESCE para trocar nulo por zero." },
          { id: "engenharia.m7.e2", tipo: "quiz",
            enunciado: "Voce vai construir o fato de vendas. A area pede analise por produto hoje e menciona que talvez precise por vendedor no futuro. Qual granularidade escolher?",
            alternativas: [
              { v: "Total diario por cliente, para economizar espaco", correta: false,
                explicacao: "Perde produto e vendedor de vez. Economiza espaco e destroi a capacidade de responder." },
              { v: "Item de pedido, o nivel mais fino disponivel", correta: true,
                explicacao: "Item de pedido permite agregar para pedido, cliente, produto e vendedor. Agregar e barato; desagregar exige refazer." },
              { v: "Pedido, porque e o que a area pediu", correta: false,
                explicacao: "Atende o pedido de hoje e ja se sabe que a proxima pergunta nao caberia." },
              { v: "Duas tabelas, uma por item e outra por pedido", correta: false,
                explicacao: "Duplica manutencao e cria risco de divergencia entre as duas. A agregada pode ser uma visao." }
            ] }
        ]
      },
      {
        id: "engenharia.m8",
        n: 8,
        titulo: "Lakehouse e formatos de arquivo",
        h: 25,
        objetivo: "Escolher onde e em que formato guardar dado, com criterio de custo e leitura.",
        topicos: ["data lake", "colunar", "parquet", "particionamento"],
        aula: {
          objetivo: "Ao terminar, voce escolhe formato e particionamento pensando em quem vai ler.",
          blocos: [
            { t: "texto", v: "Data lake e um lugar barato para guardar arquivo. Data warehouse e um banco otimizado para consulta. Lakehouse e a tentativa de ter o preco do primeiro com o comportamento do segundo." },
            { t: "subtitulo", v: "Por que colunar" },
            { t: "texto", v: "CSV guarda linha por linha. Para somar uma coluna, o leitor precisa passar por todas as outras. Formato colunar guarda cada coluna junta, entao ler tres colunas de uma tabela de oitenta e barato." },
            { t: "tabela", cab: ["Formato", "Tamanho relativo", "Uso"], linhas: [
              ["CSV", "100%", "troca com humano e sistema legado"],
              ["JSON", "130%", "dado aninhado, integracao por API"],
              ["Parquet", "10% a 25%", "analitico, leitura por coluna"],
              ["Avro", "30% a 50%", "streaming, evolucao de esquema"]
            ] },
            { t: "destaque", v: "Trocar CSV por Parquet costuma reduzir espaco em 75% ou mais e acelerar a leitura em varias vezes, sem mudar nada na logica." },
            { t: "subtitulo", v: "Particionamento" },
            { t: "texto", v: "Guardar em pastas por ano e mes permite ao leitor pular arquivos inteiros. Consulta de marco le so a pasta de marco. E o ganho mais barato de desempenho que existe em lake." },
            { t: "codigo", lang: "python", v: "df.to_parquet(\n    'lake/vendas/',\n    partition_cols=['ano', 'mes'],\n    compression='snappy'\n)" },
            { t: "aviso", v: "Particionar por coluna de alta cardinalidade, como id de cliente, cria milhares de arquivos minusculos. O custo de abrir arquivo passa a dominar e a consulta fica mais lenta que sem particao." },
            { t: "subtitulo", v: "Arquivo pequeno demais e problema" },
            { t: "texto", v: "Muitos arquivos de poucos kilobytes derrubam o desempenho de qualquer motor de consulta. Se a carga gera arquivos pequenos, agrupe periodicamente em arquivos maiores. Entre 100 MB e 1 GB por arquivo e uma faixa saudavel." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um historico de movimentacoes ocupava 180 GB em CSV e a consulta mensal levava sete minutos. A conversao para Parquet particionado por ano e mes levou o armazenamento para 31 GB." },
              { t: "texto", v: "A mesma consulta passou a levar onze segundos, porque so le a pasta do periodo e so as colunas pedidas. Nenhuma logica de negocio mudou." }
            ]
          },
          resumo: [
            "Colunar le so as colunas pedidas.",
            "Parquet reduz espaco drasticamente sem mudar a logica.",
            "Particione por periodo, nunca por alta cardinalidade.",
            "Muitos arquivos pequenos derrubam o desempenho."
          ],
          aplicar: [
            "Converta um historico seu de CSV para Parquet e compare tamanho e tempo.",
            "Verifique se alguma pasta sua tem milhares de arquivos pequenos."
          ]
        },
        itens: [
          { id: "engenharia.m8.i1", tipo: "externo", titulo: "Apache Parquet — documentacao",
            fonte: "Apache", url: "https://parquet.apache.org/docs/", h: 4 },
          { id: "engenharia.m8.i2", tipo: "externo", titulo: "Arquitetura lakehouse e camadas",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/azure/databricks/lakehouse/medallion", h: 4 },
          { id: "engenharia.m8.i3", tipo: "pratica",
            titulo: "Converter um historico seu para Parquet particionado e medir o ganho", h: 8 }
        ],
        exercicios: [
          { id: "engenharia.m8.e1", tipo: "python",
            enunciado: "Escreva caminho_particao(base, ano, mes): devolve o caminho no padrao base/ano=AAAA/mes=MM, com mes sempre em dois digitos.",
            starter: "def caminho_particao(base, ano, mes):\n    pass\n",
            teste: "assert caminho_particao('lake/vendas', 2026, 3) == 'lake/vendas/ano=2026/mes=03'\nassert caminho_particao('lake/vendas', 2026, 12) == 'lake/vendas/ano=2026/mes=12'\n",
            gabarito: "def caminho_particao(base, ano, mes):\n    return f'{base}/ano={ano}/mes={mes:02d}'\n",
            dica: "O formato 02d preenche com zero a esquerda." },
          { id: "engenharia.m8.e2", tipo: "python",
            enunciado: "Escreva avaliar_particao(qtd_arquivos, tamanho_medio_mb): devolve 'muitos arquivos pequenos' abaixo de 10 MB de media com mais de 100 arquivos, 'arquivo grande demais' acima de 1024 MB, e 'ok' no resto.",
            starter: "def avaliar_particao(qtd_arquivos, tamanho_medio_mb):\n    pass\n",
            teste: "assert avaliar_particao(500, 2) == 'muitos arquivos pequenos'\nassert avaliar_particao(3, 2048) == 'arquivo grande demais'\nassert avaliar_particao(20, 200) == 'ok'\n",
            gabarito: "def avaliar_particao(qtd_arquivos, tamanho_medio_mb):\n    if qtd_arquivos > 100 and tamanho_medio_mb < 10:\n        return 'muitos arquivos pequenos'\n    if tamanho_medio_mb > 1024:\n        return 'arquivo grande demais'\n    return 'ok'\n",
            dica: "Duas condicoes independentes; teste a de arquivos pequenos primeiro." }
        ]
      },
      {
        id: "engenharia.m9",
        n: 9,
        titulo: "Desempenho e particionamento",
        h: 25,
        objetivo: "Fazer consultas lentas ficarem rapidas sem comprar servidor.",
        topicos: ["indice", "plano de execucao", "estatisticas", "materializacao"],
        aula: {
          objetivo: "Ao terminar, voce le um plano de execucao e sabe quando criar indice e quando materializar.",
          blocos: [
            { t: "texto", v: "Consulta lenta quase nunca precisa de mais hardware. Precisa de indice adequado, de filtro que o banco consiga usar ou de menos dado sendo lido." },
            { t: "subtitulo", v: "Leia o plano antes de mudar qualquer coisa" },
            { t: "texto", v: "O plano de execucao mostra o que o banco vai fazer. Procure varredura completa de tabela grande, estimativa muito diferente do real e ordenacoes caras. Otimizar sem ler o plano e chute." },
            { t: "codigo", lang: "sql", v: "-- SQL Server\nSET STATISTICS IO, TIME ON;\n-- e no Management Studio: exibir plano de execucao real\n\nSELECT c.uf, SUM(p.valor)\nFROM pedidos p\nJOIN clientes c ON c.id = p.cliente_id\nWHERE p.data >= '2026-01-01'\nGROUP BY c.uf;" },
            { t: "destaque", v: "Funcao aplicada na coluna do WHERE impede o uso do indice. YEAR(data) = 2026 varre tudo; data >= '2026-01-01' AND data < '2027-01-01' usa o indice." },
            { t: "subtitulo", v: "Indice tem custo" },
            { t: "lista", v: [
              "Acelera leitura, atrasa escrita: cada insert atualiza todos os indices.",
              "Ocupa espaco, as vezes mais que a propria tabela.",
              "Indice nao usado e so custo. Verifique o uso antes de manter.",
              "A ordem das colunas no indice composto importa: filtra primeiro pela primeira."
            ] },
            { t: "subtitulo", v: "Quando materializar" },
            { t: "texto", v: "Se a mesma agregacao pesada e consultada dezenas de vezes por dia e o dado so muda de madrugada, calcule uma vez e guarde. Tabela agregada atualizada pela carga costuma resolver o que nenhum indice resolveria." },
            { t: "aviso", v: "Cuidado com SELECT * em producao. Ele impede o banco de usar indice de cobertura, transporta colunas que ninguem le e quebra quando a tabela ganha uma coluna nova." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um painel demorava quarenta segundos para abrir. O plano mostrou varredura completa em uma tabela de 12 milhoes de linhas, causada por um filtro escrito como YEAR(data_emissao) = 2026." },
              { t: "texto", v: "Reescrever como faixa de datas fez o banco usar o indice existente. O painel passou a abrir em dois segundos. Nenhum indice novo, nenhum servidor novo." }
            ]
          },
          resumo: [
            "Leia o plano antes de mudar qualquer coisa.",
            "Funcao na coluna do WHERE mata o indice.",
            "Indice acelera leitura e atrasa escrita.",
            "Agregacao repetida sobre dado estavel merece materializacao."
          ],
          aplicar: [
            "Pegue a consulta mais lenta que voce mantem e leia o plano de execucao.",
            "Procure filtros com funcao aplicada na coluna e reescreva como faixa."
          ]
        },
        itens: [
          { id: "engenharia.m9.i1", tipo: "externo", titulo: "Planos de execucao no SQL Server",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/sql/relational-databases/performance/execution-plans", h: 6 },
          { id: "engenharia.m9.i2", tipo: "externo", titulo: "Use The Index, Luke — indices explicados",
            fonte: "Markus Winand", url: "https://use-the-index-luke.com/", h: 8 },
          { id: "engenharia.m9.i3", tipo: "entregavel",
            titulo: "Otimizacao documentada de uma consulta lenta, com tempo antes e depois", h: 8 }
        ],
        exercicios: [
          { id: "engenharia.m9.e1", tipo: "sql", base: "vendas",
            enunciado: "Traga os pedidos de marco de 2026 usando filtro por faixa de datas, sem aplicar funcao na coluna.",
            starter: "SELECT id, data, valor\nFROM pedidos\nWHERE YEAR(data) = 2026 AND MONTH(data) = 3;",
            esperado: { colunas: ["id", "data", "valor"], linhas: [[104, "2026-03-11", 4200], [106, "2026-03-20", 3100]] },
            ordemImporta: false,
            gabarito: "SELECT id, data, valor\nFROM pedidos\nWHERE data >= '2026-03-01' AND data < '2026-04-01';",
            dica: "Use maior ou igual ao primeiro dia e menor que o primeiro dia do mes seguinte." },
          { id: "engenharia.m9.e2", tipo: "quiz",
            enunciado: "Uma tabela de log recebe 2 milhoes de inserts por dia e e consultada uma vez por semana. Alguem propoe criar seis indices para acelerar essa consulta. O que voce responde?",
            alternativas: [
              { v: "Criar os seis: leitura rapida sempre compensa", correta: false,
                explicacao: "Ignora que cada insert passaria a atualizar seis estruturas, 2 milhoes de vezes por dia." },
              { v: "Criar no maximo um indice alinhado ao filtro real da consulta, ou materializar o resultado semanal", correta: true,
                explicacao: "A tabela e dominada por escrita. Um indice bem escolhido, ou uma agregacao calculada uma vez por semana, entrega o mesmo sem penalizar a carga." },
              { v: "Nao criar indice nenhum: consulta semanal pode ser lenta", correta: false,
                explicacao: "Defensavel, mas abre mao de um ganho barato quando um unico indice resolveria." },
              { v: "Migrar a tabela para outro banco", correta: false,
                explicacao: "Resposta desproporcional a um problema que um indice ou uma agregacao resolve." }
            ] }
        ]
      }
    ]
  });

  /* ===================================================================== F4 */
  fases.push({
    id: "engenharia.f4",
    n: 4,
    nome: "Orquestracao e qualidade",
    cor: "--f4",
    modulos: [
      {
        id: "engenharia.m10",
        n: 10,
        titulo: "Orquestracao de pipelines",
        h: 30,
        objetivo: "Coordenar tarefas com dependencia, repeticao e alerta, sem depender de agendador solto.",
        topicos: ["grafo de dependencia", "reexecucao", "alerta", "idempotencia na pratica"],
        aula: {
          objetivo: "Ao terminar, voce desenha um fluxo com dependencias explicitas e sabe o que fazer quando uma etapa falha.",
          blocos: [
            { t: "texto", v: "Tarefas agendadas independentes funcionam ate existirem cinco delas com dependencia entre si. A partir dai, alguem passa a acordar cedo para conferir se a primeira terminou antes da segunda comecar." },
            { t: "subtitulo", v: "O que um orquestrador resolve" },
            { t: "lista", v: [
              "Dependencia: B so comeca quando A terminou bem.",
              "Repeticao: falha temporaria tenta de novo sozinha.",
              "Visibilidade: uma tela mostra o que rodou, o que falhou e ha quanto tempo.",
              "Reexecucao pontual: rodar so o dia que falhou, sem refazer o mes.",
              "Alerta: avisa quem precisa saber, no canal certo."
            ] },
            { t: "destaque", v: "Sem dependencia explicita, o horario vira a dependencia. E horario e a forma mais fragil de coordenar processo." },
            { t: "subtitulo", v: "Desenhe o grafo antes da ferramenta" },
            { t: "texto", v: "Antes de escolher Airflow, Dagster ou o agendador do banco, desenhe as tarefas e as setas entre elas. Metade dos problemas de orquestracao e de desenho, nao de ferramenta, e aparece no papel." },
            { t: "codigo", lang: "python", v: "# esqueleto conceitual de um fluxo diario\n\ntarefas = {\n    'extrair_pedidos':  [],\n    'extrair_clientes': [],\n    'tratar':           ['extrair_pedidos', 'extrair_clientes'],\n    'carregar_fato':    ['tratar'],\n    'atualizar_painel': ['carregar_fato'],\n}\n# tratar so comeca quando as duas extracoes terminarem" },
            { t: "subtitulo", v: "Falha: o que fazer" },
            { t: "tabela", cab: ["Tipo de falha", "Resposta"], linhas: [
              ["Rede ou timeout", "repetir com espera crescente, ate 3 vezes"],
              ["Origem indisponivel", "adiar e alertar, sem repetir sem limite"],
              ["Dado invalido", "parar o fluxo e alertar; nao carregar dado ruim"],
              ["Erro de codigo", "parar, alertar e corrigir; repetir nao resolve"]
            ] },
            { t: "aviso", v: "Repetir automaticamente uma tarefa que nao e idempotente duplica dado. Repeticao automatica so pode ser ligada depois que a idempotencia esta garantida." },
            { t: "subtitulo", v: "Alerta que ninguem ignora" },
            { t: "texto", v: "Alerta que dispara todo dia vira ruido e deixa de ser lido em duas semanas. Alerte falha real, com o nome do fluxo, a etapa, o horario e o que fazer. Se um alerta nao pede acao, ele nao deveria existir." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Tres rotinas rodavam as 2h, 3h e 4h da manha, uma dependendo da outra pelo horario. Quando a primeira demorava mais que o normal, a segunda lia dado incompleto e o painel amanhecia errado, sem nenhum erro registrado." },
              { t: "texto", v: "Ligar as tres por dependencia explicita eliminou a classe inteira do problema. A segunda passou a esperar a primeira, e o atraso virou atraso visivel em vez de dado errado silencioso." }
            ]
          },
          resumo: [
            "Horario e a forma mais fragil de coordenar processo.",
            "Desenhe o grafo antes de escolher ferramenta.",
            "Repeticao automatica exige idempotencia antes.",
            "Alerta sem acao vira ruido e deixa de ser lido."
          ],
          aplicar: [
            "Desenhe no papel o grafo das rotinas que sua area mantem.",
            "Encontre uma dependencia que hoje e garantida so pelo horario."
          ]
        },
        itens: [
          { id: "engenharia.m10.i1", tipo: "externo", titulo: "Conceitos do Apache Airflow",
            fonte: "Apache Airflow", url: "https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/index.html", h: 8 },
          { id: "engenharia.m10.i2", tipo: "externo", titulo: "SQL Server Agent — jobs e dependencias",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/sql/ssms/agent/sql-server-agent", h: 4 },
          { id: "engenharia.m10.i3", tipo: "entregavel",
            titulo: "Grafo de dependencias das rotinas da sua area, com pontos fragis marcados", h: 10 }
        ],
        exercicios: [
          { id: "engenharia.m10.e1", tipo: "python",
            enunciado: "Escreva ordem_execucao(tarefas): recebe um dicionario tarefa para lista de dependencias e devolve uma ordem valida de execucao, em ordem alfabetica quando houver empate. Ciclo levanta ValueError.",
            starter: "def ordem_execucao(tarefas):\n    pass\n",
            teste: "t = {'c': ['a', 'b'], 'a': [], 'b': ['a']}\nassert ordem_execucao(t) == ['a', 'b', 'c']\ntry:\n    ordem_execucao({'x': ['y'], 'y': ['x']})\n    assert False\nexcept ValueError:\n    pass\n",
            gabarito: "def ordem_execucao(tarefas):\n    pendentes = {k: set(v) for k, v in tarefas.items()}\n    saida = []\n    while pendentes:\n        prontas = sorted(k for k, deps in pendentes.items() if not deps)\n        if not prontas:\n            raise ValueError('ciclo de dependencia')\n        for k in prontas:\n            saida.append(k)\n            del pendentes[k]\n        for deps in pendentes.values():\n            deps.difference_update(prontas)\n    return saida\n",
            dica: "Em cada rodada, execute as tarefas sem dependencia pendente e remova-as das demais." },
          { id: "engenharia.m10.e2", tipo: "python",
            enunciado: "Escreva politica_falha(tipo): devolve 'repetir' para 'rede' e 'timeout', 'alertar' para 'origem_indisponivel', e 'parar' para 'dado_invalido' e 'erro_codigo'.",
            starter: "def politica_falha(tipo):\n    pass\n",
            teste: "assert politica_falha('rede') == 'repetir'\nassert politica_falha('origem_indisponivel') == 'alertar'\nassert politica_falha('dado_invalido') == 'parar'\nassert politica_falha('desconhecido') == 'parar'\n",
            gabarito: "def politica_falha(tipo):\n    if tipo in ('rede', 'timeout'):\n        return 'repetir'\n    if tipo == 'origem_indisponivel':\n        return 'alertar'\n    return 'parar'\n",
            dica: "O padrao seguro para caso desconhecido e parar." }
        ]
      },
      {
        id: "engenharia.m11",
        n: 11,
        titulo: "Qualidade de dados e testes",
        h: 25,
        objetivo: "Descobrir dado errado antes que o relatorio descubra.",
        topicos: ["dimensoes da qualidade", "testes de dado", "contrato", "quarentena"],
        aula: {
          objetivo: "Ao terminar, voce escreve testes que barram dado ruim na entrada do pipeline.",
          blocos: [
            { t: "texto", v: "Erro de dado descoberto pela diretoria custa credibilidade da area inteira. Erro descoberto pelo pipeline custa um alerta. A diferenca entre os dois cenarios sao alguns testes automaticos." },
            { t: "subtitulo", v: "As dimensoes que valem checar" },
            { t: "tabela", cab: ["Dimensao", "Pergunta", "Teste"], linhas: [
              ["Completude", "chegou tudo?", "contagem dentro da faixa esperada"],
              ["Unicidade", "ha duplicado?", "chave sem repeticao"],
              ["Validade", "os valores fazem sentido?", "dominio, faixa e formato"],
              ["Integridade", "as referencias existem?", "toda chave estrangeira encontra pai"],
              ["Atualidade", "o dado e recente?", "data maxima dentro do esperado"],
              ["Consistencia", "bate com outra fonte?", "total confere com o sistema origem"]
            ] },
            { t: "destaque", v: "Teste de dado nao e teste de codigo. O codigo pode estar certo e o dado chegar errado. Os dois precisam ser testados." },
            { t: "subtitulo", v: "Testar na entrada, nao na saida" },
            { t: "texto", v: "Barrar na entrada custa um alerta. Descobrir na saida exige refazer a carga, corrigir o painel e explicar para quem ja viu o numero errado." },
            { t: "codigo", lang: "python", v: "def validar(df, esperado_min, esperado_max):\n    problemas = []\n    if not (esperado_min <= len(df) <= esperado_max):\n        problemas.append(f'volume fora da faixa: {len(df)}')\n    if df['pedido_id'].duplicated().any():\n        problemas.append('pedido_id duplicado')\n    if df['valor'].lt(0).any():\n        problemas.append('valor negativo')\n    if df['data'].max() < ontem:\n        problemas.append('dado desatualizado')\n    return problemas" },
            { t: "subtitulo", v: "Quarentena em vez de descarte" },
            { t: "texto", v: "Registro invalido nao deve ser apagado nem carregado. Mande para uma area de quarentena com o motivo, carregue o resto e alerte. Assim o fluxo nao para por causa de dez linhas ruins, e ninguem perde as dez linhas." },
            { t: "aviso", v: "Corrigir dado ruim silenciosamente dentro do pipeline e pior que barrar. A origem nunca fica sabendo, o erro se repete todo dia e o pipeline acumula remendos que ninguem entende um ano depois." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma integracao passou a trazer valores zerados em 3% dos titulos apos uma atualizacao no ERP. O painel de recebiveis mostrou queda e a area financeira abriu uma investigacao de dois dias." },
              { t: "texto", v: "Uma checagem simples de valor maior que zero, com quarentena e alerta, teria transformado dois dias de investigacao em um e-mail automatico na madrugada, com a lista dos titulos afetados." }
            ]
          },
          resumo: [
            "Erro barrado na entrada custa um alerta; na saida, credibilidade.",
            "Codigo certo nao garante dado certo.",
            "Quarentena preserva o registro e nao para o fluxo.",
            "Corrigir em silencio esconde o problema da origem."
          ],
          aplicar: [
            "Escreva tres checagens para a carga mais critica da sua area.",
            "Defina a faixa esperada de volume diario e alerte fora dela."
          ]
        },
        itens: [
          { id: "engenharia.m11.i1", tipo: "externo", titulo: "Great Expectations — testes de dados",
            fonte: "Great Expectations", url: "https://docs.greatexpectations.io/docs/home", h: 6 },
          { id: "engenharia.m11.i2", tipo: "externo", titulo: "Testes no dbt",
            fonte: "dbt Labs", url: "https://docs.getdbt.com/docs/build/data-tests", h: 4 },
          { id: "engenharia.m11.i3", tipo: "entregavel",
            titulo: "Conjunto de testes automaticos na carga mais critica da sua area", h: 10 }
        ],
        exercicios: [
          { id: "engenharia.m11.e1", tipo: "python",
            enunciado: "Escreva validar_lote(registros, minimo, maximo): devolve a lista de problemas encontrados entre volume fora da faixa, id duplicado e valor negativo. Sem problema, devolve lista vazia.",
            starter: "def validar_lote(registros, minimo, maximo):\n    pass\n",
            teste: "ok = [{'id': 1, 'valor': 10}, {'id': 2, 'valor': 20}]\nassert validar_lote(ok, 1, 5) == []\nruim = [{'id': 1, 'valor': -1}, {'id': 1, 'valor': 5}]\np = validar_lote(ruim, 1, 5)\nassert 'id duplicado' in p and 'valor negativo' in p\nassert 'volume fora da faixa' in validar_lote(ok, 5, 10)\n",
            gabarito: "def validar_lote(registros, minimo, maximo):\n    problemas = []\n    if not (minimo <= len(registros) <= maximo):\n        problemas.append('volume fora da faixa')\n    ids = [r['id'] for r in registros]\n    if len(ids) != len(set(ids)):\n        problemas.append('id duplicado')\n    if any(r['valor'] < 0 for r in registros):\n        problemas.append('valor negativo')\n    return problemas\n",
            dica: "Compare o tamanho da lista de ids com o do conjunto para achar duplicado." },
          { id: "engenharia.m11.e2", tipo: "python",
            enunciado: "Escreva separar_quarentena(registros, regra): devolve a tupla (aprovados, quarentena), onde regra e uma funcao que devolve True para registro valido.",
            starter: "def separar_quarentena(registros, regra):\n    pass\n",
            teste: "r = [{'v': 1}, {'v': -3}, {'v': 7}]\nok, q = separar_quarentena(r, lambda x: x['v'] > 0)\nassert len(ok) == 2 and len(q) == 1\nassert q[0]['v'] == -3\n",
            gabarito: "def separar_quarentena(registros, regra):\n    aprovados = [r for r in registros if regra(r)]\n    quarentena = [r for r in registros if not regra(r)]\n    return (aprovados, quarentena)\n",
            dica: "Nenhum registro pode ser descartado: a soma das duas listas e o total." }
        ]
      },
      {
        id: "engenharia.m12",
        n: 12,
        titulo: "Observabilidade e custo",
        h: 20,
        objetivo: "Enxergar o que acontece nos seus pipelines e quanto isso custa.",
        topicos: ["log estruturado", "metricas de pipeline", "linhagem", "custo por consulta"],
        aula: {
          objetivo: "Ao terminar, voce instrumenta um pipeline para responder o que rodou, quanto demorou e quanto custou.",
          blocos: [
            { t: "texto", v: "Pipeline sem instrumentacao so avisa quando quebra, e as vezes nem isso. Observabilidade e a diferenca entre saber que algo esta degradando e descobrir pelo usuario." },
            { t: "subtitulo", v: "Log que serve para alguma coisa" },
            { t: "texto", v: "Log em texto livre e dificil de consultar. Log estruturado, com campos fixos, permite responder quantas vezes a etapa X falhou no mes sem ninguem ler linha por linha." },
            { t: "codigo", lang: "python", v: "import json\nimport datetime\n\ndef registrar(evento, **campos):\n    linha = {\n        'quando': datetime.datetime.now().isoformat(),\n        'evento': evento,\n        **campos\n    }\n    print(json.dumps(linha, ensure_ascii=False))\n\nregistrar('carga_concluida', fluxo='vendas', linhas=182340, segundos=41.2)" },
            { t: "destaque", v: "Registre sempre: nome do fluxo, etapa, quantidade de linhas, duracao e resultado. Com esses cinco campos voce responde quase toda pergunta operacional." },
            { t: "subtitulo", v: "Metricas que valem acompanhar" },
            { t: "lista", v: [
              "Duracao por execucao, para ver degradacao antes da falha.",
              "Volume por execucao, para detectar queda ou explosao de dado.",
              "Atraso: quanto tempo depois do previsto terminou.",
              "Frescor: quantas horas tem o dado mais recente disponivel.",
              "Taxa de falha por fluxo, no mes."
            ] },
            { t: "subtitulo", v: "Linhagem" },
            { t: "texto", v: "Linhagem responde de onde veio esse numero e quem quebra se eu mudar esta coluna. Sem isso, qualquer alteracao de esquema vira aposta. Comece simples: uma planilha ligando origem, transformacao e destino ja resolve muita coisa." },
            { t: "subtitulo", v: "Custo" },
            { t: "texto", v: "Em nuvem, consulta mal escrita custa dinheiro de verdade. Varredura completa de tabela grande, executada de hora em hora por um painel, e a forma mais comum de queimar orcamento sem ninguem perceber." },
            { t: "aviso", v: "Painel com atualizacao automatica de 15 minutos sobre tabela pesada custa 96 execucoes por dia. Quase sempre o negocio aceita atualizacao de hora em hora, e a conta cai para um quarto." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "A carga noturna passou de 12 para 38 minutos ao longo de tres meses. Ninguem percebeu, porque terminava antes do expediente e nunca falhou." },
              { t: "texto", v: "Com a duracao registrada a cada execucao, a tendencia ficou visivel num grafico simples. A causa era uma tabela sem limpeza de historico. Foi corrigido antes de estourar a janela noturna, nao depois." }
            ]
          },
          resumo: [
            "Sem instrumentacao, voce so sabe quando quebra.",
            "Cinco campos no log respondem quase tudo.",
            "Duracao ao longo do tempo antecipa a falha.",
            "Atualizacao automatica frequente custa dinheiro real."
          ],
          aplicar: [
            "Acrescente log estruturado com duracao e volume em uma rotina sua.",
            "Verifique a frequencia de atualizacao dos seus paineis e questione as mais agressivas."
          ]
        },
        itens: [
          { id: "engenharia.m12.i1", tipo: "externo", titulo: "Logging na biblioteca padrao",
            fonte: "python.org", url: "https://docs.python.org/pt-br/3/howto/logging.html", h: 4 },
          { id: "engenharia.m12.i2", tipo: "externo", titulo: "OpenLineage — linhagem de dados",
            fonte: "OpenLineage", url: "https://openlineage.io/docs/", h: 4 },
          { id: "engenharia.m12.i3", tipo: "entregavel",
            titulo: "Painel simples de duracao e volume das suas cargas", h: 8 }
        ],
        exercicios: [
          { id: "engenharia.m12.e1", tipo: "python",
            enunciado: "Escreva detectar_degradacao(duracoes, tolerancia): compara a media das tres ultimas execucoes com a media das anteriores e devolve True se piorou mais que a tolerancia. Menos de 6 execucoes devolve False.",
            starter: "def detectar_degradacao(duracoes, tolerancia):\n    pass\n",
            teste: "assert detectar_degradacao([10, 10, 10, 30, 30, 30], 0.5) is True\nassert detectar_degradacao([10, 10, 10, 11, 10, 11], 0.5) is False\nassert detectar_degradacao([10, 20], 0.5) is False\n",
            gabarito: "def detectar_degradacao(duracoes, tolerancia):\n    if len(duracoes) < 6:\n        return False\n    antigas = duracoes[:-3]\n    recentes = duracoes[-3:]\n    m_ant = sum(antigas) / len(antigas)\n    m_rec = sum(recentes) / len(recentes)\n    if m_ant == 0:\n        return False\n    return (m_rec - m_ant) / m_ant > tolerancia\n",
            dica: "Compare a media recente com a anterior em termos relativos." },
          { id: "engenharia.m12.e2", tipo: "python",
            enunciado: "Escreva custo_mensal(execucoes_por_dia, custo_execucao, dias=30): devolve o custo mensal arredondado em duas casas.",
            starter: "def custo_mensal(execucoes_por_dia, custo_execucao, dias=30):\n    pass\n",
            teste: "assert custo_mensal(96, 0.12) == 345.6\nassert custo_mensal(24, 0.12) == 86.4\n",
            gabarito: "def custo_mensal(execucoes_por_dia, custo_execucao, dias=30):\n    return round(execucoes_por_dia * custo_execucao * dias, 2)\n",
            dica: "A conta e simples; o valor da comparacao esta em mostrar o resultado das duas frequencias." }
        ]
      }
    ]
  });

  /* ===================================================================== F5 */
  fases.push({
    id: "engenharia.f5",
    n: 5,
    nome: "Governanca e projeto",
    cor: "--f5",
    modulos: [
      {
        id: "engenharia.m13",
        n: 13,
        titulo: "Governanca, catalogo e LGPD",
        h: 20,
        objetivo: "Organizar o que existe, quem e dono e o que a lei exige.",
        topicos: ["catalogo", "dicionario de dados", "dado pessoal", "retencao"],
        aula: {
          objetivo: "Ao terminar, voce identifica dado pessoal na sua base e sabe o que precisa ser tratado com cuidado.",
          blocos: [
            { t: "texto", v: "Governanca soa burocratica ate a primeira vez em que ninguem sabe qual das quatro tabelas de cliente e a correta, ou em que alguem exporta uma planilha com CPF para um fornecedor." },
            { t: "subtitulo", v: "O minimo util" },
            { t: "lista", v: [
              "Catalogo: que tabelas existem, o que cada uma significa, quem e o dono.",
              "Dicionario: o que cada coluna quer dizer, na linguagem do negocio.",
              "Classificacao: quais colunas contem dado pessoal ou sensivel.",
              "Retencao: por quanto tempo cada dado precisa ser guardado.",
              "Acesso: quem pode ler o que, e com que justificativa."
            ] },
            { t: "destaque", v: "Um dicionario de dados numa planilha compartilhada, atualizado, vale mais que uma ferramenta cara vazia." },
            { t: "subtitulo", v: "Dado pessoal na pratica" },
            { t: "texto", v: "A LGPD trata de dado que identifica pessoa fisica: nome, CPF, e-mail, telefone, endereco, e tambem combinacoes que permitem identificar. Dado sensivel, como saude, biometria, religiao e opiniao politica, tem protecao ainda maior." },
            { t: "tabela", cab: ["Principio", "Na pratica"], linhas: [
              ["Finalidade", "guarde por um motivo declarado, nao por via das duvidas"],
              ["Minimizacao", "nao leve para o analitico coluna que ninguem usa"],
              ["Necessidade", "ambiente de teste nao precisa de CPF real"],
              ["Seguranca", "acesso controlado e registro de quem consultou"],
              ["Retencao", "apague quando o prazo acabar"]
            ] },
            { t: "aviso", v: "Copiar base de producao para ambiente de teste com dado pessoal real e uma das praticas mais comuns e mais arriscadas. Mascare na copia, sempre." },
            { t: "subtitulo", v: "Anonimizar de verdade" },
            { t: "texto", v: "Trocar o nome por um codigo nao anonimiza. Se a base tem CEP, data de nascimento e sexo, e possivel reidentificar boa parte das pessoas. Anonimizacao seria precisa agregar, generalizar ou remover combinacoes identificadoras." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um pedido de analise de perfil de clientes exigia CPF na extracao, segundo o solicitante. Ao perguntar para que, a resposta foi: para nao contar a mesma pessoa duas vezes." },
              { t: "texto", v: "Um identificador embaralhado e estavel resolveu o mesmo problema sem CPF nenhum sair do banco. A analise ficou igual e o risco desapareceu. A pergunta que resolveu foi simplesmente para que." }
            ]
          },
          resumo: [
            "Dicionario simples e atualizado vale mais que ferramenta vazia.",
            "Nao leve para o analitico coluna pessoal que ninguem usa.",
            "Ambiente de teste com dado real e risco desnecessario.",
            "Trocar nome por codigo nao e anonimizar."
          ],
          aplicar: [
            "Liste as colunas com dado pessoal nas bases que voce usa.",
            "Pergunte para que serve o dado pessoal na proxima extracao que pedirem."
          ]
        },
        itens: [
          { id: "engenharia.m13.i1", tipo: "externo", titulo: "Lei Geral de Protecao de Dados",
            fonte: "Planalto", url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm", h: 4 },
          { id: "engenharia.m13.i2", tipo: "externo", titulo: "Guias e orientacoes da ANPD",
            fonte: "ANPD", url: "https://www.gov.br/anpd/pt-br", h: 4 },
          { id: "engenharia.m13.i3", tipo: "entregavel",
            titulo: "Dicionario de dados de uma base sua, com classificacao de dado pessoal", h: 8 }
        ],
        exercicios: [
          { id: "engenharia.m13.e1", tipo: "python",
            enunciado: "Escreva mascarar_cpf(cpf): mantem os tres primeiros e os dois ultimos digitos, trocando o resto por asterisco. Entrada invalida devolve None.",
            starter: "def mascarar_cpf(cpf):\n    pass\n",
            teste: "assert mascarar_cpf('12345678901') == '123******01'\nassert mascarar_cpf('123') is None\nassert mascarar_cpf(None) is None\n",
            gabarito: "def mascarar_cpf(cpf):\n    if not cpf or len(str(cpf)) != 11:\n        return None\n    texto = str(cpf)\n    return texto[:3] + '*' * 6 + texto[-2:]\n",
            dica: "Valide o tamanho antes de fatiar." },
          { id: "engenharia.m13.e2", tipo: "quiz",
            enunciado: "A area de marketing pede a base completa de clientes, com CPF, e-mail e telefone, para um estudo de perfil por faixa etaria e regiao. Qual e a melhor resposta?",
            alternativas: [
              { v: "Entregar como pedido: e uma area interna da empresa", correta: false,
                explicacao: "Ser interna nao dispensa finalidade e minimizacao. Entregar dado pessoal que a analise nao usa amplia o risco sem ganho." },
              { v: "Recusar o pedido por causa da LGPD", correta: false,
                explicacao: "Recusar sem alternativa transforma a area de dados em obstaculo e empurra o solicitante para caminhos piores." },
              { v: "Entregar faixa etaria, regiao e um identificador embaralhado, sem CPF, e-mail e telefone", correta: true,
                explicacao: "Atende a analise pedida com o minimo de dado pessoal. Se depois surgir necessidade de contato, ela e tratada como um novo pedido com finalidade propria." },
              { v: "Entregar tudo, mas pedir que assinem um termo de responsabilidade", correta: false,
                explicacao: "Termo distribui culpa, nao reduz risco. O vazamento continua possivel e a empresa continua responsavel." }
            ] }
        ]
      },
      {
        id: "engenharia.m14",
        n: 14,
        titulo: "Seguranca e controle de acesso",
        h: 15,
        objetivo: "Proteger dado e credencial sem travar o trabalho de quem precisa.",
        topicos: ["menor privilegio", "segredo", "auditoria", "backup"],
        aula: {
          objetivo: "Ao terminar, voce configura acesso por papel, guarda credencial fora do codigo e sabe testar o backup.",
          blocos: [
            { t: "texto", v: "A maior parte dos incidentes de dado em empresa media nao vem de ataque sofisticado. Vem de senha em planilha, usuario com permissao demais e backup que nunca foi testado." },
            { t: "subtitulo", v: "Menor privilegio" },
            { t: "texto", v: "Cada usuario e cada aplicacao recebem o minimo necessario para trabalhar. A rotina que so le nao precisa de permissao de escrita. O analista que consulta nao precisa poder apagar tabela." },
            { t: "codigo", lang: "sql", v: "-- leitura apenas, no schema analitico\nCREATE ROLE leitor_analitico;\nGRANT SELECT ON SCHEMA::analitico TO leitor_analitico;\nALTER ROLE leitor_analitico ADD MEMBER [dominio\\usuario];" },
            { t: "destaque", v: "Permissao por papel, nunca por pessoa. Quando alguem entra ou sai, muda-se o papel, e nao vinte permissoes espalhadas." },
            { t: "subtitulo", v: "Segredo" },
            { t: "lista", v: [
              "Nunca no codigo, nunca em planilha, nunca em mensagem.",
              "Variavel de ambiente no minimo; cofre de segredos quando houver.",
              "Rotacione periodicamente e sempre que alguem sair do time.",
              "Credencial de aplicacao e diferente de credencial de pessoa."
            ] },
            { t: "subtitulo", v: "Backup que ninguem testou nao e backup" },
            { t: "texto", v: "Rotina de backup rodando sem erro nao prova nada. Prova e restaurar em outro lugar e conferir que o dado voltou. Sem teste de restauracao periodico, voce tem um arquivo, nao um backup." },
            { t: "aviso", v: "Backup na mesma maquina ou no mesmo storage do banco protege contra falha de disco, e nao protege contra ransomware, exclusao acidental em massa nem incendio. Precisa de copia separada." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Uma exclusao acidental apagou tres meses de uma tabela auxiliar. O backup diario existia e rodava havia dois anos sem erro registrado." },
              { t: "texto", v: "Na hora de restaurar, descobriu-se que aquela tabela estava fora do escopo do job desde uma migracao. Um teste de restauracao semestral teria mostrado isso, com calma, em vez de em regime de urgencia." }
            ]
          },
          resumo: [
            "Incidente comum nasce de senha exposta e permissao demais.",
            "Permissao por papel, nao por pessoa.",
            "Credencial de aplicacao e separada da de pessoa.",
            "Backup nao testado e so um arquivo."
          ],
          aplicar: [
            "Liste quem tem permissao de escrita nas bases que voce mantem e questione o excesso.",
            "Proponha um teste de restauracao com data marcada."
          ]
        },
        itens: [
          { id: "engenharia.m14.i1", tipo: "externo", titulo: "Seguranca no SQL Server — permissoes e papeis",
            fonte: "Microsoft Learn", url: "https://learn.microsoft.com/pt-br/sql/relational-databases/security/authentication-access/getting-started-with-database-engine-permissions", h: 4 },
          { id: "engenharia.m14.i2", tipo: "externo", titulo: "OWASP — riscos mais comuns",
            fonte: "OWASP", url: "https://owasp.org/www-project-top-ten/", h: 4 },
          { id: "engenharia.m14.i3", tipo: "entregavel",
            titulo: "Revisao de acessos de uma base sua, com proposta de papeis", h: 6 }
        ],
        exercicios: [
          { id: "engenharia.m14.e1", tipo: "python",
            enunciado: "Escreva encontrar_segredos(linhas): devolve os numeros das linhas (comecando em 1) que contenham 'senha=', 'password=', 'token=' ou 'api_key=', sem diferenciar maiusculas.",
            starter: "def encontrar_segredos(linhas):\n    pass\n",
            teste: "l = ['import os', 'SENHA=abc123', 'x = 1', 'api_key=xyz']\nassert encontrar_segredos(l) == [2, 4]\nassert encontrar_segredos(['ok']) == []\n",
            gabarito: "def encontrar_segredos(linhas):\n    marcas = ('senha=', 'password=', 'token=', 'api_key=')\n    achados = []\n    for i, linha in enumerate(linhas, start=1):\n        baixa = linha.lower()\n        if any(m in baixa for m in marcas):\n            achados.append(i)\n    return achados\n",
            dica: "enumerate com start=1 devolve o numero da linha direto." }
        ]
      },
      {
        id: "engenharia.m15",
        n: 15,
        titulo: "Projeto: pipeline ponta a ponta",
        h: 30,
        objetivo: "Construir e sustentar um fluxo completo, do dado bruto ao painel.",
        topicos: ["escopo", "camadas", "testes", "documentacao"],
        aula: {
          objetivo: "Ao terminar, voce tem um pipeline funcionando, testado, documentado e reexecutavel por outra pessoa.",
          blocos: [
            { t: "texto", v: "Este modulo junta tudo. O criterio de sucesso nao e o pipeline rodar hoje: e outra pessoa conseguir executar, entender e corrigir daqui a seis meses." },
            { t: "subtitulo", v: "Escopo minimo do projeto" },
            { t: "lista", ordenada: true, v: [
              "Uma fonte real, com API ou banco.",
              "Camada bruta preservando o dado como veio.",
              "Camada tratada com tipos, limpeza e regras documentadas.",
              "Camada de consumo em modelo dimensional.",
              "Carga incremental e idempotente.",
              "Pelo menos cinco testes de qualidade barrando dado ruim.",
              "Log estruturado com duracao e volume.",
              "Orquestracao com dependencia explicita.",
              "README que permite outra pessoa executar do zero."
            ] },
            { t: "destaque", v: "Se o README nao permite alguem executar do zero sem te perguntar nada, o projeto nao esta pronto." },
            { t: "subtitulo", v: "O que documentar" },
            { t: "tabela", cab: ["Item", "Por que"], linhas: [
              ["Como executar do zero", "o proximo nao vai adivinhar"],
              ["De onde vem cada dado", "para saber quem avisar quando quebrar"],
              ["Regras de negocio aplicadas", "para explicar divergencia com o sistema origem"],
              ["O que fazer quando falhar", "para nao depender de voce as 3h"],
              ["Limitacoes conhecidas", "para ninguem usar o dado para o que ele nao serve"]
            ] },
            { t: "aviso", v: "Nao use dado real da empresa se o projeto for para portfolio publico. Use dado publico, ou mantenha o projeto em repositorio privado." },
            { t: "subtitulo", v: "Como saber que terminou" },
            { t: "texto", v: "Peca para alguem do time clonar, seguir o README e executar. Se essa pessoa conseguir sem te perguntar nada, terminou. Se perguntar, a resposta vira uma linha nova no README." }
          ],
          exemplo: {
            titulo: "No seu dia a dia",
            blocos: [
              { t: "texto", v: "Um pipeline entregue com codigo impecavel e sem README ficou parado por duas semanas quando o autor entrou de ferias e a fonte mudou o formato do arquivo." },
              { t: "texto", v: "Meia pagina explicando origem, camadas e o que fazer em caso de falha teria transformado duas semanas de espera em vinte minutos de correcao por outra pessoa." }
            ]
          },
          resumo: [
            "Pronto e quando outra pessoa executa sem te perguntar.",
            "As tres camadas separam origem, regra e consumo.",
            "Teste, log e documentacao fazem parte da entrega.",
            "Projeto publico nao usa dado da empresa."
          ],
          aplicar: [
            "Escolha uma fonte e escreva o escopo do seu pipeline em meia pagina.",
            "Peca para um colega executar seu README e anote cada pergunta que ele fizer."
          ]
        },
        itens: [
          { id: "engenharia.m15.i1", tipo: "externo", titulo: "Datasets publicos brasileiros",
            fonte: "dados.gov.br", url: "https://dados.gov.br/", h: 2 },
          { id: "engenharia.m15.i2", tipo: "externo", titulo: "Guia de escrita de README",
            fonte: "makeareadme.com", url: "https://www.makeareadme.com/", h: 2 },
          { id: "engenharia.m15.i3", tipo: "entregavel",
            titulo: "Pipeline completo publicado, com testes, log e README executavel", h: 24 }
        ],
        exercicios: [
          { id: "engenharia.m15.e1", tipo: "reflexao",
            enunciado: "Planeje o seu pipeline de projeto.",
            perguntas: [
              "Qual fonte voce vai usar e por que ela e interessante?",
              "Qual pergunta de negocio o painel final responde?",
              "Quais cinco testes de qualidade barram dado ruim nessa fonte?",
              "O que acontece se a carga rodar duas vezes no mesmo dia?"
            ],
            minimoCaracteres: 500 }
        ]
      }
    ]
  });



  window.PDC.trilhas.registrar({
    id: "engenharia",
    nome: "Engenharia de Dados",
    desc: "Do SQL avancado ao pipeline em producao, com qualidade, governanca e custo sob controle.",
    icone: "banco",
    cor1: "--t-engenharia",
    cor2: "--t-engenharia",
    tipoPratica: "sql",
    horas: 400,
    marcos: [
      { moduloId: "engenharia.m9", rotulo: "Pipeline proprio no ar",
        texto: "Ao concluir a Fase 3 voce ja consegue construir e sustentar um fluxo completo de dados sozinho." }
    ],
    fases: fases
  });
})();
