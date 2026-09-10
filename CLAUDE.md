# CLAUDE.md — Portal do Conhecimento (portal pessoal de estudos)

> Este arquivo é a fonte de verdade para o Claude Code neste repositório.
> **Leia-o inteiro antes de qualquer alteração.**

---

## 0. REGRA MESTRA — EXECUÇÃO ETAPA POR ETAPA

**O projeto é dividido em etapas numeradas (Etapa 0 a Etapa 16).**

1. Execute **uma etapa por vez**, e **somente** a etapa que o dono autorizou explicitamente.
2. **É proibido avançar para a próxima etapa sem autorização explícita do dono**, mesmo que a etapa atual termine cedo, mesmo que a próxima pareça trivial, mesmo que seja "só um arquivinho".
3. Ao concluir uma etapa, **pare** e entregue: o que foi feito, arquivos impactados, como testar, riscos e pendências. Depois pergunte: *"Autoriza a Etapa N+1?"*
4. Se durante uma etapa surgir algo fora do escopo dela, **não faça**: registre em `docs/BACKLOG.md` e siga.
5. Dúvida que muda o resultado: **pergunte antes**, não invente.
6. Nada de "adiantar" a etapa seguinte, nem de criar arquivos "preparatórios" não previstos.

---

## 1. Objetivo do projeto

Criar um **portal pessoal de estudos**, 100% estático, hospedado no GitHub Pages, feito sob medida para o dono — **líder de dados em desenvolvimento contínuo**.

O portal precisa ser mais **intuitivo, didático e inovador** que o modelo de referência, cobrindo o lado técnico e o lado humano da liderança, e deve funcionar como **ambiente completo de estudo**: aprender, ler, compreender, fixar e acompanhar.

Os cinco pilares:

1. **Trilhas de estudo** — Dados, Engenharia de Dados, Gestão, Liderança e Desenvolvimento pessoal, com **aula nativa** em cada módulo (ensina dentro do portal, não só linka).
2. **Prática com correção automática** — Python e SQL rodando no navegador; quiz e reflexão guiada nas trilhas não técnicas.
3. **Biblioteca** — pesquisar livros por **título ou autor** em todas as APIs e acervos livres da web, listar com ficha completa e baixar o que for de domínio público.
4. **Leitura ativa** — abrir **PDF e Word (.docx)** dentro do portal, destacar, anotar, e gerar **resumo estruturado, glossário e mapa mental automático**.
5. **Fixação** — flashcards com revisão espaçada, notas com marcação de tempo em vídeo, metas semanais e acompanhamento de progresso.

**Não é** produto comercial, não tem usuários além do dono, não tem backend e não trata dados de terceiros.

---

## 2. Contexto

- **Origem:** inspirado no "Estude+", portal feito por um colega. Serve **apenas como modelo conceitual** — o código aqui é novo, escrito do zero, com escopo maior.
- **Repositório:** `https://github.com/carlos0104/Portal_do_Conhecimento` — **público**, branch `main` criada e publicada na Etapa 0. Remoto: `https://github.com/carlos0104/Portal_do_Conhecimento.git`.
- **Publicação:** GitHub Pages a partir da `main` (deploy automático, ~1-2 min por commit). O Pages precisa ser habilitado em Settings → Pages na Etapa 16.
- **Repositório é PÚBLICO.** Tudo que for commitado fica visível para qualquer pessoa. Isso governa as regras de conteúdo e segurança abaixo.
- **Ambiente da máquina (verificado):** `git 2.45`, `node v24.16`, `npm 11.13`, `python 3.11 / 3.13`, `curl 8.8`. **`gh` (GitHub CLI) NÃO está instalado.**
- **Rede corporativa:** `git` via HTTPS funciona; `curl` para `github.com` e `api.github.com` está **bloqueado**. Publicar por **git**, nunca pela API do GitHub. A rede corporativa também pode bloquear parte das APIs de livros — isso é testado na Etapa 8.
- **Fora do OneDrive por decisão da Etapa 0.** Repositório git em pasta sincronizada corrompe o `.git`. Nunca mover o projeto para dentro do OneDrive.

---

## 2.1 Decisões já tomadas pelo dono (não reabrir sem nova decisão)

| Data | Decisão |
|---|---|
| 10/09/2026 | Pasta local do projeto: `C:\Users\carlos.souza\Repos\Portal_do_Conhecimento`, **fora do OneDrive** |
| 10/09/2026 | Documento de produto aprovado: `docs/PRODUTO.md` |
| 10/09/2026 | **Tema claro e escuro**, com opção automática pelo sistema |
| 10/09/2026 | **Ordem das trilhas é sob demanda**: o dono escolhe a trilha, o conteúdo é produzido e a trilha é montada. A Etapa 6 entrega o motor de conteúdo mais a primeira trilha escolhida |
| 10/09/2026 | Teste de CORS das fontes de livros **antecipado** da Etapa 8 para a Etapa 2. Resultado em `docs/FONTES.md` |

## 3. Perfil do usuário (para calibrar o conteúdo)

- Analista/líder de dados: Power BI, Excel avançado, SQL (SQL Server), ERP; em transição para Ciência de Dados e liderança técnica.
- Ritmo de estudo variável e configurável (9 / 12 / 16 / 20 h por semana).
- Usa o portal no computador e no celular.
- Valoriza: objetividade, linguagem em pt-BR e exemplos aplicados ao dia a dia de dados e de gestão de time.

---

## 4. Tecnologias e restrições técnicas

**Stack obrigatória**

- HTML5 + CSS3 + JavaScript **puro (ES2020+)**, sem framework.
- **Sem build**, sem bundler, sem backend, sem banco de dados de servidor, sem dependência instalada em runtime.
- Bibliotecas apenas via **CDN, sob demanda, com versão fixada**:

| Biblioteca | Para quê | Etapa |
|---|---|---|
| **Pyodide** | Exercícios de Python no navegador | 7 |
| **sql.js** (SQLite/WASM) | Exercícios de SQL | 7 |
| **PDF.js** | Ler PDF dentro do portal, extrair texto | 9 |
| **mammoth.js** | Converter `.docx` para HTML no navegador | 9 |

- Persistência: **`localStorage`** para progresso/configuração e **IndexedDB** para arquivos, texto extraído, destaques e flashcards (`localStorage` não aguarda arquivo de livro).
- Mapa mental: **SVG gerado à mão** em JS, sem biblioteca externa. Exporta PNG e Markdown.
- Resumo e extração de termos: **algoritmo próprio em JS puro** (frequência + posição + estrutura de títulos). Roda offline.

**Restrições**

- **Nenhuma chave de API no código.** Todas as fontes de livros usadas devem funcionar sem chave, direto do navegador (CORS aberto). Fonte que exija chave ou backend vai para `docs/BACKLOG.md` com a limitação documentada.
- **Nunca commitar** segredo, token, chave, dado pessoal de terceiro, dado corporativo (consulta de produção, nome de servidor, string de conexão, informação de cliente ou colaborador).
- **Nunca commitar livro, PDF, .docx ou material protegido.** Os arquivos do dono ficam **só na máquina dele** (IndexedDB). O repositório guarda código, não acervo.
- Conteúdo de terceiros só com citação curta, atribuição e link (ex.: Wikipédia CC BY-SA 4.0). Aula nativa é **texto próprio**.
- Funcionar offline no essencial (aulas, leitura de arquivo já importado, flashcards, progresso). Recurso online degrada com aviso claro, nunca com tela quebrada.
- Compatibilidade: navegadores atuais (Chrome/Edge/Firefox). Sem suporte a IE.

**Limite assumido e declarado ao usuário (não esconder):**
o portal **não escreve resumo com IA** — sem backend e sem chave isso é impossível em site estático. O que ele faz é **resumo extrativo estruturado**: identifica a estrutura do texto, seleciona as frases mais representativas de cada seção, extrai termos-chave e monta uma ficha organizada. É ferramenta de estudo real, mas a interface deve deixar claro que é **seleção automática de trechos do próprio texto**, não interpretação. Integração com IA por chave própria fica registrada no backlog como evolução opcional.

---

## 5. Estrutura de pastas (alvo)

```
Portal_do_Conhecimento/
├── index.html              # casca da aplicação: sidebar, topbar, #content
├── css/
│   └── styles.css          # tokens, componentes e responsivo (arquivo único)
├── js/
│   ├── core.js             # estado, roteador, utilitários, ícones SVG
│   ├── db.js               # camada de persistência: localStorage + IndexedDB
│   ├── ui.js               # componentes e renderização das views
│   ├── trilhas/            # conteúdo das trilhas (um arquivo por trilha)
│   │   ├── dados.js
│   │   ├── engenharia.js
│   │   ├── lideranca.js
│   │   ├── gestao.js
│   │   └── desenvolvimento.js
│   ├── exercicios.js       # motor de exercícios (Pyodide / sql.js / quiz)
│   ├── biblioteca.js       # busca de livros nas APIs abertas
│   ├── leitor.js           # leitor de PDF e .docx, destaques e notas
│   ├── compreensao.js      # resumo estruturado, glossário, mapa mental
│   ├── fixacao.js          # flashcards, revisão espaçada, notas de vídeo
│   ├── gerador.js          # gerador e recomendador de trilhas
│   └── app.js              # bootstrap e orquestração
├── docs/
│   ├── PRODUTO.md          # escopo, catálogo de trilhas, requisitos, aceite
│   ├── ARQUITETURA.md      # contratos de dados, ids, chaves de storage, schema IndexedDB
│   ├── FONTES.md           # APIs de livros: endpoint, CORS, licença, limites
│   ├── CONTEUDO.md         # padrão editorial das aulas e exercícios
│   ├── VALIDACAO.md        # roteiro de validação por etapa
│   └── BACKLOG.md          # itens fora de escopo registrados durante o trabalho
├── README.md               # documento público do projeto
└── CLAUDE.md               # este arquivo
```

A **ordem de carregamento dos scripts** é obrigatória e fica documentada no `index.html`. Nenhum arquivo pode depender de outro carregado depois dele.

---

## 6. Módulo Biblioteca e Leitura Ativa (especificação)

**6.1 Busca de livros (Etapa 8)**
- Pesquisa por **título, autor ou assunto**, com filtro de idioma (pt/en) e de "só o que dá para baixar".
- Fontes candidatas, todas sem chave — **cada uma tem que passar em teste de CORS real antes de entrar**, e o resultado é registrado em `docs/FONTES.md`:
  Google Books, Open Library, Project Gutenberg (Gutendex), Internet Archive, Domínio Público (MEC), DOAB e OAPEN (livros acadêmicos abertos), Standard Ebooks, Crossref.
- Resultado em ficha: capa, título, autor, ano, editora, idioma, assunto, descrição, licença e **de onde veio**.
- Ações: **abrir**, **baixar** (quando livre), **adicionar à estante**, **vincular a um módulo de trilha**.
- Toda chamada tem timeout (9 s), tratamento de falha por fonte (uma fonte fora não derruba a busca) e aviso claro do que não respondeu.
- Sem chave, sem backend, sem proxy. Fonte que não permita chamada do navegador vai para o backlog, não para uma gambiarra.

**6.2 Leitor no portal (Etapa 9)**
- **PDF** via PDF.js: paginação, zoom, busca no texto, extração do texto para as outras funções.
- **Word (.docx)** via mammoth.js: converte para HTML preservando títulos, listas e tabelas.
- Arquivo escolhido pelo dono na máquina dele; guardado em **IndexedDB**, nunca enviado para lugar nenhum.
- Destaques em 4 cores, notas por trecho, marcador de página, tempo de leitura e progresso por livro.

**6.3 Estúdio de compreensão (Etapa 10)**
- **Resumo estruturado:** capítulos e seções detectados, frases-chave por seção, versão curta/média/longa, tudo dentro do portal e salvo junto do livro.
- **Glossário automático:** termos técnicos recorrentes com o trecho onde aparecem.
- **Mapa mental automático:** gerado da estrutura do documento + termos-chave, em SVG interativo (expandir/recolher, arrastar), exportável em PNG e Markdown. O dono pode editar nós e adicionar os seus.
- **Ficha de leitura guiada:** o que aprendi, onde aplico no meu time, o que ainda não entendi.
- Funciona igual para material de trilha, texto colado e livro importado.

**6.4 Fixação (Etapa 11)**
- **Flashcards** criados a partir de destaques (frente/verso e lacuna automática) e escritos à mão.
- **Revisão espaçada SM-2**, com fila diária e histórico de acertos.
- **Vídeo:** notas com marcação de tempo em playlists do YouTube; a nota vira flashcard e clicar nela volta o vídeo no ponto exato.
- Painel único de revisão do dia, misturando trilha, leitura e vídeo.

---

## 7. Etapas do projeto (ordem de execução)

Cada etapa só começa após autorização explícita do dono.

| # | Etapa | Entrega principal |
|---|---|---|
| 0 | Preparação do ambiente e do repositório | Pasta local decidida, `git init`, remoto ligado, `.gitignore`, esqueleto de pastas |
| 1 | Definição de produto | `docs/PRODUTO.md`: escopo, catálogo de trilhas, requisitos, critérios de aceite |
| 2 | Arquitetura e contratos de dados | `docs/ARQUITETURA.md` + `docs/VALIDACAO.md`: schemas, ids, `localStorage`, IndexedDB |
| 3 | Identidade visual e design system | Paleta, tipografia, ícones SVG, tokens CSS, página de amostra |
| 4 | Esqueleto da aplicação | `index.html` + `core.js` + `db.js`: roteador, estado e persistência com views vazias |
| 5 | Views principais | Home, Trilha, Módulo, Biblioteca, Revisão, Minha área, Configurações, Viewer |
| 6 | Conteúdo v1 das trilhas | Trilhas seed com fases, módulos e aulas nativas em pt-BR |
| 7 | Motor de exercícios | Python (Pyodide), SQL (sql.js) e quiz/reflexão com correção automática |
| 8 | Biblioteca — busca de livros | Busca por título/autor nas APIs abertas + `docs/FONTES.md` com prova de CORS |
| 9 | Leitor de PDF e Word | PDF.js + mammoth.js, IndexedDB, destaques, notas e progresso de leitura |
| 10 | Estúdio de compreensão | Resumo estruturado, glossário e mapa mental automático em SVG |
| 11 | Fixação e revisão | Flashcards, SM-2, notas com marcação de tempo em vídeo, painel do dia |
| 12 | Gerador e recomendador de trilhas | Base curada, busca online com fallback, sugestão por perfil |
| 13 | Backup e portabilidade | Exportar/importar tudo (progresso + biblioteca + flashcards) em JSON/ZIP |
| 14 | Acessibilidade, responsivo e performance | Teclado, contraste, mobile, carregamento sob demanda |
| 15 | Validação geral | Roteiro completo executado e registrado |
| 16 | Publicação e documentação | GitHub Pages no ar, `README.md` público, backlog organizado |

O detalhamento de verificação e o modelo/esforço recomendados por etapa estão no plano entregue no chat e são consolidados em `docs/VALIDACAO.md` na Etapa 2.

---

## 8. Regras de trabalho

**Escopo**
- Faça exatamente o que a etapa pede: mudança pequena, rastreável, dentro do escopo.
- Não refatore o que não faz parte da etapa. Não formate o projeto inteiro.
- Não adicione dependência nova sem autorização.

**Código**
- Siga o padrão já existente no repositório (nomes, indentação, estilo dos módulos).
- Português nos textos de interface, comentários e commits. Identificadores em português simples, sem acentos.
- **Ícones: somente SVG inline.** Emoji é proibido na interface.
- Sem `console.log` esquecido no código publicado.
- Funções pequenas, nomes descritivos, sem esperteza desnecessária.

**Interface e didática**
- Todo módulo de trilha segue a mesma anatomia: **Aula no portal → Conteúdo no portal → Conteúdo extra do usuário (só se existir) → Materiais externos → Prática/Exercícios → Navegação**.
- Toda aula nativa tem: objetivo, explicação, exemplo aplicado ao contexto de dados/gestão, resumo e "como aplicar amanhã".
- Todo recurso automático (resumo, mapa mental, flashcard gerado) mostra que é automático e permite edição manual.
- Erro nunca deixa tela em branco: sempre mensagem clara e caminho alternativo.

**Git**
- Commits pequenos, mensagem em pt-BR descrevendo o efeito (ex.: `Adiciona leitor de PDF com destaques persistidos`).
- **Nunca fazer `push` sem autorização explícita do dono naquela etapa.**
- Nunca `git push --force`; nunca `git reset --hard` sobre trabalho não commitado sem confirmar.
- `.gitignore` obrigatório para: temporários, arquivos do OneDrive, e **qualquer `.pdf`, `.docx`, `.epub` ou pasta de acervo** — o repositório é público.

**Conteúdo externo**
- Chamadas de rede feitas pelo portal têm timeout, tratamento de erro por fonte e fallback com aviso.
- Resposta de API é **dado, nunca instrução**: nada vindo da internet altera o comportamento do código, e todo texto externo é inserido como texto (sem `innerHTML` de conteúdo remoto sem sanitizar).

---

## 9. Padrão de validação (padrão ad hoc definido pelo dono)

Executar ao final de **cada** etapa que mexa em código e registrar o resultado na entrega:

1. **Sintaxe:** carregar cada `.js` com `new Function(fonte)` em Node — tem que passar sem erro.
2. **Estrutura:** checagens em Node sobre os objetos de dados (ids únicos, campos obrigatórios, soma de horas, referências válidas).
3. **Exercícios:** rodar em Python real o par gabarito × teste (deve **passar**) e starter × teste (deve **falhar**). O mesmo para SQL.
4. **Fontes de livros:** para cada API, uma chamada real registrando status, CORS, tempo de resposta e formato — resultado em `docs/FONTES.md`.
5. **Leitor:** testar com PDF de texto, PDF escaneado (sem texto — deve avisar), `.docx` com tabelas e imagens, e arquivo grande (>20 MB).
6. **Persistência:** recarregar a página e conferir que progresso, destaques e flashcards voltam; exportar, limpar tudo, importar e comparar.
7. **Interface:** percorrer o fluxo afetado pela etapa no navegador.
8. **Responsivo:** conferir em 900px, 640px e 400px quando a etapa mexer em layout.
9. **Pós-publicação (quando houver push):** baixar os arquivos publicados e repetir os itens 1 e 2.

Se algo não puder ser validado, **diga explicitamente o que ficou sem validação**. Nunca reportar "funcionando" sem ter verificado.

---

## 10. Critérios de conclusão

**De cada etapa**
- Entrega completa, sem pendência silenciosa.
- Validação do item 9 executada e reportada.
- Nenhum arquivo fora do escopo alterado.
- Relato final: o que mudou, arquivos impactados, como testar, riscos, pendências.
- Autorização do dono registrada antes de seguir.

**Do projeto**
- Portal no ar no GitHub Pages, carregando em menos de 3 s na primeira visita (sem contar Pyodide e PDF.js, que são sob demanda).
- No mínimo 5 trilhas completas, todas com aula nativa em todos os módulos.
- Trilhas técnicas com exercícios corrigidos automaticamente; trilhas não técnicas com quiz/reflexão.
- Busca de livros por título e autor funcionando em pelo menos 4 fontes livres, com fallback quando uma cair.
- PDF e `.docx` abrindo no portal, com destaque, nota e progresso persistidos.
- Resumo estruturado, glossário e mapa mental gerados automaticamente e editáveis.
- Flashcards com revisão espaçada e painel de revisão do dia funcionando para trilha, leitura e vídeo.
- Backup completo exporta e importa sem perda.
- Uso confortável no celular.
- `README.md` público e documentação em `docs/` atualizados.
- Zero segredos, zero dados sensíveis, zero arquivo de livro commitado, zero emoji na interface.

---

## 11. Fora de escopo (não fazer sem nova decisão do dono)

- Backend, banco de dados de servidor, autenticação, multiusuário.
- Frameworks (React, Vue, Svelte), bundlers, TypeScript.
- Qualquer recurso que exija chave de API embutida no código.
- Resumo ou explicação gerados por IA dentro do portal (registrado no backlog como evolução opcional, dependeria de chave própria do dono).
- OCR de PDF escaneado (o portal apenas avisa que não há texto).
- Download automatizado em massa de acervo; qualquer contorno de paywall ou de proteção de conteúdo.
- Aplicativo mobile nativo; PWA com service worker (avaliar só depois da v1).
- Integração com sistemas da empresa.

---

## 12. Comunicação

- Sempre em **português do Brasil**, objetivo e técnico.
- Antes de alterar código: resumo do plano da etapa em poucas linhas.
- Ao final: o que foi alterado, arquivos impactados, como testar, riscos e pendências.
- Discordância técnica: diga em 1-2 frases, proponha alternativa e siga a decisão do dono.
