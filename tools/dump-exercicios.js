/* tools/dump-exercicios.js — despeja em JSON todos os exercicios e as bases de
   exemplo, para os validadores em Python consumirem.
   Uso: node tools/dump-exercicios.js > saida.json */

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const PASTA = path.join(RAIZ, "js", "trilhas");

const trilhas = [];
global.window = { PDC: { trilhas: { registrar: (t) => trilhas.push(t) } } };
fs.readdirSync(PASTA).filter((f) => f.endsWith(".js")).sort()
  .forEach((f) => require(path.join(PASTA, f)));

/* As bases vivem em js/exercicios.js, que depende do DOM. Em vez de carregar o
   arquivo inteiro, executa apenas o trecho que define o objeto BASES. */
function extrairBases() {
  const fonte = fs.readFileSync(path.join(RAIZ, "js", "exercicios.js"), "utf8");
  const inicio = fonte.indexOf("var BASES = {");
  if (inicio < 0) { throw new Error("BASES nao encontrado em js/exercicios.js"); }
  const fim = fonte.indexOf("\n  };", inicio);
  if (fim < 0) { throw new Error("fim de BASES nao encontrado"); }
  const trecho = fonte.slice(inicio, fim + 5);
  const fabrica = new Function(trecho + " return BASES;");
  return fabrica();
}

const exercicios = [];
trilhas.forEach((t) => {
  (t.fases || []).forEach((fase) => {
    (fase.modulos || []).forEach((m) => {
      (m.exercicios || []).forEach((e) => {
        exercicios.push(Object.assign({ trilha: t.id, modulo: m.id }, e));
      });
    });
  });
});

process.stdout.write(JSON.stringify({
  bases: extrairBases(),
  exercicios: exercicios
}, null, 1));
