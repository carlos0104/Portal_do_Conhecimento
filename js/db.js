/* db.js — camada de persistencia.
   localStorage para progresso e configuracao (leitura sincrona na abertura).
   IndexedDB para acervo, destaques, notas, flashcards e mapas.
   Contratos em docs/ARQUITETURA.md §4. */

(function () {
  "use strict";

  var PDC = window.PDC;

  var VERSAO_SCHEMA = 1;

  var CHAVES = {
    versao:    "pdc.versao",
    progresso: "pdc.progresso",
    config:    "pdc.config",
    extras:    "pdc.extras",
    trilhas:   "pdc.trilhas",
    respostas: "pdc.respostas",
    metas:     "pdc.metas"
  };

  var BANCO = "portal_conhecimento";
  var VERSAO_BANCO = 1;

  /* store: [keyPath, [ [nomeIndice, campo, unico] ... ] ] */
  var STORES = {
    livros:     ["id",      [["origem", "origem"], ["estado", "estado"], ["moduloId", "moduloId"]]],
    arquivos:   ["livroId", []],
    textos:     ["livroId", []],
    destaques:  ["id",      [["livroId", "livroId"]]],
    notas:      ["id",      [["livroId", "livroId"], ["videoId", "videoId"]]],
    flashcards: ["id",      [["proxima", "proxima"], ["origemId", "origemId"]]],
    mapas:      ["id",      [["origemId", "origemId"]]],
    revisoes:   ["id",      [["cardId", "cardId"], ["data", "data"]]]
  };

  var ultimoErro = null;

  /* ---------------------------------------------------------------- local */

  function lerBruto(chave, padrao) {
    try {
      var texto = window.localStorage.getItem(chave);
      if (texto === null) { return padrao; }
      return JSON.parse(texto);
    } catch (e) {
      PDC.util.log("falha ao ler", chave, e);
      return padrao;
    }
  }

  function gravarBruto(chave, valor) {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      ultimoErro = e;
      avisarFalha(e);
      return false;
    }
  }

  /* Falha de gravacao nunca e silenciosa — RNF-018. */
  function avisarFalha(erro) {
    document.dispatchEvent(new CustomEvent("pdc:erro-gravacao", {
      detail: { mensagem: (erro && erro.name === "QuotaExceededError")
        ? "O armazenamento do navegador esta cheio. Exporte um backup e libere espaco."
        : "Nao foi possivel salvar no navegador. Verifique se o armazenamento esta bloqueado." }
    }));
  }

  function lerLocais(configPadrao) {
    migrarSePreciso();
    var config = lerBruto(CHAVES.config, {});
    return {
      progresso: lerBruto(CHAVES.progresso, {}),
      config:    Object.assign({}, configPadrao, config),
      extras:    lerBruto(CHAVES.extras, []),
      trilhas:   lerBruto(CHAVES.trilhas, []),
      respostas: lerBruto(CHAVES.respostas, {}),
      metas:     lerBruto(CHAVES.metas, [])
    };
  }

  function gravarLocais(dados) {
    var ok = true;
    ok = gravarBruto(CHAVES.progresso, dados.progresso) && ok;
    ok = gravarBruto(CHAVES.config, dados.config) && ok;
    ok = gravarBruto(CHAVES.extras, dados.extras) && ok;
    ok = gravarBruto(CHAVES.trilhas, dados.trilhas) && ok;
    ok = gravarBruto(CHAVES.respostas, dados.respostas) && ok;
    ok = gravarBruto(CHAVES.metas, dados.metas) && ok;
    ok = gravarBruto(CHAVES.versao, VERSAO_SCHEMA) && ok;
    if (ok) {
      document.dispatchEvent(new CustomEvent("pdc:salvo", { detail: { em: PDC.util.agoraISO() } }));
    }
    return ok;
  }

  /* --------------------------------------------------------------- versao */

  /* Migracoes: chave = versao de destino. Recebe e devolve o pacote de dados. */
  var migracoes = {};

  /* Guardado porque a migracao roda durante a carga, antes de app.js ligar os
     ouvintes de evento. Quem chega depois consulta PDC.db.ultimaMigracao(). */
  var ultimaMigracao = null;

  function migrarSePreciso() {
    var versao = lerBruto(CHAVES.versao, null);

    if (versao === null) {
      gravarBruto(CHAVES.versao, VERSAO_SCHEMA);
      ultimaMigracao = { estado: "novo", de: null, para: VERSAO_SCHEMA };
    } else if (versao === VERSAO_SCHEMA) {
      ultimaMigracao = { estado: "atual", de: versao, para: versao };
    } else if (versao > VERSAO_SCHEMA) {
      /* Versao futura: recusa sem apagar nada — RN-011. */
      ultimaMigracao = { estado: "futura", de: versao, para: VERSAO_SCHEMA };
      document.dispatchEvent(new CustomEvent("pdc:versao-futura", {
        detail: { encontrada: versao, suportada: VERSAO_SCHEMA }
      }));
    } else {
      var aplicadas = [];
      for (var v = versao + 1; v <= VERSAO_SCHEMA; v++) {
        if (typeof migracoes[v] === "function") {
          migracoes[v]();
          aplicadas.push(v);
        }
      }
      gravarBruto(CHAVES.versao, VERSAO_SCHEMA);
      ultimaMigracao = { estado: "migrado", de: versao, para: VERSAO_SCHEMA, aplicadas: aplicadas };
    }

    return ultimaMigracao;
  }

  /* ------------------------------------------------------------ IndexedDB */

  var conexao = null;

  function abrir() {
    if (conexao) { return Promise.resolve(conexao); }
    return new Promise(function (resolver, rejeitar) {
      if (!window.indexedDB) {
        rejeitar(new Error("Este navegador nao suporta IndexedDB."));
        return;
      }
      var pedido = window.indexedDB.open(BANCO, VERSAO_BANCO);

      pedido.onupgradeneeded = function (evento) {
        var bd = evento.target.result;
        Object.keys(STORES).forEach(function (nome) {
          if (bd.objectStoreNames.contains(nome)) { return; }
          var conf = STORES[nome];
          var store = bd.createObjectStore(nome, { keyPath: conf[0] });
          conf[1].forEach(function (idx) {
            store.createIndex(idx[0], idx[1], { unique: Boolean(idx[2]) });
          });
        });
      };

      pedido.onsuccess = function () { conexao = pedido.result; resolver(conexao); };
      pedido.onerror = function () { rejeitar(pedido.error || new Error("Falha ao abrir o banco local.")); };
      pedido.onblocked = function () { rejeitar(new Error("Banco local bloqueado por outra aba aberta.")); };
    });
  }

  function transacao(nomeStore, modo) {
    return abrir().then(function (bd) {
      return bd.transaction(nomeStore, modo).objectStore(nomeStore);
    });
  }

  function envolver(pedido) {
    return new Promise(function (resolver, rejeitar) {
      pedido.onsuccess = function () { resolver(pedido.result); };
      pedido.onerror = function () { rejeitar(pedido.error); };
    });
  }

  function obter(store, chave) {
    return transacao(store, "readonly").then(function (s) { return envolver(s.get(chave)); });
  }

  function todos(store) {
    return transacao(store, "readonly").then(function (s) { return envolver(s.getAll()); });
  }

  function porIndice(store, indice, valor) {
    return transacao(store, "readonly").then(function (s) {
      return envolver(s.index(indice).getAll(valor));
    });
  }

  function gravar(store, registro) {
    return transacao(store, "readwrite").then(function (s) {
      return envolver(s.put(registro));
    }).then(function (r) {
      document.dispatchEvent(new CustomEvent("pdc:salvo", { detail: { em: PDC.util.agoraISO() } }));
      return r;
    }, function (erro) {
      ultimoErro = erro;
      avisarFalha(erro);
      throw erro;
    });
  }

  function remover(store, chave) {
    return transacao(store, "readwrite").then(function (s) { return envolver(s.delete(chave)); });
  }

  function contar(store) {
    return transacao(store, "readonly").then(function (s) { return envolver(s.count()); });
  }

  /* Cota do navegador — RNF-017. Avisa em 80%. */
  function espaco() {
    if (!navigator.storage || !navigator.storage.estimate) {
      return Promise.resolve({ suportado: false });
    }
    return navigator.storage.estimate().then(function (e) {
      var usado = e.usage || 0;
      var total = e.quota || 0;
      var fracao = total > 0 ? usado / total : 0;
      if (fracao >= 0.8) {
        document.dispatchEvent(new CustomEvent("pdc:cota-alta", { detail: { fracao: fracao } }));
      }
      return { suportado: true, usado: usado, total: total, fracao: fracao };
    });
  }

  PDC.db = {
    VERSAO_SCHEMA: VERSAO_SCHEMA,
    CHAVES: CHAVES,
    STORES: Object.keys(STORES),
    migracoes: migracoes,
    lerLocais: lerLocais,
    gravarLocais: gravarLocais,
    migrarSePreciso: migrarSePreciso,
    ultimaMigracao: function () { return ultimaMigracao; },
    abrir: abrir,
    obter: obter,
    todos: todos,
    porIndice: porIndice,
    gravar: gravar,
    remover: remover,
    contar: contar,
    espaco: espaco,
    ultimoErro: function () { return ultimoErro; }
  };
})();
