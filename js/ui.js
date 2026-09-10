/* ui.js — construcao de DOM segura e componentes reaproveitaveis.
   Nenhuma funcao daqui aceita HTML: texto e sempre texto (docs/ARQUITETURA.md §7). */

(function () {
  "use strict";

  var PDC = window.PDC;

  function txt(valor) {
    return document.createTextNode(valor === null || valor === undefined ? "" : String(valor));
  }

  /* el("div", {class:"x", onclick:fn}, [filhos ou strings]) */
  function el(tag, atributos, filhos) {
    var no = document.createElement(tag);

    if (atributos) {
      Object.keys(atributos).forEach(function (chave) {
        var valor = atributos[chave];
        if (valor === null || valor === undefined || valor === false) { return; }

        if (chave.indexOf("on") === 0 && typeof valor === "function") {
          no.addEventListener(chave.slice(2), valor);
        } else if (chave === "texto") {
          no.appendChild(txt(valor));
        } else if (chave === "href") {
          var seguro = PDC.util.urlSegura(valor);
          if (seguro) { no.setAttribute("href", seguro); }
        } else if (valor === true) {
          no.setAttribute(chave, "");
        } else {
          no.setAttribute(chave, String(valor));
        }
      });
    }

    if (filhos) {
      var lista = Array.isArray(filhos) ? filhos : [filhos];
      lista.forEach(function (filho) {
        if (filho === null || filho === undefined || filho === false) { return; }
        no.appendChild(typeof filho === "object" && filho.nodeType ? filho : txt(filho));
      });
    }
    return no;
  }

  function icone(chave, tamanho) {
    return PDC.icones.criar(chave, tamanho);
  }

  function limpar(no) {
    while (no && no.firstChild) { no.removeChild(no.firstChild); }
    return no;
  }

  /* --------------------------------------------------------- componentes */

  function cartao(conteudo, classe) {
    return el("section", { "class": "cartao" + (classe ? " " + classe : "") }, conteudo);
  }

  function aviso(tipo, texto, chaveIcone) {
    var mapa = { info: "info", ok: "sucesso", atencao: "alerta", erro: "erro" };
    return el("div", { "class": "aviso aviso-" + tipo, role: tipo === "erro" ? "alert" : "status" }, [
      icone(chaveIcone || mapa[tipo] || "info", 18),
      el("span", { texto: texto })
    ]);
  }

  function etiqueta(texto, variante) {
    return el("span", { "class": "etiq" + (variante ? " etiq-" + variante : ""), texto: texto });
  }

  function botao(texto, opcoes) {
    var o = opcoes || {};
    var classes = ["btn", "btn-" + (o.variante || "secundario")];
    if (o.pequeno) { classes.push("btn-pequeno"); }
    if (o.largo) { classes.push("btn-largo"); }
    if (o.soIcone) { classes.push("btn-icone"); }

    var filhos = [];
    if (o.icone) { filhos.push(icone(o.icone, o.pequeno ? 15 : 17)); }
    if (texto) { filhos.push(el("span", { texto: texto })); }

    return el("button", {
      "class": classes.join(" "),
      type: "button",
      onclick: o.aoClicar,
      disabled: o.desabilitado,
      "aria-label": o.rotulo || null,
      title: o.titulo || null
    }, filhos);
  }

  function progresso(fracao, rotulo) {
    var pct = Math.max(0, Math.min(1, Number(fracao) || 0));
    var partes = [];
    if (rotulo !== false) {
      partes.push(el("div", { "class": "progresso-rotulo" }, [
        el("span", { texto: rotulo || "Progresso" }),
        el("span", { "class": "num", texto: PDC.util.formatarPct(pct) })
      ]));
    }
    partes.push(el("div", {
      "class": "progresso",
      role: "progressbar",
      "aria-valuenow": Math.round(pct * 100),
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, [el("div", { "class": "progresso-barra", style: "width: " + (pct * 100) + "%" })]));
    return el("div", null, partes);
  }

  function estatistica(valor, rotulo) {
    return el("div", { "class": "stat" }, [
      el("div", { "class": "stat-valor num", texto: valor }),
      el("div", { "class": "stat-rotulo", texto: rotulo })
    ]);
  }

  function vazio(chaveIcone, titulo, texto, acao) {
    return el("div", { "class": "vazio" }, [
      el("div", null, [icone(chaveIcone || "info", 32)]),
      el("h4", { texto: titulo }),
      texto ? el("p", { "class": "txt-pequeno", texto: texto }) : null,
      acao || null
    ]);
  }

  function carregando(texto) {
    return el("div", { "class": "linha", role: "status" }, [
      el("span", { "class": "girando" }, [icone("atualizar", 16)]),
      el("span", { "class": "txt-pequeno", texto: texto || "Carregando" })
    ]);
  }

  /* Placeholder das telas ainda nao construidas (Etapa 4). */
  function emConstrucao(titulo, etapa, descricao) {
    return el("div", null, [
      el("h1", { "class": "mb-3", texto: titulo }),
      cartao([
        aviso("info", "Esta tela e construida na Etapa " + etapa + "."),
        descricao ? el("p", { "class": "txt-fraco mt-4 sem-margem", texto: descricao }) : null
      ])
    ]);
  }

  PDC.ui = {
    txt: txt,
    el: el,
    icone: icone,
    limpar: limpar,
    cartao: cartao,
    aviso: aviso,
    etiqueta: etiqueta,
    botao: botao,
    progresso: progresso,
    estatistica: estatistica,
    vazio: vazio,
    carregando: carregando,
    emConstrucao: emConstrucao
  };
})();
