# PRODUTO — Portal do Conhecimento

Documento de definição de produto. Produzido na **Etapa 1**.
Governa as Etapas 2 a 16. Alteração aqui exige análise de impacto nas etapas seguintes.

---

## 1. Resumo executivo

**Problema.** Um líder de dados em evolução estuda em fontes espalhadas — vídeo, livro, PDF, curso, artigo — sem lugar único para aprender, praticar, ler, compreender e fixar. O conhecimento entra e não fica: falta prática corrigida, falta revisão, e falta um plano que mostre onde ele está.

**Produto.** Um portal pessoal de estudos, estático e gratuito, que reúne cinco pilares: trilhas com aula nativa, prática com correção automática, biblioteca de livros livres, leitura ativa de PDF/Word e fixação por revisão espaçada.

**Recomendação do PO.** Entregar em três releases. O **Release 1 (MVP)** é trilhas + aula nativa + prática corrigida: é o que resolve o problema central e já é usável sozinho. Biblioteca e leitura ativa (Release 2) são o diferencial, mas dependem de uma validação técnica de risco (CORS das APIs e comportamento do PDF.js) que precisa acontecer cedo. Gerador, backup e acessibilidade fecham o Release 3.

---

## 2. Entendimento da demanda

| Item | Entendimento |
|---|---|
| Quem usa | Uma pessoa: o dono do projeto. Líder de dados (Power BI, Excel, SQL, ERP) em transição para ciência de dados e liderança. |
| Que problema resolve | Estudo disperso, sem prática corrigida, sem revisão e sem visão de progresso. |
| Resultado esperado | Estudar de forma contínua e verificável, no técnico e no humano, com o conhecimento fixado. |
| Solução já decidida | Site estático em HTML/CSS/JS puro no GitHub Pages, sem backend e sem chave de API. |
| Urgência | Sem prazo externo. O risco real é abandono por escopo grande demais, não atraso. |

**O que foi questionado e ajustado**
- "Resumo automático" foi pedido como se fosse IA. **Não é possível** em site estático sem chave. O produto entrega **resumo extrativo estruturado** (seleção e organização de trechos do próprio texto). Está declarado no produto e será declarado na interface.
- "Todas as APIs livres da web" foi reduzido a **fontes que comprovadamente respondem ao navegador** (CORS aberto, sem chave). O que não passar no teste vai para o backlog, não para uma gambiarra.

---

## 3. Premissas

| # | Premissa | Impacto se estiver errada | Como validar |
|---|---|---|---|
| P-01 | Usuário único, sem compartilhamento e sem login. | Se houver outros usuários, exige backend e autenticação — muda a arquitetura inteira. | Confirmação do dono. |
| P-02 | Produto de uso permanente, sem data de encerramento. | Se houver prazo, o escopo precisa encolher para o Release 1. | Confirmação do dono. |
| P-03 | Conteúdo publicado incompleto é aceitável e preferível a atraso. | Se não for, o Release 1 cresce e demora. | Confirmação do dono. |
| P-04 | Estudo majoritariamente no computador; celular é consumo (ler aula, revisar flashcard), não produção. | Se for o contrário, editor de código e leitor de PDF precisam de redesenho mobile-first. | Observação de uso após o Release 1. |
| P-05 | O dono aceita que os dados vivam no navegador dele, com backup manual. | Se não aceitar, exige sincronização — ou seja, backend. | Confirmação do dono. |
| P-06 | Rede doméstica/pessoal para uso do portal; a rede corporativa pode bloquear parte das fontes. | Biblioteca fica limitada no trabalho. | Teste de CORS na Etapa 8, nas duas redes. |

---

## 4. Escopo

### 4.1 Dentro do escopo

| Épico | Descrição |
|---|---|
| E1 — Trilhas e progresso | Catálogo, dashboard, módulo com aula nativa, marcação de progresso, planejamento por ritmo |
| E2 — Prática corrigida | Python (Pyodide), SQL (sql.js), quiz e reflexão guiada |
| E3 — Biblioteca | Busca de livros por título/autor/assunto em fontes livres, ficha, estante, vínculo com módulo |
| E4 — Leitura ativa | Leitor de PDF e .docx, destaques, notas, progresso de leitura |
| E5 — Compreensão | Resumo estruturado, glossário, mapa mental automático, ficha de leitura |
| E6 — Fixação | Flashcards, revisão espaçada SM-2, notas com marcação de tempo em vídeo, painel do dia |
| E7 — Gerador de trilhas | Trilha nova por tema, com busca online e fallback; recomendação por perfil |
| E8 — Dados e configuração | Ritmo semanal, backup/restauração, migração de dados |

### 4.2 Fora do escopo

Backend, banco de servidor, login, multiusuário, sincronização entre dispositivos, app nativo, PWA offline com service worker, OCR de PDF escaneado, IA generativa dentro do portal, download em massa de acervo, qualquer contorno de proteção de conteúdo, integração com sistemas da empresa.

### 4.3 Dependente de validação técnica

| Item | Risco | Etapa que decide |
|---|---|---|
| Fontes de livros com CORS aberto | Fonte pode recusar chamada do navegador | 8 |
| sql.js para exercícios de SQL | Peso do WASM e persistência do banco de exemplo | 7 |
| PDF acima de 20 MB no navegador | Memória e travamento da aba | 9 |
| Cota do IndexedDB | Navegador pode limitar o acervo local | 9 |

---

## 5. Objetivos e resultados esperados

| # | Objetivo | Resultado observável |
|---|---|---|
| O-01 | Estudar de forma contínua | Ao menos 40 semanas por ano com a meta de horas cumprida |
| O-02 | Sair de analista para cientista de dados aplicado | Fase 4 da trilha Dados concluída, com projeto entregue |
| O-03 | Fixar o que estuda | Fila de revisão do dia zerada em pelo menos 5 dias por semana |
| O-04 | Ler mais e melhor | Ao menos 1 livro por mês com ficha de leitura e mapa mental gerados |
| O-05 | Desenvolver o lado de liderança e gestão | Trilhas Liderança e Gestão concluídas, com plano de gestão da área escrito |
| O-06 | Não depender de ninguém para manter o portal | Publicar mudança do zero ao ar em menos de 5 minutos |

---

## 6. Catálogo de trilhas

Total planejado: **5 trilhas, 23 fases, 67 módulos, 1.418 horas**.
As horas são estimativa de dedicação, usadas para calcular previsão de conclusão pelo ritmo semanal.

### 6.1 `dados` — Ciência de Dados aplicada — 6 fases, 18 módulos, **560 h**

| Fase | Módulos | h |
|---|---|---|
| F1 Fundamentos | Python para dados (40) · Lógica e estruturas de dados (25) · Estatística descritiva (30) | 95 |
| F2 Análise e visualização | pandas (40) · Análise exploratória (35) · Visualização e storytelling (30) | 105 |
| F3 Inferência e experimentação | Probabilidade (30) · Testes de hipótese (30) · Experimentação e teste A/B (25) | 85 |
| F4 Machine learning supervisionado | Fundamentos de ML (35) · Regressão (30) · Classificação (35) | 100 |
| F5 ML avançado | Ensembles e ajuste de modelo (30) · Séries temporais (30) · Aprendizado não supervisionado (25) | 85 |
| F6 Projeto e portfólio | Engenharia de atributos e pipeline (25) · Projeto ponta a ponta (40) · Portfólio e comunicação de resultado (25) | 90 |

**Marco "pronto para atuar" — fim da Fase 4 (módulo 12, 385 h).** A partir daí o dono tem base para assumir demanda de ciência de dados com apoio. Ao atingir o marco: revisar currículo e LinkedIn.

### 6.2 `engenharia` — Engenharia de Dados — 5 fases, 15 módulos, **400 h**

| Fase | Módulos | h |
|---|---|---|
| F1 Fundamentos | SQL avançado e funções de janela (35) · Modelagem de dados (30) · Linha de comando e ambiente (20) | 85 |
| F2 Ingestão e transformação | Python para volume (30) · APIs e integração (25) · ETL e ELT na prática (35) | 90 |
| F3 Armazenamento | Data warehouse e modelagem dimensional (35) · Lakehouse e formatos de arquivo (25) · Desempenho e particionamento (25) | 85 |
| F4 Orquestração e qualidade | Orquestração de pipelines (30) · Qualidade de dados e testes (25) · Observabilidade e custo (20) | 75 |
| F5 Governança e projeto | Governança, catálogo e LGPD (20) · Segurança e controle de acesso (15) · Projeto: pipeline ponta a ponta (30) | 65 |

### 6.3 `gestao` — Gestão de área de dados — 4 fases, 12 módulos, **173 h**

| Fase | Módulos | h |
|---|---|---|
| F1 Fundamentos do gestor | O papel do gestor (12) · Prioridade e delegação (15) · Gestão do próprio tempo (12) | 39 |
| F2 Gestão do time de dados | Rituais e fluxo de demanda (15) · Capacidade e estimativa (15) · Contratação e integração de novatos (12) | 42 |
| F3 Stakeholders e produto de dados | Gestão de stakeholders (15) · Dados como produto (18) · Negociação de escopo e prazo (12) | 45 |
| F4 Resultado e comunicação executiva | Métricas e OKR (15) · Apresentação executiva (12) · Projeto: plano de gestão da área (20) | 47 |

### 6.4 `lideranca` — Liderança — 4 fases, 12 módulos, **165 h**

| Fase | Módulos | h |
|---|---|---|
| F1 Base do líder | Autoconhecimento (12) · Estilos de liderança (12) · Confiança e segurança psicológica (15) | 39 |
| F2 Comunicação | Escuta e comunicação clara (15) · Feedback (15) · Conversas difíceis (15) | 45 |
| F3 Desenvolver pessoas | Reunião individual eficaz (12) · PDI e carreira (15) · Delegar para desenvolver (12) | 39 |
| F4 Influência e mudança | Influência sem autoridade (15) · Liderar mudança (15) · Liderança em crise (12) | 42 |

### 6.5 `desenvolvimento` — Desenvolvimento pessoal — 4 fases, 10 módulos, **120 h**

| Fase | Módulos | h |
|---|---|---|
| F1 Atenção e produtividade | Foco e trabalho profundo (12) · Sistema de tarefas (12) · Reuniões e interrupções (8) | 32 |
| F2 Hábitos | Formação de hábitos (12) · Energia, sono e rotina (10) | 22 |
| F3 Aprender a aprender | Metacognição (12) · Revisão espaçada e recuperação ativa (12) · Leitura eficiente e anotação (12) | 36 |
| F4 Emoções e carreira | Inteligência emocional e resiliência (15) · Carreira, marca pessoal e negociação (15) | 30 |

> **Nota de coerência:** o módulo "Revisão espaçada e recuperação ativa" (F3) ensina o método que o próprio portal aplica no épico E6. A trilha explica por que o portal funciona daquele jeito.

### 6.6 Tipo de prática por trilha

| Trilha | Prática |
|---|---|
| dados | Exercício Python corrigido automaticamente |
| engenharia | Exercício SQL corrigido automaticamente + Python |
| gestao | Quiz de decisão (cenário com alternativas) + entregável escrito |
| lideranca | Quiz de cenário + reflexão guiada + roteiro de aplicação real |
| desenvolvimento | Autoavaliação, experimento de 7 dias e reflexão guiada |

---

## 7. Regras de negócio

**RN-001 — Cálculo do progresso do módulo**
Progresso = (itens concluídos + exercícios aprovados + extras concluídos) ÷ (total de itens + exercícios + extras). Módulo sem nenhum item conta 0%.
*Exceção:* extras adicionados pelo usuário entram no total assim que criados.

**RN-002 — Conclusão de exercício técnico**
Exercício de Python ou SQL só é marcado como concluído quando o código do usuário **passa no teste automático**. Marcação manual não é permitida.
*Exceção:* quiz e reflexão são concluídos pela resposta do usuário, sem correção objetiva na reflexão.

**RN-003 — Progresso da trilha e horas**
As horas realizadas são creditadas proporcionalmente ao progresso de cada módulo, ponderadas pela carga horária do módulo. Uma fase só é considerada concluída com 100% de todos os seus módulos.

**RN-004 — Previsão de conclusão**
Previsão = horas restantes ÷ ritmo semanal configurado (9, 12, 16 ou 20 h). O portal mostra plano × realizado; a divergência é informação, não erro.

**RN-005 — Arquivo do usuário nunca sai da máquina**
PDF, .docx e texto extraído ficam exclusivamente no IndexedDB do navegador. Nenhuma requisição de rede pode conter conteúdo de arquivo do usuário. Nenhum arquivo de acervo é commitado.

**RN-006 — Admissão de fonte de livro**
Uma fonte só entra no portal se, em teste real, responder ao navegador sem chave e com CORS aberto. Fonte reprovada é registrada em `docs/FONTES.md` com o motivo e vai para o backlog.

**RN-007 — Falha parcial na busca**
Se uma fonte falhar ou estourar o tempo limite de 9 s, a busca continua com as demais e o portal informa quais fontes não responderam. Busca sem nenhuma fonte disponível mostra aviso, nunca tela vazia sem explicação.

**RN-008 — Honestidade do resumo**
Toda frase do resumo automático deve existir literalmente no documento de origem. O portal não parafraseia e não interpreta. A interface identifica o resumo como automático e extrativo, e permite edição manual.
*Exceção:* títulos de seção e conectores estruturais gerados pelo portal, que são visualmente distintos do texto extraído.

**RN-009 — Agendamento da revisão (SM-2)**
Card novo: 1 dia. Segundo acerto: 6 dias. Depois: intervalo anterior × fator de facilidade (inicial 2,5; mínimo 1,3). Erro reinicia o intervalo para 1 dia e reduz o fator em 0,2.

**RN-010 — Origem única do dado**
Progresso, destaque, nota e flashcard pertencem sempre a uma origem identificada (módulo, livro ou vídeo). Item órfão é descartado na migração e registrado no relatório de importação.

**RN-011 — Compatibilidade de backup**
Todo arquivo de backup carrega versão de schema. Importar backup de versão anterior aciona migração; versão superior à do portal é recusada com aviso, sem apagar os dados atuais.

**RN-012 — Conteúdo externo é dado**
Texto vindo de API é sempre inserido como texto, nunca como HTML executável. Nenhum conteúdo remoto altera comportamento do portal.

---

## 8. Requisitos funcionais

Prioridade em MoSCoW: **M** obrigatório no MVP · **S** importante · **C** desejável · **W** não agora.

### E1 — Trilhas e progresso

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-001 | Listar as trilhas disponíveis com nome, descrição, progresso e horas | M | Home mostra as 5 trilhas com progresso correto |
| RF-002 | Exibir o dashboard da trilha: horas, progresso, fases, plano × realizado, previsão de conclusão | M | Números conferem com RN-003 e RN-004 |
| RF-003 | Exibir módulo na anatomia fixa: aula → conteúdo → extras → materiais → prática → navegação | M | Ordem idêntica em todos os módulos |
| RF-004 | Marcar e desmarcar item como concluído, com recálculo imediato do progresso | M | Progresso recalcula e persiste após recarregar |
| RF-005 | Configurar o ritmo semanal e recalcular a previsão | M | Trocar 12 h → 20 h reduz a previsão |
| RF-006 | Adicionar, editar e remover conteúdo extra vinculado a um módulo | S | Extra aparece no módulo e entra no cálculo |
| RF-007 | Reproduzir vídeo e playlist do YouTube dentro do portal, com clique para iniciar | S | Player abre sem sair da página |
| RF-008 | Abrir material externo em visualizador interno, com aviso e alternativa quando o site bloquear incorporação | S | Kaggle/freeCodeCamp mostram aviso e botão de nova aba |

### E2 — Prática corrigida

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-009 | Editar e executar código Python no navegador, com saída e erro visíveis | M | Código válido executa; erro mostra a mensagem real |
| RF-010 | Corrigir exercício de Python automaticamente e registrar aprovação | M | Gabarito aprova; código inicial reprova |
| RF-011 | Editar e executar consulta SQL sobre base de exemplo, com resultado em tabela | S | Consulta retorna linhas corretas |
| RF-012 | Corrigir exercício de SQL comparando o resultado com o esperado | S | Resultado equivalente aprova, ordem diferente não reprova indevidamente |
| RF-013 | Responder quiz de cenário com correção e explicação da resposta | M | Alternativa errada explica por que está errada |
| RF-014 | Responder reflexão guiada, salva e recuperável | M | Texto persiste e pode ser editado depois |
| RF-015 | Restaurar o código inicial do exercício e consultar o gabarito | S | Restaurar devolve o starter sem apagar a resposta salva sem aviso |

### E3 — Biblioteca

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-016 | Buscar livro por título, autor ou assunto nas fontes aprovadas | S | Busca por autor retorna obras daquele autor |
| RF-017 | Filtrar por idioma e por "disponível para baixar" | S | Filtro reduz a lista corretamente |
| RF-018 | Exibir ficha do livro: capa, título, autor, ano, editora, idioma, assunto, descrição, licença e fonte | S | Todos os campos disponíveis são exibidos; ausentes ficam ocultos, não vazios |
| RF-019 | Informar quais fontes responderam e quais falharam na busca | S | Derrubar uma fonte mantém a busca e mostra o aviso |
| RF-020 | Adicionar livro à estante pessoal com estado de leitura | S | Estante persiste entre sessões |
| RF-021 | Vincular livro a um módulo de trilha | C | Livro aparece nos materiais do módulo |
| RF-022 | Baixar livro de domínio público pelo link oficial da fonte | S | Download inicia na origem, sem intermediário |

### E4 — Leitura ativa

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-023 | Abrir arquivo PDF da máquina, com paginação, zoom e busca no texto | S | PDF de 300 páginas navega sem travar |
| RF-024 | Abrir arquivo .docx da máquina, preservando títulos, listas e tabelas | S | Documento com tabela mantém a estrutura |
| RF-025 | Avisar de forma clara quando o PDF não tiver texto extraível | S | PDF escaneado mostra aviso e desabilita resumo |
| RF-026 | Guardar o arquivo e o texto extraído no IndexedDB para reabrir sem escolher de novo | S | Reabrir o livro não pede o arquivo outra vez |
| RF-027 | Destacar trecho em 4 cores e anotar sobre o destaque | S | Destaque volta na mesma posição após recarregar |
| RF-028 | Registrar posição de leitura, percentual lido e tempo de leitura | S | Reabrir volta na última página |

### E5 — Compreensão

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-029 | Detectar a estrutura do documento (capítulos e seções) | S | Documento com títulos gera índice correto |
| RF-030 | Gerar resumo extrativo por seção em três tamanhos | S | Toda frase do resumo existe no original (RN-008) |
| RF-031 | Gerar glossário de termos recorrentes com o trecho de origem | C | Termo listado tem link para onde aparece |
| RF-032 | Gerar mapa mental automático em SVG, com expandir, recolher e arrastar | S | Mapa abre e é navegável em documento com e sem títulos |
| RF-033 | Editar nós do mapa mental e adicionar nós próprios | C | Edição persiste |
| RF-034 | Exportar mapa mental em PNG e Markdown | C | Arquivo exportado abre corretamente |
| RF-035 | Preencher ficha de leitura guiada: o que aprendi, onde aplico, o que não entendi | S | Ficha persiste por livro |
| RF-036 | Aplicar as funções de compreensão também a texto colado e a material de trilha | C | Texto colado gera resumo e mapa |

### E6 — Fixação

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-037 | Criar flashcard manualmente | S | Card criado entra na fila |
| RF-038 | Gerar flashcard a partir de destaque, em frente/verso ou lacuna | S | Destaque vira card editável antes de salvar |
| RF-039 | Agendar revisão pelo SM-2 e apresentar a fila do dia | S | Simulação de 30 dias segue os intervalos de RN-009 |
| RF-040 | Registrar nota com marcação de tempo em vídeo do YouTube | C | Clicar na nota volta o vídeo no segundo correto |
| RF-041 | Exibir painel único de revisão do dia com trilha, leitura e vídeo | S | Painel soma as três origens |
| RF-042 | Mostrar histórico de acertos e evolução por card | C | Histórico coerente com as respostas dadas |

### E7 — Gerador de trilhas

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-043 | Gerar proposta de trilha a partir de um tema, com prévia antes de criar | C | Prévia mostra módulos, horas e materiais |
| RF-044 | Usar base curada quando o tema for conhecido e busca online quando não for | C | Tema curado traz fontes de referência |
| RF-045 | Cair para modo offline com aviso quando a busca falhar | C | Sem rede, gera grade genérica avisando |
| RF-046 | Aprovar a prévia e criar a trilha personalizada navegável | C | Trilha criada aparece na home |
| RF-047 | Sugerir trilhas com base no perfil e nos objetivos declarados | C | Sugestão muda ao mudar o objetivo |

### E8 — Dados e configuração

| # | Requisito | Prioridade | Validação |
|---|---|---|---|
| RF-048 | Persistir progresso e configuração automaticamente, com indicação de "salvo" | M | Fechar e reabrir mantém tudo |
| RF-049 | Exportar backup completo em arquivo único | S | Arquivo contém progresso, estante, destaques e cards |
| RF-050 | Importar backup, com migração de versão e relatório do que foi importado | S | Importar em navegador limpo restaura o estado |
| RF-051 | Apagar todos os dados locais, com dupla confirmação | C | Confirmação dupla antes de apagar |
| RF-052 | Escolher tema claro ou escuro | C | Preferência persiste |

---

## 9. Requisitos não funcionais

| # | Categoria | Requisito mensurável |
|---|---|---|
| RNF-001 | Desempenho | Primeira renderização útil em até 3 s em conexão de 10 Mbps, sem contar bibliotecas sob demanda |
| RNF-002 | Desempenho | Pyodide, sql.js, PDF.js e mammoth.js carregam apenas quando usados, com indicador de progresso a partir de 1 s |
| RNF-003 | Desempenho | Navegação entre views em até 200 ms após o carregamento inicial |
| RNF-004 | Desempenho | Abrir PDF de 20 MB e 300 páginas sem travar a aba por mais de 2 s por página |
| RNF-005 | Disponibilidade offline | Aula nativa, progresso, flashcards e livro já importado funcionam sem internet |
| RNF-006 | Resiliência | Toda chamada externa tem tempo limite de 9 s e tratamento de erro individual; falha nunca deixa tela em branco |
| RNF-007 | Privacidade | Nenhum dado do usuário — progresso, notas, arquivos, texto extraído — é enviado a qualquer servidor. Sem analytics, sem rastreador, sem cookie de terceiro |
| RNF-008 | Privacidade / LGPD | O portal não coleta dado pessoal de terceiros. O único titular é o próprio dono, e os dados ficam sob controle dele |
| RNF-009 | Segurança | Conteúdo remoto nunca é inserido como HTML executável; sem `eval` sobre dado externo; execução de código do usuário restrita ao sandbox do Pyodide/sql.js |
| RNF-010 | Segurança | Nenhuma chave, token ou segredo no código. Repositório público auditável |
| RNF-011 | Acessibilidade | Navegação completa por teclado com foco visível; contraste mínimo 4,5:1 em texto normal; rótulos em todos os controles |
| RNF-012 | Compatibilidade | Chrome, Edge e Firefox atuais, em Windows e Android |
| RNF-013 | Responsividade | Uso confortável em 1920, 1366, 900, 640 e 400 px de largura |
| RNF-014 | Usabilidade | Chegar de qualquer tela ao módulo em estudo em no máximo 3 cliques |
| RNF-015 | Manutenibilidade | Sem build e sem dependência instalada; cada arquivo JS abre e é editável isoladamente; bibliotecas externas com versão fixada |
| RNF-016 | Portabilidade | Backup completo em arquivo único, legível e reimportável |
| RNF-017 | Retenção | Dados permanecem enquanto o navegador mantiver o armazenamento; o portal alerta quando a cota estiver perto do limite |
| RNF-018 | Recuperação | Falha ao gravar exibe aviso explícito; o portal nunca perde dado silenciosamente |
| RNF-019 | Publicação | Do commit ao ar em até 5 minutos, sem intervenção manual |
| RNF-020 | Conteúdo | Interface e conteúdo em português do Brasil; ícones exclusivamente SVG inline; emoji proibido na interface |

---

## 10. Critérios de aceitação

```gherkin
Cenário: Progresso do módulo reflete a conclusão dos itens
  Dado um módulo com 4 itens, 2 exercícios e nenhum extra
  Quando eu concluir 3 itens e for aprovado em 1 exercício
  Então o progresso do módulo deverá ser 66,7%
  E o valor deverá permanecer após recarregar a página
```

```gherkin
Cenário: Exercício técnico só conclui com aprovação automática
  Dado um exercício de Python com teste automático
  Quando eu executar o código inicial fornecido
  Então o exercício deverá ser reprovado com a mensagem do teste
  E não poderá ser marcado como concluído manualmente
  Quando eu executar o código do gabarito
  Então o exercício deverá ser aprovado e marcado como concluído
```

```gherkin
Cenário: Busca de livros continua funcionando com uma fonte fora do ar
  Dado que 4 fontes de livros estão configuradas
  E que 1 delas não responde dentro de 9 segundos
  Quando eu pesquisar por "Kahneman"
  Então o portal deverá exibir os resultados das 3 fontes que responderam
  E deverá informar qual fonte não respondeu
  E não deverá exibir tela de erro
```

```gherkin
Cenário: Arquivo do usuário não sai da máquina
  Dado que eu abri um PDF do meu computador no portal
  Quando eu inspecionar as requisições de rede da página
  Então nenhuma requisição deverá conter o conteúdo do arquivo
  E o arquivo deverá estar armazenado apenas no IndexedDB
```

```gherkin
Cenário: Resumo automático é fiel ao texto de origem
  Dado um documento com texto extraível
  Quando eu gerar o resumo estruturado
  Então toda frase do resumo deverá existir literalmente no documento
  E a interface deverá identificar o resumo como automático e extrativo
  E deverá permitir edição manual do resultado
```

```gherkin
Cenário: PDF escaneado é tratado com aviso, não com erro
  Dado um PDF sem camada de texto
  Quando eu abri-lo no portal
  Então o portal deverá exibi-lo para leitura
  E deverá avisar que não há texto extraível
  E deverá desabilitar resumo, glossário e mapa mental explicando o motivo
```

```gherkin
Cenário: Revisão espaçada respeita os intervalos definidos
  Dado um flashcard novo respondido corretamente hoje
  Então a próxima revisão deverá ser agendada para 1 dia depois
  Quando eu acertá-lo novamente na revisão seguinte
  Então a próxima revisão deverá ser agendada para 6 dias depois
  Quando eu errá-lo em qualquer revisão
  Então a próxima revisão deverá voltar para 1 dia
  E o fator de facilidade deverá ser reduzido em 0,2, respeitando o mínimo de 1,3
```

```gherkin
Cenário: Backup restaura o estado completo
  Dado que eu tenho progresso, estante, destaques e flashcards salvos
  Quando eu exportar o backup
  E limpar todos os dados do navegador
  E importar o arquivo exportado
  Então todos os itens deverão voltar exatamente como estavam
  E o portal deverá exibir o relatório do que foi importado
```

```gherkin
Cenário: Falta de internet degrada com aviso, não quebra
  Dado que eu estou sem conexão
  Quando eu abrir uma aula nativa já publicada
  Então o conteúdo deverá ser exibido normalmente
  Quando eu tentar buscar um livro
  Então o portal deverá avisar que a busca precisa de conexão
  E deverá manter a estante e as leituras já importadas acessíveis
```

---

## 11. MVP e plano de releases

### Release 1 — MVP: "estudar e praticar de verdade" (Etapas 3 a 7)

**Hipótese.** Aula nativa somada a prática corrigida é suficiente para eu estudar de forma constante, sem precisar de nada além do portal.

| Item | Conteúdo |
|---|---|
| Inclui | Design system, casca, roteador, persistência, todas as views de trilha, conteúdo v1 das 5 trilhas, exercícios Python/SQL/quiz/reflexão, progresso e ritmo |
| Não inclui | Biblioteca, leitor, resumo, mapa mental, flashcards, gerador, backup |
| Critério de sucesso | 4 semanas seguidas usando o portal como fonte principal de estudo, com a meta de horas cumprida em pelo menos 3 delas |
| Critério de parada | Se em 4 semanas eu não usar o portal, o problema não é falta de recurso — é o formato. Revisar antes de construir o Release 2 |

### Release 2 — "ler e fixar" (Etapas 8 a 11)

| Item | Conteúdo |
|---|---|
| Inclui | Biblioteca, leitor de PDF/Word, destaques, resumo estruturado, glossário, mapa mental, flashcards, SM-2, notas de vídeo |
| Critério de sucesso | 1 livro lido no portal com ficha, mapa mental e ao menos 20 flashcards ativos; fila de revisão zerada em 5 dias por semana |
| Risco a validar cedo | CORS das fontes e comportamento do PDF.js. **Recomendação: fazer o teste de CORS já na Etapa 2**, não na 8, para não descobrir tarde que a biblioteca é inviável nesta rede |

### Release 3 — "expandir e sustentar" (Etapas 12 a 16)

| Item | Conteúdo |
|---|---|
| Inclui | Gerador e recomendador de trilhas, backup/portabilidade, acessibilidade, desempenho, validação geral, publicação e README |
| Critério de sucesso | Portal no ar, backup restaurando sem perda, uso confortável no celular |

### Itens adiados conscientemente

| Item | Por quê | Volta quando |
|---|---|---|
| IA generativa para resumo e explicação | Exige chave ou backend; repositório é público | O dono decidir usar chave própria guardada só no navegador |
| OCR de PDF escaneado | Peso alto no navegador para ganho pontual | Se PDFs sem texto virarem parte relevante do acervo |
| Sincronização entre dispositivos | Exige backend | Nunca, dentro das restrições atuais |
| Busca automática de vídeos no gerador | YouTube Data API exige chave | Junto da decisão sobre chave própria |

---

## 12. Métricas

### Métricas de resultado (o produto está funcionando?)

| Métrica | Como medir | Frequência | Meta |
|---|---|---|---|
| Aderência ao ritmo | Horas realizadas ÷ meta semanal | Semanal | ≥ 80% em 40 semanas/ano |
| Constância | Semanas seguidas com ao menos 1 módulo tocado | Semanal | ≥ 12 semanas seguidas |
| Módulos concluídos | Contagem por trilha | Mensal | ≥ 2 por mês |
| Fila de revisão zerada | Dias com fila do dia concluída ÷ dias do mês | Mensal | ≥ 70% |
| Retenção nos flashcards | Acertos ÷ revisões nos últimos 30 dias | Mensal | ≥ 80% |
| Livros com ficha completa | Livros com ficha, mapa mental e cards | Mensal | ≥ 1 por mês |
| Exercícios aprovados na primeira tentativa | Aprovações de primeira ÷ total | Mensal | Entre 40% e 70% — abaixo indica conteúdo difícil demais, acima indica exercício fácil demais |

### Métricas técnicas

| Métrica | Como medir | Meta |
|---|---|---|
| Tempo até primeira renderização | Lighthouse local | < 3 s |
| Fontes de livros ativas | Teste de CORS em `docs/FONTES.md` | ≥ 4 |
| Falha de gravação | Contador de erro de persistência | 0 |
| Tamanho ocupado no IndexedDB | API de cota do navegador | Alerta em 80% da cota |
| Tempo do commit ao ar | Relógio do GitHub Pages | < 5 min |

**Métricas propositalmente descartadas:** número de trilhas criadas, quantidade de livros na estante e horas totais acumuladas — medem acúmulo, não aprendizado.

---

## 13. Riscos e dependências

| # | Risco | Prob. | Impacto | Criticidade | Mitigação |
|---|---|---|---|---|---|
| R-01 | Escopo grande demais leva ao abandono antes do fim | Alta | Alto | **Crítica** | Release 1 usável sozinho; regra de uma etapa por vez; critério de parada declarado |
| R-02 | Fontes de livros bloqueiam CORS ou a rede corporativa as bloqueia | Média | Alto | **Alta** | Testar antes de construir (antecipar para a Etapa 2); mínimo de 4 fontes aprovadas |
| R-03 | Expectativa de resumo por IA não atendida pelo resumo extrativo | Alta | Médio | **Alta** | Limite declarado no produto e visível na interface; alternativa registrada no backlog |
| R-04 | PDF grande trava o navegador | Média | Médio | Média | Carregamento por página; aviso acima de 20 MB; teste obrigatório na Etapa 9 |
| R-05 | Estouro da cota do IndexedDB | Média | Alto | **Alta** | Monitorar cota, alertar em 80%, permitir remover livro mantendo destaques e cards |
| R-06 | Perda de dados por limpeza do navegador | Média | Alto | **Alta** | Backup exportável; lembrete mensal de backup no portal |
| R-07 | Conteúdo das 67 aulas nativas é volume grande de escrita | Alta | Médio | **Alta** | Publicar trilha por trilha; aula segue gabarito fixo; incompleto no ar é aceitável (P-03) |
| R-08 | Pyodide pesado no primeiro uso desestimula a prática | Média | Médio | Média | Carregar sob demanda com aviso do tamanho; pré-carregar quando o módulo abrir |
| R-09 | Estimativas de horas irreais distorcem a previsão | Média | Baixo | Baixa | Ajustar as horas do módulo após os primeiros meses de uso real |
| R-10 | Repositório público exposto a commit indevido de acervo | Baixa | Alto | Média | `.gitignore` bloqueando acervo, verificado a cada etapa |

**Dependências externas:** GitHub Pages, CDN jsDelivr/cdnjs, APIs de livros, YouTube para vídeos incorporados. Todas fora do controle do dono; nenhuma pode derrubar o núcleo do portal (RNF-005).

---

## 14. Rastreabilidade

| Objetivo | Regra | Requisitos | Critério de aceite | Métrica |
|---|---|---|---|---|
| O-01 Estudar continuamente | RN-003, RN-004 | RF-001 a RF-005 | Progresso do módulo | Aderência ao ritmo, Constância |
| O-02 Virar cientista de dados | RN-002 | RF-009 a RF-015 | Exercício técnico | Módulos concluídos, Aprovação de primeira |
| O-03 Fixar o que estuda | RN-009 | RF-037 a RF-042 | Revisão espaçada | Fila zerada, Retenção |
| O-04 Ler mais e melhor | RN-005, RN-006, RN-007, RN-008 | RF-016 a RF-036 | Busca com fonte fora, Arquivo local, Resumo fiel, PDF escaneado | Livros com ficha, Fontes ativas |
| O-05 Liderança e gestão | RN-001 | RF-013, RF-014 | Progresso do módulo | Módulos concluídos |
| O-06 Autonomia de manutenção | RN-011, RN-012 | RF-048 a RF-052 | Backup, Sem internet | Tempo do commit ao ar, Falha de gravação |

---

## 15. Questões em aberto

| # | Questão | Situação |
|---|---|---|
| Q-01 | Antecipar o teste de CORS das fontes de livros para a Etapa 2? | **Resolvida (10/09/2026).** Antecipado e executado. 4 fontes aprovadas, 4 reprovadas, 1 pendente de reteste. Resultado em `FONTES.md`; consequências para o schema em `ARQUITETURA.md` §3.7 |
| Q-02 | Tema claro, escuro ou os dois? | **Resolvida (10/09/2026).** Os dois, com opção automática pelo sistema. Tokens duplicados na Etapa 3 |
| Q-03 | Qual trilha ganha conteúdo primeiro na Etapa 6? | **Resolvida (10/09/2026).** Sem ordem fixa: o dono escolhe a trilha e o portal recebe o conteúdo sob demanda. A Etapa 6 entrega o **motor de conteúdo + a primeira trilha escolhida**; as demais entram em incrementos posteriores |
| Q-04 | Base de exemplo para os exercícios de SQL: vendas, RH ou dados imobiliários? | Aberta. Necessária antes da Etapa 7 |
| Q-05 | As horas por módulo do capítulo 6 fazem sentido para o seu ritmo real? | Aberta. Revisar após 4 semanas de uso real |

---

## 16. Recomendação do Product Owner

1. **Aprovar o Release 1 como MVP** e resistir à tentação de puxar biblioteca ou flashcards para dentro dele. O risco número um deste projeto não é técnico, é abandono por escopo.
2. **Antecipar o teste de CORS (Q-01) para a Etapa 2.** É barato — algumas chamadas de rede — e evita construir toda a arquitetura da biblioteca sobre uma fonte que não responde ao navegador.
3. **Tratar o limite do resumo extrativo como decisão de produto, não como defeito.** Declarar na interface protege a confiança no portal.
4. **Revisar as horas dos módulos (Q-05) após 4 semanas de uso real.** Estimativa de estudo só fica boa com dado próprio.

**Próximo incremento recomendado:** Etapa 2 — Arquitetura e contratos de dados, incluindo o teste de CORS antecipado.
