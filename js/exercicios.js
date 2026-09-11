/* exercicios.js — motor de pratica.

   Quatro tipos, contratos em docs/ARQUITETURA.md §3.6:
     python   -> Pyodide, harness com asserts do proprio exercicio
     sql      -> sql.js sobre uma base de exemplo, comparando o resultado
     quiz     -> alternativa correta com explicacao em todas
     reflexao -> resposta escrita, com minimo de caracteres

   Regra RN-002: python e sql so concluem por aprovacao automatica. */

(function () {
  "use strict";

  var PDC = window.PDC;
  var ui = PDC.ui;
  var el = ui.el;

  var PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
  var SQLJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/sql-wasm.js";
  var SQLJS_WASM = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/";
  var LIMITE_SEGUNDOS = 5;

  /* ------------------------------------------------------- bases de exemplo */

  /* Base "vendas": pequena de proposito, para o resultado esperado de cada
     exercicio caber na tela e poder ser conferido a olho. */
  var BASES = {
    vendas: [
      "CREATE TABLE clientes (id INTEGER PRIMARY KEY, nome TEXT, uf TEXT);",
      "INSERT INTO clientes VALUES (1,'ACME Ltda','GO'),(2,'Beta Comercio','SP'),",
      "  (3,'Gama Industria','MG'),(4,'Delta Servicos','GO');",
      "CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT);",
      "INSERT INTO produtos VALUES (1,'Terreno 250m'),(2,'Terreno 360m'),",
      "  (3,'Consultoria'),(4,'Servico avulso');",
      "CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER,",
      "  data TEXT, valor INTEGER, status TEXT);",
      "INSERT INTO pedidos VALUES (101,1,'2026-01-15',5600,'faturado'),",
      "  (102,2,'2026-02-03',4100,'faturado'),(103,3,'2026-02-20',3100,'faturado'),",
      "  (104,1,'2026-03-11',4200,'faturado'),(105,2,'2026-01-28',3100,'cancelado'),",
      "  (106,2,'2026-03-20',3100,'faturado');",
      "CREATE TABLE itens (id INTEGER PRIMARY KEY, pedido_id INTEGER,",
      "  produto_id INTEGER, quantidade INTEGER, valor INTEGER);",
      "INSERT INTO itens VALUES (1,101,1,1,5600),(2,104,1,1,4200),",
      "  (3,102,2,1,4100),(4,106,2,1,3100),(5,103,3,1,3100);"
    ].join("\n")
  };

  var DESCRICAO_BASE = {
    vendas: [
      "clientes (id, nome, uf)",
      "produtos (id, nome)",
      "pedidos (id, cliente_id, data, valor, status)",
      "itens (id, pedido_id, produto_id, quantidade, valor)"
    ]
  };

  /* ------------------------------------------------------------ Python */

  /* O harness roda o codigo do usuario e, na sequencia, o bloco de teste.
     A funcao de rastreio interrompe laco infinito, que de outro modo
     congelaria a aba inteira: Pyodide roda na thread principal. */
  var HARNESS = [
    "import io, sys, json, time, traceback",
    "",
    "def _pdc_executar(codigo_usuario, codigo_teste, limite):",
    "    saida = io.StringIO()",
    "    escopo = {'__name__': '__main__'}",
    "    antigo_stdout = sys.stdout",
    "    fim = time.time() + limite",
    "    def _vigia(frame, evento, arg):",
    "        if time.time() > fim:",
    "            raise TimeoutError('a execucao passou de %d segundos e foi interrompida' % limite)",
    "        return _vigia",
    "    ok = False",
    "    erro = ''",
    "    sys.stdout = saida",
    "    try:",
    "        sys.settrace(_vigia)",
    "        exec(codigo_usuario, escopo)",
    "        exec(codigo_teste, escopo)",
    "        ok = True",
    "    except AssertionError as e:",
    "        erro = 'Teste nao passou: ' + (str(e) or 'a condicao verificada nao foi atendida')",
    "    except TimeoutError as e:",
    "        erro = str(e)",
    "    except SyntaxError as e:",
    "        erro = 'Erro de sintaxe na linha %s: %s' % (e.lineno, e.msg)",
    "    except Exception as e:",
    "        linhas = traceback.format_exception_only(type(e), e)",
    "        erro = ''.join(linhas).strip()",
    "    finally:",
    "        sys.settrace(None)",
    "        sys.stdout = antigo_stdout",
    "    return json.dumps({'ok': ok, 'saida': saida.getvalue(), 'erro': erro})"
  ].join("\n");

  var pyodide = null;
  var carregandoPython = null;

  function prepararPython(aoAvisar) {
    if (pyodide) { return Promise.resolve(pyodide); }
    if (carregandoPython) { return carregandoPython; }

    if (aoAvisar) { aoAvisar("Carregando o Python (cerca de 10 MB, so na primeira vez)"); }

    carregandoPython = PDC.util.carregarScript(PYODIDE_URL, "loadPyodide", 120000)
      .then(function () {
        return window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
      })
      .then(function (py) {
        py.runPython(HARNESS);
        pyodide = py;
        return py;
      })
      .catch(function (erro) {
        carregandoPython = null;
        throw erro;
      });

    return carregandoPython;
  }

  function rodarPython(codigoUsuario, codigoTeste, aoAvisar) {
    return prepararPython(aoAvisar).then(function (py) {
      var fn = py.globals.get("_pdc_executar");
      try {
        var bruto = fn(codigoUsuario, codigoTeste || "", LIMITE_SEGUNDOS);
        return JSON.parse(bruto);
      } finally {
        if (fn && fn.destroy) { fn.destroy(); }
      }
    });
  }

  /* --------------------------------------------------------------- SQL */

  var SQL = null;
  var carregandoSql = null;

  function prepararSql(aoAvisar) {
    if (SQL) { return Promise.resolve(SQL); }
    if (carregandoSql) { return carregandoSql; }

    if (aoAvisar) { aoAvisar("Carregando o motor de SQL"); }

    carregandoSql = PDC.util.carregarScript(SQLJS_URL, "initSqlJs", 60000)
      .then(function () {
        return window.initSqlJs({ locateFile: function (arquivo) { return SQLJS_WASM + arquivo; } });
      })
      .then(function (sql) { SQL = sql; return sql; })
      .catch(function (erro) { carregandoSql = null; throw erro; });

    return carregandoSql;
  }

  function rodarSql(nomeBase, consulta, aoAvisar) {
    return prepararSql(aoAvisar).then(function (sql) {
      var script = BASES[nomeBase];
      if (!script) { throw new Error("Base de exemplo desconhecida: " + nomeBase); }

      var bd = new sql.Database();
      try {
        bd.run(script);
        var resultado = bd.exec(consulta);
        if (!resultado.length) { return { colunas: [], linhas: [] }; }
        return { colunas: resultado[0].columns, linhas: resultado[0].values };
      } finally {
        bd.close();
      }
    });
  }

  /* Compara resultado obtido com o esperado. Numero e texto sao comparados
     pelo texto normalizado, para que 4200 e 4200.0 nao divirjam. */
  function normalizar(valor) {
    if (valor === null || valor === undefined) { return ""; }
    if (typeof valor === "number") {
      return Number.isInteger(valor) ? String(valor) : String(Math.round(valor * 1e6) / 1e6);
    }
    return String(valor).trim();
  }

  function compararResultado(obtido, esperado, ordemImporta) {
    var linhasObtidas = obtido.linhas.map(function (l) { return l.map(normalizar); });
    var linhasEsperadas = esperado.linhas.map(function (l) { return l.map(normalizar); });

    if (linhasObtidas.length !== linhasEsperadas.length) {
      return { ok: false, motivo: "o resultado tem " + linhasObtidas.length +
        " linha(s) e o esperado tem " + linhasEsperadas.length };
    }
    if (obtido.colunas.length !== esperado.colunas.length) {
      return { ok: false, motivo: "o resultado tem " + obtido.colunas.length +
        " coluna(s) e o esperado tem " + esperado.colunas.length };
    }

    var a = linhasObtidas.map(function (l) { return l.join(""); });
    var b = linhasEsperadas.map(function (l) { return l.join(""); });
    if (!ordemImporta) { a = a.slice().sort(); b = b.slice().sort(); }

    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return { ok: false, motivo: "a linha " + (i + 1) + " nao confere: obtido [" +
          a[i].split("").join(", ") + "], esperado [" + b[i].split("").join(", ") + "]" };
      }
    }
    return { ok: true };
  }

  /* -------------------------------------------------------- persistencia */

  function lerResposta(id) {
    return PDC.estado.dados.respostas[id] || null;
  }

  function gravarResposta(id, dados) {
    PDC.estado.dados.respostas[id] = Object.assign(
      { em: PDC.util.agoraISO() }, lerResposta(id) || {}, dados, { em: PDC.util.agoraISO() }
    );
    PDC.estado.gravarJa();
  }

  function aprovar(id, aoMudar) {
    if (!PDC.estado.estaFeito(id)) { PDC.estado.marcar(id, true); }
    if (aoMudar) { aoMudar(); }
  }

  /* ------------------------------------------------------------ interface */

  function cabecalho(exercicio, numero) {
    var aprovado = PDC.estado.estaFeito(exercicio.id);
    return el("div", { "class": "linha-entre mb-3" }, [
      el("div", { "class": "linha" }, [
        ui.icone(exercicio.tipo === "quiz" ? "lampada"
          : (exercicio.tipo === "reflexao" ? "documento" : "codigo"), 16),
        el("strong", { texto: "Exercicio " + numero }),
        ui.etiqueta(exercicio.tipo, null)
      ]),
      aprovado ? ui.etiqueta("aprovado", "ok") : ui.etiqueta("pendente")
    ]);
  }

  /* --- python e sql compartilham o editor --- */
  function montarEditorCodigo(exercicio, numero, aoMudar) {
    var salvo = lerResposta(exercicio.id);
    var area = el("textarea", {
      "class": "editor-area", spellcheck: "false",
      "aria-label": "Editor de codigo do exercicio " + numero
    }, [(salvo && salvo.codigo) || exercicio.starter || ""]);

    var saida = el("pre", { "class": "saida oculto" });
    var veredito = el("div", { "class": "mt-3" });
    var estado = el("div", { "class": "txt-mini txt-fraco" });

    function avisar(texto) {
      ui.limpar(estado);
      estado.appendChild(el("span", { "class": "linha" }, [
        el("span", { "class": "girando" }, [ui.icone("atualizar", 14)]),
        el("span", { texto: texto })
      ]));
    }

    function mostrarSaida(texto, tipo) {
      ui.limpar(saida);
      saida.classList.remove("oculto", "saida-ok", "saida-erro");
      if (tipo) { saida.classList.add("saida-" + tipo); }
      saida.appendChild(ui.txt(texto));
    }

    function mostrarVeredito(ok, mensagem) {
      ui.limpar(veredito);
      veredito.appendChild(ui.aviso(ok ? "ok" : "erro", mensagem));
    }

    var botaoExecutar = ui.botao("Executar", {
      variante: "primario", icone: "play",
      aoClicar: function () { executar(); }
    });

    function executar() {
      var codigo = area.value;
      botaoExecutar.disabled = true;
      ui.limpar(veredito);
      avisar("Executando");

      var promessa = exercicio.tipo === "python"
        ? rodarPython(codigo, exercicio.teste, avisar).then(function (r) {
            if (r.ok) {
              mostrarSaida(r.saida || "(sem saida)", "ok");
              return { ok: true, mensagem: "Aprovado. Todos os testes passaram." };
            }
            mostrarSaida((r.saida ? r.saida + "\n" : "") + r.erro, "erro");
            return { ok: false, mensagem: r.erro };
          })
        : rodarSql(exercicio.base, codigo, avisar).then(function (obtido) {
            var cmp = compararResultado(obtido, exercicio.esperado, exercicio.ordemImporta);
            mostrarSaida(formatarTabela(obtido), cmp.ok ? "ok" : "erro");
            return cmp.ok
              ? { ok: true, mensagem: "Aprovado. O resultado confere com o esperado." }
              : { ok: false, mensagem: "Ainda nao: " + cmp.motivo };
          });

      promessa.then(function (r) {
        ui.limpar(estado);
        mostrarVeredito(r.ok, r.mensagem);
        gravarResposta(exercicio.id, { codigo: codigo, aprovado: r.ok });
        if (r.ok) { aprovar(exercicio.id, aoMudar); }
      }, function (erro) {
        ui.limpar(estado);
        mostrarVeredito(false, "Nao foi possivel executar: " + erro.message +
          " Verifique a conexao e tente de novo.");
      }).then(function () {
        botaoExecutar.disabled = false;
      });
    }

    area.addEventListener("keydown", function (ev) {
      if ((ev.ctrlKey || ev.metaKey) && ev.key === "Enter") { ev.preventDefault(); executar(); }
      if (ev.key === "Tab") {
        ev.preventDefault();
        var pos = area.selectionStart;
        area.value = area.value.slice(0, pos) + "    " + area.value.slice(area.selectionEnd);
        area.selectionStart = area.selectionEnd = pos + 4;
      }
    });

    var barra = [ui.icone("codigo", 14), el("span", { texto: exercicio.id }),
      el("span", { "class": "espaco" }), el("span", { texto: "Ctrl+Enter executa" })];

    var acoes = [
      botaoExecutar,
      ui.botao("Restaurar", {
        icone: "atualizar",
        aoClicar: function () {
          area.value = exercicio.starter || "";
          ui.limpar(veredito);
          saida.classList.add("oculto");
        }
      })
    ];
    if (exercicio.dica) {
      acoes.push(ui.botao("Dica", {
        variante: "sutil", icone: "lampada",
        aoClicar: function () {
          ui.limpar(veredito);
          veredito.appendChild(ui.aviso("info", exercicio.dica));
        }
      }));
    }

    var gabarito = el("details", { "class": "painel mt-3" }, [
      el("summary", null, [
        ui.icone("olho", 15), el("span", { texto: "Ver resposta" }),
        el("span", { "class": "seta" }, [ui.icone("baixo", 15)])
      ]),
      el("div", { "class": "painel-corpo" }, [
        el("pre", { "class": "bloco-codigo" }, [el("code", { texto: exercicio.gabarito || "" })])
      ])
    ]);

    var extras = [];
    if (exercicio.tipo === "sql") {
      extras.push(el("div", { "class": "txt-mini txt-fraco mb-3" }, [
        ui.txt("Base " + exercicio.base + ": " + (DESCRICAO_BASE[exercicio.base] || []).join("  ·  "))
      ]));
    }

    return el("div", { "class": "exercicio" }, [
      cabecalho(exercicio, numero),
      el("p", { texto: exercicio.enunciado }),
      extras.length ? extras[0] : null,
      el("div", { "class": "editor" }, [
        el("div", { "class": "editor-barra" }, barra),
        area
      ]),
      el("div", { "class": "linha mt-3" }, acoes),
      estado,
      saida,
      veredito,
      gabarito
    ]);
  }

  function formatarTabela(resultado) {
    if (!resultado.colunas.length) { return "(a consulta nao devolveu colunas)"; }
    var larguras = resultado.colunas.map(function (c, i) {
      var maior = String(c).length;
      resultado.linhas.forEach(function (l) {
        var t = normalizar(l[i]);
        if (t.length > maior) { maior = t.length; }
      });
      return Math.min(maior, 28);
    });
    function linha(valores) {
      return valores.map(function (v, i) {
        var t = normalizar(v);
        if (t.length > larguras[i]) { t = t.slice(0, larguras[i] - 1) + "~"; }
        while (t.length < larguras[i]) { t += " "; }
        return t;
      }).join("  ");
    }
    var partes = [linha(resultado.colunas)];
    partes.push(larguras.map(function (w) { return new Array(w + 1).join("-"); }).join("  "));
    resultado.linhas.forEach(function (l) { partes.push(linha(l)); });
    partes.push("");
    partes.push(resultado.linhas.length + " linha(s)");
    return partes.join("\n");
  }

  /* --- quiz --- */
  function montarQuiz(exercicio, numero, aoMudar) {
    var salvo = lerResposta(exercicio.id);
    var resposta = el("div", { "class": "mt-3" });
    var escolhido = salvo && typeof salvo.escolha === "number" ? salvo.escolha : null;
    var botoes = [];

    function escolher(indice) {
      escolhido = indice;
      var alt = exercicio.alternativas[indice];
      botoes.forEach(function (b, i) {
        b.classList.toggle("escolhida", i === indice);
        b.classList.toggle("certa", i === indice && alt.correta);
        b.classList.toggle("errada", i === indice && !alt.correta);
      });
      ui.limpar(resposta);
      resposta.appendChild(ui.aviso(alt.correta ? "ok" : "atencao", alt.explicacao));
      if (!alt.correta) {
        var certa = exercicio.alternativas.filter(function (a) { return a.correta; })[0];
        resposta.appendChild(el("div", { "class": "mt-3" }, [
          ui.aviso("info", "A alternativa correta: " + certa.v)
        ]));
      }
      gravarResposta(exercicio.id, { escolha: indice, aprovado: Boolean(alt.correta) });
      if (alt.correta) { aprovar(exercicio.id, aoMudar); }
    }

    exercicio.alternativas.forEach(function (alt, i) {
      var b = el("button", {
        "class": "alternativa", type: "button",
        onclick: function () { escolher(i); }
      }, [
        el("span", { "class": "alternativa-letra", texto: String.fromCharCode(65 + i) }),
        el("span", { texto: alt.v })
      ]);
      botoes.push(b);
    });

    var no = el("div", { "class": "exercicio" }, [
      cabecalho(exercicio, numero),
      el("p", { texto: exercicio.enunciado }),
      el("div", { "class": "coluna" }, botoes),
      resposta
    ]);

    if (escolhido !== null) { escolher(escolhido); }
    return no;
  }

  /* --- reflexao --- */
  function montarReflexao(exercicio, numero, aoMudar) {
    var salvo = lerResposta(exercicio.id) || {};
    var minimo = exercicio.minimoCaracteres || 200;
    var areas = [];
    var contador = el("span", { "class": "txt-mini txt-fraco" });
    var veredito = el("div", { "class": "mt-3" });

    function total() {
      return areas.reduce(function (soma, a) { return soma + a.value.trim().length; }, 0);
    }

    function atualizarContador() {
      var n = total();
      contador.textContent = n + " de " + minimo + " caracteres";
      contador.classList.toggle("txt-fraco", n < minimo);
    }

    (exercicio.perguntas || []).forEach(function (pergunta, i) {
      var area = el("textarea", {
        "class": "area", rows: "3",
        "aria-label": pergunta,
        oninput: atualizarContador
      }, [(salvo.textos && salvo.textos[i]) || ""]);
      areas.push(area);
    });

    function salvar() {
      var textos = areas.map(function (a) { return a.value; });
      var completo = total() >= minimo && textos.every(function (t) { return t.trim().length > 0; });
      gravarResposta(exercicio.id, { textos: textos, aprovado: completo });
      ui.limpar(veredito);
      if (completo) {
        veredito.appendChild(ui.aviso("ok", "Reflexao registrada. Volte aqui quando quiser revisar."));
        aprovar(exercicio.id, aoMudar);
      } else {
        veredito.appendChild(ui.aviso("atencao",
          "Responda todas as perguntas, somando pelo menos " + minimo + " caracteres. " +
          "O texto ja foi salvo e voce pode continuar depois."));
      }
    }

    var corpo = [cabecalho(exercicio, numero), el("p", { texto: exercicio.enunciado })];
    (exercicio.perguntas || []).forEach(function (pergunta, i) {
      corpo.push(el("label", { "class": "campo" }, [
        el("span", { "class": "campo-rotulo", texto: pergunta }),
        areas[i]
      ]));
    });
    corpo.push(el("div", { "class": "linha" }, [
      ui.botao("Salvar reflexao", { variante: "primario", icone: "salvar", aoClicar: salvar }),
      contador
    ]));
    corpo.push(veredito);

    atualizarContador();
    return el("div", { "class": "exercicio" }, corpo);
  }

  /* ---------------------------------------------------------- montagem */

  function montar(exercicio, numero, aoMudar) {
    switch (exercicio.tipo) {
      case "python":
      case "sql":
        return montarEditorCodigo(exercicio, numero, aoMudar);
      case "quiz":
        return montarQuiz(exercicio, numero, aoMudar);
      case "reflexao":
        return montarReflexao(exercicio, numero, aoMudar);
      default:
        return ui.aviso("atencao", "Tipo de exercicio desconhecido: " + exercicio.tipo);
    }
  }

  /* Secao de pratica do modulo. */
  function secao(modulo, aoMudar) {
    var lista = modulo.exercicios || [];
    if (!lista.length) { return null; }

    var titulo = lista[0].tipo === "reflexao" ? "Reflexao guiada"
      : (lista[0].tipo === "quiz" ? "Pratica de decisao" : "Testes praticos");

    var partes = [el("h3", { "class": "mb-4", texto: titulo })];
    lista.forEach(function (ex, i) {
      if (i > 0) { partes.push(el("hr")); }
      partes.push(montar(ex, i + 1, aoMudar));
    });
    return ui.cartao(partes);
  }

  PDC.exercicios = {
    BASES: BASES,
    secao: secao,
    montar: montar,
    rodarPython: rodarPython,
    rodarSql: rodarSql,
    compararResultado: compararResultado
  };
})();
