/* tools/checa-links.js — confere o status HTTP de todos os links externos das trilhas.
   Uso: node tools/checa-links.js
   Nao faz parte do site publicado.

   Observacao: alguns sites recusam requisicao automatizada (403) mesmo funcionando
   no navegador. O relatorio separa esses casos dos que realmente nao existem. */

const fs = require("fs");
const path = require("path");
const https = require("https");

const PASTA = path.join(__dirname, "..", "js", "trilhas");
const trilhas = [];
global.window = { PDC: { trilhas: { registrar: (t) => trilhas.push(t) } } };

fs.readdirSync(PASTA)
  .filter((f) => f.endsWith(".js"))
  .sort()
  .forEach((f) => require(path.join(PASTA, f)));

/* um link pode se repetir em varios modulos: checa uma vez, reporta onde aparece */
const links = new Map();
trilhas.forEach((t) => {
  (t.fases || []).forEach((fase) => {
    (fase.modulos || []).forEach((m) => {
      (m.itens || []).forEach((i) => {
        if (!i.url) { return; }
        if (!links.has(i.url)) { links.set(i.url, []); }
        links.get(i.url).push(i.id);
      });
      (m.aula.blocos || []).forEach((b, idx) => {
        if (b.t === "citacao" && b.url) {
          if (!links.has(b.url)) { links.set(b.url, []); }
          links.get(b.url).push(`${m.id} citacao ${idx}`);
        }
      });
    });
  });
});

function checar(url) {
  return new Promise((resolver) => {
    const opcoes = {
      method: "GET",
      timeout: 15000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) checa-links/1.0",
        "Accept": "text/html,application/xhtml+xml,*/*"
      }
    };
    const pedido = https.request(url, opcoes, (resposta) => {
      resposta.destroy();
      resolver({ url, status: resposta.statusCode, local: resposta.headers.location || null });
    });
    pedido.on("timeout", () => { pedido.destroy(); resolver({ url, status: "timeout" }); });
    pedido.on("error", (e) => resolver({ url, status: "erro", detalhe: e.code || e.message }));
    pedido.end();
  });
}

(async function () {
  const urls = Array.from(links.keys()).sort();
  console.log(`\nChecando ${urls.length} links unicos de ${trilhas.length} trilhas.\n`);

  const resultados = [];
  const LOTE = 6;
  for (let i = 0; i < urls.length; i += LOTE) {
    const parte = await Promise.all(urls.slice(i, i + LOTE).map(checar));
    parte.forEach((r) => resultados.push(r));
    process.stdout.write(".");
  }
  console.log("\n");

  const ok = [];
  const redirecionado = [];
  const recusado = [];
  const quebrado = [];

  resultados.forEach((r) => {
    if (r.status >= 200 && r.status < 300) { ok.push(r); }
    else if (r.status >= 300 && r.status < 400) { redirecionado.push(r); }
    else if (r.status === 403 || r.status === 401 || r.status === 429) { recusado.push(r); }
    else { quebrado.push(r); }
  });

  console.log(`  respondem (2xx) ......... ${ok.length}`);
  console.log(`  redirecionam (3xx) ...... ${redirecionado.length}`);
  console.log(`  recusam automacao ....... ${recusado.length}  (403/401/429 — conferir no navegador)`);
  console.log(`  problema ................ ${quebrado.length}`);
  console.log("");

  if (redirecionado.length) {
    console.log("REDIRECIONAM (funcionam, mas o endereco final e outro):");
    redirecionado.forEach((r) => console.log(`  ${r.status}  ${r.url}\n        -> ${r.local}`));
    console.log("");
  }
  if (recusado.length) {
    console.log("RECUSAM AUTOMACAO (provavelmente abrem normalmente no navegador):");
    recusado.forEach((r) => console.log(`  ${r.status}  ${r.url}   [${links.get(r.url).join(", ")}]`));
    console.log("");
  }
  if (quebrado.length) {
    console.log("PROBLEMA (verificar e corrigir):");
    quebrado.forEach((r) => console.log(`  ${r.status}${r.detalhe ? " " + r.detalhe : ""}  ${r.url}   [${links.get(r.url).join(", ")}]`));
    console.log("");
    process.exitCode = 1;
  } else {
    console.log("OK: nenhum link quebrado.");
  }
})();
