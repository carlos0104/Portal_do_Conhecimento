# CONTEÚDO — padrão editorial das aulas

Regra de escrita das 67 aulas nativas. Vale para toda trilha, presente e futura.

---

## 1. Para quem escrevemos

Um líder de dados: sabe Power BI, Excel, SQL e ERP; está indo para ciência de dados e para a gestão de um time. Não é iniciante em tecnologia e não é acadêmico. Lê no computador, entre uma demanda e outra.

Consequências práticas:
- **Não explicar o óbvio para ele** (o que é uma tabela, o que é um filtro).
- **Explicar o que ele nunca precisou** (por que a distribuição importa, o que muda quando o dado vira produto).
- Todo exemplo aterrissa em **dado, painel, time ou diretoria** — o mundo dele.

---

## 2. Estrutura obrigatória

Contrato técnico em `ARQUITETURA.md` §3.4. Editorialmente:

| Campo | O que é | Tamanho |
|---|---|---|
| `objetivo` | O que a pessoa **saberá fazer** ao terminar. Verbo de ação, nunca "entender" | 1 frase |
| `blocos` | A aula. Alterna texto, subtítulo, lista, destaque, aviso, código, tabela | 6 a 14 blocos |
| `exemplo` | Situação real do dia a dia dele, com o erro e a correção | 2 a 3 blocos |
| `resumo` | O que sobra na cabeça daqui a um mês | 2 a 4 frases |
| `aplicar` | Ações que cabem em uma semana | 2 a 4 itens |

---

## 3. Como escrever

**Sim**
- Frase curta. Ponto final em vez de vírgula quando der.
- Voz ativa: "a média esconde a cauda", não "a cauda é escondida pela média".
- Números concretos em vez de adjetivos: "acima de 20%", não "muito maior".
- Dizer o que **não** fazer e por quê — erro comum vale mais que teoria.
- Admitir limite: "isso não resolve quando…".

**Não**
- Nada de "é importante ressaltar", "vale destacar", "no mundo de hoje".
- Nada de encher com definição de dicionário.
- Nada de promessa ("você vai dominar", "isso vai transformar sua carreira").
- Nada de emoji, em nenhuma circunstância.
- Nada de trecho longo copiado de terceiro: bloco `citacao`, curto, com `fonte`.

**Bloco `destaque`** carrega a única frase que a pessoa precisa lembrar. Um por aula, no máximo dois.
**Bloco `aviso`** carrega o erro comum. Escrever como armadilha, não como regra.

---

## 4. Itens do módulo

Cada módulo tem de 2 a 5 itens, misturando:

| Tipo | Uso |
|---|---|
| `playlist` / `video` | Fonte gratuita e reconhecida, com `embed` do YouTube |
| `leitura` / `externo` | Documentação oficial, artigo de referência, curso aberto |
| `pratica` | Exercício sem link: fazer com dado do próprio trabalho |
| `entregavel` | Algo que fica pronto: um painel, um texto, um script, uma conversa |

Regras:
- **Nada de link pago** sem alternativa gratuita ao lado.
- **Nada de dado da empresa** em entregável publicável.
- Toda trilha não técnica tem pelo menos um `entregavel` por fase — liderança se pratica com gente, não com leitura.

---

## 5. Exercícios

| Trilha | Tipo | Quantidade |
|---|---|---|
| Dados | `python` | 1 a 2 por módulo técnico |
| Engenharia | `sql` e `python` | 1 a 2 por módulo técnico |
| Gestão, Liderança | `quiz` de cenário | 1 por módulo |
| Desenvolvimento pessoal | `reflexao` | 1 por módulo |

**Exercício de Python:** o `starter` tem que reprovar no `teste` e o `gabarito` tem que passar — verificado por script na validação.
**Quiz de cenário:** toda alternativa traz `explicacao`, inclusive as erradas. Alternativa errada plausível vale mais que alternativa errada boba.
**Reflexão:** perguntas que só podem ser respondidas olhando para a própria rotina.

---

## 6. Sobre acentuação

O conteúdo é escrito **sem acentos nos arquivos `.js`** para evitar qualquer problema de codificação entre Windows, git e GitHub Pages. A leitura no portal continua natural em português. Documentação em Markdown mantém acentuação normal.

---

## 7. Critério de aprovação de uma aula

1. Um leitor que já trabalha com dados aprende algo que ainda não sabia.
2. O exemplo poderia ter acontecido de verdade na semana passada.
3. O "como aplicar amanhã" cabe em uma semana e não depende de ninguém autorizar.
4. Nenhuma frase poderia ser apagada sem perda.
