/* tools/testa-fontes.js — verifica as fontes de livros: status, CORS, tempo e formato.
   Uso: node tools/testa-fontes.js
   Atualiza a base de evidencia de docs/FONTES.md. Nao faz parte do site publicado.

   Atencao: este teste roda em Node, nao no navegador. Ele confere se a fonte
   responde e se envia o cabecalho CORS; a prova definitiva continua sendo uma
   busca real no portal, porque so o navegador aplica a politica de origem. */

const https = require("https");

const ORIGEM = "https://carlos0104.github.io";
const LIMITE = 15000;

const ALVOS = [
  {
    id: "openlibrary",
    nome: "Open Library",
    url: "https://openlibrary.org/search.json?q=kahneman&limit=2&fields=key,title,author_name",
    confere: (j) => Array.isArray(j.docs) && j.docs.length > 0 && Boolean(j.docs[0].title)
  },
  {
    id: "archive",
    nome: "Internet Archive",
    url: "https://archive.org/advancedsearch.php?q=" +
      encodeURIComponent("title:(estatistica) AND mediatype:texts") +
      "&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=downloads+desc&rows=2&page=1&output=json",
    confere: (j) => Boolean(j.response) && Array.isArray(j.response.docs) && j.response.docs.length > 0
  },
  {
    id: "googlebooks",
    nome: "Google Books",
    url: "https://www.googleapis.com/books/v1/volumes?q=intitle:kahneman&maxResults=2",
    confere: (j) => Array.isArray(j.items) && j.items.length > 0,
    toleraLimite: true
  },
  {
    id: "crossref",
    nome: "Crossref",
    url: "https://api.crossref.org/works?query.bibliographic=data+engineering&rows=2&filter=type:book",
    confere: (j) => Boolean(j.message) && Array.isArray(j.message.items) && j.message.items.length > 0
  },
  {
    id: "gutendex",
    nome: "Gutendex (pendente, B-04)",
    url: "https://gutendex.com/books?search=machado",
    confere: (j) => Array.isArray(j.results),
    opcional: true
  }
];

function consultar(alvo) {
  return new Promise((resolver) => {
    const t0 = Date.now();
    const pedido = https.request(alvo.url, {
      method: "GET",
      timeout: LIMITE,
      headers: {
        "Origin": ORIGEM,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) testa-fontes/1.0",
        "Accept": "application/json"
      }
    }, (resposta) => {
      let corpo = "";
      resposta.on("data", (d) => { corpo += d; });
      resposta.on("end", () => {
        const ms = Date.now() - t0;
        const cors = resposta.headers["access-control-allow-origin"] || null;
        let formatoOk = null;
        let amostra = null;
        if (resposta.statusCode === 200) {
          try {
            const j = JSON.parse(corpo);
            formatoOk = alvo.confere(j);
            amostra = JSON.stringify(j).slice(0, 90);
          } catch (e) {
            formatoOk = false;
            amostra = "resposta nao e JSON valido";
          }
        }
        resolver({ alvo, status: resposta.statusCode, cors, ms, formatoOk, amostra });
      });
    });
    pedido.on("timeout", () => { pedido.destroy(); resolver({ alvo, status: "timeout", ms: Date.now() - t0 }); });
    pedido.on("error", (e) => resolver({ alvo, status: "erro", detalhe: e.code || e.message, ms: Date.now() - t0 }));
    pedido.end();
  });
}

(async function () {
  console.log("\nTestando " + ALVOS.length + " fonte(s) com Origin: " + ORIGEM + "\n");

  const resultados = [];
  for (const alvo of ALVOS) {
    resultados.push(await consultar(alvo));
  }

  let reprovadas = 0;
  resultados.forEach((r) => {
    const cors = r.cors ? (r.cors === "*" ? "*" : "reflete origem") : "AUSENTE";
    let veredito;

    if (r.status === 200 && r.formatoOk && r.cors) {
      veredito = "aprovada";
    } else if (r.status === 429 && r.alvo.toleraLimite) {
      veredito = "limite de cota (esperado em IP compartilhado)";
    } else if (r.alvo.opcional) {
      veredito = "pendente";
    } else {
      veredito = "REPROVADA";
      reprovadas++;
    }

    console.log("  " + r.alvo.nome.padEnd(28) +
      String(r.status).padEnd(9) +
      ("CORS " + cors).padEnd(20) +
      (r.ms + " ms").padEnd(10) +
      veredito);
    if (r.formatoOk === false && r.status === 200) {
      console.log("      formato inesperado: " + r.amostra);
    }
    if (r.detalhe) { console.log("      " + r.detalhe); }
  });

  const aprovadas = resultados.filter((r) => r.status === 200 && r.formatoOk && r.cors).length;
  console.log("\n  aprovadas agora: " + aprovadas);

  if (reprovadas) {
    console.log("\nFALHOU: " + reprovadas + " fonte(s) obrigatoria(s) reprovada(s).");
    process.exitCode = 1;
  } else {
    console.log("\nOK: nenhuma fonte obrigatoria reprovada.");
  }
})();
