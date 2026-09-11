/* leitor.js — leitura de PDF e Word dentro do portal.

   PDF   -> PDF.js 3.11.174 (UMD; a versao 4 e so ES module e quebraria a
            ordem de carregamento definida em docs/ARQUITETURA.md §1.1)
   .docx -> mammoth 1.9.0, com o HTML resultante passado por lista de permissao

   RN-005: o arquivo fica no IndexedDB da maquina do dono. Nenhuma requisicao
   de rede carrega conteudo do arquivo. As unicas chamadas externas sao os
   dois scripts de CDN, carregados sob demanda.

   Ancoragem de destaque (ARQUITETURA §3.8): pagina + deslocamento no texto
   extraido, com o texto exato guardado junto. Se o deslocamento nao bater,
   procura o texto na pagina e reancora; se nao achar, marca como orfao em vez
   de destacar o trecho errado. */

(function () {
  "use strict";

  var PDC = window.PDC;
  var ui = PDC.ui;
  var el = ui.el;

  var PDFJS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  var PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  var MAMMOTH_URL = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.9.0/mammoth.browser.min.js";

  /* O PDF.js baixa sob demanda os dados das fontes padrao (Helvetica, Times,
     Courier) e as tabelas de caractere CJK. Sem estes dois enderecos, um PDF
     que use fonte padrao fica com a pagina em branco e a renderizacao nunca
     conclui — sem erro nenhum, o que e pior. */
  var PDFJS_BASE = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/";
  var PDFJS_FONTES = PDFJS_BASE + "standard_fonts/";
  var PDFJS_CMAPS = PDFJS_BASE + "cmaps/";
  var LIMITE_RENDER = 30000;

  var AVISO_TAMANHO = 20 * 1024 * 1024;
  var CORES = [1, 2, 3, 4];

  /* ------------------------------------------------------- carregar libs */

  function prepararPdf(aoAvisar) {
    if (window.pdfjsLib) { return Promise.resolve(window.pdfjsLib); }
    if (aoAvisar) { aoAvisar("Carregando o leitor de PDF"); }
    return PDC.util.carregarScript(PDFJS_URL, "pdfjsLib", 60000).then(function (lib) {
      lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      return lib;
    });
  }

  function prepararDocx(aoAvisar) {
    if (window.mammoth) { return Promise.resolve(window.mammoth); }
    if (aoAvisar) { aoAvisar("Carregando o leitor de Word"); }
    return PDC.util.carregarScript(MAMMOTH_URL, "mammoth", 60000);
  }

  /* ---------------------------------------------------------- arquivos */

  function guardarArquivo(livroId, arquivo) {
    return PDC.db.espaco().then(function () {
      return PDC.db.gravar("arquivos", {
        livroId: livroId,
        blob: arquivo,
        nome: arquivo.name,
        tamanho: arquivo.size,
        mime: arquivo.type || ""
      });
    });
  }

  function lerArquivo(livroId) {
    return PDC.db.obter("arquivos", livroId);
  }

  function guardarTexto(livroId, paginas, estrutura) {
    return PDC.db.gravar("textos", {
      livroId: livroId, paginas: paginas, estrutura: estrutura || []
    });
  }

  function lerTexto(livroId) {
    return PDC.db.obter("textos", livroId);
  }

  function formatoDe(arquivo) {
    var nome = (arquivo.name || "").toLowerCase();
    if (nome.endsWith(".pdf") || arquivo.type === "application/pdf") { return "pdf"; }
    if (nome.endsWith(".docx")) { return "docx"; }
    if (nome.endsWith(".doc")) { return "doc_antigo"; }
    return null;
  }

  /* ------------------------------------------------------------ extracao */

  /* Concatena os pedacos de texto de uma pagina e guarda, para cada pedaco,
     onde ele comeca e termina na string final. E esse mapa que permite ir da
     selecao do usuario para um deslocamento estavel, e voltar. */
  function montarTextoDaPagina(itens) {
    var partes = [];
    var mapa = [];
    var pos = 0;
    itens.forEach(function (item, indice) {
      var s = item.str || "";
      if (s.length) {
        mapa.push({ indice: indice, inicio: pos, fim: pos + s.length });
        partes.push(s);
        pos += s.length;
      }
      if (item.hasEOL) { partes.push("\n"); pos += 1; }
    });
    return { texto: partes.join(""), mapa: mapa };
  }

  function extrairPdf(pdf, aoProgresso) {
    var paginas = [];
    var fila = Promise.resolve();
    for (var n = 1; n <= pdf.numPages; n++) {
      (function (numero) {
        fila = fila.then(function () {
          return pdf.getPage(numero).then(function (pagina) {
            return pagina.getTextContent();
          }).then(function (conteudo) {
            paginas[numero - 1] = montarTextoDaPagina(conteudo.items).texto;
            if (aoProgresso) { aoProgresso(numero, pdf.numPages); }
          });
        });
      })(n);
    }
    return fila.then(function () { return paginas; });
  }

  /* --------------------------------------------------- HTML seguro do docx */

  var TAGS_OK = {
    P: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, UL: 1, OL: 1, LI: 1,
    TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, STRONG: 1, B: 1,
    EM: 1, I: 1, U: 1, BR: 1, BLOCKQUOTE: 1, PRE: 1, CODE: 1, HR: 1,
    SUP: 1, SUB: 1, A: 1, IMG: 1, SPAN: 1, DIV: 1
  };

  /* Copia so o que esta na lista de permissao. Usa DOMParser, que nao executa
     script, e reconstroi no por no: nada do documento de origem chega inteiro
     ao DOM da pagina. */
  function copiarSeguro(origem, destino) {
    var filhos = origem.childNodes;
    for (var i = 0; i < filhos.length; i++) {
      var no = filhos[i];

      if (no.nodeType === 3) {
        destino.appendChild(document.createTextNode(no.nodeValue));
        continue;
      }
      if (no.nodeType !== 1) { continue; }
      if (!TAGS_OK[no.tagName]) {
        copiarSeguro(no, destino);   /* tag nao permitida: aproveita o conteudo */
        continue;
      }

      var novo = document.createElement(no.tagName.toLowerCase());

      if (no.tagName === "A") {
        var href = PDC.util.urlSegura(no.getAttribute("href"));
        if (href) {
          novo.setAttribute("href", href);
          novo.setAttribute("target", "_blank");
          novo.setAttribute("rel", "noopener noreferrer");
        }
      }
      if (no.tagName === "IMG") {
        var src = no.getAttribute("src") || "";
        /* mammoth embute imagem como data URI; qualquer outra origem e descartada */
        if (src.indexOf("data:image/") === 0) {
          novo.setAttribute("src", src);
          novo.setAttribute("alt", no.getAttribute("alt") || "");
          novo.setAttribute("loading", "lazy");
        } else {
          continue;
        }
      }
      if (no.tagName === "TH" || no.tagName === "TD") {
        ["colspan", "rowspan"].forEach(function (a) {
          var v = parseInt(no.getAttribute(a), 10);
          if (v > 1 && v < 100) { novo.setAttribute(a, String(v)); }
        });
      }

      copiarSeguro(no, novo);
      destino.appendChild(novo);
    }
  }

  function htmlSeguro(html) {
    var doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    var caixa = document.createElement("div");
    caixa.className = "doc-html";
    copiarSeguro(doc.body, caixa);
    return caixa;
  }

  /* Percorre os nos de texto na ordem, montando a string do documento e o
     mapa de deslocamentos. Mesma ideia da pagina de PDF. */
  function mapearTextoHtml(raiz) {
    var mapa = [];
    var partes = [];
    var pos = 0;
    var caminhante = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null);
    var no = caminhante.nextNode();
    while (no) {
      var s = no.nodeValue || "";
      if (s.length) {
        mapa.push({ no: no, inicio: pos, fim: pos + s.length });
        partes.push(s);
        pos += s.length;
      }
      no = caminhante.nextNode();
    }
    return { texto: partes.join(""), mapa: mapa };
  }

  /* ---------------------------------------------------------- destaques */

  function destaquesDo(livroId) {
    return PDC.db.porIndice("destaques", "livroId", livroId).then(function (lista) {
      return (lista || []).sort(function (a, b) {
        var pa = (a.ancora && a.ancora.pagina) || 0;
        var pb = (b.ancora && b.ancora.pagina) || 0;
        if (pa !== pb) { return pa - pb; }
        return ((a.ancora && a.ancora.inicio) || 0) - ((b.ancora && b.ancora.inicio) || 0);
      });
    });
  }

  function salvarDestaque(livroId, cor, ancora, texto) {
    return PDC.db.gravar("destaques", {
      id: PDC.util.novoId("h"),
      livroId: livroId,
      cor: cor,
      texto: texto,
      pagina: ancora.pagina || null,
      ancora: ancora,
      criadoEm: PDC.util.agoraISO()
    });
  }

  function removerDestaque(id) {
    return PDC.db.remover("destaques", id).then(function () {
      return PDC.db.porIndice("notas", "livroId", null);
    }, function () { return []; });
  }

  function notasDo(livroId) {
    return PDC.db.porIndice("notas", "livroId", livroId);
  }

  function salvarNota(livroId, destaqueId, texto) {
    return PDC.db.gravar("notas", {
      id: PDC.util.novoId("n"),
      livroId: livroId,
      origem: { tipo: "livro", id: livroId },
      destaqueId: destaqueId || null,
      segundo: null,
      texto: texto,
      criadoEm: PDC.util.agoraISO()
    });
  }

  /* Tenta o deslocamento guardado. Se o texto de la nao for o esperado,
     procura o trecho na pagina inteira. Nao achou: devolve null, e quem chamou
     marca como orfao. Destacar o trecho errado e pior que nao destacar. */
  function reancorar(textoPagina, ancora, textoEsperado) {
    if (!textoEsperado) { return null; }
    var i = ancora.inicio;
    var f = ancora.fim;
    if (i >= 0 && f <= textoPagina.length && textoPagina.slice(i, f) === textoEsperado) {
      return { inicio: i, fim: f, reancorado: false };
    }
    var achado = textoPagina.indexOf(textoEsperado);
    if (achado >= 0) {
      return { inicio: achado, fim: achado + textoEsperado.length, reancorado: true };
    }
    return null;
  }

  /* Converte um par de deslocamentos em um Range do DOM, usando o mapa. */
  function faixaDeDeslocamento(mapa, inicio, fim, pegarNo) {
    var faixa = document.createRange();
    var achouInicio = false;
    for (var i = 0; i < mapa.length; i++) {
      var m = mapa[i];
      var no = pegarNo(m);
      if (!no) { continue; }
      if (!achouInicio && inicio >= m.inicio && inicio <= m.fim) {
        faixa.setStart(no, Math.min(inicio - m.inicio, no.nodeValue.length));
        achouInicio = true;
      }
      if (achouInicio && fim >= m.inicio && fim <= m.fim) {
        faixa.setEnd(no, Math.min(fim - m.inicio, no.nodeValue.length));
        return faixa;
      }
    }
    return achouInicio ? faixa : null;
  }

  /* Deslocamento de uma selecao do usuario, usando o mesmo mapa. */
  function deslocamentoDaSelecao(mapa, selecao, pegarNo) {
    if (!selecao || selecao.isCollapsed || !selecao.rangeCount) { return null; }
    var faixa = selecao.getRangeAt(0);
    var inicio = null;
    var fim = null;

    mapa.forEach(function (m) {
      var no = pegarNo(m);
      if (!no) { return; }
      if (no === faixa.startContainer) { inicio = m.inicio + faixa.startOffset; }
      if (no === faixa.endContainer) { fim = m.inicio + faixa.endOffset; }
    });

    if (inicio === null || fim === null || fim <= inicio) { return null; }
    return { inicio: inicio, fim: fim };
  }


  /* ---------------------------------------------------------------- tela */

  var NOME_COR = { 1: "amarelo", 2: "verde", 3: "azul", 4: "rosa" };

  /* Promessa que nunca resolve trava a tela sem dizer nada. Aqui ela vira erro.

     Com a aba em segundo plano o navegador congela o requestAnimationFrame, e o
     PDF.js depende dele para desenhar: a renderizacao fica parada ate a aba
     voltar a frente. Nesse caso o relogio e rearmado em vez de acusar erro,
     senao quem troca de aba por meio minuto volta e encontra falha falsa. */
  function comLimite(promessa, ms, mensagem) {
    var encerrado = false;
    promessa.then(function () { encerrado = true; }, function () { encerrado = true; });

    return Promise.race([
      promessa,
      new Promise(function (_, rejeitar) {
        function armar() {
          setTimeout(function () {
            if (encerrado) { return; }
            if (document.hidden) { armar(); return; }
            rejeitar(new Error(mensagem));
          }, ms);
        }
        armar();
      })
    ]);
  }

  function bytes(n) {
    if (!n) { return "0 KB"; }
    if (n < 1048576) { return (n / 1024).toFixed(0) + " KB"; }
    return (n / 1048576).toFixed(1).replace(".", ",") + " MB";
  }

  /* Tela de importacao: o arquivo nunca sai desta maquina. */
  function telaImportar(livro, aoImportar) {
    var recado = el("div", { "class": "mt-3" });
    var entrada = el("input", {
      type: "file", "class": "entrada", accept: ".pdf,.docx",
      "aria-label": "Escolher arquivo do computador",
      onchange: function (ev) {
        var arquivo = ev.target.files && ev.target.files[0];
        if (!arquivo) { return; }
        ui.limpar(recado);

        var formato = formatoDe(arquivo);
        if (formato === "doc_antigo") {
          recado.appendChild(ui.aviso("erro",
            "O formato .doc antigo nao e suportado. Abra no Word e salve como .docx."));
          return;
        }
        if (!formato) {
          recado.appendChild(ui.aviso("erro", "Escolha um arquivo .pdf ou .docx."));
          return;
        }
        if (arquivo.size > AVISO_TAMANHO) {
          recado.appendChild(ui.aviso("atencao",
            "Arquivo de " + bytes(arquivo.size) + ". Acima de 20 MB a abertura pode demorar " +
            "e consumir bastante memoria."));
        }
        recado.appendChild(ui.carregando("Guardando o arquivo no seu navegador"));
        aoImportar(arquivo, formato, recado);
      }
    });

    return ui.cartao([
      el("h3", { "class": "mb-3", texto: "Abrir um arquivo" }),
      el("p", { "class": "txt-pequeno",
        texto: "Escolha o PDF ou o Word deste livro. O arquivo fica guardado apenas no " +
               "seu navegador, nesta maquina. Ele nao e enviado para nenhum servidor, " +
               "nem para o GitHub." }),
      entrada,
      el("p", { "class": "txt-mini txt-fraco mt-3 sem-margem",
        texto: "Aceita .pdf e .docx. PDF escaneado abre para leitura, mas sem texto " +
               "extraivel nao da para destacar nem resumir." }),
      recado
    ]);
  }

  /* ------------------------------------------------------- leitor de PDF */

  function montarLeitorPdf(livro, blob, contexto) {
    var raiz = el("div", { "class": "leitor" });
    var aviso = el("div");
    var canvas = el("canvas", { "class": "pdf-canvas" });
    var camadaTexto = el("div", { "class": "pdf-texto" });
    var sobreposicao = el("div", { "class": "pdf-marcas" });
    var palco = el("div", { "class": "pdf-palco" }, [canvas, camadaTexto, sobreposicao]);
    var area = el("div", { "class": "pdf-area" }, [palco]);

    var pdf = null;
    var paginaAtual = Math.max(1, livro.posicao || 1);
    var escala = 1.25;
    var textoAtual = "";
    var mapaAtual = [];
    var orfaos = [];
    var tarefaRender = null;

    var rotuloPagina = el("span", { "class": "txt-pequeno num" });
    var campoPagina = el("input", {
      "class": "entrada entrada-mini", type: "number", min: "1", "aria-label": "Ir para a pagina",
      onchange: function (ev) { irPara(parseInt(ev.target.value, 10)); }
    });

    function irPara(n) {
      if (!pdf || isNaN(n)) { return; }
      paginaAtual = Math.min(Math.max(1, n), pdf.numPages);
      desenhar();
    }

    /* O mapa de deslocamentos e montado a partir dos proprios elementos da
       camada de texto: assim o que o usuario seleciona e exatamente o que fica
       guardado, sem depender de o PDF.js concatenar igual de uma vez para outra. */
    function mapearCamada(divs) {
      var mapa = [];
      var partes = [];
      var pos = 0;
      divs.forEach(function (div) {
        var no = div.firstChild;
        if (!no || no.nodeType !== 3) { return; }
        var s = no.nodeValue || "";
        if (!s.length) { return; }
        mapa.push({ no: no, inicio: pos, fim: pos + s.length });
        partes.push(s);
        pos += s.length;
      });
      return { texto: partes.join(""), mapa: mapa };
    }

    function desenharMarcas() {
      ui.limpar(sobreposicao);
      orfaos = [];
      var base = camadaTexto.getBoundingClientRect();

      contexto.destaques.forEach(function (d) {
        if (!d.ancora || d.ancora.pagina !== paginaAtual) { return; }
        var pos = reancorar(textoAtual, d.ancora, d.texto);
        if (!pos) { orfaos.push(d); return; }
        var faixa = faixaDeDeslocamento(mapaAtual, pos.inicio, pos.fim, function (m) { return m.no; });
        if (!faixa) { orfaos.push(d); return; }

        var retangulos = faixa.getClientRects();
        for (var i = 0; i < retangulos.length; i++) {
          var r = retangulos[i];
          if (!r.width || !r.height) { continue; }
          sobreposicao.appendChild(el("div", {
            "class": "marca hl" + d.cor,
            title: d.texto.slice(0, 80),
            style: "left:" + (r.left - base.left) + "px;top:" + (r.top - base.top) +
                   "px;width:" + r.width + "px;height:" + r.height + "px"
          }));
        }
      });

      ui.limpar(aviso);
      if (orfaos.length) {
        aviso.appendChild(ui.aviso("atencao",
          orfaos.length + " destaque(s) desta pagina nao puderam ser reposicionados: " +
          "o texto mudou desde que foram criados. Eles continuam guardados na lista ao lado, " +
          "com o trecho original."));
      }
    }

    function desenhar() {
      if (!pdf) { return; }
      campoPagina.value = paginaAtual;
      rotuloPagina.textContent = "de " + pdf.numPages;

      return pdf.getPage(paginaAtual).then(function (pagina) {
        var viewport = pagina.getViewport({ scale: escala });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        palco.style.width = canvas.width + "px";
        palco.style.height = canvas.height + "px";
        camadaTexto.style.width = canvas.width + "px";
        camadaTexto.style.height = canvas.height + "px";
        /* o PDF.js posiciona a camada de texto em cima desta variavel; sem ela
           o texto selecionavel nao cai sobre as letras desenhadas */
        camadaTexto.style.setProperty("--scale-factor", String(escala));
        palco.style.setProperty("--scale-factor", String(escala));

        if (tarefaRender) { tarefaRender.cancel(); }
        tarefaRender = pagina.render({ canvasContext: canvas.getContext("2d"), viewport: viewport });

        return comLimite(tarefaRender.promise, LIMITE_RENDER,
            "a pagina demorou mais de 30 segundos para ser desenhada")
          .then(function () { tarefaRender = null; return pagina.getTextContent(); })
          .then(function (conteudo) {
            ui.limpar(camadaTexto);
            var divs = [];
            var tarefa = window.pdfjsLib.renderTextLayer({
              textContentSource: conteudo,
              textContent: conteudo,
              container: camadaTexto,
              viewport: viewport,
              textDivs: divs
            });
            return (tarefa.promise || tarefa).then(function () { return divs; });
          })
          .then(function (divs) {
            var m = mapearCamada(divs);
            textoAtual = m.texto;
            mapaAtual = m.mapa;
            desenharMarcas();
            registrarPosicao();
          });
      });
    }

    function registrarPosicao() {
      livro.posicao = paginaAtual;
      livro.paginas = pdf ? pdf.numPages : livro.paginas;
      livro.percentual = pdf ? Math.round((paginaAtual / pdf.numPages) * 1000) / 10 : 0;
      contexto.salvarLivro();
    }

    function destacar(cor) {
      var selecao = window.getSelection();
      var desl = deslocamentoDaSelecao(mapaAtual, selecao, function (m) { return m.no; });
      if (!desl) {
        ui.limpar(aviso);
        aviso.appendChild(ui.aviso("atencao",
          "Selecione um trecho do texto da pagina antes de destacar. " +
          "Em PDF escaneado nao ha texto para selecionar."));
        return;
      }
      var trecho = textoAtual.slice(desl.inicio, desl.fim);
      salvarDestaque(livro.id, cor, {
        tipo: "pdf", pagina: paginaAtual, inicio: desl.inicio, fim: desl.fim
      }, trecho).then(function () {
        selecao.removeAllRanges();
        contexto.recarregarDestaques().then(function () { desenharMarcas(); });
      }, function (erro) {
        ui.limpar(aviso);
        aviso.appendChild(ui.aviso("erro", "Nao foi possivel salvar o destaque: " + erro.message));
      });
    }

    contexto.redesenhar = desenharMarcas;

    var barra = el("div", { "class": "leitor-barra" }, [
      ui.botao(null, { variante: "sutil", soIcone: true, icone: "esquerda", rotulo: "Pagina anterior",
        aoClicar: function () { irPara(paginaAtual - 1); } }),
      campoPagina,
      rotuloPagina,
      ui.botao(null, { variante: "sutil", soIcone: true, icone: "direita", rotulo: "Proxima pagina",
        aoClicar: function () { irPara(paginaAtual + 1); } }),
      el("span", { "class": "espaco" }),
      ui.botao(null, { variante: "sutil", soIcone: true, icone: "menos", rotulo: "Diminuir zoom",
        aoClicar: function () { escala = Math.max(0.5, escala - 0.25); desenhar(); } }),
      ui.botao(null, { variante: "sutil", soIcone: true, icone: "mais", rotulo: "Aumentar zoom",
        aoClicar: function () { escala = Math.min(3, escala + 0.25); desenhar(); } })
    ]);

    var paletaCores = el("div", { "class": "linha" }, [
      el("span", { "class": "txt-mini txt-fraco", texto: "Selecione um trecho e destaque:" })
    ].concat(CORES.map(function (c) {
      return el("button", {
        "class": "cor-botao hl" + c, type: "button",
        title: "Destacar em " + NOME_COR[c], "aria-label": "Destacar em " + NOME_COR[c],
        onclick: function () { destacar(c); }
      });
    })));

    raiz.appendChild(barra);
    raiz.appendChild(paletaCores);
    raiz.appendChild(aviso);
    raiz.appendChild(area);

    var inicio = Promise.resolve();
    if (!window.pdfjsLib) {
      var carregando = ui.carregando("Carregando o leitor de PDF");
      raiz.insertBefore(carregando, area);
      inicio = prepararPdf().then(function () { carregando.remove(); });
    }

    inicio
      .then(function () { return blob.arrayBuffer(); })
      .then(function (dados) {
        return window.pdfjsLib.getDocument({
          data: new Uint8Array(dados),
          standardFontDataUrl: PDFJS_FONTES,
          cMapUrl: PDFJS_CMAPS,
          cMapPacked: true
        }).promise;
      })
      .then(function (documento) {
        pdf = documento;
        campoPagina.max = pdf.numPages;
        paginaAtual = Math.min(paginaAtual, pdf.numPages);
        return desenhar();
      })
      .then(function () {
        /* PDF escaneado: abre, mas avisa que nao ha texto */
        if (textoAtual.trim().length < 20) {
          aviso.appendChild(ui.aviso("atencao",
            "Esta pagina nao tem texto extraivel — provavelmente e um PDF escaneado. " +
            "Da para ler, mas nao da para destacar, e o resumo automatico da Etapa 10 " +
            "nao vai funcionar neste arquivo."));
        }
        return contexto.garantirTextoExtraido(pdf);
      })
      .catch(function (erro) {
        if (erro && erro.name === "RenderingCancelledException") { return; }
        ui.limpar(aviso);
        aviso.appendChild(ui.aviso("erro",
          "Nao foi possivel abrir este PDF: " + erro.message +
          " O arquivo pode estar corrompido ou protegido por senha."));
      });

    return raiz;
  }

  /* ------------------------------------------------------ leitor de docx */

  function montarLeitorDocx(livro, blob, contexto) {
    var raiz = el("div", { "class": "leitor" });
    var aviso = el("div");
    var area = el("div", { "class": "doc-area" });
    var textoAtual = "";
    var mapaAtual = [];

    function remapear() {
      var m = mapearTextoHtml(area);
      textoAtual = m.texto;
      mapaAtual = m.mapa;
    }

    function aplicarDestaques() {
      remapear();
      var orfaos = 0;

      contexto.destaques.forEach(function (d) {
        if (!d.ancora || d.ancora.tipo !== "html") { return; }
        var pos = reancorar(textoAtual, d.ancora, d.texto);
        if (!pos) { orfaos++; return; }

        mapaAtual.forEach(function (m) {
          var a = Math.max(pos.inicio, m.inicio);
          var b = Math.min(pos.fim, m.fim);
          if (b <= a) { return; }
          if (!m.no.parentNode || m.no.parentNode.classList.contains("hl")) { return; }
          try {
            var faixa = document.createRange();
            faixa.setStart(m.no, a - m.inicio);
            faixa.setEnd(m.no, b - m.inicio);
            var marca = document.createElement("mark");
            marca.className = "hl hl" + d.cor;
            marca.title = d.texto.slice(0, 80);
            faixa.surroundContents(marca);
          } catch (e) { orfaos++; }
        });
        remapear();
      });

      ui.limpar(aviso);
      if (orfaos) {
        aviso.appendChild(ui.aviso("atencao",
          orfaos + " destaque(s) nao puderam ser reposicionados. Continuam guardados na lista ao lado."));
      }
    }

    function destacar(cor) {
      var selecao = window.getSelection();
      var desl = deslocamentoDaSelecao(mapaAtual, selecao, function (m) { return m.no; });
      if (!desl) {
        ui.limpar(aviso);
        aviso.appendChild(ui.aviso("atencao", "Selecione um trecho do documento antes de destacar."));
        return;
      }
      var trecho = textoAtual.slice(desl.inicio, desl.fim);
      salvarDestaque(livro.id, cor, { tipo: "html", inicio: desl.inicio, fim: desl.fim }, trecho)
        .then(function () {
          selecao.removeAllRanges();
          contexto.recarregarDestaques().then(aplicarDestaques);
        }, function (erro) {
          ui.limpar(aviso);
          aviso.appendChild(ui.aviso("erro", "Nao foi possivel salvar o destaque: " + erro.message));
        });
    }

    contexto.redesenhar = aplicarDestaques;

    var paletaCores = el("div", { "class": "linha" }, [
      el("span", { "class": "txt-mini txt-fraco", texto: "Selecione um trecho e destaque:" })
    ].concat(CORES.map(function (c) {
      return el("button", {
        "class": "cor-botao hl" + c, type: "button",
        title: "Destacar em " + NOME_COR[c], "aria-label": "Destacar em " + NOME_COR[c],
        onclick: function () { destacar(c); }
      });
    })));

    raiz.appendChild(paletaCores);
    raiz.appendChild(aviso);
    raiz.appendChild(area);

    var carregando = ui.carregando("Convertendo o documento");
    raiz.appendChild(carregando);

    prepararDocx()
      .then(function () { return blob.arrayBuffer(); })
      .then(function (dados) {
        return window.mammoth.convertToHtml({ arrayBuffer: dados });
      })
      .then(function (resultado) {
        carregando.remove();
        ui.limpar(area);
        area.appendChild(htmlSeguro(resultado.value));
        remapear();

        if (!textoAtual.trim().length) {
          aviso.appendChild(ui.aviso("atencao", "O documento foi aberto, mas nao tem texto."));
        }
        if (resultado.messages && resultado.messages.length) {
          var perdidos = resultado.messages.filter(function (m) { return m.type === "warning"; });
          if (perdidos.length) {
            aviso.appendChild(ui.aviso("info",
              "A conversao ignorou " + perdidos.length + " elemento(s) de formatacao que o portal " +
              "nao exibe. O texto esta completo."));
          }
        }

        aplicarDestaques();
        livro.paginas = null;
        contexto.salvarLivro();
        return guardarTexto(livro.id, [textoAtual], []);
      })
      .catch(function (erro) {
        carregando.remove();
        ui.limpar(aviso);
        aviso.appendChild(ui.aviso("erro",
          "Nao foi possivel abrir este documento: " + erro.message +
          " Confira se o arquivo e um .docx valido."));
      });

    return raiz;
  }

  /* ------------------------------------------------------- painel lateral */

  function painelDestaques(livro, contexto) {
    var caixa = el("div", { "class": "coluna" });

    function desenhar() {
      ui.limpar(caixa);
      var lista = contexto.destaques;

      caixa.appendChild(el("div", { "class": "linha-entre" }, [
        el("h3", { texto: "Destaques e notas" }),
        ui.etiqueta(lista.length + " destaque(s)")
      ]));

      if (!lista.length) {
        caixa.appendChild(el("p", { "class": "txt-pequeno txt-fraco",
          texto: "Selecione um trecho no documento e escolha uma cor. " +
                 "Os destaques ficam aqui e viram flashcards na Etapa 11." }));
        return;
      }

      lista.forEach(function (d) {
        var notasDele = contexto.notas.filter(function (n) { return n.destaqueId === d.id; });
        var campoNota = el("textarea", { "class": "area", rows: "2", placeholder: "escrever uma nota" });
        var listaNotas = el("div", { "class": "coluna mt-3" }, notasDele.map(function (n) {
          return el("p", { "class": "txt-pequeno nota", texto: n.texto });
        }));

        caixa.appendChild(el("div", { "class": "cartao destaque-item" }, [
          el("div", { "class": "linha-entre" }, [
            el("span", { "class": "amostra-cor hl" + d.cor }),
            el("span", { "class": "txt-mini txt-fraco",
              texto: d.ancora && d.ancora.pagina ? "pagina " + d.ancora.pagina : "documento" }),
            el("span", { "class": "espaco" }),
            ui.botao(null, {
              variante: "sutil", pequeno: true, soIcone: true, icone: "lixeira",
              rotulo: "Remover destaque",
              aoClicar: function () {
                PDC.db.remover("destaques", d.id)
                  .then(contexto.recarregarDestaques)
                  .then(function () { desenhar(); contexto.redesenhar(); });
              }
            })
          ]),
          el("blockquote", { "class": "bloco-citacao txt-pequeno", texto: d.texto }),
          listaNotas,
          el("div", { "class": "linha mt-3" }, [
            campoNota,
            ui.botao(null, {
              pequeno: true, soIcone: true, icone: "mais", rotulo: "Salvar nota",
              aoClicar: function () {
                var t = campoNota.value.trim();
                if (!t) { return; }
                salvarNota(livro.id, d.id, t)
                  .then(contexto.recarregarDestaques)
                  .then(function () { desenhar(); });
              }
            })
          ])
        ]));
      });
    }

    contexto.redesenharPainel = desenhar;
    desenhar();
    return caixa;
  }

  /* ----------------------------------------------------------- tela geral */

  function tela(livroId) {
    var raiz = el("div");
    var corpo = el("div", { "class": "mt-4" });
    var abertoEm = Date.now();
    var livro = null;

    var contexto = {
      destaques: [],
      notas: [],
      redesenhar: function () {},
      redesenharPainel: function () {},
      salvarLivro: function () {
        if (!livro) { return; }
        var minutos = Math.round((Date.now() - abertoEm) / 60000);
        livro.minutosLeitura = (livro.minutosLeitura || 0) + (minutos > 0 ? minutos : 0);
        if (minutos > 0) { abertoEm = Date.now(); }
        PDC.biblioteca.guardar(livro);
      },
      recarregarDestaques: function () {
        return Promise.all([destaquesDo(livroId), notasDo(livroId)]).then(function (r) {
          contexto.destaques = r[0] || [];
          contexto.notas = r[1] || [];
          contexto.redesenharPainel();
        });
      },
      garantirTextoExtraido: function (pdf) {
        return lerTexto(livroId).then(function (ja) {
          if (ja && ja.paginas && ja.paginas.length) { return ja; }
          return extrairPdf(pdf).then(function (paginas) {
            return guardarTexto(livroId, paginas, []);
          });
        });
      }
    };

    function cabecalho() {
      return el("div", { "class": "linha-entre" }, [
        el("div", null, [
          el("div", { "class": "linha" }, [
            ui.botao("Biblioteca", { variante: "sutil", icone: "voltar",
              aoClicar: function () { PDC.rota.ir("biblioteca"); } })
          ]),
          el("h1", { "class": "mt-3", texto: livro.titulo }),
          el("div", { "class": "item-meta" }, [
            el("span", { texto: (livro.autores || []).join(", ") || "sem autor" }),
            livro.formato ? el("span", { texto: livro.formato.toUpperCase() }) : null,
            livro.paginas ? el("span", { texto: livro.paginas + " paginas" }) : null,
            livro.minutosLeitura ? el("span", { texto: livro.minutosLeitura + " min de leitura" }) : null
          ])
        ])
      ]);
    }

    function montarLeitura() {
      return Promise.all([lerArquivo(livroId), contexto.recarregarDestaques()])
        .then(function (r) {
          var registro = r[0];
          ui.limpar(corpo);

          if (!registro || !registro.blob) {
            corpo.appendChild(telaImportar(livro, function (arquivo, formato, recado) {
              guardarArquivo(livroId, arquivo).then(function () {
                livro.temArquivo = true;
                livro.formato = formato;
                return PDC.biblioteca.guardar(livro);
              }).then(function () {
                ui.limpar(recado);
                return montarLeitura();
              }, function (erro) {
                ui.limpar(recado);
                recado.appendChild(ui.aviso("erro",
                  "Nao foi possivel guardar o arquivo: " + erro.message +
                  " Pode ser falta de espaco no navegador."));
              });
            }));
            return;
          }

          var leitor = livro.formato === "docx"
            ? montarLeitorDocx(livro, registro.blob, contexto)
            : montarLeitorPdf(livro, registro.blob, contexto);

          var areaLeitura = el("div", { "class": "leitor-grade" }, [
            leitor,
            el("aside", { "class": "leitor-lado" }, [painelDestaques(livro, contexto)])
          ]);
          var areaEstudio = el("div", { "class": "oculto" });

          /* O estudio trabalha sobre o texto ja extraido; nao reabre o arquivo. */
          var abaLeitura = el("button", { "class": "aba ativa", type: "button" }, [ui.txt("Documento")]);
          var abaEstudio = el("button", { "class": "aba", type: "button" }, [ui.txt("Estudio de compreensao")]);

          abaLeitura.addEventListener("click", function () {
            abaLeitura.classList.add("ativa"); abaEstudio.classList.remove("ativa");
            areaLeitura.classList.remove("oculto"); areaEstudio.classList.add("oculto");
          });
          abaEstudio.addEventListener("click", function () {
            abaEstudio.classList.add("ativa"); abaLeitura.classList.remove("ativa");
            areaEstudio.classList.remove("oculto"); areaLeitura.classList.add("oculto");
            if (areaEstudio.childNodes.length) { return; }
            areaEstudio.appendChild(ui.carregando("Lendo o texto extraido"));
            lerTexto(livroId).then(function (registro) {
              ui.limpar(areaEstudio);
              var texto = registro && registro.paginas ? registro.paginas.join("\n") : "";
              areaEstudio.appendChild(PDC.compreensao.tela({
                id: livroId, titulo: livro.titulo, texto: texto
              }));
            }, function (erro) {
              ui.limpar(areaEstudio);
              areaEstudio.appendChild(ui.aviso("erro",
                "Nao foi possivel ler o texto extraido: " + erro.message));
            });
          });

          corpo.appendChild(el("div", { "class": "abas" }, [abaLeitura, abaEstudio]));
          corpo.appendChild(areaLeitura);
          corpo.appendChild(areaEstudio);

          corpo.appendChild(el("div", { "class": "linha mt-4" }, [
            ui.botao("Trocar arquivo", {
              variante: "sutil", icone: "atualizar",
              aoClicar: function () {
                PDC.db.remover("arquivos", livroId).then(function () {
                  livro.temArquivo = false;
                  return PDC.biblioteca.guardar(livro);
                }).then(montarLeitura);
              }
            }),
            el("span", { "class": "txt-mini txt-fraco",
              texto: "O arquivo (" + bytes(registro.tamanho) + ") esta apenas neste navegador." })
          ]));
        });
    }

    PDC.db.obter("livros", livroId).then(function (encontrado) {
      if (!encontrado) {
        raiz.appendChild(el("h1", { "class": "mb-3", texto: "Livro nao encontrado" }));
        raiz.appendChild(ui.cartao([
          ui.aviso("atencao", "Nao existe livro com o identificador " + livroId + " na sua estante."),
          el("div", { "class": "mt-4" }, [
            ui.botao("Ir para a biblioteca", { variante: "primario",
              aoClicar: function () { PDC.rota.ir("biblioteca"); } })
          ])
        ]));
        return;
      }
      livro = encontrado;
      raiz.appendChild(cabecalho());
      raiz.appendChild(corpo);
      return montarLeitura();
    }, function (erro) {
      raiz.appendChild(ui.aviso("erro", "Nao foi possivel abrir a estante: " + erro.message));
    });

    /* registra o tempo de leitura ao sair da tela */
    window.addEventListener("hashchange", function sair() {
      window.removeEventListener("hashchange", sair);
      contexto.salvarLivro();
    });

    return raiz;
  }

  PDC.leitor = {
    prepararPdf: prepararPdf,
    prepararDocx: prepararDocx,
    guardarArquivo: guardarArquivo,
    lerArquivo: lerArquivo,
    guardarTexto: guardarTexto,
    lerTexto: lerTexto,
    formatoDe: formatoDe,
    extrairPdf: extrairPdf,
    montarTextoDaPagina: montarTextoDaPagina,
    htmlSeguro: htmlSeguro,
    mapearTextoHtml: mapearTextoHtml,
    destaquesDo: destaquesDo,
    salvarDestaque: salvarDestaque,
    removerDestaque: removerDestaque,
    notasDo: notasDo,
    salvarNota: salvarNota,
    reancorar: reancorar,
    faixaDeDeslocamento: faixaDeDeslocamento,
    deslocamentoDaSelecao: deslocamentoDaSelecao,
    AVISO_TAMANHO: AVISO_TAMANHO,
    CORES: CORES,
    tela: tela
  };
})();
