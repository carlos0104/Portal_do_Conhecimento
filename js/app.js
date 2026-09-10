/* app.js — montagem da casca, registro das rotas e inicializacao.
   Sempre o ultimo script da fila (docs/ARQUITETURA.md §1.1). */

(function () {
  "use strict";

  var PDC = window.PDC;
  var ui = PDC.ui;
  var el = ui.el;

  var MENU = [
    { rota: "",           chave: "casa",    rotulo: "Inicio" },
    { rota: "biblioteca", chave: "livro",   rotulo: "Biblioteca" },
    { rota: "revisao",    chave: "cartao",  rotulo: "Revisao do dia" },
    { rota: "area",       chave: "usuario", rotulo: "Minha area" },
    { rota: "nova",       chave: "mais",    rotulo: "Nova trilha" },
    { rota: "config",     chave: "config",  rotulo: "Configuracoes" }
  ];

  var refs = {};

  /* ------------------------------------------------------------- casca */

  function montarSidebar() {
    var marca = el("div", { "class": "sidebar-marca" }, [
      PDC.icones.marca(26),
      el("span", { "class": "rotulo", texto: "Portal do Conhecimento" })
    ]);

    var nav = [marca, el("div", { "class": "sidebar-secao", texto: "Navegacao" })];

    MENU.forEach(function (item) {
      var botao = el("button", {
        "class": "nav-item",
        type: "button",
        "data-rota": item.rota,
        onclick: function () { PDC.rota.ir(item.rota); fecharMenuMobile(); }
      }, [
        ui.icone(item.chave, 18),
        el("span", { "class": "rotulo", texto: item.rotulo })
      ]);
      nav.push(botao);
    });

    /* menu contextual da trilha: preenchido na Etapa 5 */
    refs.ctxnav = el("div", { id: "ctxnav" });
    nav.push(refs.ctxnav);

    return el("aside", { "class": "sidebar", id: "sidebar" }, nav);
  }

  function montarTopbar() {
    refs.titulo = el("span", { "class": "titulo", texto: "Inicio" });
    refs.salvo = el("span", { "class": "salvo" }, [
      ui.icone("check", 15),
      el("span", { "class": "rotulo-salvo", texto: "salvo" })
    ]);

    return el("header", { "class": "topbar" }, [
      ui.botao(null, {
        variante: "sutil", soIcone: true, icone: "menu", rotulo: "Abrir menu",
        aoClicar: alternarMenu
      }),
      refs.titulo,
      el("span", { "class": "espaco" }),
      refs.salvo,
      ui.botao(null, {
        variante: "sutil", soIcone: true, icone: "sol", rotulo: "Alternar tema",
        aoClicar: alternarTema, titulo: "Tema"
      })
    ]);
  }

  function alternarMenu() {
    if (window.matchMedia("(max-width: 900px)").matches) {
      refs.app.classList.toggle("menu-aberto");
      cortina(refs.app.classList.contains("menu-aberto"));
    } else {
      var rail = !refs.app.classList.contains("rail");
      refs.app.classList.toggle("rail", rail);
      PDC.estado.definirConfig("rail", rail);
    }
  }

  function fecharMenuMobile() {
    refs.app.classList.remove("menu-aberto");
    cortina(false);
  }

  function cortina(mostrar) {
    if (mostrar && !refs.cortina) {
      refs.cortina = el("div", { "class": "cortina", onclick: fecharMenuMobile });
      document.body.appendChild(refs.cortina);
    } else if (!mostrar && refs.cortina) {
      document.body.removeChild(refs.cortina);
      refs.cortina = null;
    }
  }

  var TEMAS = ["auto", "claro", "escuro"];

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);
  }

  function alternarTema() {
    var atual = PDC.estado.dados.config.tema || "auto";
    var proximo = TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
    aplicarTema(proximo);
    PDC.estado.definirConfig("tema", proximo);
    anunciar("Tema: " + proximo);
  }

  /* Mensagem curta para leitor de tela e para o usuario. */
  function anunciar(texto) {
    ui.limpar(refs.anuncio);
    refs.anuncio.appendChild(ui.txt(texto));
  }

  function marcarMenuAtivo(rotaAtual) {
    var raiz = rotaAtual.partes[0] || "";
    var itens = refs.app.querySelectorAll(".nav-item[data-rota]");
    for (var i = 0; i < itens.length; i++) {
      var alvo = itens[i].getAttribute("data-rota");
      itens[i].classList.toggle("ativo", alvo === raiz);
    }
  }

  function trocarConteudo(no, titulo) {
    ui.limpar(refs.conteudo);
    refs.conteudo.appendChild(no);
    refs.titulo.textContent = titulo;
    document.title = titulo + " — Portal do Conhecimento";
    refs.conteudo.focus();
    window.scrollTo(0, 0);
  }

  /* -------------------------------------------------------------- rotas */

  function registrarRotas() {
    PDC.rota.registrar("", function (p, consulta) {
      var corpo = ui.emConstrucao("Inicio", 5,
        "Catalogo das trilhas com progresso de cada uma.");
      if (consulta && consulta.desconhecida) {
        corpo.insertBefore(
          ui.aviso("atencao", "Endereco nao encontrado: " + consulta.desconhecida + ". Voce foi trazido para o inicio."),
          corpo.childNodes[1]
        );
      }
      trocarConteudo(corpo, "Inicio");
    });

    PDC.rota.registrar("trilha/:id", function (p) {
      trocarConteudo(ui.emConstrucao("Trilha", 5,
        "Painel da trilha " + p.id + ": horas, fases, plano contra realizado e previsao."), "Trilha");
    });

    PDC.rota.registrar("modulo/:id", function (p) {
      trocarConteudo(ui.emConstrucao("Modulo", 5,
        "Modulo " + p.id + ": aula no portal, videos, materiais e pratica."), "Modulo");
    });

    PDC.rota.registrar("biblioteca", function () {
      trocarConteudo(ui.emConstrucao("Biblioteca", 8,
        "Busca de livros por titulo e autor nas fontes abertas, e sua estante."), "Biblioteca");
    });

    PDC.rota.registrar("livro/:id", function (p) {
      trocarConteudo(ui.emConstrucao("Leitor", 9,
        "Leitura de PDF e Word do livro " + p.id + ", com destaques e notas."), "Leitor");
    });

    PDC.rota.registrar("revisao", function () {
      trocarConteudo(ui.emConstrucao("Revisao do dia", 11,
        "Fila de flashcards de trilha, leitura e video."), "Revisao do dia");
    });

    PDC.rota.registrar("area", function () {
      trocarConteudo(ui.emConstrucao("Minha area", 5,
        "Conteudo extra, metas da semana e o que voce esta estudando."), "Minha area");
    });

    PDC.rota.registrar("nova", function () {
      trocarConteudo(ui.emConstrucao("Nova trilha", 12,
        "Gerador de trilha por tema e sugestao pelo seu perfil."), "Nova trilha");
    });

    PDC.rota.registrar("config", function () {
      trocarConteudo(telaConfig(), "Configuracoes");
    });

    PDC.rota.registrar("ver", function (p, consulta) {
      trocarConteudo(ui.emConstrucao("Visualizador", 5,
        "Abertura de material externo dentro do portal" +
        (consulta && consulta.u ? ": " + consulta.u : "") + "."), "Visualizador");
    });
  }

  /* Configuracoes ja funciona no esqueleto: e o que prova que o estado persiste. */
  function telaConfig() {
    var config = PDC.estado.dados.config;

    var selRitmo = el("select", {
      "class": "selecao",
      onchange: function (ev) {
        PDC.estado.definirConfig("ritmo", Number(ev.target.value));
        anunciar("Ritmo alterado para " + ev.target.value + " horas por semana");
      }
    }, [9, 12, 16, 20].map(function (h) {
      return el("option", { value: h, selected: Number(config.ritmo) === h, texto: h + " horas por semana" });
    }));

    var selTema = el("select", {
      "class": "selecao",
      onchange: function (ev) {
        aplicarTema(ev.target.value);
        PDC.estado.definirConfig("tema", ev.target.value);
      }
    }, TEMAS.map(function (t) {
      return el("option", { value: t, selected: (config.tema || "auto") === t, texto: t });
    }));

    var diagnostico = el("div", { "class": "coluna" }, [ui.carregando("Consultando o armazenamento local")]);
    diagnosticar(diagnostico);

    return el("div", null, [
      el("h1", { "class": "mb-4", texto: "Configuracoes" }),
      ui.cartao([
        el("h4", { "class": "mb-3", texto: "Estudo" }),
        el("label", { "class": "campo" }, [
          el("span", { "class": "campo-rotulo", texto: "Ritmo semanal" }),
          selRitmo,
          el("span", { "class": "campo-ajuda", texto: "Usado para calcular a previsao de conclusao das trilhas." })
        ]),
        el("label", { "class": "campo" }, [
          el("span", { "class": "campo-rotulo", texto: "Tema" }),
          selTema,
          el("span", { "class": "campo-ajuda", texto: "auto segue o tema do sistema operacional." })
        ])
      ]),
      el("div", { "class": "mt-4" }),
      ui.cartao([
        el("h4", { "class": "mb-3", texto: "Armazenamento" }),
        diagnostico
      ]),
      el("div", { "class": "mt-4" }),
      ui.cartao([
        el("h4", { "class": "mb-3", texto: "Backup" }),
        ui.aviso("info", "Exportar e importar backup entram na Etapa 13.")
      ])
    ]);
  }

  function diagnosticar(destino) {
    PDC.db.abrir().then(function () {
      return Promise.all([
        PDC.db.espaco(),
        Promise.all(PDC.db.STORES.map(function (s) {
          return PDC.db.contar(s).then(function (n) { return s + ": " + n; });
        }))
      ]);
    }).then(function (resultado) {
      var espaco = resultado[0];
      var contagens = resultado[1];
      ui.limpar(destino);
      destino.appendChild(ui.aviso("ok", "Banco local aberto com " + PDC.db.STORES.length + " areas."));
      destino.appendChild(el("p", {
        "class": "txt-pequeno mono sem-margem mt-3",
        texto: contagens.join("  ·  ")
      }));
      if (espaco.suportado) {
        var mb = function (b) { return (b / 1048576).toFixed(1).replace(".", ",") + " MB"; };
        destino.appendChild(el("p", {
          "class": "txt-pequeno txt-fraco sem-margem mt-3",
          texto: "Usado " + mb(espaco.usado) + " de " + mb(espaco.total) +
                 " (" + PDC.util.formatarPct(espaco.fracao) + ")"
        }));
      }
      destino.appendChild(el("p", {
        "class": "txt-mini txt-fraco sem-margem mt-3",
        texto: "Versao do schema: " + PDC.db.VERSAO_SCHEMA
      }));
    }, function (erro) {
      ui.limpar(destino);
      destino.appendChild(ui.aviso("erro",
        "Nao foi possivel abrir o banco local: " + erro.message +
        " O portal continua funcionando, mas biblioteca e flashcards ficam indisponiveis."));
    });
  }

  /* ------------------------------------------------------------- eventos */

  function ligarEventos() {
    var apagarSalvo = PDC.util.adiar(function () {
      refs.salvo.classList.remove("ativo");
    }, 2200);

    document.addEventListener("pdc:salvo", function () {
      refs.salvo.classList.add("ativo");
      apagarSalvo();
    });

    document.addEventListener("pdc:erro-gravacao", function (ev) {
      mostrarFaixa("erro", ev.detail.mensagem);
    });

    document.addEventListener("pdc:versao-futura", function (ev) {
      mostrarFaixa("atencao",
        "Estes dados foram salvos por uma versao mais nova do portal (schema " +
        ev.detail.encontrada + "). Nada foi alterado. Atualize o portal antes de continuar.");
    });

    document.addEventListener("pdc:cota-alta", function () {
      mostrarFaixa("atencao",
        "O armazenamento do navegador esta acima de 80% da cota. Exporte um backup e remova arquivos que nao usa.");
    });

    window.addEventListener("resize", PDC.util.adiar(function () {
      if (!window.matchMedia("(max-width: 900px)").matches) { fecharMenuMobile(); }
    }, 150));
  }

  /* A migracao acontece antes de ligarEventos, entao o resultado e conferido aqui. */
  function conferirMigracao() {
    var m = PDC.db.ultimaMigracao();
    if (!m) { return; }
    if (m.estado === "futura") {
      mostrarFaixa("atencao",
        "Estes dados foram salvos por uma versao mais nova do portal (schema " + m.de +
        "; esta versao entende ate a " + m.para + "). Nada foi alterado nem apagado. " +
        "Atualize o portal antes de continuar usando.");
    } else if (m.estado === "migrado") {
      mostrarFaixa("info",
        "Seus dados foram atualizados da versao " + m.de + " para a " + m.para + " sem perda.");
    }
  }

  function mostrarFaixa(tipo, texto) {
    ui.limpar(refs.faixa);
    refs.faixa.appendChild(ui.aviso(tipo, texto));
    refs.faixa.classList.remove("oculto");
  }

  /* -------------------------------------------------------------- inicio */

  function iniciar() {
    PDC.estado.carregar();

    var config = PDC.estado.dados.config;
    aplicarTema(config.tema || "auto");

    refs.app = el("div", { "class": "app" + (config.rail ? " rail" : ""), id: "app" });
    refs.conteudo = el("main", { "class": "conteudo", id: "conteudo", tabindex: "-1" });
    refs.faixa = el("div", { "class": "conteudo oculto", id: "faixa" });
    refs.anuncio = el("div", { "class": "so-leitor", role: "status", "aria-live": "polite" });

    var principal = el("div", { "class": "principal" }, [
      montarTopbar(), refs.faixa, refs.conteudo, refs.anuncio
    ]);

    refs.app.appendChild(montarSidebar());
    refs.app.appendChild(principal);

    ui.limpar(document.body);
    document.body.appendChild(refs.app);

    ligarEventos();
    conferirMigracao();
    registrarRotas();
    PDC.rota.iniciar(marcarMenuAtivo);

    /* aquece o banco local para que a primeira gravacao real nao espere pela abertura */
    PDC.db.abrir().then(function () { return PDC.db.espaco(); }, function (erro) {
      PDC.util.log("banco indisponivel", erro);
    });
  }

  PDC.app = { iniciar: iniciar, refs: refs };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
