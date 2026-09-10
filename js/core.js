/* core.js — namespace global e biblioteca de icones.
   Etapa 3 entrega apenas PDC.icones. PDC.util, PDC.rota e PDC.estado
   sao adicionados na Etapa 4, neste mesmo arquivo.

   Regra do projeto: icones sao exclusivamente SVG inline. Emoji e proibido.
   Os icones sao construidos com createElementNS para nao usar innerHTML. */

(function () {
  "use strict";

  window.PDC = window.PDC || {};

  var NS = "http://www.w3.org/2000/svg";

  /* Traçados em grade de 24x24, desenhados com contorno (sem preenchimento).
     Cada icone e uma lista de atributos "d" de <path>. */
  var CAMINHOS = {
    /* navegacao e estrutura */
    casa:        ["M3 10.5 12 3l9 7.5", "M5.5 9.5V20h4.5v-6h4v6h4.5V9.5"],
    grade:       ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 13h7v7h-7z"],
    menu:        ["M4 7h16", "M4 12h16", "M4 17h16"],
    trilha:      ["M4 20h16", "M7 20v-6", "M12 20V8", "M17 20v-11"],
    fase:        ["M5 6h14", "M5 12h14", "M5 18h9"],
    modulo:      ["M4 5h16v14H4z", "M4 9h16", "M9 9v10"],
    pasta:       ["M3 6h6l2 2h10v11H3z"],

    /* setas */
    esquerda:    ["M15 5l-7 7 7 7"],
    direita:     ["M9 5l7 7-7 7"],
    cima:        ["M5 15l7-7 7 7"],
    baixo:       ["M5 9l7 7 7-7"],
    voltar:      ["M20 12H5", "M11 6l-6 6 6 6"],
    externo:     ["M14 4h6v6", "M20 4 10 14", "M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"],

    /* acoes */
    mais:        ["M12 5v14", "M5 12h14"],
    menos:       ["M5 12h14"],
    check:       ["M4 12.5 9 17.5 20 6.5"],
    fechar:      ["M6 6l12 12", "M18 6 6 18"],
    lapis:       ["M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z", "M13.5 6.5l4 4"],
    lixeira:     ["M4 7h16", "M9 7V4h6v3", "M6 7l1 13h10l1-13", "M10 11v6", "M14 11v6"],
    busca:       ["M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14z", "M16.5 16.5 21 21"],
    filtro:      ["M3 5h18l-7 8v6l-4 2v-8z"],
    salvar:      ["M4 4h12l4 4v12H4z", "M8 4v6h8V4", "M8 20v-6h8v6"],
    atualizar:   ["M20 12a8 8 0 1 1-2.3-5.7", "M20 4v4h-4"],
    baixar:      ["M12 3v12", "M7.5 10.5 12 15l4.5-4.5", "M4 19h16"],
    enviar:      ["M12 15V3", "M7.5 7.5 12 3l4.5 4.5", "M4 19h16"],
    copiar:      ["M9 9h11v11H9z", "M15 9V4H4v11h5"],

    /* conteudo */
    livro:       ["M4 19.5V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 0-2 1.5z", "M6 17h14"],
    marcador:    ["M6 3h12v18l-6-4.5L6 21z"],
    documento:   ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6", "M9 16h6"],
    codigo:      ["M8.5 8 4 12l4.5 4", "M15.5 8 20 12l-4.5 4", "M13.5 5l-3 14"],
    banco:       ["M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z", "M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6", "M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"],
    play:        ["M8 5.5v13l11-6.5z"],
    video:       ["M3 6h13v12H3z", "M16 10l5-3v10l-5-3z"],
    mapa:        ["M4 4h5v4H4z", "M15 10h5v4h-5z", "M4 16h5v4H4z", "M9 6h3a2 2 0 0 1 2 2v2h1", "M9 18h3a2 2 0 0 0 2-2v-2"],
    cartao:      ["M3 7h14v11H3z", "M7 4h14v11"],
    lampada:     ["M9.5 18h5", "M10 21h4", "M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"],
    etiqueta:    ["M3 3h8l10 10-8 8L3 11z", "M7 7h.1"],

    /* estado e feedback */
    info:        ["M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18z", "M12 11v5", "M12 8h.1"],
    alerta:      ["M12 4 2.5 20h19z", "M12 10v4", "M12 17h.1"],
    erro:        ["M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18z", "M9 9l6 6", "M15 9l-6 6"],
    sucesso:     ["M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18z", "M8 12.5 11 15.5 16 9.5"],
    relogio:     ["M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18z", "M12 7v5.5l3.5 2"],
    calendario:  ["M4 6h16v15H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
    sequencia:   ["M12 3s5 4.5 5 9a5 5 0 0 1-10 0c0-2 1-3.7 1-3.7S9.4 10 10 11c0-3 2-8 2-8z"],
    estrela:     ["M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"],

    /* pessoa e sistema */
    usuario:     ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 20a8 8 0 0 1 16 0"],
    config:      ["M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z", "M4.5 12a7.5 7.5 0 0 1 .2-1.6l-2-1.5 2-3.5 2.3 1a7.5 7.5 0 0 1 2.8-1.6L10.2 2h3.6l.4 2.8a7.5 7.5 0 0 1 2.8 1.6l2.3-1 2 3.5-2 1.5a7.5 7.5 0 0 1 0 3.2l2 1.5-2 3.5-2.3-1a7.5 7.5 0 0 1-2.8 1.6l-.4 2.8h-3.6l-.4-2.8a7.5 7.5 0 0 1-2.8-1.6l-2.3 1-2-3.5 2-1.5A7.5 7.5 0 0 1 4.5 12z"],
    olho:        ["M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z", "M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"],
    sol:         ["M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z", "M12 2v2", "M12 20v2", "M2 12h2", "M20 12h2", "M4.9 4.9l1.5 1.5", "M17.6 17.6l1.5 1.5", "M19.1 4.9l-1.5 1.5", "M6.4 17.6l-1.5 1.5"],
    lua:         ["M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"]
  };

  /* Cria o elemento <svg> do icone.
     chave: nome em CAMINHOS. tamanho: lado em px (padrao 18). */
  function criar(chave, tamanho) {
    var lado = tamanho || 18;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", lado);
    svg.setAttribute("height", lado);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.75");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.setAttribute("class", "ico");

    var lista = CAMINHOS[chave] || CAMINHOS.info;
    for (var i = 0; i < lista.length; i++) {
      var p = document.createElementNS(NS, "path");
      p.setAttribute("d", lista[i]);
      svg.appendChild(p);
    }
    return svg;
  }

  /* Mascote do portal: criatura de estudo com chapeu de formatura.
     Desenho original, feito para este projeto. Nao e derivado de personagem
     de terceiro. Usa tokens de cor, entao acompanha o tema claro e escuro. */
  function marca(tamanho) {
    var lado = tamanho || 28;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("width", lado);
    svg.setAttribute("height", lado);
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.setAttribute("role", "img");
    svg.setAttribute("class", "marca-svg");
    var titulo = document.createElementNS(NS, "title");
    titulo.appendChild(document.createTextNode("Portal do Conhecimento"));
    svg.appendChild(titulo);

    function forma(tag, atributos) {
      var no = document.createElementNS(NS, tag);
      Object.keys(atributos).forEach(function (k) { no.setAttribute(k, atributos[k]); });
      svg.appendChild(no);
      return no;
    }

    var verde = "var(--marca-verde)";
    var verdeEscuro = "var(--marca-verde-escuro)";
    var capa = "var(--marca-capelo)";
    var capaEscura = "var(--marca-capelo-escuro)";
    var olho = "var(--marca-olho)";

    /* Juba serrilhada em volta da cabeca. Gerada por angulo alternando raio
       de ponta e de vale. O trecho de cima fica de fora: e onde entra o capelo. */
    var pontos = [];
    for (var a = 0; a < 360; a += 15) {
      if (a > 232 && a < 308) { continue; }          /* topo, coberto pelo capelo */
      var raio = (a / 15) % 2 === 0 ? 12.4 : 8.2;    /* ponta, vale */
      var rad = a * Math.PI / 180;
      pontos.push(
        (16 + raio * Math.cos(rad)).toFixed(2) + "," +
        (19.5 + raio * Math.sin(rad)).toFixed(2)
      );
    }
    forma("polygon", { points: pontos.join(" "), fill: verdeEscuro });

    /* cabeca */
    forma("circle", { cx: "16", cy: "19.5", r: "8.5", fill: verde });

    /* copa do capelo */
    forma("path", { d: "M9.5 9.5v4.2c0 1.9 2.9 3.1 6.5 3.1s6.5-1.2 6.5-3.1V9.5z", fill: capaEscura });
    /* tabua do capelo */
    forma("polygon", { points: "16,3 30,8 16,13 2,8", fill: capa });
    /* borla */
    forma("path", { d: "M29 8.4v4.6", stroke: capaEscura, "stroke-width": "1.4", "stroke-linecap": "round", fill: "none" });
    forma("circle", { cx: "29", cy: "14.2", r: "1.5", fill: capaEscura });

    /* olhos */
    forma("circle", { cx: "12.6", cy: "19.6", r: "1.7", fill: olho });
    forma("circle", { cx: "19.4", cy: "19.6", r: "1.7", fill: olho });

    /* sorriso e presas */
    forma("path", {
      d: "M11.8 23.2c1.4 2 6.9 2 8.4 0", stroke: olho, "stroke-width": "1.5",
      "stroke-linecap": "round", fill: "none"
    });
    forma("polygon", { points: "13.2,23.9 14.6,23.9 13.9,26", fill: capa });
    forma("polygon", { points: "17.4,23.9 18.8,23.9 18.1,26", fill: capa });

    return svg;
  }

  PDC.icones = {
    caminhos: CAMINHOS,
    criar: criar,
    marca: marca,
    existe: function (chave) { return Object.prototype.hasOwnProperty.call(CAMINHOS, chave); },
    lista: function () { return Object.keys(CAMINHOS); }
  };
})();


/* ==========================================================================
   PDC.util — utilitarios sem dependencia de nenhum outro modulo
   ========================================================================== */
(function () {
  "use strict";

  var PDC = window.PDC;

  /* Id estavel, nunca reaproveitado. Formato definido em docs/ARQUITETURA.md §2. */
  function novoId(prefixo) {
    var aleatorio = Math.floor(Math.random() * 1296).toString(36);
    while (aleatorio.length < 2) { aleatorio = "0" + aleatorio; }
    return (prefixo || "") + Date.now().toString(36) + aleatorio;
  }

  /* Adia a execucao ate parar de ser chamada por 'espera' ms. */
  function adiar(fn, espera) {
    var marca = null;
    return function () {
      var contexto = this;
      var args = arguments;
      if (marca) { clearTimeout(marca); }
      marca = setTimeout(function () { marca = null; fn.apply(contexto, args); }, espera);
    };
  }

  /* Carrega script externo sob demanda. Resolve na hora se a global ja existir. */
  var scriptsPedidos = {};
  function carregarScript(url, chaveGlobal, limiteMs) {
    if (chaveGlobal && window[chaveGlobal]) { return Promise.resolve(window[chaveGlobal]); }
    if (scriptsPedidos[url]) { return scriptsPedidos[url]; }

    scriptsPedidos[url] = new Promise(function (resolver, rejeitar) {
      var limite = setTimeout(function () {
        rejeitar(new Error("Tempo esgotado ao carregar " + url));
      }, limiteMs || 60000);

      var tag = document.createElement("script");
      tag.src = url;
      tag.async = true;
      tag.addEventListener("load", function () {
        clearTimeout(limite);
        resolver(chaveGlobal ? window[chaveGlobal] : true);
      });
      tag.addEventListener("error", function () {
        clearTimeout(limite);
        delete scriptsPedidos[url];
        rejeitar(new Error("Falha ao carregar " + url));
      });
      document.head.appendChild(tag);
    });
    return scriptsPedidos[url];
  }

  /* Busca com tempo limite. Toda chamada externa do portal passa por aqui. */
  function buscar(url, opcoes, limiteMs) {
    var controle = new AbortController();
    var limite = setTimeout(function () { controle.abort(); }, limiteMs || 9000);
    var conf = Object.assign({}, opcoes || {}, { signal: controle.signal });
    return fetch(url, conf).then(function (resposta) {
      clearTimeout(limite);
      return resposta;
    }, function (erro) {
      clearTimeout(limite);
      throw erro;
    });
  }

  function formatarHoras(n) {
    var valor = Math.round((Number(n) || 0) * 10) / 10;
    return (valor % 1 === 0 ? String(valor) : valor.toFixed(1).replace(".", ",")) + " h";
  }

  function formatarPct(fracao) {
    return (Math.round((Number(fracao) || 0) * 1000) / 10).toString().replace(".", ",") + "%";
  }

  function agoraISO() { return new Date().toISOString(); }

  function hojeISO() { return new Date().toISOString().slice(0, 10); }

  /* Semana ISO no formato 2026-W37, usada nas metas semanais. */
  function semanaISO(data) {
    var d = new Date(Date.UTC(
      (data || new Date()).getFullYear(),
      (data || new Date()).getMonth(),
      (data || new Date()).getDate()
    ));
    var dia = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dia);
    var inicio = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var semana = Math.ceil((((d - inicio) / 86400000) + 1) / 7);
    return d.getUTCFullYear() + "-W" + (semana < 10 ? "0" + semana : semana);
  }

  /* So deixa passar http, https e mailto. Bloqueia javascript: e data: em href. */
  function urlSegura(valor) {
    if (typeof valor !== "string") { return null; }
    var limpo = valor.trim();
    if (/^(https?:|mailto:)/i.test(limpo)) { return limpo; }
    return null;
  }

  /* Registro de depuracao. So escreve com localStorage.pdc_debug === "1". */
  function log() {
    try {
      if (window.localStorage.getItem("pdc_debug") !== "1") { return; }
      if (window.console && window.console.debug) {
        window.console.debug.apply(window.console, arguments);
      }
    } catch (e) { /* armazenamento bloqueado: nao ha o que registrar */ }
  }

  PDC.util = {
    novoId: novoId,
    adiar: adiar,
    carregarScript: carregarScript,
    buscar: buscar,
    formatarHoras: formatarHoras,
    formatarPct: formatarPct,
    agoraISO: agoraISO,
    hojeISO: hojeISO,
    semanaISO: semanaISO,
    urlSegura: urlSegura,
    log: log
  };
})();


/* ==========================================================================
   PDC.trilhas — registro do conteudo.
   Cada arquivo em js/trilhas/ chama PDC.trilhas.registrar(trilha).
   As trilhas criadas pelo usuario vem de PDC.estado.dados.trilhas.
   ========================================================================== */
(function () {
  "use strict";

  var PDC = window.PDC;
  var nativas = [];
  var indice = null;

  function registrar(trilha) {
    if (!trilha || !trilha.id) { return; }
    nativas.push(trilha);
    indice = null;
  }

  function lista() {
    var custom = (PDC.estado && PDC.estado.dados.trilhas) || [];
    return nativas.concat(custom);
  }

  function construirIndice() {
    indice = {};
    lista().forEach(function (trilha) {
      var ordem = [];
      (trilha.fases || []).forEach(function (fase) {
        (fase.modulos || []).forEach(function (modulo) {
          ordem.push(modulo.id);
          indice[modulo.id] = { trilha: trilha, fase: fase, modulo: modulo };
        });
      });
      ordem.forEach(function (id, i) {
        indice[id].anterior = i > 0 ? ordem[i - 1] : null;
        indice[id].proximo = i < ordem.length - 1 ? ordem[i + 1] : null;
        indice[id].posicao = i + 1;
        indice[id].total = ordem.length;
      });
    });
  }

  function obter(id) {
    var achada = null;
    lista().forEach(function (t) { if (t.id === id) { achada = t; } });
    return achada;
  }

  function localizarModulo(moduloId) {
    if (!indice) { construirIndice(); }
    return indice[moduloId] || null;
  }

  /* Primeiro modulo ainda nao concluido — usado no botao "continuar". */
  function proximoAberto(trilha) {
    var alvo = null;
    (trilha.fases || []).forEach(function (fase) {
      (fase.modulos || []).forEach(function (modulo) {
        if (!alvo && PDC.estado.progressoModulo(modulo) < 1) { alvo = modulo; }
      });
    });
    return alvo;
  }

  function contar(trilha) {
    var fases = (trilha.fases || []).length;
    var modulos = 0;
    (trilha.fases || []).forEach(function (f) { modulos += (f.modulos || []).length; });
    return { fases: fases, modulos: modulos };
  }

  PDC.trilhas = {
    registrar: registrar,
    lista: lista,
    obter: obter,
    localizarModulo: localizarModulo,
    proximoAberto: proximoAberto,
    contar: contar,
    invalidarIndice: function () { indice = null; }
  };
})();


/* ==========================================================================
   PDC.rota — roteador por hash (docs/ARQUITETURA.md §6)
   Padrao: "trilha/:id". Rota desconhecida cai na home com aviso.
   ========================================================================== */
(function () {
  "use strict";

  var PDC = window.PDC;
  var registradas = [];
  var aoMudar = null;
  var atualInfo = { rota: "", padrao: "", partes: [], parametros: {} };

  function registrar(padrao, funcao) {
    registradas.push({ padrao: padrao, partes: padrao.split("/"), funcao: funcao });
  }

  function combinar(partesRota, partesPadrao) {
    if (partesRota.length !== partesPadrao.length) { return null; }
    var parametros = {};
    for (var i = 0; i < partesPadrao.length; i++) {
      var p = partesPadrao[i];
      if (p.charAt(0) === ":") {
        parametros[p.slice(1)] = decodeURIComponent(partesRota[i]);
      } else if (p !== partesRota[i]) {
        return null;
      }
    }
    return parametros;
  }

  function limpar(hash) {
    var texto = (hash || "").replace(/^#\/?/, "");
    var corte = texto.indexOf("?");
    var consulta = {};
    if (corte >= 0) {
      texto.slice(corte + 1).split("&").forEach(function (par) {
        if (!par) { return; }
        var kv = par.split("=");
        consulta[decodeURIComponent(kv[0])] = decodeURIComponent(kv.slice(1).join("=") || "");
      });
      texto = texto.slice(0, corte);
    }
    texto = texto.replace(/\/+$/, "");
    return { caminho: texto, consulta: consulta };
  }

  function resolver() {
    var alvo = limpar(window.location.hash);
    var partes = alvo.caminho === "" ? [""] : alvo.caminho.split("/");

    for (var i = 0; i < registradas.length; i++) {
      var parametros = combinar(partes, registradas[i].partes);
      if (parametros) {
        atualInfo = {
          rota: alvo.caminho,
          padrao: registradas[i].padrao,
          partes: partes,
          parametros: parametros,
          consulta: alvo.consulta
        };
        if (aoMudar) { aoMudar(atualInfo); }
        registradas[i].funcao(parametros, alvo.consulta);
        return;
      }
    }

    /* rota desconhecida: volta para a home e avisa, nunca deixa tela em branco */
    PDC.util.log("rota desconhecida", alvo.caminho);
    ir("", { desconhecida: alvo.caminho || "(vazia)" });
  }

  function ir(rota, consulta) {
    var destino = "#/" + String(rota || "").replace(/^\/+/, "");
    if (consulta) {
      var pares = Object.keys(consulta).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(consulta[k]);
      });
      if (pares.length) { destino += "?" + pares.join("&"); }
    }
    if (window.location.hash === destino) { resolver(); return; }
    window.location.hash = destino;
  }

  function iniciar(callbackMudanca) {
    aoMudar = callbackMudanca || null;
    window.addEventListener("hashchange", resolver);
    resolver();
  }

  PDC.rota = {
    registrar: registrar,
    ir: ir,
    iniciar: iniciar,
    atual: function () { return atualInfo; }
  };
})();


/* ==========================================================================
   PDC.estado — estado em memoria e regras de progresso
   Le e grava atraves de PDC.db, sempre de dentro de funcao (ordem de carga).
   ========================================================================== */
(function () {
  "use strict";

  var PDC = window.PDC;

  var CONFIG_PADRAO = {
    ritmo: 12,
    tema: "auto",
    rail: false,
    ultimaTrilha: null,
    ultimoModulo: null,
    avisos: {}
  };

  var dados = {
    progresso: {},
    config: Object.assign({}, CONFIG_PADRAO),
    extras: [],
    trilhas: [],
    respostas: {},
    metas: []
  };

  var gravarAgora = function () {
    PDC.db.gravarLocais(dados);
  };
  var gravarAdiado = null;

  function agendarGravacao() {
    if (!gravarAdiado) { gravarAdiado = PDC.util.adiar(gravarAgora, 350); }
    gravarAdiado();
  }

  function carregar() {
    var lidos = PDC.db.lerLocais(CONFIG_PADRAO);
    dados.progresso = lidos.progresso;
    dados.config = lidos.config;
    dados.extras = lidos.extras;
    dados.trilhas = lidos.trilhas;
    dados.respostas = lidos.respostas;
    dados.metas = lidos.metas;
    return dados;
  }

  function estaFeito(id) {
    return Boolean(dados.progresso[id] && dados.progresso[id].feito);
  }

  function marcar(id, feito) {
    if (feito) {
      dados.progresso[id] = { feito: true, em: PDC.util.agoraISO() };
    } else {
      delete dados.progresso[id];
    }
    agendarGravacao();
    document.dispatchEvent(new CustomEvent("pdc:progresso", { detail: { id: id, feito: Boolean(feito) } }));
  }

  function definirConfig(chave, valor) {
    dados.config[chave] = valor;
    agendarGravacao();
    document.dispatchEvent(new CustomEvent("pdc:config", { detail: { chave: chave, valor: valor } }));
  }

  /* Progresso do modulo — implementacao de RN-001 (docs/ARQUITETURA.md §5). */
  function progressoModulo(modulo) {
    if (!modulo) { return 0; }
    var itens = modulo.itens || [];
    var exercicios = modulo.exercicios || [];
    var extras = dados.extras.filter(function (x) { return x.moduloId === modulo.id; });

    var total = itens.length + exercicios.length + extras.length;
    if (total === 0) { return 0; }

    var feitos = 0;
    itens.forEach(function (i) { if (estaFeito(i.id)) { feitos++; } });
    exercicios.forEach(function (e) { if (estaFeito(e.id)) { feitos++; } });
    extras.forEach(function (x) { if (estaFeito(x.id)) { feitos++; } });
    return feitos / total;
  }

  /* Progresso da trilha ponderado pelas horas de cada modulo — RN-003. */
  function progressoTrilha(trilha) {
    if (!trilha) { return { fracao: 0, horasFeitas: 0, horasTotais: 0, horasRestantes: 0, semanas: 0 }; }
    var horasTotais = 0;
    var horasFeitas = 0;

    (trilha.fases || []).forEach(function (fase) {
      (fase.modulos || []).forEach(function (modulo) {
        var h = Number(modulo.h) || 0;
        horasTotais += h;
        horasFeitas += progressoModulo(modulo) * h;
      });
    });

    var restantes = Math.max(0, horasTotais - horasFeitas);
    var ritmo = Number(dados.config.ritmo) || 12;
    return {
      fracao: horasTotais > 0 ? horasFeitas / horasTotais : 0,
      horasFeitas: horasFeitas,
      horasTotais: horasTotais,
      horasRestantes: restantes,
      semanas: Math.ceil(restantes / ritmo)
    };
  }

  function faseConcluida(fase) {
    var modulos = (fase && fase.modulos) || [];
    if (!modulos.length) { return false; }
    return modulos.every(function (m) { return progressoModulo(m) >= 1; });
  }

  PDC.estado = {
    dados: dados,
    configPadrao: CONFIG_PADRAO,
    carregar: carregar,
    estaFeito: estaFeito,
    marcar: marcar,
    definirConfig: definirConfig,
    progressoModulo: progressoModulo,
    progressoTrilha: progressoTrilha,
    faseConcluida: faseConcluida,
    gravarJa: function () { gravarAgora(); }
  };
})();
