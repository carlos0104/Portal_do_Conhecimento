# FONTES — APIs de livros e conteúdo aberto

Registro das fontes candidatas da Biblioteca (épico E3) e do Gerador (E7).
**Regra RN-006:** uma fonte só entra no portal se responder ao navegador sem chave e com CORS aberto.

**Teste preliminar executado em 10/09/2026**, na rede corporativa da Brasil Terrenos, com `curl` enviando
`Origin: https://carlos0104.github.io`. Antecipado da Etapa 8 para a Etapa 2 por decisão de produto (Q-01).

---

## 1. Resultado do teste

| Fonte | Endpoint testado | HTTP | `access-control-allow-origin` | Tempo | Veredito |
|---|---|---|---|---|---|
| **Open Library** | `openlibrary.org/search.json?q=` | 200 | `*` | 0,3-6,0 s | **Aprovada** |
| **Internet Archive** | `archive.org/advancedsearch.php?output=json` | 200 | `*` | 0,7 s | **Aprovada** |
| **Crossref** | `api.crossref.org/works?query=` | 200 | `*` | 0,8 s | **Aprovada** |
| **Google Books** | `googleapis.com/books/v1/volumes?q=` | **429** | reflete a origem | 0,4 s | **Aprovada com ressalva** |
| OAPEN | `library.oapen.org/rest/search?query=` | 200 | **ausente** | 12,0 s | Reprovada |
| Gutendex (Project Gutenberg) | `gutendex.com/books?search=` | timeout | — | > 15 s | Indeterminada |
| DOAB | `directory.doabooks.org/.../search` | 000 / 404 | ausente | — | Reprovada |
| Standard Ebooks | `standardebooks.org/feeds/opds/new-releases` | 401 | `*` | 0,5 s | Reprovada |
| Domínio Público (MEC) | `dominiopublico.gov.br/pesquisa/...` | 301 | ausente | 0,2 s | Reprovada |

---

## 2. Fontes aprovadas

### Open Library — fonte principal de catálogo
- Busca: `https://openlibrary.org/search.json?q={termo}&limit={n}&language=por`
- Também aceita `title=` e `author=` separadamente, o que atende diretamente ao RF-016.
- Capa: `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
- Sem chave, sem cota declarada. Pede identificação por `User-Agent` em uso pesado — não aplicável a um usuário único.
- Cobertura de português: razoável para clássicos, fraca para lançamentos nacionais.

### Internet Archive — acervo baixável
- Busca: `https://archive.org/advancedsearch.php?q={consulta}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=year&output=json&rows={n}`
- Item: `https://archive.org/metadata/{identifier}` lista os arquivos e formatos disponíveis.
- Download: `https://archive.org/download/{identifier}/{arquivo}`
- É a fonte que resolve o "baixar o que for de domínio público" (RF-022).

### Crossref — artigos, capítulos e livros acadêmicos
- Busca: `https://api.crossref.org/works?query={termo}&rows={n}`
- Não entrega o texto, entrega metadado e DOI. Serve para material acadêmico das trilhas técnicas.
- Boa prática pedida pela própria API: incluir um e-mail de contato no parâmetro `mailto`. **Não usar o e-mail corporativo** — usar o pessoal ou omitir.

### Google Books — descrição, capa e sinopse
- Busca: `https://www.googleapis.com/books/v1/volumes?q={termo}&langRestrict=pt&maxResults={n}`
- Sintaxe útil: `intitle:`, `inauthor:`, `subject:` — atende ao RF-016 sem esforço extra.
- **Ressalva:** retornou HTTP 429 (cota excedida) de forma consistente na rede corporativa, porque a cota anônima é por IP e o IP é compartilhado por toda a empresa. O cabeçalho CORS está correto, então **deve funcionar normalmente na rede doméstica**.
- **Tratamento obrigatório no código:** 429 é falha esperada desta fonte, não erro do portal. Cai no fluxo do RN-007 (segue com as demais fontes e informa qual falhou).

---

## 3. Fontes reprovadas e o motivo

| Fonte | Motivo | Volta a ser avaliada quando |
|---|---|---|
| OAPEN | Responde 200 mas **não envia cabeçalho CORS** — o navegador bloqueia. Sem proxy, não há como consumir | A instituição habilitar CORS |
| DOAB | Endpoints REST antigos e novos falharam (000 e 404) | Nova documentação de API for publicada |
| Standard Ebooks | Feed OPDS exige autenticação (401) | Houver feed público sem credencial |
| Domínio Público (MEC) | Site sem API; só formulário HTML. Raspar HTML de site do governo é frágil e fora do escopo | Houver API oficial |

---

## 4. Pendência de reteste

**Gutendex / Project Gutenberg** deu tempo limite nesta rede (IP da Cloudflare). Não dá para afirmar se o problema é o serviço ou o bloqueio corporativo.

**Reteste necessário na rede doméstica**, junto com Google Books, antes da Etapa 8. Comando:

```bash
curl -s -m 20 -D - -o /dev/null -H "Origin: https://carlos0104.github.io" "https://gutendex.com/books?search=machado" | grep -iE "^(HTTP/|access-control-allow-origin)"
```

Se Gutendex passar, o portal ganha uma quinta fonte, com texto integral de domínio público em português.

---

## 5. Consequências para a arquitetura

1. O adaptador de fonte precisa **normalizar formatos bem diferentes** (Open Library, Archive, Crossref e Google Books não se parecem). O contrato do objeto `Livro` está em `ARQUITETURA.md`.
2. **Falha por fonte é o caso normal, não a exceção** — Google Books já falha hoje. O agregador nasce tolerante a falha parcial.
3. Nenhuma fonte aprovada exige chave, então a restrição de "nenhum segredo no código" continua respeitada.
4. Cobertura de livro nacional recente é fraca em todas as fontes livres. A estante pessoal (RF-020) precisa permitir **cadastro manual de livro**, senão o dono não consegue registrar o que lê em papel.

---

## 6. Fontes do Gerador de trilhas (Etapa 12)

Ainda não testadas nesta etapa: Wikipédia (`pt.wikipedia.org/w/api.php`, CORS via `origin=*`) e as fontes curadas por tema. Serão validadas na Etapa 12 seguindo o mesmo procedimento e registradas aqui.

---

## 7. Reteste na Etapa 8 (11/09/2026)

Executado por `node tools/testa-fontes.js`, na mesma rede corporativa, com `Origin: https://carlos0104.github.io`.
Desta vez o teste também confere o **formato da resposta**, não só o status.

| Fonte | HTTP | CORS | Tempo | Formato | Veredito |
|---|---|---|---|---|---|
| Open Library | 200 | `*` | 3,6 s | ok | **Em uso** |
| Internet Archive | 200 | `*` | 0,7 s | ok | **Em uso** |
| Crossref | 200 | `*` | 1,1 s | ok | **Em uso** |
| Google Books | 429 | reflete origem | 1,2 s | — | **Em uso, com falha esperada nesta rede** |
| Gutendex | timeout | — | 15,2 s | — | Pendente (B-04) |

### Prova no navegador, que é o que vale

O teste em Node não prova CORS: só o navegador aplica a política de origem. A busca real, feita no portal:

| Busca | Resultado |
|---|---|
| autor "Kahneman" | 19 livros em 1,1 s — Open Library 12, Internet Archive 12, Crossref 1, Google Books em limite |
| título "estatistica", português | 22 livros, todos em pt |
| autor "machado de assis", só baixável | 14 livros, todos com link de download |
| termo sem resultado | 0 livros, 3 fontes responderam, sem erro |
| uma fonte derrubada de propósito | 11 livros das demais, a que caiu é nomeada na tela |
| todas as fontes derrubadas | 0 livros, aviso claro, nenhuma exceção |

### Ajustes feitos por causa do que o teste real mostrou

1. **Internet Archive ordenado por downloads.** Sem ordenação, a primeira página vinha cheia de material sem valor (arquivos de teste de repositório). Com `sort[]=downloads desc`, os resultados passaram a ser livros de verdade.
2. **Desduplicação por sobrenome normalizado.** Cada fonte escreve o autor de um jeito: `Daniel Kahneman`, `Kahneman, Daniel, 1934-` e `Kahneman, Daniel, 1934- author`. Com a regra anterior, o mesmo livro aparecia três vezes.
3. **Descrição curta descartada.** O campo `description` do Archive às vezes traz descrição física (`499 p. ; 24 cm`) em vez de sinopse.
4. **HTTP 429 é estado próprio, não falha.** O Google Books aparece na tela como "limite de consultas atingido nesta rede", e não como erro — porque não é.
