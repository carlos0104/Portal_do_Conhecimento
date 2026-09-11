# VALIDAÇÃO — roteiro por etapa

Padrão ad hoc definido pelo dono: sem framework de teste, sem dependência instalada.
Validação feita com **Node** (já instalado), **Python** (já instalado) e **navegador**.

Regra: ao fim de cada etapa, executar o roteiro correspondente e **relatar o resultado real**.
O que não puder ser validado deve ser dito com todas as letras.

---

## 1. Verificações universais

Rodar ao fim de **toda** etapa que mexa em código.

### V-1 Sintaxe de todos os JS

```bash
node -e "const fs=require('fs'),p=require('path');let e=0;(function w(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const c=p.join(d,f.name);if(f.isDirectory()){if(!['.git','node_modules'].includes(f.name))w(c)}else if(f.name.endsWith('.js')){try{new Function(fs.readFileSync(c,'utf8'))}catch(x){e++;console.log('ERRO',c,x.message)}}}})('js');console.log(e?'FALHOU: '+e+' arquivo(s)':'OK: sintaxe valida em todos os JS')"
```

### V-2 Ordem de carregamento respeitada

Conferir que cada arquivo só usa `PDC.x` de arquivos anteriores na fila do `index.html`, e que nenhum arquivo executa efeito colateral fora de função.

```bash
node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');const ordem=[...h.matchAll(/<script src=\"([^\"]+)\"/g)].map(m=>m[1]);console.log('Ordem no index.html:');ordem.forEach((f,i)=>console.log(' ',i+1,f))"
```

### V-3 Nada proibido no código

```bash
node -e "const fs=require('fs'),p=require('path');const bad=[[/console\.log\(/,'console.log'],[/\.innerHTML\s*=/,'innerHTML'],[/\beval\(/,'eval'],[/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u,'emoji']];let n=0;(function w(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const c=p.join(d,f.name);if(f.isDirectory()){if(!['.git'].includes(f.name))w(c)}else if(/\.(js|html|css)$/.test(f.name)){const s=fs.readFileSync(c,'utf8');s.split('\n').forEach((l,i)=>bad.forEach(([re,nome])=>{if(re.test(l)){n++;console.log(nome,c+':'+(i+1))}}))}}})('.');console.log(n?'FALHOU: '+n+' ocorrencia(s)':'OK: nenhuma ocorrencia proibida')"
```

> `innerHTML` só é permitido no ponto único de sanitização do `.docx` (ARQUITETURA §7). Se aparecer ali, justificar no relatório.

### V-4 Nenhum segredo ou acervo prestes a ser commitado

```bash
git status --porcelain && git diff --cached --name-only | grep -Ei '\.(pdf|docx?|epub|env|key|pem)$' && echo "ALERTA: arquivo proibido" || echo "OK: nada proibido no stage"
```

### V-5 Contraste e teclado (etapas que mexem em interface)

Percorrer o fluxo alterado **só com teclado** (Tab, Shift+Tab, Enter, Esc) e conferir foco visível.
Conferir nos **dois temas**, claro e escuro.

### V-6 Responsivo (etapas que mexem em layout)

Conferir em 1366, 900, 640 e 400 px de largura. A página nunca rola na horizontal.

---

## 2. Roteiro por etapa

### Etapa 3 — Design system
- V-1, V-3, V-5, V-6.
- `amostra.html` abre com todos os componentes, nos três estados de tema (auto, claro, escuro).
- **Nenhuma cor literal fora de uma definição de token:**
  ```bash
  node -e "const l=require('fs').readFileSync('css/styles.css','utf8').split('\n');let n=0;l.forEach((x,i)=>{if(!/^\s*--[a-z0-9-]+\s*:/.test(x)&&/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/.test(x)){n++;console.log('linha '+(i+1)+': '+x.trim())}});console.log(n?'REVISAR: '+n+' cor(es) fora dos tokens':'OK: todas as cores estao nos tokens')"
  ```
- **Contraste medido, não estimado.** Calcular a razão WCAG de todos os pares texto/fundo nos dois temas; nenhum par abaixo de 4,5:1. Script de referência usado na Etapa 3 fica em `tools/contraste.js` a partir da Etapa 14.

### Etapa 4 — Esqueleto
- V-1 a V-4.
- Navegar por todas as rotas do ARQUITETURA §6; rota inválida cai na home com aviso.
- Recarregar a página: `pdc.config` volta e o portal reabre onde parou.
- Abrir o IndexedDB no DevTools e conferir os 8 stores e os índices do ARQUITETURA §4.2.
- Simular falha de gravação (bloquear armazenamento no navegador) e conferir o aviso.

### Etapa 5 — Views
- V-1 a V-6.
- Marcar e desmarcar item; progresso recalcula pela fórmula do ARQUITETURA §5 e persiste.
- Trocar o ritmo de 12 h para 20 h e conferir a redução da previsão.
- Conferir a anatomia fixa do módulo em pelo menos 3 módulos diferentes.

### Etapa 6 — Conteúdo
- V-1, V-3.
- Validador estrutural do conteúdo:
  ```bash
  node tools/valida-conteudo.js
  ```
  Verifica: ids únicos e no formato do ARQUITETURA §2; `trilha.horas` igual à soma dos módulos; todo módulo com `aula` completa (`objetivo`, `blocos`, `exemplo`, `resumo`, `aplicar`); bloco `citacao` com `fonte`; `marcos` apontando para módulo existente.
- Conferir status HTTP de todos os links externos:
  ```bash
  node tools/checa-links.js
  ```
- Leitura humana de 2 aulas da trilha entregue.

### Etapa 7 — Exercícios
- V-1 a V-3.
- **Python — gabarito aprova, starter reprova**, em Python real, um subprocesso por exercício:
  ```bash
  python tools/valida_exercicios.py
  ```
- **SQL — gabarito bate com `esperado` na base real, starter não bate**, em `sqlite3`:
  ```bash
  python tools/valida_sql.py
  ```
  Os dois leem os exercícios por `node tools/dump-exercicios.js`, então validam exatamente o que o portal carrega.
- Casos de erro **no navegador**, todos obrigatórios: código vazio, erro de sintaxe, laço infinito (corte por tempo), erro em tempo de execução, `import` de biblioteca ausente, SQL sobre tabela inexistente.
- Medir o tempo do primeiro carregamento do Pyodide e do sql.js e registrar.
- Conferir que o código digitado volta após recarregar e que "Restaurar" devolve o starter.

### Etapa 8 — Biblioteca
- V-1 a V-4, V-6.
- Reexecutar o teste de fontes e atualizar `docs/FONTES.md`:
  ```bash
  node tools/testa-fontes.js
  ```
- Buscar por título, por autor e por assunto; conferir a normalização para o schema do ARQUITETURA §3.7.
- Derrubar uma fonte de propósito (URL inválida) e conferir RN-007: busca continua e informa a falha.
- Conferir o tratamento de HTTP 429 do Google Books como falha esperada.
- Cadastrar livro manual (`origem: manual`) e conferir que entra na estante.

### Etapa 9 — Leitor
- V-1 a V-6.
- Matriz obrigatória de arquivos:

| Caso | Esperado |
|---|---|
| PDF com texto, ~300 páginas | Abre, pagina, busca no texto funciona |
| PDF escaneado sem texto | Abre para leitura, avisa, desabilita resumo/glossário/mapa |
| PDF acima de 20 MB | Abre com aviso prévio; sem travar a aba por mais de 2 s por página |
| `.docx` com títulos, listas e tabelas | Estrutura preservada |
| `.docx` com imagem | Imagem exibida ou omitida com aviso, nunca quebra |
| Arquivo corrompido | Mensagem clara, sem tela branca |

- **Teste de privacidade (RN-005):** interceptar `fetch` e `XMLHttpRequest`, abrir o arquivo e confirmar que **nenhuma** requisição sai da máquina.
- **Sanitização do `.docx`:** converter um HTML hostil (`<script>`, `onerror`, `<iframe>`, `href="javascript:"`) e confirmar que nada executa e que os links válidos sobrevivem.
- Destacar, recarregar e conferir que o destaque volta na posição exata.
- **Reancoragem:** gravar um destaque com deslocamento errado mas texto correto — tem que voltar no lugar certo. Com texto inexistente, tem que virar órfão declarado, nunca destaque no trecho errado.
- Simular cota cheia e conferir o aviso em 80%.

> **Atenção ao ambiente de teste.** O navegador embutido roda com o painel oculto, e nesse estado o `requestAnimationFrame` não dispara. O PDF.js depende dele para desenhar no canvas, então **a pintura da página não pode ser verificada por lá** — aparece em branco mesmo com o código correto. Tudo o que não depende de pintura (extração, camada de texto, ancoragem, destaques, Word, privacidade) é verificável normalmente. O desenho precisa de conferência no navegador do dono.

### Etapa 10 — Compreensão
- V-1 a V-6.
- **Fidelidade e integridade (RN-008):**
  ```bash
  node tools/valida-resumo.js
  ```
  Roda sobre as **67 aulas reais das trilhas** mais casos de borda, e verifica: toda frase do resumo existe literalmente na origem; resumo longo nunca menor que o curto; texto com conteúdo nunca produz resumo vazio; todo termo do glossário aparece no próprio trecho de contexto; nenhum nó do mapa aponta para pai inexistente; nenhum nó fica sem posição.
- Na tela, reconferir RN-008: comparar cada frase exibida com o texto de origem.
- Três tamanhos de resumo, com quantidade crescente.
- **Mapa mental sem títulos precisa degradar bem** — termos recorrentes com limiar baixo e, se nem isso houver, as frases de maior peso viram ramos. Mapa só com a raiz conta como falha.
- Mapa: selecionar, editar, adicionar, remover, recolher, arrastar e "refazer do texto".
- Exportar PNG e Markdown; conferir o nome do arquivo e o conteúdo do Markdown.
- Persistência: editar o mapa e a ficha, sair e voltar — tudo tem que estar lá.

### Etapa 11 — Fixação
- V-1 a V-6.
- Simulação de 30 dias do SM-2 contra RN-009:
  ```bash
  node tools/simula-sm2.js
  ```
- Criar card a partir de destaque e conferir que é editável antes de salvar.
- Nota com marcação de tempo: clicar volta o vídeo no segundo correto.
- Painel do dia soma trilha, leitura e vídeo.

### Etapa 12 — Gerador
- V-1 a V-4.
- Gerar 6 temas: 3 da base curada e 3 fora dela.
- Sem rede: cai para o modo offline com aviso.
- Aprovar uma trilha e conferir que persiste em `pdc.trilhas` e navega.

### Etapa 13 — Backup
- V-1 a V-4.
- Ciclo completo: exportar leve → limpar tudo → importar → comparar.
- Ciclo completo com backup completo, incluindo blobs.
- Importar backup de versão anterior: migra e relata.
- Importar backup de versão futura: **recusa sem apagar nada** (RN-011).
- Importar arquivo inválido: mensagem clara, dados atuais intactos.

### Etapa 14 — Acessibilidade e desempenho
- V-1 a V-6 completos.
- Lighthouse local: Acessibilidade ≥ 90, Desempenho ≥ 90 (sem contar bibliotecas sob demanda).
- Percorrer todo o portal só com teclado, nos dois temas.
- Conferir contraste 4,5:1 em texto normal nos dois temas.

### Etapa 15 — Validação geral
- Executar todo este documento, do início ao fim.
- Produzir `docs/RELATORIO-VALIDACAO.md` com resultado item a item e o que ficou sem validar.

### Etapa 16 — Publicação
- Após o push, aguardar o Pages e baixar os arquivos publicados:
  ```bash
  for f in index.html css/styles.css js/core.js js/app.js; do curl -s -o /dev/null -w "$f %{http_code}\n" "https://carlos0104.github.io/Portal_do_Conhecimento/$f"; done
  ```
- Repetir V-1 sobre os arquivos publicados.
- Abrir a URL no celular e no desktop, nos dois temas.
- Medir o tempo do commit até estar no ar (meta: < 5 min).

---

## 3. Ferramentas de apoio

Os scripts em `tools/` são criados na etapa em que passam a ser necessários. Não fazem parte do site publicado e são ignorados pelo GitHub Pages.

| Script | Criado na etapa | Função |
|---|---|---|
| `tools/valida-conteudo.js` | 6 | Integridade das trilhas, ids, horas e aulas |
| `tools/checa-links.js` | 6 | Status HTTP dos links externos |
| `tools/dump-exercicios.js` | 7 | Despeja exercícios e bases em JSON para os validadores |
| `tools/valida_exercicios.py` | 7 | Python real: gabarito aprova, starter reprova |
| `tools/valida_sql.py` | 7 | SQLite real: gabarito bate com o esperado, starter não |
| `tools/testa-fontes.js` | 8 | CORS e disponibilidade das APIs de livros |
| `tools/valida-resumo.js` | 10 | Fidelidade extrativa do resumo |
| `tools/simula-sm2.js` | 11 | Intervalos da revisão espaçada |

---

## 4. Formato do relatório de etapa

Toda etapa termina com:

1. **O que foi feito** — objetivo e entregas.
2. **Arquivos impactados** — lista.
3. **Validação executada** — item do roteiro, comando e resultado real.
4. **O que não foi validado** — e por quê.
5. **Riscos e pendências** — o que ficou em aberto.
6. **Pergunta final** — "Autoriza a Etapa N+1?"
