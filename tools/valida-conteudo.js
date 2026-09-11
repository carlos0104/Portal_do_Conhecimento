/* tools/valida-conteudo.js — integridade das trilhas.
   Uso: node tools/valida-conteudo.js
   Nao faz parte do site publicado. */

const fs = require("fs");
const path = require("path");

const PASTA = path.join(__dirname, "..", "js", "trilhas");
const IGNORAR = ["exemplo.js"];

const trilhas = [];
global.window = { PDC: { trilhas: { registrar: (t) => trilhas.push(t) } } };

const arquivos = fs.readdirSync(PASTA)
  .filter((f) => f.endsWith(".js") && !IGNORAR.includes(f))
  .sort();

if (!arquivos.length) {
  console.log("Nenhuma trilha encontrada em js/trilhas.");
  process.exit(1);
}

arquivos.forEach((f) => require(path.join(PASTA, f)));

const erros = [];
const avisos = [];
const ids = new Set();
const TIPOS_ITEM = ["video", "playlist", "leitura", "pratica", "entregavel", "externo", "livro"];
const TIPOS_EX = ["python", "sql", "quiz", "reflexao"];

function unico(id, onde) {
  if (!id) { erros.push(`${onde}: id ausente`); return; }
  if (ids.has(id)) { erros.push(`id repetido: ${id} (${onde})`); }
  ids.add(id);
}

let totalModulos = 0;
let totalHoras = 0;
let totalExercicios = 0;
let totalItens = 0;

trilhas.forEach((t) => {
  unico(t.id, "trilha");

  ["nome", "desc", "icone", "cor1", "tipoPratica"].forEach((c) => {
    if (!t[c]) { erros.push(`${t.id}: trilha sem ${c}`); }
  });

  let horasTrilha = 0;
  const modulosDaTrilha = [];

  (t.fases || []).forEach((fase) => {
    unico(fase.id, `${t.id} fase`);
    if (!fase.nome || !fase.n || !fase.cor) { erros.push(`${fase.id}: fase incompleta`); }
    if (!new RegExp(`^${t.id}\\.f\\d+$`).test(fase.id)) {
      erros.push(`${fase.id}: id de fase fora do padrao <trilha>.f<n>`);
    }

    (fase.modulos || []).forEach((m) => {
      unico(m.id, `${t.id} modulo`);
      modulosDaTrilha.push(m);
      totalModulos++;
      horasTrilha += m.h || 0;

      if (!new RegExp(`^${t.id}\\.m\\d+$`).test(m.id)) {
        erros.push(`${m.id}: id de modulo fora do padrao <trilha>.m<n>`);
      }
      if (!m.h || m.h <= 0) { erros.push(`${m.id}: horas invalidas`); }
      if (!m.titulo || !m.objetivo) { erros.push(`${m.id}: sem titulo ou objetivo`); }
      if (!m.topicos || !m.topicos.length) { avisos.push(`${m.id}: sem topicos`); }

      /* aula: campos obrigatorios de docs/CONTEUDO.md */
      const a = m.aula;
      if (!a) {
        erros.push(`${m.id}: sem aula nativa`);
      } else {
        ["objetivo", "blocos", "exemplo", "resumo", "aplicar"].forEach((c) => {
          if (!a[c] || (Array.isArray(a[c]) && !a[c].length)) {
            erros.push(`${m.id}: aula sem ${c}`);
          }
        });
        if (a.blocos && a.blocos.length < 5) { avisos.push(`${m.id}: aula com apenas ${a.blocos.length} blocos`); }
        (a.blocos || []).forEach((b, i) => {
          if (b.t === "citacao" && !b.fonte) { erros.push(`${m.id}: bloco ${i} e citacao sem fonte`); }
          if (b.t === "tabela" && (!b.cab || !b.linhas)) { erros.push(`${m.id}: bloco ${i} e tabela incompleta`); }
          if (!b.t) { erros.push(`${m.id}: bloco ${i} sem tipo`); }
        });
        if (a.exemplo && (!a.exemplo.blocos || !a.exemplo.blocos.length)) {
          erros.push(`${m.id}: exemplo sem blocos`);
        }
      }

      (m.itens || []).forEach((i) => {
        unico(i.id, `${m.id} item`);
        totalItens++;
        if (!i.id.startsWith(m.id + ".i")) { erros.push(`${i.id}: id de item fora do padrao`); }
        if (TIPOS_ITEM.indexOf(i.tipo) < 0) { erros.push(`${i.id}: tipo desconhecido "${i.tipo}"`); }
        if (!i.titulo) { erros.push(`${i.id}: item sem titulo`); }
        if (i.embed && !i.url) { erros.push(`${i.id}: tem embed mas nao tem url de origem`); }
        if (i.url && !/^https:\/\//.test(i.url)) { erros.push(`${i.id}: url nao e https`); }
        if ((i.tipo === "pratica" || i.tipo === "entregavel") && i.url) {
          avisos.push(`${i.id}: ${i.tipo} normalmente nao tem url`);
        }
      });

      (m.exercicios || []).forEach((e) => {
        unico(e.id, `${m.id} exercicio`);
        totalExercicios++;
        if (!e.id.startsWith(m.id + ".e")) { erros.push(`${e.id}: id de exercicio fora do padrao`); }
        if (TIPOS_EX.indexOf(e.tipo) < 0) { erros.push(`${e.id}: tipo desconhecido "${e.tipo}"`); }
        if (!e.enunciado) { erros.push(`${e.id}: sem enunciado`); }

        if (e.tipo === "python") {
          ["starter", "teste", "gabarito"].forEach((c) => {
            if (!e[c]) { erros.push(`${e.id}: exercicio python sem ${c}`); }
          });
          if (e.starter && e.gabarito && e.starter.trim() === e.gabarito.trim()) {
            erros.push(`${e.id}: starter igual ao gabarito`);
          }
        }
        if (e.tipo === "sql") {
          ["base", "starter", "esperado", "gabarito"].forEach((c) => {
            if (!e[c]) { erros.push(`${e.id}: exercicio sql sem ${c}`); }
          });
        }
        if (e.tipo === "quiz") {
          const alt = e.alternativas || [];
          if (alt.length < 2) { erros.push(`${e.id}: quiz com menos de 2 alternativas`); }
          const certas = alt.filter((x) => x.correta).length;
          if (certas !== 1) { erros.push(`${e.id}: quiz com ${certas} alternativas corretas, deveria ser 1`); }
          alt.forEach((x, i) => {
            if (!x.explicacao) { erros.push(`${e.id}: alternativa ${i} sem explicacao`); }
          });
        }
        if (e.tipo === "reflexao") {
          if (!e.perguntas || !e.perguntas.length) { erros.push(`${e.id}: reflexao sem perguntas`); }
        }
      });
    });
  });

  totalHoras += horasTrilha;

  if (t.horas !== horasTrilha) {
    erros.push(`${t.id}: horas declaradas ${t.horas}, soma dos modulos ${horasTrilha}`);
  }

  /* numeracao continua de modulo, sem reiniciar por fase */
  modulosDaTrilha.forEach((m, i) => {
    if (m.n !== i + 1) { erros.push(`${m.id}: n=${m.n}, esperado ${i + 1} pela ordem`); }
  });

  (t.marcos || []).forEach((mc) => {
    if (!ids.has(mc.moduloId)) { erros.push(`${t.id}: marco aponta para modulo inexistente ${mc.moduloId}`); }
    if (!mc.rotulo || !mc.texto) { erros.push(`${t.id}: marco incompleto`); }
  });
});

/* nenhum caractere acentuado nos arquivos de conteudo (docs/CONTEUDO.md §6) */
arquivos.forEach((f) => {
  const texto = fs.readFileSync(path.join(PASTA, f), "utf8");
  const acentos = texto.match(/[À-ÿ]/g);
  if (acentos) {
    const unicos = Array.from(new Set(acentos)).join(" ");
    avisos.push(`${f}: ${acentos.length} caractere(s) acentuado(s) (${unicos})`);
  }
});

console.log("");
console.log("  trilhas ......... " + trilhas.length);
console.log("  modulos ......... " + totalModulos);
console.log("  horas ........... " + totalHoras);
console.log("  itens ........... " + totalItens);
console.log("  exercicios ...... " + totalExercicios);
console.log("  ids unicos ...... " + ids.size);
console.log("");

if (avisos.length) {
  console.log("AVISOS (" + avisos.length + "):");
  avisos.forEach((a) => console.log("  - " + a));
  console.log("");
}

if (erros.length) {
  console.log("FALHOU — " + erros.length + " erro(s):");
  erros.forEach((e) => console.log("  - " + e));
  process.exit(1);
}

console.log("OK: estrutura integra em todas as trilhas.");
