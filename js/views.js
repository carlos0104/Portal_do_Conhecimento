/* views.js — telas do portal.
   Cada funcao devolve um no de DOM pronto; quem troca a tela e o app.js.
   Nenhuma view usa innerHTML: tudo passa por PDC.ui.el e PDC.ui.txt. */

(function () {
  "use strict";

  var PDC = window.PDC;
  var ui = PDC.ui;
  var el = ui.el;

  /* ------------------------------------------------------------ auxiliares */

  var ROTULO_TIPO = {
    video: "video", playlist: "playlist", leitura: "leitura",
    pratica: "pratica", entregavel: "entregavel", externo: "material externo",
    livro: "livro"
  };

  var ICONE_TIPO = {
    video: "video", playlist: "video", leitura: "documento",
    pratica: "lampada", entregavel: "check", externo: "externo", livro: "livro"
  };

  function corDaFase(fase) {
    return fase && fase.cor ? "var(" + fase.cor + ")" : "var(--acento)";
  }

  /* --------------------------------------------------------- aula em blocos */

  function bloco(b) {
    switch (b.t) {
      case "subtitulo":
        return el("h3", { texto: b.v });
      case "lista":
        return el(b.ordenada ? "ol" : "ul", null, (b.v || []).map(function (i) {
          return el("li", { texto: i });
        }));
      case "destaque":
        return el("p", { "class": "bloco-destaque", texto: b.v });
      case "aviso":
        return ui.aviso("atencao", b.v);
      case "codigo":
        return el("pre", { "class": "bloco-codigo" }, [el("code", { texto: b.v })]);
      case "tabela":
        return el("div", { "class": "tabela-rolagem" }, [
          el("table", { "class": "tabela" }, [
            el("thead", null, [el("tr", null, (b.cab || []).map(function (c) {
              return el("th", { texto: c });
            }))]),
            el("tbody", null, (b.linhas || []).map(function (linha) {
              return el("tr", null, linha.map(function (celula) { return el("td", { texto: celula }); }));
            }))
          ])
        ]);
      case "citacao":
        return el("blockquote", { "class": "bloco-citacao" }, [
          ui.txt(b.v),
          el("span", { "class": "fonte" }, [
            ui.txt("Fonte: " + (b.fonte || "nao informada")),
            b.url ? ui.txt(" · ") : null,
            b.url ? el("a", { href: b.url, target: "_blank", rel: "noopener noreferrer", texto: "ver original" }) : null
          ])
        ]);
      default:
        return el("p", { texto: b.v });
    }
  }

  function renderAula(aula) {
    if (!aula) { return ui.aviso("atencao", "Este modulo ainda nao tem aula no portal."); }

    var partes = [];
    partes.push(el("p", { "class": "bloco-destaque" }, [
      el("strong", { texto: "Objetivo: " }), ui.txt(aula.objetivo)
    ]));

    (aula.blocos || []).forEach(function (b) { partes.push(bloco(b)); });

    if (aula.exemplo) {
      partes.push(el("h3", { texto: aula.exemplo.titulo || "No seu dia a dia" }));
      (aula.exemplo.blocos || []).forEach(function (b) { partes.push(bloco(b)); });
    }

    if (aula.resumo && aula.resumo.length) {
      partes.push(el("h3", { texto: "Resumo" }));
      partes.push(el("ul", null, aula.resumo.map(function (r) { return el("li", { texto: r }); })));
    }

    if (aula.aplicar && aula.aplicar.length) {
      partes.push(el("h3", { texto: "Como aplicar amanha" }));
      partes.push(el("ol", null, aula.aplicar.map(function (a) { return el("li", { texto: a }); })));
    }

    return el("div", { "class": "aula" }, partes);
  }

  /* ----------------------------------------------------------------- player */

  /* Clique para tocar: o iframe do YouTube so entra no DOM depois do clique,
     assim a pagina nao carrega scripts de terceiro sem o usuario pedir. */
  function player(item) {
    var caixa = el("div", { "class": "player" });

    var capa = el("button", {
      "class": "player-capa", type: "button",
      "aria-label": "Assistir: " + item.titulo,
      onclick: function () {
        var alvo = item.tipo === "playlist"
          ? "https://www.youtube-nocookie.com/embed/videoseries?list=" + encodeURIComponent(item.embed)
          : "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(item.embed);
        ui.limpar(caixa);
        caixa.appendChild(el("iframe", {
          src: alvo + (alvo.indexOf("?") >= 0 ? "&" : "?") + "rel=0",
          title: item.titulo,
          allow: "accelerometer; autoplay; encrypted-media; picture-in-picture",
          allowfullscreen: true,
          loading: "lazy"
        }));
      }
    }, [
      ui.icone("play", 34),
      el("span", { "class": "player-titulo", texto: item.titulo }),
      el("span", { "class": "txt-mini txt-fraco", texto: "Clique para carregar do YouTube" })
    ]);

    caixa.appendChild(capa);
    return caixa;
  }

  /* -------------------------------------------------------------- item base */

  function linhaItem(item, aoMudar) {
    var feito = PDC.estado.estaFeito(item.id);

    var caixa = el("input", {
      type: "checkbox", checked: feito,
      "aria-label": "Concluir: " + item.titulo,
      onchange: function (ev) {
        PDC.estado.marcar(item.id, ev.target.checked);
        linha.classList.toggle("feito", ev.target.checked);
        if (aoMudar) { aoMudar(); }
      }
    });

    var meta = [
      el("span", { "class": "linha" }, [
        ui.icone(ICONE_TIPO[item.tipo] || "documento", 13),
        ui.txt(ROTULO_TIPO[item.tipo] || item.tipo)
      ])
    ];
    if (item.fonte) { meta.push(el("span", { texto: item.fonte })); }
    if (item.h) { meta.push(el("span", { texto: PDC.util.formatarHoras(item.h) })); }

    var acao = null;
    if (item.url) {
      acao = ui.botao("Abrir", {
        variante: "sutil", pequeno: true,
        aoClicar: function () { PDC.rota.ir("ver", { u: item.url }); }
      });
    }

    var linha = el("li", { "class": "item-linha" + (feito ? " feito" : "") }, [
      el("label", { "class": "marcacao" }, [caixa]),
      el("div", { "class": "item-corpo" }, [
        el("div", { "class": "item-titulo", texto: item.titulo }),
        el("div", { "class": "item-meta" }, meta)
      ]),
      acao
    ]);
    return linha;
  }

  /* ------------------------------------------------------------------ HOME */

  function cartaoTrilha(trilha) {
    var p = PDC.estado.progressoTrilha(trilha);
    var c = PDC.trilhas.contar(trilha);
    var aberto = PDC.trilhas.proximoAberto(trilha);

    return el("article", {
      "class": "cartao cartao-clicavel",
      tabindex: "0",
      role: "link",
      onclick: function () { PDC.rota.ir("trilha/" + trilha.id); },
      onkeydown: function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); PDC.rota.ir("trilha/" + trilha.id); }
      }
    }, [
      el("div", { "class": "cartao-faixa", style: "background: var(" + (trilha.cor1 || "--acento") + ")" }),
      el("div", { "class": "cartao-cabeca" }, [
        ui.icone(trilha.icone || "trilha", 20),
        el("div", null, [
          el("div", { "class": "cartao-titulo", texto: trilha.nome }),
          el("div", { "class": "cartao-sub",
            texto: c.fases + " fases · " + c.modulos + " modulos · " + PDC.util.formatarHoras(p.horasTotais) })
        ])
      ]),
      el("p", { "class": "txt-pequeno txt-fraco", texto: trilha.desc }),
      ui.progresso(p.fracao),
      el("div", { "class": "item-meta mt-3" }, [
        el("span", { texto: PDC.util.formatarHoras(p.horasFeitas) + " feitas" }),
        el("span", { texto: p.semanas + (p.semanas === 1 ? " semana restante" : " semanas restantes") })
      ]),
      aberto
        ? el("div", { "class": "txt-mini txt-fraco mt-3", texto: "Proximo: " + aberto.n + ". " + aberto.titulo })
        : el("div", { "class": "mt-3" }, [ui.etiqueta("trilha concluida", "ok")])
    ]);
  }

  function home() {
    var trilhas = PDC.trilhas.lista();
    var partes = [el("h1", { "class": "mb-3", texto: "Suas trilhas" })];

    var ultimo = PDC.estado.dados.config.ultimoModulo;
    var local = ultimo ? PDC.trilhas.localizarModulo(ultimo) : null;
    if (local) {
      partes.push(ui.cartao([
        el("div", { "class": "linha-entre" }, [
          el("div", null, [
            el("div", { "class": "txt-mini txt-fraco", texto: "Continuar de onde parou" }),
            el("div", { "class": "cartao-titulo", texto: local.modulo.n + ". " + local.modulo.titulo }),
            el("div", { "class": "txt-pequeno txt-fraco",
              texto: local.trilha.nome + " · " + local.fase.nome })
          ]),
          ui.botao("Retomar", {
            variante: "primario", icone: "direita",
            aoClicar: function () { PDC.rota.ir("modulo/" + local.modulo.id); }
          })
        ])
      ]));
      partes.push(el("div", { "class": "mt-5" }));
    }

    if (!trilhas.length) {
      partes.push(ui.cartao([ui.vazio("trilha", "Nenhuma trilha ainda",
        "O conteudo das trilhas entra na Etapa 6.")]));
    } else {
      partes.push(el("div", { "class": "grade grade-auto" }, trilhas.map(cartaoTrilha)));
    }

    return el("div", null, partes);
  }

  /* ---------------------------------------------------------------- TRILHA */

  function linhaModulo(trilha, fase, modulo) {
    var frac = PDC.estado.progressoModulo(modulo);
    var estado = frac >= 1 ? ui.etiqueta("concluido", "ok")
      : (frac > 0 ? ui.etiqueta("em andamento", "acento") : ui.etiqueta("nao iniciado"));

    return el("li", {
      "class": "item-linha modulo-linha",
      tabindex: "0",
      role: "link",
      onclick: function () { PDC.rota.ir("modulo/" + modulo.id); },
      onkeydown: function (ev) {
        if (ev.key === "Enter") { PDC.rota.ir("modulo/" + modulo.id); }
      }
    }, [
      el("span", { "class": "modulo-numero", style: "color: " + corDaFase(fase), texto: String(modulo.n) }),
      el("div", { "class": "item-corpo" }, [
        el("div", { "class": "item-titulo", texto: modulo.titulo }),
        el("div", { "class": "item-meta" }, [
          el("span", { texto: PDC.util.formatarHoras(modulo.h) }),
          el("span", { texto: (modulo.itens || []).length + " itens" }),
          (modulo.exercicios || []).length
            ? el("span", { texto: modulo.exercicios.length + " exercicios" }) : null
        ])
      ]),
      el("div", { "class": "modulo-progresso" }, [ui.progresso(frac, false)]),
      estado
    ]);
  }

  function trilha(id) {
    var t = PDC.trilhas.obter(id);
    if (!t) {
      return el("div", null, [
        el("h1", { "class": "mb-3", texto: "Trilha nao encontrada" }),
        ui.cartao([ui.aviso("atencao", "Nao existe trilha com o identificador " + id + "."),
          el("div", { "class": "mt-4" }, [
            ui.botao("Voltar ao inicio", { variante: "primario", aoClicar: function () { PDC.rota.ir(""); } })
          ])])
      ]);
    }

    PDC.estado.definirConfig("ultimaTrilha", t.id);
    var p = PDC.estado.progressoTrilha(t);
    var partes = [];

    partes.push(el("div", { "class": "hero" }, [
      el("h1", { texto: t.nome }),
      el("p", { "class": "txt-fraco", texto: t.desc })
    ]));

    partes.push(el("div", { "class": "stats mb-5" }, [
      ui.estatistica(PDC.util.formatarPct(p.fracao), "Concluido"),
      ui.estatistica(Math.round(p.horasFeitas), "Horas feitas"),
      ui.estatistica(Math.round(p.horasRestantes), "Horas restantes"),
      ui.estatistica(p.semanas, "Semanas no seu ritmo")
    ]));

    (t.marcos || []).forEach(function (marco) {
      var local = PDC.trilhas.localizarModulo(marco.moduloId);
      if (!local) { return; }
      var alcancado = PDC.estado.progressoModulo(local.modulo) >= 1;
      partes.push(ui.cartao([
        el("div", { "class": "linha-entre" }, [
          el("div", null, [
            el("div", { "class": "linha" }, [
              ui.icone(alcancado ? "sucesso" : "estrela", 17),
              el("strong", { texto: marco.rotulo }),
              alcancado ? ui.etiqueta("alcancado", "ok") : ui.etiqueta("modulo " + local.modulo.n)
            ]),
            el("p", { "class": "txt-pequeno txt-fraco sem-margem mt-3", texto: marco.texto })
          ])
        ])
      ]));
      partes.push(el("div", { "class": "mt-4" }));
    });

    (t.fases || []).forEach(function (fase) {
      var concluida = PDC.estado.faseConcluida(fase);
      var horasFase = (fase.modulos || []).reduce(function (soma, m) { return soma + (m.h || 0); }, 0);

      partes.push(el("details", { "class": "painel", open: !concluida }, [
        el("summary", null, [
          el("span", { "class": "fase-bolinha", style: "background: " + corDaFase(fase) }),
          el("span", { texto: "Fase " + fase.n + " — " + fase.nome }),
          el("span", { "class": "txt-mini txt-fraco", texto: PDC.util.formatarHoras(horasFase) }),
          concluida ? ui.etiqueta("concluida", "ok") : null,
          el("span", { "class": "seta" }, [ui.icone("baixo", 16)])
        ]),
        el("div", { "class": "painel-corpo" }, [
          el("ul", { "class": "lista-itens" }, (fase.modulos || []).map(function (m) {
            return linhaModulo(t, fase, m);
          }))
        ])
      ]));
    });

    return el("div", null, partes);
  }

  /* ---------------------------------------------------------------- MODULO */

  function modulo(id) {
    var local = PDC.trilhas.localizarModulo(id);
    if (!local) {
      return el("div", null, [
        el("h1", { "class": "mb-3", texto: "Modulo nao encontrado" }),
        ui.cartao([ui.aviso("atencao", "Nao existe modulo com o identificador " + id + "."),
          el("div", { "class": "mt-4" }, [
            ui.botao("Voltar ao inicio", { variante: "primario", aoClicar: function () { PDC.rota.ir(""); } })
          ])])
      ]);
    }

    var m = local.modulo;
    var t = local.trilha;
    var fase = local.fase;

    PDC.estado.definirConfig("ultimoModulo", m.id);
    PDC.estado.definirConfig("ultimaTrilha", t.id);

    var extras = PDC.estado.dados.extras.filter(function (x) { return x.moduloId === m.id; });
    var partes = [];
    var barraProgresso = el("div");

    function atualizarProgresso() {
      ui.limpar(barraProgresso);
      barraProgresso.appendChild(ui.progresso(PDC.estado.progressoModulo(m)));
    }
    atualizarProgresso();

    /* cabecalho */
    partes.push(el("div", { "class": "hero" }, [
      el("div", { "class": "linha" }, [
        el("span", { "class": "fase-bolinha", style: "background: " + corDaFase(fase) }),
        el("span", { "class": "txt-pequeno txt-fraco",
          texto: t.nome + " · Fase " + fase.n + " — " + fase.nome +
                 " · modulo " + local.posicao + " de " + local.total })
      ]),
      el("h1", { texto: m.n + ". " + m.titulo }),
      el("p", { "class": "txt-fraco", texto: m.objetivo }),
      el("div", { "class": "chips mb-4" },
        (m.topicos || []).map(function (tp) { return el("span", { "class": "chip", texto: tp }); })),
      barraProgresso
    ]));

    /* 1. aula no portal */
    partes.push(el("details", { "class": "painel", open: true }, [
      el("summary", null, [
        ui.icone("documento", 17), el("span", { texto: "Aula no portal" }),
        el("span", { "class": "txt-mini txt-fraco", texto: PDC.util.formatarHoras(m.h) }),
        el("span", { "class": "seta" }, [ui.icone("baixo", 16)])
      ]),
      el("div", { "class": "painel-corpo" }, [renderAula(m.aula)])
    ]));

    /* 2. conteudo no portal: itens com player e tarefas sem link */
    var noPortal = (m.itens || []).filter(function (i) { return i.embed || !i.url; });
    if (noPortal.length) {
      var corpoPortal = [];
      noPortal.forEach(function (item) {
        if (item.embed) { corpoPortal.push(player(item)); }
        corpoPortal.push(el("ul", { "class": "lista-itens" }, [linhaItem(item, atualizarProgresso)]));
      });
      partes.push(ui.cartao([
        el("h3", { "class": "mb-4", texto: "Conteudo no portal" })
      ].concat(corpoPortal)));
      partes.push(el("div", { "class": "mt-4" }));
    }

    /* 3. conteudo extra: so aparece se existir */
    if (extras.length) {
      partes.push(ui.cartao([
        el("h3", { "class": "mb-4", texto: "Conteudo extra — adicionado por voce" }),
        el("ul", { "class": "lista-itens" }, extras.map(function (x) {
          return linhaItem({ id: x.id, tipo: x.tipo || "externo", titulo: x.titulo, url: x.url, fonte: "seu" },
            atualizarProgresso);
        }))
      ]));
      partes.push(el("div", { "class": "mt-4" }));
    }

    /* 4. materiais externos */
    var externos = (m.itens || []).filter(function (i) { return i.url && !i.embed; });
    if (externos.length) {
      partes.push(el("details", { "class": "painel" }, [
        el("summary", null, [
          ui.icone("externo", 17), el("span", { texto: "Materiais de fontes confiaveis" }),
          el("span", { "class": "txt-mini txt-fraco", texto: externos.length + " itens" }),
          el("span", { "class": "seta" }, [ui.icone("baixo", 16)])
        ]),
        el("div", { "class": "painel-corpo" }, [
          el("ul", { "class": "lista-itens" }, externos.map(function (i) {
            return linhaItem(i, atualizarProgresso);
          }))
        ])
      ]));
    }

    /* 5. pratica: corrigida automaticamente pelo motor de exercicios */
    if ((m.exercicios || []).length) {
      var pratica = PDC.exercicios.secao(m, atualizarProgresso);
      if (pratica) {
        partes.push(pratica);
        partes.push(el("div", { "class": "mt-4" }));
      }
    }

    /* 6. navegacao */
    partes.push(el("nav", { "class": "modulo-nav" }, [
      local.anterior
        ? ui.botao("Anterior", { icone: "esquerda", aoClicar: function () { PDC.rota.ir("modulo/" + local.anterior); } })
        : el("span"),
      ui.botao("Voltar para a trilha", { variante: "sutil", icone: "voltar",
        aoClicar: function () { PDC.rota.ir("trilha/" + t.id); } }),
      local.proximo
        ? ui.botao("Proximo", { variante: "primario", icone: "direita",
            aoClicar: function () { PDC.rota.ir("modulo/" + local.proximo); } })
        : el("span")
    ]));

    return el("div", null, partes);
  }

  /* ------------------------------------------------------------ MINHA AREA */

  function area() {
    var partes = [el("h1", { "class": "mb-4", texto: "Minha area" })];
    var trilhas = PDC.trilhas.lista();

    /* formulario de conteudo extra: existe so aqui, nunca dentro do modulo */
    var selTrilha = el("select", { "class": "selecao", onchange: function () { preencherModulos(); } },
      [el("option", { value: "", texto: "escolha a trilha" })].concat(trilhas.map(function (t) {
        return el("option", { value: t.id, texto: t.nome });
      })));

    var selModulo = el("select", { "class": "selecao" }, [el("option", { value: "", texto: "escolha o modulo" })]);

    function preencherModulos() {
      ui.limpar(selModulo);
      selModulo.appendChild(el("option", { value: "", texto: "escolha o modulo" }));
      var t = PDC.trilhas.obter(selTrilha.value);
      if (!t) { return; }
      (t.fases || []).forEach(function (fase) {
        (fase.modulos || []).forEach(function (m) {
          selModulo.appendChild(el("option", { value: m.id, texto: m.n + ". " + m.titulo }));
        });
      });
    }

    var campoTitulo = el("input", { "class": "entrada", type: "text", placeholder: "titulo do material" });
    var campoUrl = el("input", { "class": "entrada", type: "url", placeholder: "https://" });
    var selTipo = el("select", { "class": "selecao" }, ["externo", "video", "leitura", "pratica"].map(function (tp) {
      return el("option", { value: tp, texto: ROTULO_TIPO[tp] });
    }));
    var recado = el("div");
    var listaExtras = el("div");

    function desenharExtras() {
      ui.limpar(listaExtras);
      var extras = PDC.estado.dados.extras;
      if (!extras.length) {
        listaExtras.appendChild(el("p", { "class": "txt-pequeno txt-fraco sem-margem",
          texto: "Voce ainda nao adicionou nenhum material." }));
        return;
      }
      listaExtras.appendChild(el("ul", { "class": "lista-itens" }, extras.map(function (x) {
        var local = PDC.trilhas.localizarModulo(x.moduloId);
        return el("li", { "class": "item-linha" }, [
          ui.icone(ICONE_TIPO[x.tipo] || "externo", 16),
          el("div", { "class": "item-corpo" }, [
            el("div", { "class": "item-titulo", texto: x.titulo }),
            el("div", { "class": "item-meta" }, [
              el("span", { texto: local ? local.trilha.nome + " · " + local.modulo.titulo : "modulo removido" }),
              x.url ? el("span", { texto: x.url.slice(0, 40) }) : null
            ])
          ]),
          ui.botao(null, {
            variante: "sutil", pequeno: true, soIcone: true, icone: "lixeira", rotulo: "Remover " + x.titulo,
            aoClicar: function () {
              PDC.estado.dados.extras = PDC.estado.dados.extras.filter(function (o) { return o.id !== x.id; });
              PDC.estado.gravarJa();
              desenharExtras();
            }
          })
        ]);
      })));
    }

    function adicionar() {
      ui.limpar(recado);
      if (!selModulo.value) {
        recado.appendChild(ui.aviso("atencao", "Escolha a trilha e o modulo."));
        return;
      }
      if (!campoTitulo.value.trim()) {
        recado.appendChild(ui.aviso("atencao", "Escreva um titulo para o material."));
        return;
      }
      var url = PDC.util.urlSegura(campoUrl.value);
      if (campoUrl.value.trim() && !url) {
        recado.appendChild(ui.aviso("erro", "Endereco invalido. Use um link comecando com https://"));
        return;
      }
      PDC.estado.dados.extras.push({
        id: PDC.util.novoId("x"),
        trilhaId: selTrilha.value,
        moduloId: selModulo.value,
        tipo: selTipo.value,
        titulo: campoTitulo.value.trim(),
        url: url
      });
      PDC.estado.gravarJa();
      campoTitulo.value = "";
      campoUrl.value = "";
      recado.appendChild(ui.aviso("ok", "Material adicionado ao modulo."));
      desenharExtras();
    }

    partes.push(ui.cartao([
      el("h3", { "class": "mb-3", texto: "Conteudo extra" }),
      el("p", { "class": "txt-pequeno txt-fraco",
        texto: "Adicione seus proprios materiais a um modulo. Eles entram no calculo do progresso." }),
      el("div", { "class": "grade grade-2" }, [
        el("label", { "class": "campo" }, [el("span", { "class": "campo-rotulo", texto: "Trilha" }), selTrilha]),
        el("label", { "class": "campo" }, [el("span", { "class": "campo-rotulo", texto: "Modulo" }), selModulo])
      ]),
      el("div", { "class": "grade grade-2" }, [
        el("label", { "class": "campo" }, [el("span", { "class": "campo-rotulo", texto: "Titulo" }), campoTitulo]),
        el("label", { "class": "campo" }, [el("span", { "class": "campo-rotulo", texto: "Tipo" }), selTipo])
      ]),
      el("label", { "class": "campo" }, [
        el("span", { "class": "campo-rotulo", texto: "Endereco (opcional)" }), campoUrl
      ]),
      recado,
      el("div", { "class": "mt-3" }, [
        ui.botao("Adicionar material", { variante: "primario", icone: "mais", aoClicar: adicionar })
      ])
    ]));

    partes.push(el("div", { "class": "mt-5" }));
    partes.push(ui.cartao([
      el("h3", { "class": "mb-3", texto: "Seus materiais" }),
      listaExtras
    ]));
    desenharExtras();

    /* resumo do estudo */
    var totalHoras = 0, feitasHoras = 0;
    trilhas.forEach(function (t) {
      var p = PDC.estado.progressoTrilha(t);
      totalHoras += p.horasTotais;
      feitasHoras += p.horasFeitas;
    });
    var ritmo = PDC.estado.dados.config.ritmo;

    partes.push(el("div", { "class": "mt-5" }));
    partes.push(ui.cartao([
      el("h3", { "class": "mb-3", texto: "Onde voce esta" }),
      el("div", { "class": "stats" }, [
        ui.estatistica(trilhas.length, "Trilhas"),
        ui.estatistica(Math.round(feitasHoras), "Horas feitas"),
        ui.estatistica(Math.round(totalHoras - feitasHoras), "Horas restantes"),
        ui.estatistica(ritmo, "Horas por semana")
      ]),
      el("p", { "class": "txt-mini txt-fraco mt-4 sem-margem",
        texto: "Metas semanais e sequencia de estudo entram na Etapa 11." })
    ]));

    return el("div", null, partes);
  }

  /* --------------------------------------------------------- VISUALIZADOR */

  function visualizador(url) {
    var seguro = PDC.util.urlSegura(url);
    if (!seguro) {
      return el("div", null, [
        el("h1", { "class": "mb-3", texto: "Endereco invalido" }),
        ui.cartao([ui.aviso("erro", "O portal so abre enderecos http e https.")])
      ]);
    }

    var quadro = el("iframe", {
      "class": "quadro-externo", src: seguro, title: "Material externo",
      referrerpolicy: "no-referrer", loading: "lazy"
    });

    return el("div", null, [
      el("div", { "class": "linha-entre mb-3" }, [
        ui.botao("Voltar", { variante: "sutil", icone: "voltar",
          aoClicar: function () { window.history.back(); } }),
        el("span", { "class": "txt-mini txt-fraco mono", texto: seguro.slice(0, 60) }),
        el("a", { "class": "btn btn-secundario btn-pequeno", href: seguro,
          target: "_blank", rel: "noopener noreferrer", texto: "Abrir em nova aba" })
      ]),
      ui.aviso("info", "Alguns sites nao permitem ser abertos dentro de outra pagina. " +
        "Se ficar em branco, use o botao de nova aba."),
      el("div", { "class": "mt-3" }, [quadro])
    ]);
  }

  /* ---------------------------------------------------------------- CTXNAV */

  /* Fases e modulos aparecem no menu lateral apenas dentro de uma trilha. */
  function ctxnav(trilhaId, moduloId) {
    var t = trilhaId ? PDC.trilhas.obter(trilhaId) : null;
    if (!t) { return []; }

    var nos = [el("div", { "class": "sidebar-secao", texto: t.nome })];
    (t.fases || []).forEach(function (fase) {
      nos.push(el("div", { "class": "ctx-fase" }, [
        el("span", { "class": "fase-bolinha", style: "background: " + corDaFase(fase) }),
        el("span", { texto: "Fase " + fase.n + " — " + fase.nome })
      ]));
      (fase.modulos || []).forEach(function (m) {
        var feito = PDC.estado.progressoModulo(m) >= 1;
        nos.push(el("button", {
          "class": "nav-item nav-modulo" + (m.id === moduloId ? " ativo" : ""),
          type: "button",
          onclick: function () { PDC.rota.ir("modulo/" + m.id); }
        }, [
          ui.icone(feito ? "sucesso" : "modulo", 15),
          el("span", { "class": "rotulo", texto: m.n + ". " + m.titulo })
        ]));
      });
    });
    return nos;
  }

  PDC.views = {
    home: home,
    trilha: trilha,
    modulo: modulo,
    area: area,
    visualizador: visualizador,
    ctxnav: ctxnav,
    renderAula: renderAula
  };
})();
