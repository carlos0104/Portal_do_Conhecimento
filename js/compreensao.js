/* compreensao.js — resumo estruturado, glossario e mapa mental.

   IMPORTANTE, e declarado na interface: o resumo e EXTRATIVO. O portal
   seleciona e organiza frases que ja existem no texto; nao reescreve, nao
   interpreta e nao inventa. Site estatico sem backend nao roda modelo de
   linguagem (CLAUDE.md §4). Toda frase do resumo existe literalmente na
   origem — RN-008, conferido por tools/valida-resumo.js.

   Tudo aqui roda offline, sem nenhuma chamada de rede. */

(function () {
  "use strict";

  var PDC = window.PDC;

  /* Palavras que aparecem em qualquer texto e nao distinguem assunto nenhum. */
  var VAZIAS = {};
  ("a o e de da do das dos em no na nos nas um uma uns umas para por com sem sob sobre " +
   "que se ao aos as os como mais menos muito pouco ja nao sim tambem entre ate desde " +
   "quando onde porque pois entao assim isso isto aquilo esse essa este esta aquele aquela " +
   "seu sua seus suas meu minha nosso nossa dele dela deles delas lhe lhes me te nos vos " +
   "ser estar ter haver fazer poder dever ir vir dar ficar sao esta estao tem tinha foram " +
   "era eram sera serao seja sejam foi fui somos estamos havia houve pode podem deve devem " +
   "cada todo toda todos todas outro outra outros outras mesmo mesma qualquer quais qual " +
   "mas porem contudo todavia entretanto ou nem apenas so somente ainda sempre nunca talvez " +
   "aqui ali la agora hoje ontem amanha antes depois durante enquanto logo bem mal melhor pior " +
   "voce voces ele ela eles elas eu tu nao dois duas tres pelo pela pelos pelas num numa " +
   "seria teria havia caso conforme segundo atraves diante perante").split(" ")
    .forEach(function (p) { VAZIAS[p] = true; });

  function semAcento(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function normalizar(palavra) {
    return semAcento(palavra).toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function ehConteudo(palavra) {
    var n = normalizar(palavra);
    return n.length >= 4 && !VAZIAS[n] && !/^\d+$/.test(n);
  }

  /* ------------------------------------------------------------- frases */

  var ABREVIACOES = /\b(sr|sra|dr|dra|prof|profa|etc|ex|p|pag|fig|art|inc|ltda|s\.a|i\.e|e\.g|n[uº])\.$/i;

  /* Divide em frases sem quebrar em abreviacao nem em numero decimal. */
  function emFrases(texto) {
    var limpo = String(texto || "").replace(/\s+/g, " ").trim();
    if (!limpo) { return []; }

    var frases = [];
    var atual = "";
    var partes = limpo.split(/([.!?]+)(\s+)/);

    for (var i = 0; i < partes.length; i += 3) {
      var corpo = partes[i] || "";
      var pontuacao = partes[i + 1] || "";
      var espaco = partes[i + 2] || "";
      atual += corpo + pontuacao;

      var terminaEmAbreviacao = ABREVIACOES.test(corpo.trim());
      var decimal = /\d$/.test(corpo) && /^\d/.test(partes[i + 3] || "");

      if (pontuacao && !terminaEmAbreviacao && !decimal) {
        var f = atual.trim();
        if (f.length > 1) { frases.push(f); }
        atual = "";
      } else {
        atual += espaco;
      }
    }
    if (atual.trim().length > 1) { frases.push(atual.trim()); }
    return frases;
  }

  function palavrasDe(texto) {
    return String(texto || "").split(/[^A-Za-zÀ-ÿ0-9]+/).filter(Boolean);
  }

  /* ----------------------------------------------------------- estrutura */

  /* Em .docx os titulos chegam marcados. Em PDF nao chega nada: e preciso
     deduzir pela forma da linha. Linha curta, sem ponto final e seguida de
     texto mais longo quase sempre e titulo. */
  function pareceTitulo(linha, proxima) {
    var t = linha.trim();
    if (t.length < 3 || t.length > 90) { return false; }
    if (/[.;,:]$/.test(t)) { return false; }
    if (palavrasDe(t).length > 12) { return false; }

    if (/^(cap[ií]tulo|se[cç][aã]o|parte|anexo|ap[eê]ndice|unidade|m[oó]dulo)\b/i.test(t)) { return true; }
    if (/^\d+(\.\d+)*[\s.-]+\S/.test(t) && t.length < 70) { return true; }
    if (t === t.toUpperCase() && /[A-ZÀ-Ý]/.test(t) && t.length > 4) { return true; }

    var proximaLonga = proxima && proxima.trim().length > t.length * 1.5;
    var comecaMaiuscula = /^[A-ZÀ-Ý]/.test(t);
    return Boolean(proximaLonga && comecaMaiuscula && t.length < 60);
  }

  /* Divide o texto em secoes. Sem titulo nenhum, devolve uma secao unica:
     documento sem estrutura tem que degradar bem, nao virar resumo vazio. */
  function emSecoes(texto, titulosConhecidos) {
    var linhas = String(texto || "").split(/\r?\n/);
    var secoes = [];
    var atual = { titulo: null, linhas: [] };

    var conhecidos = {};
    (titulosConhecidos || []).forEach(function (t) { conhecidos[t.trim()] = true; });

    linhas.forEach(function (linha, i) {
      var t = linha.trim();
      if (!t) { return; }
      var eTitulo = conhecidos[t] || (!titulosConhecidos || !titulosConhecidos.length
        ? pareceTitulo(t, linhas[i + 1])
        : false);

      if (eTitulo) {
        if (atual.linhas.length) { secoes.push(atual); }
        atual = { titulo: t, linhas: [] };
      } else {
        atual.linhas.push(t);
      }
    });
    if (atual.linhas.length) { secoes.push(atual); }

    if (!secoes.length) { return []; }
    return secoes.map(function (s) {
      return { titulo: s.titulo, texto: s.linhas.join(" "), frases: emFrases(s.linhas.join(" ")) };
    }).filter(function (s) { return s.frases.length; });
  }

  /* ------------------------------------------------------------- resumo */

  var TAMANHOS = { curto: 0.10, medio: 0.22, longo: 0.38 };

  function frequencias(texto) {
    var mapa = {};
    palavrasDe(texto).forEach(function (p) {
      if (!ehConteudo(p)) { return; }
      var n = normalizar(p);
      mapa[n] = (mapa[n] || 0) + 1;
    });
    return mapa;
  }

  /* Nota de uma frase: soma da frequencia das palavras distintas que ela traz,
     dividida pela raiz do tamanho (senao a frase mais longa ganha sempre),
     com bonus para as primeiras da secao e para quem repete o titulo. */
  function pontuarFrase(frase, freq, posicao, total, termosTitulo) {
    var palavras = palavrasDe(frase).filter(ehConteudo).map(normalizar);
    if (!palavras.length) { return 0; }

    var vistas = {};
    var soma = 0;
    palavras.forEach(function (p) {
      if (vistas[p]) { return; }
      vistas[p] = true;
      soma += freq[p] || 0;
    });

    var nota = soma / Math.sqrt(palavras.length);

    if (posicao === 0) { nota *= 1.45; }
    else if (posicao === 1) { nota *= 1.15; }
    else if (posicao === total - 1 && total > 3) { nota *= 1.1; }

    (termosTitulo || []).forEach(function (t) {
      if (vistas[t]) { nota *= 1.12; }
    });

    var n = palavras.length;
    if (n < 5) { nota *= 0.45; }
    if (n > 45) { nota *= 0.7; }

    return nota;
  }

  /* Resumo extrativo por secao. Devolve sempre frases inteiras, copiadas
     literalmente do texto de origem (RN-008). */
  function resumir(texto, opcoes) {
    var o = opcoes || {};
    var tamanho = TAMANHOS[o.tamanho] ? o.tamanho : "medio";
    var proporcao = TAMANHOS[tamanho];

    var secoes = emSecoes(texto, o.titulos);
    if (!secoes.length) {
      return { tamanho: tamanho, secoes: [], frasesTotal: 0, frasesResumo: 0, semEstrutura: true };
    }

    var freq = frequencias(texto);
    var totalFrases = 0;
    var totalResumo = 0;

    var resultado = secoes.map(function (secao) {
      var termosTitulo = palavrasDe(secao.titulo || "").filter(ehConteudo).map(normalizar);
      var n = secao.frases.length;
      totalFrases += n;

      var quantas = Math.max(1, Math.round(n * proporcao));
      if (quantas > n) { quantas = n; }

      var pontuadas = secao.frases.map(function (f, i) {
        return { indice: i, frase: f, nota: pontuarFrase(f, freq, i, n, termosTitulo) };
      });

      var escolhidas = pontuadas
        .slice()
        .sort(function (a, b) { return b.nota - a.nota; })
        .slice(0, quantas)
        .sort(function (a, b) { return a.indice - b.indice; })
        .map(function (x) { return x.frase; });

      totalResumo += escolhidas.length;
      return {
        titulo: secao.titulo,
        frases: escolhidas,
        totalNaSecao: n
      };
    });

    return {
      tamanho: tamanho,
      secoes: resultado,
      frasesTotal: totalFrases,
      frasesResumo: totalResumo,
      semEstrutura: resultado.length === 1 && !resultado[0].titulo
    };
  }

  /* ---------------------------------------------------------- glossario */

  /* Termo tecnico recorrente, com o trecho onde apareceu pela primeira vez.
     Prefere expressao de duas palavras quando ela se repete: "desvio padrao"
     diz mais que "desvio" e "padrao" separados. */
  /* Quebra por linha antes de quebrar por frase: senao o titulo de uma secao,
     que nao termina em ponto, gruda na primeira frase do paragrafo seguinte e
     o trecho de contexto sai estranho. */
  function frasesPorLinha(texto) {
    var saida = [];
    String(texto || "").split(/\r?\n/).forEach(function (linha) {
      emFrases(linha).forEach(function (f) { saida.push(f); });
    });
    return saida;
  }

  function glossario(texto, limite, limiares) {
    var minBigrama = (limiares && limiares.bigrama) || 3;
    var minUnigrama = (limiares && limiares.unigrama) || 4;
    var frases = frasesPorLinha(texto);
    if (!frases.length) { return []; }

    var unigramas = {};
    var bigramas = {};
    var original = {};

    frases.forEach(function (frase) {
      var palavras = palavrasDe(frase);
      for (var i = 0; i < palavras.length; i++) {
        if (!ehConteudo(palavras[i])) { continue; }
        var a = normalizar(palavras[i]);
        unigramas[a] = (unigramas[a] || 0) + 1;
        if (!original[a]) { original[a] = palavras[i].toLowerCase(); }

        if (i + 1 < palavras.length && ehConteudo(palavras[i + 1])) {
          var b = normalizar(palavras[i + 1]);
          var par = a + " " + b;
          bigramas[par] = (bigramas[par] || 0) + 1;
          if (!original[par]) {
            original[par] = (palavras[i] + " " + palavras[i + 1]).toLowerCase();
          }
        }
      }
    });

    var termos = [];
    var dentroDeBigrama = {};

    Object.keys(bigramas).forEach(function (par) {
      if (bigramas[par] < minBigrama) { return; }
      termos.push({ chave: par, termo: original[par], ocorrencias: bigramas[par], peso: bigramas[par] * 2.2 });
      par.split(" ").forEach(function (p) { dentroDeBigrama[p] = true; });
    });

    Object.keys(unigramas).forEach(function (p) {
      if (unigramas[p] < minUnigrama || dentroDeBigrama[p]) { return; }
      termos.push({ chave: p, termo: original[p], ocorrencias: unigramas[p], peso: unigramas[p] });
    });

    termos.sort(function (a, b) { return b.peso - a.peso; });
    termos = termos.slice(0, limite || 20);

    /* Trecho de contexto: a primeira frase com corpo em que o termo aparece.
       Titulo de secao tambem contem o termo, mas nao explica nada — so serve
       de contexto se nao houver frase de verdade. */
    termos.forEach(function (t) {
      var alvo = t.chave.split(" ").join(" ");
      var reserva = null;
      for (var i = 0; i < frases.length; i++) {
        var normalizada = palavrasDe(frases[i]).map(normalizar).join(" ");
        if (normalizada.indexOf(alvo) < 0) { continue; }
        if (palavrasDe(frases[i]).length >= 8) { t.trecho = frases[i]; return; }
        if (!reserva) { reserva = frases[i]; }
      }
      t.trecho = reserva;
    });

    return termos.filter(function (t) { return t.trecho; });
  }

  /* -------------------------------------------------------- mapa mental */

  /* Raiz = documento. Nivel 1 = secoes. Nivel 2 = termos que mais pesam
     dentro de cada secao. Sem estrutura, as ideias principais viram os ramos. */
  function mapaMental(texto, titulo, opcoes) {
    var o = opcoes || {};
    var secoes = emSecoes(texto, o.titulos);
    var nos = [];
    var id = 0;

    function novo(pai, rotulo, nivel) {
      var no = {
        id: "n" + (id++),
        pai: pai,
        texto: String(rotulo || "").slice(0, 70),
        nivel: nivel,
        editado: false,
        recolhido: false,
        x: null,
        y: null
      };
      nos.push(no);
      return no;
    }

    var raiz = novo(null, titulo || "Documento", 0);

    if (!secoes.length) {
      return { titulo: raiz.texto, nos: nos, gerado: true, vazio: true };
    }

    /* Sem titulo nenhum o mapa vira as ideias principais do texto inteiro.
       Limiar baixo de proposito: texto curto sem estrutura nao repete termo
       quatro vezes, e um mapa so com a raiz nao serve para nada. */
    if (secoes.length === 1 && !secoes[0].titulo) {
      var termos = glossario(texto, 7, { bigrama: 2, unigrama: 2 });

      if (termos.length) {
        termos.forEach(function (t) {
          var ramo = novo(raiz.id, t.termo, 1);
          if (t.trecho) { novo(ramo.id, t.trecho.slice(0, 90), 2); }
        });
      } else {
        /* nem termo repetido existe: usa as frases de maior peso como ramos */
        var r = resumir(texto, { tamanho: "medio" });
        var frases = [];
        r.secoes.forEach(function (sec) {
          sec.frases.forEach(function (f) { frases.push(f); });
        });
        if (!frases.length) { frases = secoes[0].frases.slice(0, 5); }
        frases.slice(0, 7).forEach(function (f) { novo(raiz.id, f.slice(0, 70), 1); });
      }
      return { titulo: raiz.texto, nos: nos, gerado: true, semEstrutura: true };
    }

    secoes.slice(0, 10).forEach(function (secao) {
      var ramo = novo(raiz.id, secao.titulo || "Sem titulo", 1);
      glossario(secao.texto, 4, { bigrama: 2, unigrama: 2 }).forEach(function (t) {
        novo(ramo.id, t.termo, 2);
      });
    });

    return { titulo: raiz.texto, nos: nos, gerado: true };
  }

  /* Posiciona a arvore da esquerda para a direita. Cada folha ocupa uma faixa
     vertical; o pai fica no meio dos filhos. */
  function posicionar(nos, opcoes) {
    var o = opcoes || {};
    var larguraNivel = o.larguraNivel || 250;
    var alturaLinha = o.alturaLinha || 46;

    var porPai = {};
    nos.forEach(function (n) {
      var chave = n.pai || "raiz";
      (porPai[chave] = porPai[chave] || []).push(n);
    });

    var visiveis = {};
    function marcarVisiveis(no) {
      visiveis[no.id] = true;
      if (no.recolhido) { return; }
      (porPai[no.id] || []).forEach(marcarVisiveis);
    }
    (porPai.raiz || []).forEach(marcarVisiveis);

    var linha = 0;
    function colocar(no) {
      if (!visiveis[no.id]) { return null; }
      var filhos = no.recolhido ? [] : (porPai[no.id] || []).filter(function (f) { return visiveis[f.id]; });

      if (!filhos.length) {
        no.x = no.x === null || !o.manter ? no.nivel * larguraNivel : no.x;
        no.y = no.y === null || !o.manter ? (linha++) * alturaLinha : no.y;
        return no.y;
      }

      var ys = filhos.map(colocar).filter(function (v) { return v !== null; });
      no.x = no.x === null || !o.manter ? no.nivel * larguraNivel : no.x;
      var meio = ys.length ? (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2 : (linha++) * alturaLinha;
      no.y = no.y === null || !o.manter ? meio : no.y;
      return no.y;
    }

    (porPai.raiz || []).forEach(colocar);
    return { visiveis: visiveis, porPai: porPai, linhas: linha };
  }

  /* ----------------------------------------------------------- exportar */

  function paraMarkdown(mapa) {
    var porPai = {};
    mapa.nos.forEach(function (n) {
      var chave = n.pai || "raiz";
      (porPai[chave] = porPai[chave] || []).push(n);
    });

    var linhas = [];
    function escrever(no, profundidade) {
      if (profundidade === 0) {
        linhas.push("# " + no.texto);
      } else {
        linhas.push(new Array(profundidade).join("  ") + "- " + no.texto);
      }
      (porPai[no.id] || []).forEach(function (f) { escrever(f, profundidade + 1); });
    }
    (porPai.raiz || []).forEach(function (r) { escrever(r, 0); });
    linhas.push("");
    linhas.push("_Mapa gerado automaticamente pelo Portal do Conhecimento._");
    return linhas.join("\n");
  }


  /* ---------------------------------------------------------------- tela */

  /* PDC.ui so existe depois que ui.js carregou. Resolver aqui no corpo do
     arquivo violaria a regra de ordem de carregamento (ARQUITETURA §1.1),
     e quebraria os validadores em Node, que carregam este arquivo sozinho. */
  var ui = null;
  var el = null;

  function prepararUi() {
    if (!ui) { ui = PDC.ui; el = ui.el; }
  }

  var NS = "http://www.w3.org/2000/svg";

  function svg(tag, atributos, filhos) {
    var no = document.createElementNS(NS, tag);
    Object.keys(atributos || {}).forEach(function (k) {
      if (atributos[k] === null || atributos[k] === undefined) { return; }
      no.setAttribute(k, String(atributos[k]));
    });
    (filhos || []).forEach(function (f) { no.appendChild(f); });
    return no;
  }

  /* ------------------------------------------------------- persistencia */

  function lerEstudio(origemId) {
    return PDC.db.porIndice("mapas", "origemId", origemId).then(function (lista) {
      return (lista && lista[0]) || null;
    });
  }

  function gravarEstudio(registro) {
    registro.atualizadoEm = PDC.util.agoraISO();
    return PDC.db.gravar("mapas", registro).then(function () { return registro; });
  }

  /* ------------------------------------------------------------- resumo */

  function painelResumo(origem, estado) {
    var caixa = el("div");
    var area = el("div", { "class": "mt-4" });
    var tamanho = estado.tamanhoResumo || "medio";

    function desenhar() {
      ui.limpar(area);
      var r = resumir(origem.texto, { tamanho: tamanho, titulos: origem.titulos });

      if (!r.secoes.length) {
        area.appendChild(ui.vazio("documento", "Nao ha texto para resumir",
          "Este documento nao tem texto extraivel. Em PDF escaneado isso e esperado."));
        return;
      }

      area.appendChild(el("p", { "class": "txt-mini txt-fraco",
        texto: r.frasesResumo + " frases selecionadas de " + r.frasesTotal +
               " (" + Math.round((r.frasesResumo / r.frasesTotal) * 100) + "% do texto)" +
               (r.semEstrutura ? " · nenhum titulo detectado: o texto foi tratado como bloco unico" : "") }));

      r.secoes.forEach(function (secao) {
        var partes = [];
        if (secao.titulo) {
          partes.push(el("h4", { "class": "mb-3", texto: secao.titulo }));
        }
        partes.push(el("ul", { "class": "resumo-lista" }, secao.frases.map(function (f) {
          return el("li", { texto: f });
        })));
        partes.push(el("div", { "class": "txt-mini txt-fraco mt-3",
          texto: secao.frases.length + " de " + secao.totalNaSecao + " frases" }));
        area.appendChild(ui.cartao(partes));
        area.appendChild(el("div", { "class": "mt-3" }));
      });
    }

    var botoes = ["curto", "medio", "longo"].map(function (t) {
      var b = el("button", {
        "class": "chip" + (t === tamanho ? " ativo" : ""), type: "button",
        onclick: function () {
          tamanho = t;
          estado.tamanhoResumo = t;
          botoes.forEach(function (x) { x.classList.toggle("ativo", x === b); });
          desenhar();
        }
      }, [ui.txt(t)]);
      return b;
    });

    caixa.appendChild(ui.aviso("info",
      "Este resumo e automatico e extrativo: o portal seleciona e organiza frases que ja " +
      "existem no texto. Ele nao reescreve nem interpreta, e por isso nada aqui foi inventado."));
    caixa.appendChild(el("div", { "class": "linha mt-4" },
      [el("span", { "class": "txt-pequeno", texto: "Tamanho:" })].concat(botoes)));
    caixa.appendChild(area);
    desenhar();
    return caixa;
  }

  /* ---------------------------------------------------------- glossario */

  function painelGlossario(origem) {
    var termos = glossario(origem.texto, 20);
    if (!termos.length) {
      return ui.vazio("lampada", "Nenhum termo recorrente",
        "O glossario reune termos que se repetem. Este texto e curto demais ou muito variado.");
    }

    return el("div", null, [
      ui.aviso("info", "Termos que mais se repetem no texto, com a primeira frase em que aparecem. " +
        "Lista gerada automaticamente."),
      el("div", { "class": "mt-4" }, termos.map(function (t) {
        return el("div", { "class": "cartao glossario-item" }, [
          el("div", { "class": "linha-entre" }, [
            el("strong", { texto: t.termo }),
            ui.etiqueta(t.ocorrencias + "x")
          ]),
          el("p", { "class": "txt-pequeno txt-fraco sem-margem mt-3", texto: t.trecho })
        ]);
      }))
    ]);
  }

  /* -------------------------------------------------------- mapa mental */

  var LARGURA_NO = 190;
  var ALTURA_NO = 34;

  function quebrarTexto(texto, porLinha, maxLinhas) {
    var palavras = String(texto || "").split(/\s+/);
    var linhas = [];
    var atual = "";
    palavras.forEach(function (p) {
      if (!atual.length) { atual = p; }
      else if ((atual + " " + p).length <= porLinha) { atual += " " + p; }
      else { linhas.push(atual); atual = p; }
    });
    if (atual.length) { linhas.push(atual); }
    if (linhas.length > maxLinhas) {
      linhas = linhas.slice(0, maxLinhas);
      linhas[maxLinhas - 1] = linhas[maxLinhas - 1].slice(0, porLinha - 1) + "…";
    }
    return linhas;
  }

  function painelMapa(origem, estado) {
    var caixa = el("div");
    var palco = el("div", { "class": "mapa-palco" });
    var aviso = el("div");
    var selecionado = null;

    var mapa = estado.mapa && estado.mapa.nos && estado.mapa.nos.length
      ? estado.mapa
      : mapaMental(origem.texto, origem.titulo, { titulos: origem.titulos });
    estado.mapa = mapa;

    var campoEdicao = el("input", { "class": "entrada", type: "text",
      placeholder: "selecione um no para editar", disabled: true });

    function salvar() {
      estado.salvar();
    }

    function desenhar() {
      posicionar(mapa.nos, { manter: true, larguraNivel: LARGURA_NO + 70, alturaLinha: 44 });
      var info = posicionar(mapa.nos, { manter: true });
      ui.limpar(palco);

      var visiveis = mapa.nos.filter(function (n) { return info.visiveis[n.id]; });
      if (!visiveis.length) {
        palco.appendChild(ui.vazio("mapa", "Mapa vazio", "Nao foi possivel extrair estrutura deste texto."));
        return;
      }

      var minX = Math.min.apply(null, visiveis.map(function (n) { return n.x; })) - 20;
      var maxX = Math.max.apply(null, visiveis.map(function (n) { return n.x; })) + LARGURA_NO + 40;
      var minY = Math.min.apply(null, visiveis.map(function (n) { return n.y; })) - 30;
      var maxY = Math.max.apply(null, visiveis.map(function (n) { return n.y; })) + ALTURA_NO + 40;

      var raiz = svg("svg", {
        "class": "mapa-svg",
        width: maxX - minX, height: maxY - minY,
        viewBox: minX + " " + minY + " " + (maxX - minX) + " " + (maxY - minY),
        role: "img", "aria-label": "Mapa mental de " + origem.titulo
      });

      var camadaLinhas = svg("g", { "class": "mapa-linhas" });
      var camadaNos = svg("g", null);
      raiz.appendChild(camadaLinhas);
      raiz.appendChild(camadaNos);

      visiveis.forEach(function (no) {
        if (!no.pai) { return; }
        var pai = mapa.nos.filter(function (p) { return p.id === no.pai; })[0];
        if (!pai || !info.visiveis[pai.id]) { return; }
        var x1 = pai.x + LARGURA_NO;
        var y1 = pai.y + ALTURA_NO / 2;
        var x2 = no.x;
        var y2 = no.y + ALTURA_NO / 2;
        var meio = (x1 + x2) / 2;
        camadaLinhas.appendChild(svg("path", {
          d: "M" + x1 + "," + y1 + " C" + meio + "," + y1 + " " + meio + "," + y2 + " " + x2 + "," + y2,
          "class": "mapa-linha"
        }));
      });

      visiveis.forEach(function (no) {
        var filhos = mapa.nos.filter(function (f) { return f.pai === no.id; });
        var grupo = svg("g", {
          "class": "mapa-no nivel" + Math.min(no.nivel, 2) +
                   (no.editado ? " editado" : "") + (selecionado === no.id ? " selecionado" : ""),
          transform: "translate(" + no.x + "," + no.y + ")",
          tabindex: "0", role: "button",
          "aria-label": no.texto
        });

        grupo.appendChild(svg("rect", {
          width: LARGURA_NO, height: ALTURA_NO, rx: 6, "class": "mapa-caixa"
        }));

        var linhas = quebrarTexto(no.texto, 26, 2);
        var texto = svg("text", { x: 10, y: linhas.length > 1 ? 14 : 21, "class": "mapa-rotulo" });
        linhas.forEach(function (linha, i) {
          var t = svg("tspan", { x: 10, dy: i === 0 ? 0 : 13 });
          t.appendChild(document.createTextNode(linha));
          texto.appendChild(t);
        });
        grupo.appendChild(texto);

        if (filhos.length) {
          var alternar = svg("g", { "class": "mapa-alternar", transform: "translate(" + LARGURA_NO + "," + (ALTURA_NO / 2) + ")" });
          alternar.appendChild(svg("circle", { r: 8, "class": "mapa-bolinha" }));
          var sinal = svg("text", { x: 0, y: 4, "text-anchor": "middle", "class": "mapa-sinal" });
          sinal.appendChild(document.createTextNode(no.recolhido ? "+" : "-"));
          alternar.appendChild(sinal);
          alternar.addEventListener("click", function (ev) {
            ev.stopPropagation();
            no.recolhido = !no.recolhido;
            salvar();
            desenhar();
          });
          grupo.appendChild(alternar);
        }

        /* arrastar */
        var arrastando = false;
        var inicioX = 0, inicioY = 0, baseX = 0, baseY = 0;
        grupo.addEventListener("pointerdown", function (ev) {
          if (ev.target.closest && ev.target.closest(".mapa-alternar")) { return; }
          arrastando = true;
          inicioX = ev.clientX; inicioY = ev.clientY;
          baseX = no.x; baseY = no.y;
          grupo.setPointerCapture(ev.pointerId);
          selecionar(no);
        });
        grupo.addEventListener("pointermove", function (ev) {
          if (!arrastando) { return; }
          no.x = baseX + (ev.clientX - inicioX);
          no.y = baseY + (ev.clientY - inicioY);
          grupo.setAttribute("transform", "translate(" + no.x + "," + no.y + ")");
        });
        grupo.addEventListener("pointerup", function () {
          if (!arrastando) { return; }
          arrastando = false;
          salvar();
          desenhar();
        });
        grupo.addEventListener("click", function () { selecionar(no); });
        grupo.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selecionar(no); }
        });

        camadaNos.appendChild(grupo);
      });

      palco.appendChild(raiz);
    }

    function selecionar(no) {
      selecionado = no.id;
      campoEdicao.disabled = false;
      campoEdicao.value = no.texto;
      desenhar();
    }

    function noSelecionado() {
      return mapa.nos.filter(function (n) { return n.id === selecionado; })[0] || null;
    }

    campoEdicao.addEventListener("change", function () {
      var no = noSelecionado();
      if (!no) { return; }
      no.texto = campoEdicao.value.slice(0, 70);
      no.editado = true;
      salvar();
      desenhar();
    });

    /* exportar em PNG: serializa o SVG com as cores ja resolvidas, porque o
       arquivo exportado nao tem acesso as variaveis de tema da pagina */
    function exportarPng() {
      var original = palco.querySelector("svg");
      if (!original) { return; }
      ui.limpar(aviso);

      var copia = original.cloneNode(true);
      var estilo = getComputedStyle(document.body);
      var cores = {
        fundo: estilo.getPropertyValue("--superficie").trim(),
        borda: estilo.getPropertyValue("--borda-forte").trim(),
        texto: estilo.getPropertyValue("--txt-forte").trim(),
        linha: estilo.getPropertyValue("--borda-forte").trim(),
        acento: estilo.getPropertyValue("--acento").trim()
      };

      copia.querySelectorAll(".mapa-caixa").forEach(function (r) {
        r.setAttribute("fill", cores.fundo);
        r.setAttribute("stroke", cores.borda);
      });
      copia.querySelectorAll(".mapa-rotulo, .mapa-sinal").forEach(function (t) {
        t.setAttribute("fill", cores.texto);
        t.setAttribute("font-family", "system-ui, Segoe UI, Arial, sans-serif");
        t.setAttribute("font-size", "12");
      });
      copia.querySelectorAll(".mapa-linha").forEach(function (l) {
        l.setAttribute("stroke", cores.linha);
        l.setAttribute("fill", "none");
      });
      copia.querySelectorAll(".mapa-bolinha").forEach(function (c) {
        c.setAttribute("fill", cores.fundo);
        c.setAttribute("stroke", cores.acento);
      });

      var largura = Number(original.getAttribute("width")) || 900;
      var altura = Number(original.getAttribute("height")) || 600;
      var fundo = svg("rect", { x: -5000, y: -5000, width: 20000, height: 20000, fill: cores.fundo });
      copia.insertBefore(fundo, copia.firstChild);

      var texto = new XMLSerializer().serializeToString(copia);
      var url = URL.createObjectURL(new Blob([texto], { type: "image/svg+xml;charset=utf-8" }));
      var imagem = new Image();

      imagem.onload = function () {
        var tela = document.createElement("canvas");
        tela.width = largura * 2;
        tela.height = altura * 2;
        var ctx = tela.getContext("2d");
        ctx.scale(2, 2);
        ctx.drawImage(imagem, 0, 0);
        URL.revokeObjectURL(url);
        tela.toBlob(function (blob) {
          if (!blob) {
            aviso.appendChild(ui.aviso("erro", "Nao foi possivel gerar a imagem."));
            return;
          }
          baixar(blob, nomeArquivo(origem.titulo) + ".png");
        }, "image/png");
      };
      imagem.onerror = function () {
        URL.revokeObjectURL(url);
        aviso.appendChild(ui.aviso("erro",
          "Nao foi possivel converter o mapa em imagem. Use a exportacao em Markdown."));
      };
      imagem.src = url;
    }

    function exportarMarkdown() {
      var texto = paraMarkdown(mapa);
      baixar(new Blob([texto], { type: "text/markdown;charset=utf-8" }),
        nomeArquivo(origem.titulo) + ".md");
    }

    var barra = el("div", { "class": "linha mb-3 quebra" }, [
      ui.botao("Refazer do texto", {
        icone: "atualizar",
        titulo: "Descarta as suas edicoes e gera o mapa de novo",
        aoClicar: function () {
          mapa = mapaMental(origem.texto, origem.titulo, { titulos: origem.titulos });
          estado.mapa = mapa;
          selecionado = null;
          campoEdicao.value = "";
          campoEdicao.disabled = true;
          salvar();
          desenhar();
        }
      }),
      ui.botao("Adicionar no", {
        icone: "mais",
        aoClicar: function () {
          var pai = noSelecionado() || mapa.nos[0];
          var novo = {
            id: PDC.util.novoId("mm"), pai: pai.id, texto: "novo topico",
            nivel: Math.min(pai.nivel + 1, 3), editado: true, recolhido: false, x: null, y: null
          };
          pai.recolhido = false;
          mapa.nos.push(novo);
          salvar();
          selecionar(novo);
        }
      }),
      ui.botao("Remover no", {
        variante: "perigo", icone: "lixeira",
        aoClicar: function () {
          var no = noSelecionado();
          if (!no || !no.pai) { return; }
          var remover = {};
          (function marcar(id) {
            remover[id] = true;
            mapa.nos.filter(function (f) { return f.pai === id; }).forEach(function (f) { marcar(f.id); });
          })(no.id);
          mapa.nos = mapa.nos.filter(function (n) { return !remover[n.id]; });
          estado.mapa = mapa;
          selecionado = null;
          campoEdicao.disabled = true;
          campoEdicao.value = "";
          salvar();
          desenhar();
        }
      }),
      el("span", { "class": "espaco" }),
      ui.botao("PNG", { icone: "baixar", aoClicar: exportarPng }),
      ui.botao("Markdown", { icone: "baixar", aoClicar: exportarMarkdown })
    ]);

    caixa.appendChild(ui.aviso("info",
      "Mapa gerado automaticamente da estrutura do texto. Clique em um no para editar, " +
      "arraste para reposicionar e use o sinal para recolher um ramo."));
    caixa.appendChild(el("div", { "class": "mt-4" }, [barra]));
    caixa.appendChild(el("label", { "class": "campo" }, [
      el("span", { "class": "campo-rotulo", texto: "Texto do no selecionado" }),
      campoEdicao
    ]));
    caixa.appendChild(aviso);
    caixa.appendChild(palco);
    desenhar();
    return caixa;
  }

  function nomeArquivo(titulo) {
    return String(titulo || "mapa").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 50) || "mapa";
  }

  function baixar(blob, nome) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nome;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* --------------------------------------------------------------- ficha */

  var CAMPOS_FICHA = [
    { chave: "aprendi", rotulo: "O que aprendi", dica: "em uma ou duas frases, com suas palavras" },
    { chave: "aplico", rotulo: "Onde aplico no meu trabalho", dica: "situacao concreta, nesta semana ou no proximo mes" },
    { chave: "duvidas", rotulo: "O que ainda nao entendi", dica: "vira a sua proxima lista de estudo" }
  ];

  function painelFicha(origem, estado) {
    var ficha = estado.ficha || {};
    var recado = el("div", { "class": "mt-3" });
    var areas = {};

    var campos = CAMPOS_FICHA.map(function (c) {
      areas[c.chave] = el("textarea", { "class": "area", rows: "3" }, [ficha[c.chave] || ""]);
      return el("label", { "class": "campo" }, [
        el("span", { "class": "campo-rotulo", texto: c.rotulo }),
        areas[c.chave],
        el("span", { "class": "campo-ajuda", texto: c.dica })
      ]);
    });

    return el("div", null, [
      ui.aviso("info", "Esta ficha e sua: nada aqui e automatico. " +
        "O campo do que voce nao entendeu costuma ser o mais util depois."),
      ui.cartao(campos.concat([
        el("div", { "class": "linha" }, [
          ui.botao("Salvar ficha", {
            variante: "primario", icone: "salvar",
            aoClicar: function () {
              estado.ficha = {};
              CAMPOS_FICHA.forEach(function (c) { estado.ficha[c.chave] = areas[c.chave].value; });
              estado.salvar().then(function () {
                ui.limpar(recado);
                recado.appendChild(ui.aviso("ok", "Ficha salva."));
              }, function (erro) {
                ui.limpar(recado);
                recado.appendChild(ui.aviso("erro", "Nao foi possivel salvar: " + erro.message));
              });
            }
          })
        ]),
        recado
      ]))
    ]);
  }

  /* ---------------------------------------------------------- tela geral */

  /* origem: { id, titulo, texto, titulos? }
     id nulo significa texto avulso: funciona igual, mas nao e guardado. */
  function tela(origem) {
    prepararUi();
    var raiz = el("div");
    var conteudo = el("div", { "class": "mt-4" });

    var estado = {
      mapa: null,
      ficha: {},
      tamanhoResumo: "medio",
      registro: null,
      salvar: function () {
        if (!origem.id) { return Promise.resolve(); }
        var r = estado.registro || {
          id: PDC.util.novoId("mm"),
          origemId: origem.id,
          titulo: origem.titulo,
          gerado: true
        };
        r.nos = (estado.mapa && estado.mapa.nos) || [];
        r.ficha = estado.ficha;
        estado.registro = r;
        return gravarEstudio(r);
      }
    };

    var abas = [
      { chave: "resumo", rotulo: "Resumo", montar: function () { return painelResumo(origem, estado); } },
      { chave: "glossario", rotulo: "Glossario", montar: function () { return painelGlossario(origem); } },
      { chave: "mapa", rotulo: "Mapa mental", montar: function () { return painelMapa(origem, estado); } },
      { chave: "ficha", rotulo: "Ficha de leitura", montar: function () { return painelFicha(origem, estado); } }
    ];

    var botoes = [];
    function abrir(chave) {
      botoes.forEach(function (b) { b.classList.toggle("ativa", b.dataset.chave === chave); });
      ui.limpar(conteudo);
      var aba = abas.filter(function (a) { return a.chave === chave; })[0];
      conteudo.appendChild(aba.montar());
    }

    var barraAbas = el("div", { "class": "abas" }, abas.map(function (a) {
      var b = el("button", { "class": "aba", type: "button", "data-chave": a.chave,
        onclick: function () { abrir(a.chave); } }, [ui.txt(a.rotulo)]);
      botoes.push(b);
      return b;
    }));

    raiz.appendChild(barraAbas);
    raiz.appendChild(conteudo);

    var semTexto = !origem.texto || !origem.texto.trim().length;
    if (semTexto) {
      ui.limpar(conteudo);
      conteudo.appendChild(ui.aviso("atencao",
        "Este documento nao tem texto extraivel, entao resumo, glossario e mapa mental " +
        "nao podem ser gerados. Em PDF escaneado isso e esperado: o portal nao faz OCR."));
      barraAbas.classList.add("oculto");
      return raiz;
    }

    if (origem.id) {
      lerEstudio(origem.id).then(function (registro) {
        if (registro) {
          estado.registro = registro;
          estado.ficha = registro.ficha || {};
          if (registro.nos && registro.nos.length) { estado.mapa = { nos: registro.nos }; }
        }
        abrir("resumo");
      }, function () { abrir("resumo"); });
    } else {
      abrir("resumo");
    }

    return raiz;
  }

  PDC.compreensao = {
    VAZIAS: VAZIAS,
    TAMANHOS: TAMANHOS,
    emFrases: emFrases,
    frasesPorLinha: frasesPorLinha,
    emSecoes: emSecoes,
    pareceTitulo: pareceTitulo,
    frequencias: frequencias,
    resumir: resumir,
    glossario: glossario,
    mapaMental: mapaMental,
    posicionar: posicionar,
    paraMarkdown: paraMarkdown,
    normalizar: normalizar,
    tela: tela
  };
})();
