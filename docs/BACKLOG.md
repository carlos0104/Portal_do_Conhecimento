# BACKLOG — itens fora do escopo das etapas

Registro do que apareceu durante o trabalho e **não** foi feito, conforme a regra 4 do `CLAUDE.md`.
Nada aqui é compromisso: é memória. Cada item vira etapa só por decisão do dono.

---

## Aberto

| # | Item | Origem | Por que ficou de fora | Quando faria sentido |
|---|---|---|---|---|
| B-01 | **Vídeos nas trilhas não técnicas** | Etapa 6 | Só a trilha de Dados tem player embutido (10 playlists). Nas trilhas de Gestão, Liderança e Desenvolvimento eu não incluí `embed` porque não consigo verificar o id de uma playlist do YouTube sem acesso de rede a ela — e link de vídeo errado é pior que link ausente | Quando o dono indicar canais e playlists que ele já acompanha, ou puder validar os ids |
| B-02 | **Resumo e explicação por IA** | Etapa 1 | Site estático sem backend não roda modelo. Exigiria chave própria do dono guardada no navegador | Se o dono decidir usar chave da API Claude, com o custo por uso assumido |
| B-03 | **YouTube Data API no gerador** | Etapa 1 | Exige chave; a restrição de "nenhuma chave no código" vale | Junto com B-02, se houver decisão sobre chave |
| B-04 | **Gutendex como quinta fonte de livros** | Etapa 2 | Deu tempo limite na rede corporativa; indeterminado se é bloqueio local ou o serviço | Reteste na rede doméstica, antes da Etapa 8 (comando em `FONTES.md` §4) |
| B-05 | **OAPEN, DOAB, Standard Ebooks, Domínio Público** | Etapa 2 | Reprovados no teste de CORS ou sem API pública | Se publicarem API com CORS aberto |
| B-06 | **OCR de PDF escaneado** | Etapa 1 | Peso alto no navegador para ganho pontual | Se PDFs sem texto virarem parte relevante do acervo |
| B-07 | **Sincronização entre dispositivos** | Etapa 1 | Exige backend | Fora das restrições atuais |
| B-08 | **PWA com service worker** | Etapa 1 | Complexidade de cache e invalidação antes da v1 estar estável | Depois da Etapa 16, se o uso no celular pedir offline completo |
| B-09 | **Revisar as horas dos módulos com dado real** | Etapa 1 (Q-05) | As 1.418 h são estimativa; só o uso dirá | Após 4 semanas de uso real do portal |
| B-10 | **Exercícios de SQL rodando de verdade** | Etapa 6 | Os 15 exercícios de SQL estão escritos com `esperado` definido, mas o motor (sql.js) e a base de exemplo só existem na Etapa 7 | Etapa 7 |
| B-11 | **Links que recusam automação** | Etapa 6 | `exercism.org`, `leetcode.com` e `manager-tools.com` devolvem 403 para verificador automático. Provavelmente abrem normalmente no navegador, mas **não foi possível confirmar** — o navegador de teste bloqueia navegação externa | Conferir manualmente ao usar os módulos que os citam |

---

## Resolvido

| # | Item | Como terminou |
|---|---|---|
| R-01 | Teste de CORS das fontes de livros | Antecipado para a Etapa 2. 4 fontes aprovadas, resultado em `FONTES.md` |
| R-02 | Tema claro ou escuro | Os dois, mais opção automática. Etapa 3 |
| R-03 | Base de exemplo do SQL (Q-04 / QT-01) | **vendas** (clientes, produtos, pedidos, itens). Decidido na Etapa 6, documentado no cabeçalho de `js/trilhas/engenharia.js` |
| R-04 | Ordem das trilhas | Sem ordem fixa; as cinco foram escritas na Etapa 6 a pedido do dono |
