/* tools/valida-resumo.js — confere a fidelidade e a utilidade do resumo extrativo.
   Uso: node tools/valida-resumo.js
   Nao faz parte do site publicado.

   RN-008: toda frase do resumo tem que existir LITERALMENTE no texto de origem.
   O portal seleciona trechos; nao reescreve nem interpreta. Este script prova isso
   contra texto real — as proprias aulas das trilhas — e nao contra exemplo de
   laboratorio. */

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");

global.window = { PDC: {} };
require(path.join(RAIZ, "js", "compreensao.js"));
const C = global.window.PDC.compreensao;

/* ------------------------------------------------ corpus: aulas das trilhas */

const trilhas = [];
global.window.PDC.trilhas = { registrar: (t) => trilhas.push(t) };
const PASTA = path.join(RAIZ, "js", "trilhas");
fs.readdirSync(PASTA).filter((f) => f.endsWith(".js")).sort()
  .forEach((f) => require(path.join(PASTA, f)));

/* Transforma a aula em texto corrido com titulos, como sai de um documento. */
function aulaComoTexto(modulo) {
  const linhas = [modulo.titulo];
  const a = modulo.aula;
  linhas.push(a.objetivo);
  (a.blocos || []).forEach((b) => {
    if (b.t === "subtitulo") { linhas.push(""); linhas.push(b.v); }
    else if (b.t === "texto" || b.t === "destaque" || b.t === "aviso") { linhas.push(b.v); }
    else if (b.t === "lista") { (b.v || []).forEach((i) => linhas.push(i)); }
    else if (b.t === "citacao") { linhas.push(b.v); }
  });
  if (a.exemplo) {
    linhas.push("");
    linhas.push(a.exemplo.titulo || "No seu dia a dia");
    (a.exemplo.blocos || []).forEach((b) => { if (b.v) { linhas.push(b.v); } });
  }
  return linhas.join("\n");
}

const documentos = [];
trilhas.forEach((t) => (t.fases || []).forEach((f) => (f.modulos || []).forEach((m) => {
  documentos.push({ id: m.id, titulo: m.titulo, texto: aulaComoTexto(m) });
})));

/* casos de borda: sem estrutura, curtissimo e vazio */
documentos.push({
  id: "borda.sem-titulo", titulo: "Texto corrido",
  texto: "A media distribui o total igualmente entre todos. A mediana parte o conjunto ao meio. " +
         "Quando media e mediana divergem muito existe cauda na distribuicao. A cauda precisa ser " +
         "investigada antes de qualquer relatorio sair. Desvio padrao mede o afastamento tipico. " +
         "Percentis resistem melhor a valores extremos que o desvio padrao."
});
documentos.push({ id: "borda.curto", titulo: "Muito curto", texto: "Uma frase apenas, sem mais nada." });
documentos.push({ id: "borda.vazio", titulo: "Vazio", texto: "" });

/* ------------------------------------------------------------- verificacao */

function normalizarEspacos(s) {
  return String(s).replace(/\s+/g, " ").trim();
}

let erros = [];
let avisos = [];
let totalFrases = 0;
let totalResumo = 0;
let semEstrutura = 0;
let comGlossario = 0;
let mapasVazios = 0;

documentos.forEach((doc) => {
  const origem = normalizarEspacos(doc.texto);

  ["curto", "medio", "longo"].forEach((tamanho) => {
    let r;
    try {
      r = C.resumir(doc.texto, { tamanho: tamanho });
    } catch (e) {
      erros.push(`${doc.id} [${tamanho}]: resumir lancou erro -> ${e.message}`);
      return;
    }

    r.secoes.forEach((secao) => {
      secao.frases.forEach((frase) => {
        /* RN-008: a frase precisa existir literalmente na origem */
        if (origem.indexOf(normalizarEspacos(frase)) < 0) {
          erros.push(`${doc.id} [${tamanho}]: frase do resumo NAO existe na origem -> "${frase.slice(0, 70)}"`);
        }
      });
    });

    if (tamanho === "medio") {
      totalFrases += r.frasesTotal;
      totalResumo += r.frasesResumo;
      if (r.semEstrutura) { semEstrutura++; }
      /* resumo nao pode ser maior que o texto nem vir vazio quando ha conteudo */
      if (r.frasesTotal > 6 && r.frasesResumo === 0) {
        erros.push(`${doc.id}: texto com ${r.frasesTotal} frases produziu resumo vazio`);
      }
      if (r.frasesResumo > r.frasesTotal) {
        erros.push(`${doc.id}: resumo com mais frases que o original`);
      }
    }
  });

  /* o resumo longo nao pode ser menor que o curto */
  const curto = C.resumir(doc.texto, { tamanho: "curto" }).frasesResumo;
  const longo = C.resumir(doc.texto, { tamanho: "longo" }).frasesResumo;
  if (longo < curto) {
    erros.push(`${doc.id}: resumo longo (${longo}) menor que o curto (${curto})`);
  }

  /* glossario: termo precisa aparecer no trecho que o acompanha */
  let g;
  try { g = C.glossario(doc.texto); }
  catch (e) { erros.push(`${doc.id}: glossario lancou erro -> ${e.message}`); g = []; }
  if (g.length) { comGlossario++; }
  g.forEach((t) => {
    if (!t.trecho) {
      erros.push(`${doc.id}: termo "${t.termo}" sem trecho de contexto`);
      return;
    }
    const alvo = t.chave.split(" ").join(" ");
    const norm = t.trecho.split(/[^A-Za-zÀ-ÿ0-9]+/).filter(Boolean).map(C.normalizar).join(" ");
    if (norm.indexOf(alvo) < 0) {
      erros.push(`${doc.id}: termo "${t.termo}" nao aparece no proprio trecho`);
    }
  });

  /* mapa mental: nunca pode sair sem ramo quando o texto tem conteudo */
  let m;
  try { m = C.mapaMental(doc.texto, doc.titulo); }
  catch (e) { erros.push(`${doc.id}: mapaMental lancou erro -> ${e.message}`); m = { nos: [] }; }
  const ramos = m.nos.filter((n) => n.nivel === 1).length;
  if (origem.length > 400 && ramos === 0) {
    mapasVazios++;
    avisos.push(`${doc.id}: mapa mental sem nenhum ramo (texto de ${origem.length} caracteres)`);
  }
  const semPai = m.nos.filter((n) => n.pai && !m.nos.some((o) => o.id === n.pai)).length;
  if (semPai) { erros.push(`${doc.id}: mapa com ${semPai} no(s) apontando para pai inexistente`); }

  /* posicionamento nao pode deixar no sem coordenada */
  C.posicionar(m.nos, {});
  const semPosicao = m.nos.filter((n) => n.x === null || n.y === null).length;
  if (semPosicao) { erros.push(`${doc.id}: ${semPosicao} no(s) sem posicao apos posicionar`); }
});

console.log("");
console.log("  documentos analisados .... " + documentos.length);
console.log("  frases no original ....... " + totalFrases);
console.log("  frases no resumo medio ... " + totalResumo +
  "  (" + Math.round((totalResumo / Math.max(1, totalFrases)) * 100) + "% do texto)");
console.log("  sem estrutura detectada .. " + semEstrutura);
console.log("  com glossario ............ " + comGlossario + " de " + documentos.length);
console.log("  mapas sem ramo ........... " + mapasVazios);
console.log("");

if (avisos.length) {
  console.log("AVISOS (" + avisos.length + "):");
  avisos.slice(0, 10).forEach((a) => console.log("  - " + a));
  if (avisos.length > 10) { console.log("  ... e mais " + (avisos.length - 10)); }
  console.log("");
}

if (erros.length) {
  console.log("FALHOU — " + erros.length + " problema(s):");
  erros.slice(0, 20).forEach((e) => console.log("  - " + e));
  if (erros.length > 20) { console.log("  ... e mais " + (erros.length - 20)); }
  process.exit(1);
}

console.log("OK: todo resumo e fiel ao texto de origem (RN-008), glossario e mapa integros.");
