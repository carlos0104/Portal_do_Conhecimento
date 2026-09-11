/* biblioteca.js — busca de livros nas fontes abertas e estante pessoal.

   Quatro fontes aprovadas no teste de CORS (docs/FONTES.md):
     openlibrary  catalogo geral, cobertura boa de classicos
     archive      acervo baixavel, ordenado por downloads
     crossref     livro e capitulo academico, so metadado
     googlebooks  sinopse e capa; devolve 429 em IP compartilhado

   Regras: sem chave, sem proxy, timeout por fonte, e falha de uma fonte
   nunca derruba a busca (RN-006 e RN-007). */

(function () {
  "use strict";

  var PDC = window.PDC;
  var TEMPO_LIMITE = 9000;
  var POR_FONTE = 12;

  /* ------------------------------------------------------------ utilidades */

  function texto(valor) {
    if (valor === null || valor === undefined) { return null; }
    var t = String(valor).trim();
    return t.length ? t : null;
  }

  function primeiro(lista) {
    return Array.isArray(lista) && lista.length ? lista[0] : null;
  }

  /* O campo de descricao do Internet Archive as vezes traz descricao fisica
     ("499 p. ; 24 cm") em vez de sinopse. Texto curto demais nao ajuda em
     nada no cartao, entao e descartado. */
  function sinopse(valor) {
    var t = texto(Array.isArray(valor) ? valor[0] : valor);
    if (!t) { return null; }
    t = t.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (t.length < 60) { return null; }
    return t;
  }

  function ano(valor) {
    var n = parseInt(String(valor || "").slice(0, 4), 10);
    return isNaN(n) || n < 1400 || n > 2100 ? null : n;
  }

  /* Open Library e Archive usam codigo de 3 letras; o portal guarda 2. */
  var IDIOMA3 = { por: "pt", eng: "en", spa: "es", fre: "fr", fra: "fr", ger: "de", deu: "de", ita: "it" };

  function idioma(valor) {
    var v = String(valor || "").toLowerCase();
    if (!v) { return null; }
    if (IDIOMA3[v]) { return IDIOMA3[v]; }
    return v.slice(0, 2);
  }

  function semAcento(valor) {
    return String(valor || "").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* Cada fonte escreve o autor de um jeito: "Daniel Kahneman",
     "Kahneman, Daniel, 1934-" e "Kahneman, Daniel, 1934- author" sao a mesma
     pessoa. Sem reduzir tudo ao sobrenome, o mesmo livro aparece tres vezes. */
  function sobrenome(autor) {
    var limpo = semAcento(autor)
      .replace(/\d+/g, " ")
      .replace(/\b(author|autor|ed|eds|editor|editores|org|orgs|comp|trad)\b/g, " ")
      .replace(/[^a-z]+/g, " ")
      .trim();
    if (!limpo) { return ""; }
    var virgula = String(autor).indexOf(",");
    if (virgula > 0) { return limpo.split(" ")[0]; }
    return limpo.split(" ").pop();
  }

  function chaveDeduplicacao(livro) {
    var t = semAcento(livro.titulo).replace(/[^a-z0-9]+/g, " ").trim();
    var a = sobrenome((livro.autores && livro.autores[0]) || "");
    return t + "|" + a;
  }

  function buscarJson(url) {
    return PDC.util.buscar(url, { headers: { Accept: "application/json" } }, TEMPO_LIMITE)
      .then(function (resposta) {
        if (resposta.status === 429) {
          var e = new Error("limite de consultas atingido neste endereco de rede");
          e.esperado = true;
          throw e;
        }
        if (!resposta.ok) { throw new Error("respondeu " + resposta.status); }
        return resposta.json();
      });
  }

  /* --------------------------------------------------------------- fontes */

  var FONTES = [
    {
      id: "openlibrary",
      nome: "Open Library",
      buscar: function (p) {
        var base = "https://openlibrary.org/search.json?limit=" + POR_FONTE +
          "&fields=key,title,author_name,first_publish_year,publisher,language,subject,cover_i,ebook_access,ia";
        if (p.campo === "titulo") { base += "&title=" + encodeURIComponent(p.termo); }
        else if (p.campo === "autor") { base += "&author=" + encodeURIComponent(p.termo); }
        else { base += "&q=" + encodeURIComponent(p.termo); }
        if (p.idioma) { base += "&language=" + (p.idioma === "pt" ? "por" : "eng"); }

        return buscarJson(base).then(function (dados) {
          return (dados.docs || []).map(function (d) {
            var baixavel = d.ebook_access === "public" && Array.isArray(d.ia) && d.ia.length;
            return {
              origem: "openlibrary",
              idExterno: d.key,
              titulo: texto(d.title),
              autores: d.author_name || [],
              ano: ano(d.first_publish_year),
              editora: texto(primeiro(d.publisher)),
              idioma: idioma(primeiro(d.language)),
              assuntos: (d.subject || []).slice(0, 5),
              descricao: null,
              capaUrl: d.cover_i ? "https://covers.openlibrary.org/b/id/" + d.cover_i + "-M.jpg" : null,
              licenca: baixavel ? "acesso publico" : null,
              urlFonte: "https://openlibrary.org" + d.key,
              urlDownload: baixavel ? "https://archive.org/details/" + d.ia[0] : null
            };
          });
        });
      }
    },

    {
      id: "archive",
      nome: "Internet Archive",
      buscar: function (p) {
        var consulta = p.campo === "titulo" ? "title:(" + p.termo + ")"
          : (p.campo === "autor" ? "creator:(" + p.termo + ")" : p.termo);
        consulta += " AND mediatype:texts";
        if (p.idioma === "pt") { consulta += " AND language:(portuguese OR por)"; }

        var url = "https://archive.org/advancedsearch.php?q=" + encodeURIComponent(consulta) +
          "&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=creator&fl%5B%5D=year" +
          "&fl%5B%5D=language&fl%5B%5D=description&fl%5B%5D=downloads" +
          "&sort%5B%5D=downloads+desc&rows=" + POR_FONTE + "&page=1&output=json";

        return buscarJson(url).then(function (dados) {
          var docs = (dados.response && dados.response.docs) || [];
          return docs.map(function (d) {
            var autores = Array.isArray(d.creator) ? d.creator : (d.creator ? [d.creator] : []);
            return {
              origem: "archive",
              idExterno: d.identifier,
              titulo: texto(d.title),
              autores: autores,
              ano: ano(d.year),
              editora: null,
              idioma: idioma(Array.isArray(d.language) ? d.language[0] : d.language),
              assuntos: [],
              descricao: sinopse(d.description),
              capaUrl: "https://archive.org/services/img/" + encodeURIComponent(d.identifier),
              licenca: "acervo aberto do Internet Archive",
              urlFonte: "https://archive.org/details/" + encodeURIComponent(d.identifier),
              urlDownload: "https://archive.org/download/" + encodeURIComponent(d.identifier)
            };
          });
        });
      }
    },

    {
      id: "googlebooks",
      nome: "Google Books",
      buscar: function (p) {
        var consulta = p.campo === "titulo" ? "intitle:" + p.termo
          : (p.campo === "autor" ? "inauthor:" + p.termo : p.termo);
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(consulta) +
          "&maxResults=" + POR_FONTE;
        if (p.idioma) { url += "&langRestrict=" + p.idioma; }

        return buscarJson(url).then(function (dados) {
          return (dados.items || []).map(function (item) {
            var v = item.volumeInfo || {};
            var acesso = item.accessInfo || {};
            var baixavel = (acesso.pdf && acesso.pdf.isAvailable) || (acesso.epub && acesso.epub.isAvailable);
            var gratis = item.saleInfo && item.saleInfo.saleability === "FREE";
            return {
              origem: "googlebooks",
              idExterno: item.id,
              titulo: texto(v.title) + (v.subtitle ? ": " + v.subtitle : ""),
              autores: v.authors || [],
              ano: ano(v.publishedDate),
              editora: texto(v.publisher),
              idioma: idioma(v.language),
              assuntos: (v.categories || []).slice(0, 5),
              descricao: sinopse(v.description),
              capaUrl: v.imageLinks ? (v.imageLinks.thumbnail || "").replace(/^http:/, "https:") : null,
              licenca: gratis ? "gratuito no Google Books" : null,
              urlFonte: v.infoLink || v.previewLink || null,
              urlDownload: (baixavel && gratis && acesso.webReaderLink) ? acesso.webReaderLink : null
            };
          });
        });
      }
    },

    {
      id: "crossref",
      nome: "Crossref",
      buscar: function (p) {
        var url = "https://api.crossref.org/works?rows=" + POR_FONTE +
          "&filter=type:book,type:monograph&select=title,author,issued,publisher,DOI,URL,subject";
        url += p.campo === "autor"
          ? "&query.author=" + encodeURIComponent(p.termo)
          : "&query.bibliographic=" + encodeURIComponent(p.termo);

        return buscarJson(url).then(function (dados) {
          var itens = (dados.message && dados.message.items) || [];
          return itens.map(function (d) {
            var autores = (d.author || []).map(function (a) {
              return [a.given, a.family].filter(Boolean).join(" ") || a.name || "";
            }).filter(Boolean);
            var partes = d.issued && d.issued["date-parts"];
            return {
              origem: "crossref",
              idExterno: d.DOI,
              titulo: texto(primeiro(d.title)),
              autores: autores,
              ano: ano(partes && partes[0] && partes[0][0]),
              editora: texto(d.publisher),
              idioma: null,
              assuntos: (d.subject || []).slice(0, 5),
              descricao: null,
              capaUrl: null,
              licenca: null,
              urlFonte: d.URL || (d.DOI ? "https://doi.org/" + d.DOI : null),
              urlDownload: null
            };
          });
        });
      }
    }
  ];

  /* ------------------------------------------------------------- agregacao */

  /* Cada fonte responde por si. Falha de uma nunca derruba a busca: o que
     chegou e mostrado e o que falhou aparece nomeado (RN-007). */
  function buscar(parametros, aoStatus) {
    var p = {
      termo: String(parametros.termo || "").trim(),
      campo: parametros.campo || "tudo",
      idioma: parametros.idioma || null,
      soBaixavel: Boolean(parametros.soBaixavel)
    };

    if (!p.termo) {
      return Promise.resolve({ livros: [], fontes: [], termo: "" });
    }

    var relatorio = [];
    var inicio = Date.now();

    var tentativas = FONTES.map(function (fonte) {
      if (aoStatus) { aoStatus("Consultando " + fonte.nome); }
      var t0 = Date.now();
      return fonte.buscar(p).then(function (lista) {
        var limpos = (lista || []).filter(function (l) { return l && l.titulo; });
        relatorio.push({
          id: fonte.id, nome: fonte.nome, estado: "ok",
          quantidade: limpos.length, ms: Date.now() - t0
        });
        return limpos;
      }, function (erro) {
        var motivo = erro && erro.name === "AbortError"
          ? "nao respondeu em " + (TEMPO_LIMITE / 1000) + " segundos"
          : (erro && erro.message) || "falha desconhecida";
        relatorio.push({
          id: fonte.id, nome: fonte.nome,
          estado: erro && erro.esperado ? "limite" : "falha",
          motivo: motivo, ms: Date.now() - t0
        });
        return [];
      });
    });

    return Promise.all(tentativas).then(function (listas) {
      var vistos = {};
      var livros = [];

      listas.forEach(function (lista) {
        lista.forEach(function (bruto) {
          var chave = chaveDeduplicacao(bruto);
          if (vistos[chave]) {
            /* mantem o primeiro e completa o que faltava com o duplicado */
            var ja = vistos[chave];
            if (!ja.capaUrl && bruto.capaUrl) { ja.capaUrl = bruto.capaUrl; }
            if (!ja.descricao && bruto.descricao) { ja.descricao = bruto.descricao; }
            if (!ja.urlDownload && bruto.urlDownload) {
              ja.urlDownload = bruto.urlDownload;
              ja.licenca = ja.licenca || bruto.licenca;
            }
            if (bruto.origem !== ja.origem && ja.tambemEm.indexOf(bruto.origem) < 0) {
              ja.tambemEm.push(bruto.origem);
            }
            return;
          }
          bruto.tambemEm = [];
          vistos[chave] = bruto;
          livros.push(bruto);
        });
      });

      if (p.soBaixavel) {
        livros = livros.filter(function (l) { return Boolean(l.urlDownload); });
      }
      if (p.idioma) {
        livros = livros.filter(function (l) { return !l.idioma || l.idioma === p.idioma; });
      }

      /* quem tem mais informacao aparece antes: capa, descricao e download pesam */
      livros.sort(function (a, b) { return pontuar(b) - pontuar(a); });

      return {
        livros: livros,
        fontes: relatorio.sort(function (a, b) { return a.nome.localeCompare(b.nome); }),
        termo: p.termo,
        ms: Date.now() - inicio
      };
    });
  }

  function pontuar(l) {
    var n = 0;
    if (l.urlDownload) { n += 4; }
    if (l.capaUrl) { n += 2; }
    if (l.descricao) { n += 2; }
    if (l.ano) { n += 1; }
    if (l.autores && l.autores.length) { n += 1; }
    n += (l.tambemEm || []).length;
    return n;
  }

  /* --------------------------------------------------------------- estante */

  var ESTADOS = ["quero_ler", "lendo", "lido", "abandonado"];
  var ROTULO_ESTADO = {
    quero_ler: "quero ler", lendo: "lendo", lido: "lido", abandonado: "abandonado"
  };

  function novoLivro(base) {
    var agora = PDC.util.agoraISO();
    return Object.assign({
      id: PDC.util.novoId("b"),
      origem: "manual",
      idExterno: null,
      titulo: "",
      autores: [],
      ano: null,
      editora: null,
      idioma: null,
      assuntos: [],
      descricao: null,
      capaUrl: null,
      licenca: null,
      urlFonte: null,
      urlDownload: null,
      estado: "quero_ler",
      moduloId: null,
      temArquivo: false,
      formato: null,
      paginas: null,
      posicao: 0,
      percentual: 0,
      minutosLeitura: 0,
      criadoEm: agora,
      atualizadoEm: agora
    }, base || {});
  }

  function estante() {
    return PDC.db.todos("livros").then(function (lista) {
      return (lista || []).sort(function (a, b) {
        return String(b.atualizadoEm).localeCompare(String(a.atualizadoEm));
      });
    });
  }

  function guardar(livro) {
    livro.atualizadoEm = PDC.util.agoraISO();
    return PDC.db.gravar("livros", livro).then(function () { return livro; });
  }

  function adicionar(bruto) {
    var livro = novoLivro(bruto);
    /* o mesmo livro nao entra duas vezes na estante */
    return estante().then(function (lista) {
      var chave = chaveDeduplicacao(livro);
      var ja = lista.filter(function (l) { return chaveDeduplicacao(l) === chave; })[0];
      if (ja) { return { livro: ja, novo: false }; }
      return guardar(livro).then(function (l) { return { livro: l, novo: true }; });
    });
  }

  function remover(id) {
    return PDC.db.remover("livros", id);
  }

  function definirEstado(id, estado) {
    return PDC.db.obter("livros", id).then(function (livro) {
      if (!livro) { throw new Error("livro nao encontrado"); }
      livro.estado = estado;
      return guardar(livro);
    });
  }

  function vincularModulo(id, moduloId) {
    return PDC.db.obter("livros", id).then(function (livro) {
      if (!livro) { throw new Error("livro nao encontrado"); }
      livro.moduloId = moduloId || null;
      return guardar(livro);
    });
  }

  function porModulo(moduloId) {
    return PDC.db.porIndice("livros", "moduloId", moduloId);
  }


  /* ---------------------------------------------------------------- tela */

  /* A interface vive aqui, e nao em views.js, seguindo o padrao do
     exercicios.js: cada modulo grande traz a propria tela. */

  var ui = PDC.ui;
  var el = ui.el;

  function nomeFonte(id) {
    var achada = FONTES.filter(function (f) { return f.id === id; })[0];
    return achada ? achada.nome : (id === "manual" ? "cadastro seu" : id);
  }

  function cartaoLivro(livro, acoes) {
    var capa = livro.capaUrl
      ? el("img", {
          "class": "livro-capa", src: livro.capaUrl, alt: "", loading: "lazy",
          onerror: function (ev) { ev.target.classList.add("oculto"); }
        })
      : el("div", { "class": "livro-capa livro-capa-vazia" }, [ui.icone("livro", 24)]);

    var meta = [];
    if (livro.autores && livro.autores.length) {
      meta.push(el("span", { texto: livro.autores.slice(0, 2).join(", ") }));
    }
    if (livro.ano) { meta.push(el("span", { texto: String(livro.ano) })); }
    if (livro.editora) { meta.push(el("span", { texto: livro.editora })); }
    if (livro.idioma) { meta.push(el("span", { texto: livro.idioma })); }

    var marcas = [ui.etiqueta(nomeFonte(livro.origem), livro.origem === "manual" ? "acento" : null)];
    (livro.tambemEm || []).forEach(function (o) { marcas.push(ui.etiqueta(nomeFonte(o))); });
    if (livro.urlDownload) { marcas.push(ui.etiqueta("da para baixar", "ok")); }
    if (livro.estado) { marcas.push(ui.etiqueta(ROTULO_ESTADO[livro.estado] || livro.estado, "acento")); }

    var corpo = [
      el("div", { "class": "livro-titulo", texto: livro.titulo }),
      el("div", { "class": "item-meta" }, meta),
      el("div", { "class": "linha mt-3 quebra", }, marcas)
    ];
    if (livro.descricao) {
      corpo.push(el("p", {
        "class": "txt-pequeno txt-fraco mt-3",
        texto: livro.descricao.slice(0, 220) + (livro.descricao.length > 220 ? "..." : "")
      }));
    }
    if (acoes && acoes.length) {
      corpo.push(el("div", { "class": "linha mt-3 quebra" }, acoes));
    }

    return el("article", { "class": "cartao livro" }, [
      capa,
      el("div", { "class": "livro-corpo" }, corpo)
    ]);
  }

  function relatorioFontes(fontes) {
    var ok = fontes.filter(function (f) { return f.estado === "ok"; });
    var ruins = fontes.filter(function (f) { return f.estado !== "ok"; });

    var partes = [el("span", {
      "class": "txt-mini txt-fraco",
      texto: "Fontes: " + ok.map(function (f) {
        return f.nome + " (" + f.quantidade + ")";
      }).join("  ·  ")
    })];

    if (ruins.length) {
      partes.push(ui.aviso("atencao",
        "Nao respondeu: " + ruins.map(function (f) {
          return f.nome + " — " + (f.estado === "limite"
            ? "limite de consultas atingido nesta rede"
            : f.motivo);
        }).join("; ") + ". Os resultados abaixo vem das demais fontes."));
    }
    return el("div", { "class": "coluna mt-3" }, partes);
  }

  function tela() {
    var raiz = el("div");
    var resultados = el("div", { "class": "mt-5" });
    var areaEstante = el("div", { "class": "mt-4 coluna" });

    var campoTermo = el("input", {
      "class": "entrada", type: "search", placeholder: "titulo, autor ou assunto",
      "aria-label": "Termo de busca"
    });
    var selCampo = el("select", { "class": "selecao", "aria-label": "Onde procurar" }, [
      el("option", { value: "tudo", texto: "em tudo" }),
      el("option", { value: "titulo", texto: "no titulo" }),
      el("option", { value: "autor", texto: "no autor" })
    ]);
    var selIdioma = el("select", { "class": "selecao", "aria-label": "Idioma" }, [
      el("option", { value: "", texto: "qualquer idioma" }),
      el("option", { value: "pt", texto: "portugues" }),
      el("option", { value: "en", texto: "ingles" })
    ]);
    var soBaixavel = el("input", { type: "checkbox" });

    function desenharEstante() {
      estante().then(function (lista) {
        ui.limpar(areaEstante);
        if (!lista.length) {
          areaEstante.appendChild(ui.vazio("livro", "Sua estante esta vazia",
            "Busque um livro acima ou cadastre um que voce tem em papel."));
          return;
        }
        lista.forEach(function (livro) {
          var acoes = [];

          acoes.push(el("select", {
            "class": "selecao selecao-curta", "aria-label": "Estado da leitura de " + livro.titulo,
            onchange: function (ev) { definirEstado(livro.id, ev.target.value).then(desenharEstante); }
          }, ESTADOS.map(function (e) {
            return el("option", { value: e, selected: livro.estado === e, texto: ROTULO_ESTADO[e] });
          })));

          if (livro.urlFonte) {
            acoes.push(el("a", {
              "class": "btn btn-secundario btn-pequeno", href: livro.urlFonte,
              target: "_blank", rel: "noopener noreferrer", texto: "Ver na fonte"
            }));
          }
          if (livro.urlDownload) {
            acoes.push(el("a", {
              "class": "btn btn-secundario btn-pequeno", href: livro.urlDownload,
              target: "_blank", rel: "noopener noreferrer", texto: "Baixar"
            }));
          }
          acoes.push(ui.botao("Ler no portal", {
            pequeno: true, icone: "livro",
            aoClicar: function () { PDC.rota.ir("livro/" + livro.id); }
          }));
          acoes.push(ui.botao(null, {
            variante: "sutil", pequeno: true, soIcone: true, icone: "lixeira",
            rotulo: "Remover " + livro.titulo + " da estante",
            aoClicar: function () { remover(livro.id).then(desenharEstante); }
          }));

          areaEstante.appendChild(cartaoLivro(livro, acoes));
        });
      }, function (erro) {
        ui.limpar(areaEstante);
        areaEstante.appendChild(ui.aviso("erro", "Nao foi possivel ler a estante: " + erro.message));
      });
    }

    function executarBusca() {
      var termo = campoTermo.value.trim();
      ui.limpar(resultados);
      if (!termo) {
        resultados.appendChild(ui.aviso("atencao", "Escreva o que voce procura."));
        return;
      }
      resultados.appendChild(ui.carregando("Consultando as fontes"));

      buscar({
        termo: termo,
        campo: selCampo.value,
        idioma: selIdioma.value || null,
        soBaixavel: soBaixavel.checked
      }).then(function (r) {
        ui.limpar(resultados);
        resultados.appendChild(el("div", { "class": "linha-entre" }, [
          el("h3", { texto: r.livros.length + " resultado(s) para " + r.termo }),
          el("span", { "class": "txt-mini txt-fraco", texto: (r.ms / 1000).toFixed(1) + " s" })
        ]));
        resultados.appendChild(relatorioFontes(r.fontes));

        if (!r.livros.length) {
          resultados.appendChild(ui.vazio("busca", "Nada encontrado",
            "Tente outro termo, troque o campo de busca ou desmarque o filtro de idioma."));
          return;
        }

        var grade = el("div", { "class": "coluna mt-4" });
        r.livros.forEach(function (livro) {
          var botaoAdicionar = ui.botao("Adicionar a estante", {
            variante: "primario", pequeno: true, icone: "mais",
            aoClicar: function () {
              botaoAdicionar.disabled = true;
              adicionar(livro).then(function (res) {
                ui.limpar(botaoAdicionar);
                botaoAdicionar.appendChild(ui.icone("check", 15));
                botaoAdicionar.appendChild(el("span", {
                  texto: res.novo ? "Na estante" : "Ja estava na estante"
                }));
                desenharEstante();
              }, function (erro) {
                botaoAdicionar.disabled = false;
                resultados.appendChild(ui.aviso("erro", "Nao foi possivel salvar: " + erro.message));
              });
            }
          });

          var acoes = [botaoAdicionar];
          if (livro.urlFonte) {
            acoes.push(el("a", {
              "class": "btn btn-secundario btn-pequeno", href: livro.urlFonte,
              target: "_blank", rel: "noopener noreferrer", texto: "Ver na fonte"
            }));
          }
          if (livro.urlDownload) {
            acoes.push(el("a", {
              "class": "btn btn-secundario btn-pequeno", href: livro.urlDownload,
              target: "_blank", rel: "noopener noreferrer", texto: "Baixar"
            }));
          }
          grade.appendChild(cartaoLivro(livro, acoes));
        });
        resultados.appendChild(grade);
      }, function (erro) {
        ui.limpar(resultados);
        resultados.appendChild(ui.aviso("erro",
          "A busca falhou por completo: " + erro.message + " Verifique a conexao e tente de novo."));
      });
    }

    campoTermo.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") { ev.preventDefault(); executarBusca(); }
    });

    /* Cadastro manual: nenhuma fonte livre cobre bem livro nacional recente. */
    function formularioManual() {
      var campoT = el("input", { "class": "entrada", type: "text", placeholder: "titulo" });
      var campoA = el("input", { "class": "entrada", type: "text", placeholder: "autor" });
      var campoAno = el("input", {
        "class": "entrada", type: "number", placeholder: "ano", min: "1400", max: "2100"
      });
      var recado = el("div");

      function salvar() {
        ui.limpar(recado);
        if (!campoT.value.trim()) {
          recado.appendChild(ui.aviso("atencao", "O titulo e obrigatorio."));
          return;
        }
        adicionar({
          origem: "manual",
          titulo: campoT.value.trim(),
          autores: campoA.value.trim() ? [campoA.value.trim()] : [],
          ano: campoAno.value ? parseInt(campoAno.value, 10) : null,
          idioma: "pt"
        }).then(function (res) {
          campoT.value = ""; campoA.value = ""; campoAno.value = "";
          recado.appendChild(ui.aviso(res.novo ? "ok" : "atencao",
            res.novo ? "Livro adicionado a estante." : "Esse livro ja esta na estante."));
          desenharEstante();
        }, function (erro) {
          recado.appendChild(ui.aviso("erro", "Nao foi possivel salvar: " + erro.message));
        });
      }

      return el("details", { "class": "painel" }, [
        el("summary", null, [
          ui.icone("mais", 16),
          el("span", { texto: "Cadastrar um livro que voce tem em papel" }),
          el("span", { "class": "seta" }, [ui.icone("baixo", 16)])
        ]),
        el("div", { "class": "painel-corpo" }, [
          el("p", { "class": "txt-pequeno txt-fraco",
            texto: "Nenhuma fonte livre cobre bem livro nacional recente. Cadastre aqui o que voce le em papel." }),
          el("div", { "class": "grade grade-3" }, [
            el("label", { "class": "campo" }, [
              el("span", { "class": "campo-rotulo", texto: "Titulo" }), campoT]),
            el("label", { "class": "campo" }, [
              el("span", { "class": "campo-rotulo", texto: "Autor" }), campoA]),
            el("label", { "class": "campo" }, [
              el("span", { "class": "campo-rotulo", texto: "Ano" }), campoAno])
          ]),
          recado,
          ui.botao("Adicionar a estante", { variante: "primario", icone: "mais", aoClicar: salvar })
        ])
      ]);
    }

    raiz.appendChild(el("h1", { "class": "mb-3", texto: "Biblioteca" }));
    raiz.appendChild(ui.cartao([
      el("div", { "class": "grade grade-2" }, [
        el("label", { "class": "campo" }, [
          el("span", { "class": "campo-rotulo", texto: "Buscar livro" }),
          el("span", { "class": "busca" }, [ui.icone("busca", 16), campoTermo])
        ]),
        el("div", { "class": "grade grade-2" }, [
          el("label", { "class": "campo" }, [
            el("span", { "class": "campo-rotulo", texto: "Onde procurar" }), selCampo]),
          el("label", { "class": "campo" }, [
            el("span", { "class": "campo-rotulo", texto: "Idioma" }), selIdioma])
        ])
      ]),
      el("div", { "class": "linha" }, [
        ui.botao("Buscar", { variante: "primario", icone: "busca", aoClicar: executarBusca }),
        el("label", { "class": "marcacao" }, [soBaixavel, ui.txt("so o que da para baixar")])
      ]),
      el("p", { "class": "txt-mini txt-fraco mt-3 sem-margem",
        texto: "Busca em Open Library, Internet Archive, Google Books e Crossref. " +
               "Sem chave de acesso e sem intermediario: seu navegador fala direto com cada fonte." })
    ]));
    raiz.appendChild(resultados);
    raiz.appendChild(el("h2", { "class": "mt-5 mb-3", texto: "Sua estante" }));
    raiz.appendChild(formularioManual());
    raiz.appendChild(areaEstante);

    desenharEstante();
    return raiz;
  }

  PDC.biblioteca = {
    FONTES: FONTES,
    ESTADOS: ESTADOS,
    ROTULO_ESTADO: ROTULO_ESTADO,
    buscar: buscar,
    novoLivro: novoLivro,
    estante: estante,
    adicionar: adicionar,
    guardar: guardar,
    remover: remover,
    definirEstado: definirEstado,
    vincularModulo: vincularModulo,
    porModulo: porModulo,
    chaveDeduplicacao: chaveDeduplicacao,
    tela: tela
  };
})();
