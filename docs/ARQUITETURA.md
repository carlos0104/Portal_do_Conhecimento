# ARQUITETURA — Portal do Conhecimento

Contratos de dados, identificadores, persistência e convenções de código.
Produzido na **Etapa 2**. É o documento mais caro de mudar: alterar um contrato aqui afeta todas as etapas seguintes.

**Regra de ouro:** nenhuma etapa posterior pode inventar campo, id ou chave de armazenamento que não esteja neste documento. Precisou de algo novo? Atualize este arquivo primeiro, com análise de impacto.

---

## 1. Visão geral

Aplicação de página única, estática, sem build. Um único objeto global — `window.PDC` — agrega todos os módulos. Nenhum arquivo executa efeito colateral ao carregar: cada um apenas registra suas funções em `PDC`. Quem inicia a aplicação é `app.js`, no final da fila.

```
index.html
   |
   +-- css/styles.css        tokens, componentes, responsivo, tema claro e escuro
   |
   +-- js/core.js            PDC.util, PDC.icones, PDC.rota, PDC.estado
   +-- js/db.js              PDC.db      (localStorage + IndexedDB + migracao)
   +-- js/ui.js              PDC.ui      (componentes e helpers de DOM seguro)
   +-- js/views.js           PDC.views   (telas: home, trilha, modulo, area, visualizador)
   +-- js/trilhas/*.js       conteudo, um arquivo por trilha; cada um chama
                             PDC.trilhas.registrar() (o registro vive em core.js)
   +-- js/exercicios.js      PDC.exercicios
   +-- js/biblioteca.js      PDC.biblioteca
   +-- js/leitor.js          PDC.leitor
   +-- js/compreensao.js     PDC.compreensao
   +-- js/fixacao.js         PDC.fixacao
   +-- js/gerador.js         PDC.gerador
   +-- js/app.js             PDC.app.iniciar()
```

### 1.1 Ordem de carregamento (obrigatória)

`core.js` → `db.js` → `ui.js` → `views.js` → `trilhas/*.js` → `exercicios.js` → `biblioteca.js` → `leitor.js` → `compreensao.js` → `fixacao.js` → `gerador.js` → `app.js`

Regras:
1. Um arquivo só pode usar `PDC.x` de arquivos que vêm **antes** dele na fila.
2. `core.js` cria `window.PDC` e não depende de ninguém.
3. Uso cruzado só é permitido dentro de função, executada depois que tudo carregou — nunca no corpo do arquivo.
4. As tags `<script>` no `index.html` são carregadas na ordem, sem `defer` fora de ordem e sem `type="module"`.

### 1.2 Carregamento sob demanda

| Biblioteca | Quando carrega | Aviso ao usuário |
|---|---|---|
| Pyodide | Ao abrir o primeiro exercício de Python da sessão | Sim, informa o tamanho (~10 MB) |
| sql.js | Ao abrir o primeiro exercício de SQL da sessão | Sim |
| PDF.js | Ao abrir o primeiro PDF da sessão | Sim |
| mammoth.js | Ao abrir o primeiro .docx da sessão | Não (leve) |

Função única: `PDC.util.carregarScript(url, chaveGlobal)` — resolve se a global já existir, evita carregar duas vezes, tem tempo limite de 60 s e devolve erro tratável.

---

## 2. Identificadores

Ids são **estáveis e nunca reaproveitados**. Mudar o título de um módulo não muda o id. Remover um módulo aposenta o id para sempre.

| Entidade | Formato | Exemplo |
|---|---|---|
| Trilha nativa | slug curto | `dados`, `engenharia`, `gestao`, `lideranca`, `desenvolvimento` |
| Trilha criada pelo usuário | `t` + base36 do timestamp | `t1m9xk2p` |
| Fase | `<trilha>.f<n>` | `dados.f3` |
| Módulo | `<trilha>.m<n>` — `n` sequencial na trilha, de 1 a N, **não reinicia por fase** | `dados.m12` |
| Item do módulo | `<modulo>.i<n>` | `dados.m12.i3` |
| Exercício | `<modulo>.e<n>` | `dados.m12.e2` |
| Extra do usuário | `x` + base36 | `x1m9xk2p` |
| Livro | `b` + base36 | `b1m9xk2p` |
| Destaque | `h` + base36 | `h1m9xk2p` |
| Nota | `n` + base36 | `n1m9xk2p` |
| Flashcard | `fc` + base36 | `fc1m9xk2p` |
| Mapa mental | `mm` + base36 | `mm1m9xk2p` |
| Revisão (histórico) | `r` + base36 | `r1m9xk2p` |

Gerador: `PDC.util.novoId(prefixo)` → prefixo + `Date.now().toString(36)` + 2 caracteres aleatórios, para evitar colisão em criação rápida.

**Por que o módulo não reinicia a numeração por fase:** o marco "pronto para atuar" é definido por número de módulo (`dados.m12`). Numeração contínua torna o marco e o progresso legíveis sem consultar a fase.

---

## 3. Contratos de conteúdo

### 3.1 Trilha

```js
{
  id: "dados",
  nome: "Ciencia de Dados aplicada",
  desc: "Da analise de dados a ciencia de dados aplicada ao negocio.",
  icone: "grafico",              // chave em PDC.icones, nunca emoji
  cor1: "--t-dados-1",           // token CSS, nao valor literal
  cor2: "--t-dados-2",
  tipoPratica: "python",         // python | sql | quiz | reflexao | misto
  horas: 560,                    // redundante de proposito: validado contra a soma
  fases: [ Fase, ... ],
  marcos: [
    { moduloId: "dados.m12", rotulo: "Pronto para atuar",
      texto: "Base para assumir demanda de ciencia de dados com apoio. Revisar curriculo e LinkedIn." }
  ]
}
```

### 3.2 Fase

```js
{
  id: "dados.f3",
  n: 3,
  nome: "Inferencia e experimentacao",
  cor: "--f3",                   // token de cor da fase
  modulos: [ Modulo, ... ]
}
```

### 3.3 Módulo

```js
{
  id: "dados.m8",
  n: 8,
  titulo: "Testes de hipotese",
  h: 30,                         // horas estimadas, inteiro > 0
  objetivo: "Decidir com dado quando a diferenca observada e real.",
  topicos: ["p-valor", "erro tipo I e II", "poder do teste"],
  aula: Aula,                    // obrigatorio: nao existe modulo sem aula nativa
  itens: [ Item, ... ],
  exercicios: [ Exercicio, ... ] // pode ser vazio
}
```

### 3.4 Aula (estruturada em blocos, nunca HTML solto)

A aula **não** é string de HTML. É uma lista de blocos tipados, renderizada pelo `PDC.ui`. Isso garante o RNF-009 (nada de `innerHTML` com conteúdo arbitrário) e permite mudar a apresentação sem reescrever conteúdo.

```js
{
  objetivo: "O que voce sabera fazer ao terminar.",
  blocos: [
    { t: "texto",    v: "Paragrafo em texto puro." },
    { t: "subtitulo",v: "Como funciona na pratica" },
    { t: "lista",    v: ["item", "item"], ordenada: false },
    { t: "destaque", v: "Ideia central que precisa ficar." },
    { t: "aviso",    v: "Erro comum a evitar." },
    { t: "codigo",   lang: "python", v: "df.groupby('uf').size()" },
    { t: "tabela",   cab: ["Coluna","Coluna"], linhas: [["a","b"]] },
    { t: "citacao",  v: "Trecho curto.", fonte: "Autor, Obra", url: "https://..." }
  ],
  exemplo: {                     // obrigatorio: exemplo aplicado ao contexto do dono
    titulo: "No seu dia a dia",
    blocos: [ ... ]
  },
  resumo: ["frase curta", "frase curta"],
  aplicar: ["acao concreta para amanha", "acao concreta"]
}
```

**Campos obrigatórios:** `objetivo`, `blocos`, `exemplo`, `resumo`, `aplicar`. O validador da Etapa 6 reprova aula sem qualquer um deles.

**Bloco `citacao`** é o único que carrega texto de terceiro. Exige `fonte`; sem fonte, o validador reprova.

### 3.5 Item do módulo

```js
{
  id: "dados.m8.i2",
  tipo: "playlist",   // video | playlist | leitura | pratica | entregavel | externo | livro
  titulo: "StatQuest — Statistics Fundamentals",
  fonte: "StatQuest",
  url: "https://...",        // ausente em pratica e entregavel
  embed: "PLblh5JK...",      // so para video e playlist do YouTube
  h: 6                       // opcional, estimativa em horas
}
```

Regras: `embed` presente → toca dentro do portal (youtube-nocookie, clique para iniciar). `url` sem `embed` → abre no visualizador interno, com alternativa em nova aba. Sem `url` → é tarefa a marcar como feita.

### 3.6 Exercício

```js
// tipo python
{ id:"dados.m8.e1", tipo:"python", enunciado:"...", starter:"...", teste:"...", gabarito:"...", dica:"..." }

// tipo sql
{ id:"eng.m1.e1", tipo:"sql", enunciado:"...", base:"vendas", starter:"...",
  esperado:{ colunas:["uf","total"], linhas:[["SP",120]] }, ordemImporta:false, gabarito:"...", dica:"..." }

// tipo quiz
{ id:"gestao.m2.e1", tipo:"quiz", enunciado:"Cenario...",
  alternativas:[ {v:"...", correta:false, explicacao:"por que nao"},
                 {v:"...", correta:true,  explicacao:"por que sim"} ] }

// tipo reflexao
{ id:"lideranca.m5.e1", tipo:"reflexao", enunciado:"...",
  perguntas:["...","..."], minimoCaracteres:200 }
```

Regras (RN-002): `python` e `sql` só concluem por aprovação automática. `quiz` conclui ao acertar. `reflexao` conclui ao responder todas as perguntas com o mínimo de caracteres.

Contrato do teste de Python: o harness executa o código do usuário e depois o bloco `teste`, que usa `assert`. Falha de `assert` reprova com a mensagem. O `starter` **tem que reprovar** e o `gabarito` **tem que aprovar** — verificado na validação.

### 3.7 Livro (normalizado a partir de qualquer fonte)

```js
{
  id: "b1m9xk2p",
  origem: "openlibrary",     // openlibrary | archive | crossref | googlebooks | manual | arquivo
  idExterno: "OL12345W",     // null quando manual
  titulo: "...",
  autores: ["..."],
  ano: 2011,
  editora: "...",
  idioma: "pt",              // ISO 639-1
  assuntos: ["..."],
  descricao: "...",
  capaUrl: "https://...",    // null se nao houver
  licenca: "dominio publico",// texto livre da fonte, ou null
  urlFonte: "https://...",   // pagina oficial na fonte
  urlDownload: "https://...",// so quando a fonte oferece; null caso contrario
  // estado local
  estado: "lendo",           // quero_ler | lendo | lido | abandonado
  moduloId: "dados.m3",      // vinculo opcional com modulo
  temArquivo: true,          // se ha blob em 'arquivos'
  formato: "pdf",            // pdf | docx | null
  paginas: 320,
  posicao: 47,               // pagina atual
  percentual: 14.7,
  minutosLeitura: 320,
  criadoEm: "2026-09-10T18:00:00.000Z",
  atualizadoEm: "..."
}
```

**Nota de projeto:** `origem: "manual"` existe porque nenhuma fonte livre cobre bem o livro nacional recente (ver `FONTES.md`, seção 5). Sem cadastro manual o dono não consegue registrar o que lê em papel.

### 3.8 Destaque, nota, flashcard e mapa

```js
// destaque
{ id:"h...", livroId:"b...", cor:1..4, texto:"trecho exato", pagina:47,
  ancora:{ tipo:"pdf", pagina:47, inicio:1203, fim:1310 },  // ou { tipo:"html", seletor:"...", inicio, fim }
  criadoEm:"..." }

// nota — sobre destaque, sobre livro, ou sobre video
{ id:"n...", origem:{ tipo:"livro"|"video"|"modulo", id:"b..." },
  destaqueId:"h..." | null, segundo: 372 | null, texto:"...", criadoEm:"..." }

// flashcard
{ id:"fc...", frente:"...", verso:"...", tipo:"frente_verso"|"lacuna",
  origem:{ tipo:"livro"|"modulo"|"video", id:"b...", ref:"pagina 47" },
  automatico:true,                 // gerado pelo portal, editavel
  // agendamento SM-2
  intervalo:6, facilidade:2.5, repeticoes:2, proxima:"2026-09-16", criadoEm:"..." }

// mapa mental
{ id:"mm...", origemId:"b...", titulo:"...", gerado:true,
  nos:[ { id:"n1", pai:null, texto:"...", nivel:0, editado:false, x:null, y:null } ],
  atualizadoEm:"..." }
```

**`ancora` é o campo crítico do leitor.** Destaque precisa voltar no lugar certo depois de recarregar. Guardamos página + deslocamento no texto extraído daquela página, e o texto exato como conferência: se o deslocamento não bater com o texto, o portal procura o texto na página e reancoara; se não achar, marca o destaque como órfão e avisa, em vez de destacar o trecho errado.

---

## 4. Persistência

### 4.1 localStorage — prefixo `pdc.`

| Chave | Conteúdo | Tamanho esperado |
|---|---|---|
| `pdc.versao` | inteiro, versão do schema | mínimo |
| `pdc.progresso` | `{ [itemId]: { feito: true, em: ISO } }` | até ~100 KB |
| `pdc.config` | `{ ritmo: 12, tema: "auto", ultimaTrilha, ultimoModulo, avisos: {} }` | mínimo |
| `pdc.extras` | `[ { id, trilhaId, moduloId, tipo, titulo, url } ]` | pequeno |
| `pdc.trilhas` | trilhas criadas pelo gerador | até ~500 KB |
| `pdc.respostas` | `{ [exercicioId]: { codigo, resposta, aprovado, em } }` | até ~500 KB |
| `pdc.metas` | `[ { semana: "2026-W37", horasPlano, horasReal } ]` | pequeno |

Escrita com atraso de 350 ms (debounce), com indicador "salvo" na barra superior. Falha de gravação exibe aviso explícito (RNF-018) — nunca falha em silêncio.

**Por que `pdc.respostas` fica no localStorage e não no IndexedDB:** é dado pequeno, lido de forma síncrona ao abrir o módulo. IndexedDB é assíncrono e atrasaria a renderização.

### 4.2 IndexedDB — banco `portal_conhecimento`, versão 1

| Store | keyPath | Índices | Conteúdo |
|---|---|---|---|
| `livros` | `id` | `origem`, `estado`, `moduloId` | metadado do livro (schema 3.7, sem blob) |
| `arquivos` | `livroId` | — | `{ livroId, blob, nome, tamanho, mime }` |
| `textos` | `livroId` | — | `{ livroId, paginas: [texto], estrutura: [...] }` |
| `destaques` | `id` | `livroId` | schema 3.8 |
| `notas` | `id` | `livroId`, `videoId` | schema 3.8 |
| `flashcards` | `id` | `proxima`, `origemId` | schema 3.8 |
| `mapas` | `id` | `origemId` | schema 3.8 |
| `revisoes` | `id` | `cardId`, `data` | `{ id, cardId, data, nota: 0..5, intervaloAntes, intervaloDepois }` |

**Por que blob e texto ficam separados do metadado:** listar a estante não pode carregar 300 MB de PDF. `livros` é leve e sempre lido inteiro; `arquivos` e `textos` só são lidos ao abrir aquele livro.

**Cota (RNF-017):** ao gravar arquivo, consultar `navigator.storage.estimate()`. Acima de 80% da cota, avisar e oferecer remover o arquivo de um livro mantendo metadado, destaques, notas e flashcards.

### 4.3 Migração de versão

```js
PDC.db.migracoes = {
  // 1: estado inicial, sem migracao
  // 2: funcao que recebe os dados na versao 1 e devolve na versao 2
};
```

Ao iniciar, `db.js` lê `pdc.versao`. Menor que a atual → aplica as migrações em ordem e grava a nova versão. Maior que a atual → **recusa e avisa**, sem apagar nada (RN-011). Item órfão encontrado na migração é descartado e relatado (RN-010).

### 4.4 Backup

Dois formatos, escolhidos pelo dono:

| Formato | Conteúdo | Uso |
|---|---|---|
| **Leve** (padrão) | localStorage + todos os stores **exceto** `arquivos` | Backup rotineiro; arquivo pequeno; livros voltam sem o PDF, que pode ser reimportado |
| **Completo** | tudo, com blobs em base64 | Troca de máquina |

```js
{ app: "portal-do-conhecimento", versaoSchema: 1, tipo: "leve"|"completo",
  exportadoEm: "ISO", local: { ...localStorage }, indexed: { livros:[], destaques:[], ... } }
```

A importação valida `app` e `versaoSchema`, executa migração se preciso e devolve relatório: importados, migrados, descartados, ignorados.

---

## 5. Cálculo de progresso (implementação de RN-001, RN-003 e RN-004)

```
concluidosModulo = itens feitos + exercicios aprovados + extras do modulo feitos
totalModulo      = itens + exercicios + extras do modulo
progressoModulo  = totalModulo > 0 ? concluidosModulo / totalModulo : 0

horasReaisModulo = progressoModulo * modulo.h
progressoTrilha  = soma(horasReaisModulo) / soma(modulo.h)
faseConcluida    = todos os modulos da fase com progressoModulo == 1

horasRestantes   = soma(modulo.h) - soma(horasReaisModulo)
semanasPrevistas = ceil(horasRestantes / config.ritmo)
```

Arredondamento só na exibição (uma casa decimal). O valor guardado é sempre a fração.

---

## 6. Roteamento

Rotas por hash, para funcionar no GitHub Pages sem configuração de servidor.

| Rota | View |
|---|---|
| `#/` | Home — catálogo de trilhas |
| `#/trilha/<trilhaId>` | Dashboard da trilha |
| `#/modulo/<moduloId>` | Módulo |
| `#/biblioteca` | Busca e estante |
| `#/livro/<livroId>` | Leitor + compreensão |
| `#/revisao` | Painel de revisão do dia |
| `#/area` | Minha área |
| `#/nova` | Gerador de trilhas |
| `#/config` | Configurações |
| `#/ver?u=<url>` | Visualizador interno |

`PDC.rota.ir(rota)` navega; `PDC.rota.registrar(padrao, funcao)` associa view. Rota desconhecida cai na home com aviso. Estado de navegação (última trilha e módulo) fica em `pdc.config`, para o portal reabrir onde parou.

---

## 7. Renderização segura

Proibido `innerHTML` com qualquer texto que não seja constante literal do próprio código.

```js
PDC.ui.txt(valor)                        // devolve textNode
PDC.ui.el(tag, atributos, filhos)        // cria elemento; atributos por setAttribute
PDC.ui.icone(chave, tamanho)             // SVG inline de PDC.icones; nunca emoji
```

Conteúdo remoto (API de livros) e conteúdo de arquivo do usuário passam **obrigatoriamente** por `txt()`. A conversão do `.docx` pelo mammoth.js gera HTML: esse HTML é inserido com uma lista de permissão de tags (`p, h1-h6, ul, ol, li, table, thead, tbody, tr, th, td, strong, em, br, blockquote, img[src^="data:"]`), removendo qualquer atributo `on*`, `style` e `href` que não seja `http`, `https` ou `mailto`.

---

## 8. Tema claro e escuro

Decisão do dono: os dois.

- Tokens de cor definidos em `:root` (claro) e redefinidos em `:root[data-tema="escuro"]`.
- `@media (prefers-color-scheme: dark)` aplica o escuro quando `config.tema === "auto"`.
- Nenhuma cor literal fora do bloco de tokens. Cor escrita direto na regra é erro de revisão.
- Contraste mínimo 4,5:1 verificado **nos dois temas** (RNF-011).

Detalhamento dos tokens: Etapa 3.

---

## 9. Convenções de código

- JavaScript ES2020, sem framework, sem módulos ES (`type="module"` quebraria a ordem de carregamento definida).
- Identificadores em português sem acento: `carregarTrilha`, `progressoModulo`, `salvarDestaque`.
- Um arquivo, um objeto em `PDC`. Funções internas ficam dentro de IIFE, não no escopo global.
- Função com mais de ~40 linhas ou 3 níveis de aninhamento é candidata a divisão.
- Todo `await` de rede ou de IndexedDB dentro de `try/catch`, com mensagem de erro para o usuário.
- Nada de `console.log` no código publicado. Depuração usa `PDC.util.log()`, que só escreve quando `localStorage.pdc_debug === "1"`.
- Comentário explica **por que**, não o que o código já diz.

---

## 10. Rastreabilidade com o produto

| Contrato desta arquitetura | Atende |
|---|---|
| Blocos de aula tipados (3.4) | RF-003, RNF-009, RNF-020 |
| Contrato de exercício (3.6) | RF-009 a RF-015, RN-002 |
| Livro normalizado (3.7) e `origem: manual` | RF-016 a RF-022, FONTES.md §5 |
| Âncora de destaque (3.8) | RF-027 |
| Separação de blob, texto e metadado (4.2) | RNF-001, RNF-004, RNF-017 |
| Migração e recusa de versão futura (4.3) | RN-011, RF-050 |
| Backup leve e completo (4.4) | RF-049, RF-050, RNF-016 |
| Fórmula de progresso (5) | RN-001, RN-003, RN-004 |
| Renderização segura (7) | RN-012, RNF-009 |
| Tokens nos dois temas (8) | RF-052, RNF-011 |

---

## 11. Decisões registradas e alternativas descartadas

| Decisão | Alternativa descartada | Motivo |
|---|---|---|
| Objeto global `PDC` | Módulos ES (`import`) | Módulos ES exigiriam servidor para teste local e mudariam a ordem de carregamento; o projeto é sem build |
| Aula em blocos tipados | Aula em string de HTML | HTML solto abre porta para injeção e trava a apresentação ao conteúdo |
| Rotas por hash | History API | GitHub Pages não reescreve URL; rota profunda daria 404 ao recarregar |
| IndexedDB para acervo | localStorage para tudo | localStorage tem limite de ~5 MB e é síncrono; PDF não cabe |
| Numeração contínua de módulo | Reiniciar por fase | O marco de carreira é referenciado por número de módulo |
| Backup leve como padrão | Só backup completo | Backup completo com PDFs viraria arquivo de centenas de MB e ninguém faria com frequência |
| Reancoragem de destaque por texto | Só deslocamento numérico | Reprocessar o PDF pode deslocar índices; destacar trecho errado é pior que avisar |

---

## 12. Questões técnicas em aberto

| # | Questão | Decide na etapa |
|---|---|---|
| QT-01 | ~~Base de exemplo do SQL~~ | **Resolvida na Etapa 6: `vendas`** |
| QT-02 | sql.js carrega o banco pronto ou recria por script a cada exercício | 7 |
| QT-03 | Limite de tamanho de PDF aceito sem aviso | 9 |
| QT-04 | Algoritmo de resumo: frequência ponderada ou TextRank | 10 |
| QT-05 | Layout do mapa mental: radial ou árvore horizontal | 10 |
| QT-06 | Gutendex entra como quinta fonte (depende do reteste em casa) | 8 |

---

## 13. Alteracoes registradas apos a Etapa 2

| Data | Mudanca | Motivo |
|---|---|---|
| 10/09/2026 | Criado `js/views.js` | `ui.js` acumularia componentes genericos e telas inteiras; separar mantem os dois legiveis |
| 10/09/2026 | Criado `PDC.trilhas` em `core.js` | Os arquivos de conteudo precisam de um registro que exista antes deles na fila de carregamento |
| 10/09/2026 | Criado `js/trilhas/exemplo.js` | Conteudo de demonstracao da Etapa 5. **Sai do `index.html` na Etapa 6** |
| 11/09/2026 | `js/exercicios.js` e `js/biblioteca.js` trazem a própria tela | Módulo grande com interface própria mantém `views.js` legível; mesmo padrão dos dois |
| 11/09/2026 | Campo `tambemEm` no objeto Livro | Guarda as outras fontes em que o mesmo livro apareceu, depois da desduplicação |
| 11/09/2026 | PDF.js 3.11.174 em vez da 4.x | A versão 4 é distribuída só como ES module, o que quebraria a ordem de carregamento por `<script>` definida em §1.1 |
| 11/09/2026 | `standardFontDataUrl` e `cMapUrl` obrigatórios no `getDocument` | Sem eles um PDF com fonte padrão (Helvetica, Times) não termina de renderizar, e falha em silêncio |
| 11/09/2026 | `--scale-factor` definido na camada de texto | Exigência do PDF.js 3.x: sem a variável, o texto selecionável não cai sobre as letras desenhadas |
| 11/09/2026 | Âncora de PDF usa o texto da camada renderizada, não o da extração | Garante que o deslocamento guardado corresponde exatamente ao que o usuário selecionou na tela |
