# -*- coding: utf-8 -*-
"""tools/valida_sql.py - confere os exercicios de SQL contra a base de exemplo real.

Uso: python tools/valida_sql.py

Para cada exercicio de tipo sql, roda em sqlite3:
  - o gabarito, que precisa bater com o campo 'esperado';
  - o starter, que NAO pode bater (senao o exercicio ja nasce resolvido).

Nao faz parte do site publicado.
"""

import json
import sqlite3
import subprocess
import sys
import os

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def carregar():
    saida = subprocess.run(
        ["node", os.path.join("tools", "dump-exercicios.js")],
        cwd=RAIZ, capture_output=True, text=True, encoding="utf-8",
    )
    if saida.returncode != 0:
        print("falha ao ler os exercicios:", saida.stderr)
        sys.exit(1)
    return json.loads(saida.stdout)


def normalizar(valor):
    if valor is None:
        return ""
    if isinstance(valor, float) and valor.is_integer():
        return str(int(valor))
    return str(valor).strip()


def executar(script_base, consulta):
    con = sqlite3.connect(":memory:")
    try:
        con.executescript(script_base)
        cur = con.execute(consulta)
        colunas = [d[0] for d in cur.description] if cur.description else []
        linhas = [[normalizar(v) for v in linha] for linha in cur.fetchall()]
        return colunas, linhas
    finally:
        con.close()


def comparar(obtido, esperado, ordem_importa):
    col_o, lin_o = obtido
    col_e = list(esperado.get("colunas", []))
    lin_e = [[normalizar(v) for v in l] for l in esperado.get("linhas", [])]

    if len(col_o) != len(col_e):
        return False, "colunas: obtido %d, esperado %d" % (len(col_o), len(col_e))
    if len(lin_o) != len(lin_e):
        return False, "linhas: obtido %d, esperado %d" % (len(lin_o), len(lin_e))

    a = ["|".join(l) for l in lin_o]
    b = ["|".join(l) for l in lin_e]
    if not ordem_importa:
        a, b = sorted(a), sorted(b)
    for i, (x, y) in enumerate(zip(a, b)):
        if x != y:
            return False, "linha %d: obtido [%s], esperado [%s]" % (i + 1, x, y)
    return True, ""


def main():
    dados = carregar()
    bases = dados["bases"]
    exercicios = [e for e in dados["exercicios"] if e.get("tipo") == "sql"]

    if not exercicios:
        print("nenhum exercicio de SQL encontrado.")
        return 0

    print("\nValidando %d exercicio(s) de SQL.\n" % len(exercicios))
    falhas = []

    for e in exercicios:
        nome = e["id"]
        base = bases.get(e.get("base"))
        if base is None:
            falhas.append("%s: base '%s' nao existe" % (nome, e.get("base")))
            continue

        # gabarito precisa bater
        try:
            obtido = executar(base, e["gabarito"])
        except Exception as erro:
            falhas.append("%s: gabarito nao executa -> %s" % (nome, erro))
            continue

        ok, motivo = comparar(obtido, e.get("esperado", {}), e.get("ordemImporta", False))
        if not ok:
            falhas.append("%s: gabarito diverge do esperado -> %s" % (nome, motivo))
            print("  %-22s GABARITO DIVERGE" % nome)
            print("      esperado: %s" % json.dumps(e.get("esperado", {}), ensure_ascii=False))
            print("      obtido:   %s" % json.dumps(
                {"colunas": obtido[0], "linhas": obtido[1]}, ensure_ascii=False))
            continue

        # starter nao pode bater
        starter_passa = False
        try:
            obtido_s = executar(base, e["starter"])
            starter_passa, _ = comparar(obtido_s, e.get("esperado", {}), e.get("ordemImporta", False))
        except Exception:
            starter_passa = False  # nao executa: tambem reprova, que e o desejado

        if starter_passa:
            falhas.append("%s: o starter ja produz o resultado esperado" % nome)
            print("  %-22s STARTER JA RESOLVE" % nome)
            continue

        print("  %-22s ok  (gabarito passa, starter reprova)" % nome)

    print("")
    if falhas:
        print("FALHOU - %d problema(s):" % len(falhas))
        for f in falhas:
            print("  - " + f)
        return 1

    print("OK: todos os exercicios de SQL conferem com a base de exemplo.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
