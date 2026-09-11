# -*- coding: utf-8 -*-
"""tools/valida_exercicios.py - executa em Python real todos os exercicios de codigo.

Uso: python tools/valida_exercicios.py

Para cada exercicio de tipo python:
  - gabarito + teste  -> tem que PASSAR;
  - starter  + teste  -> tem que FALHAR (senao o exercicio nasce resolvido).

Cada execucao acontece em um subprocesso separado, com tempo limite, para que
um laco infinito em um exercicio nao trave a validacao inteira.

Nao faz parte do site publicado.
"""

import json
import os
import subprocess
import sys
import tempfile

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIMITE = 15

MOLDE = """# -*- coding: utf-8 -*-
import sys, io

_saida = io.StringIO()
_antigo = sys.stdout
sys.stdout = _saida
try:
{codigo}
{teste}
finally:
    sys.stdout = _antigo
"""


def indentar(texto):
    linhas = (texto or "").rstrip().split("\n")
    return "\n".join("    " + l for l in linhas) if linhas else "    pass"


def rodar(codigo, teste):
    """Devolve (passou, mensagem)."""
    fonte = MOLDE.format(codigo=indentar(codigo), teste=indentar(teste))
    arquivo = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False,
                                         encoding="utf-8") as f:
            f.write(fonte)
            arquivo = f.name
        r = subprocess.run([sys.executable, arquivo], capture_output=True,
                           text=True, encoding="utf-8", timeout=LIMITE)
        if r.returncode == 0:
            return True, ""
        erro = (r.stderr or "").strip().split("\n")
        return False, erro[-1] if erro else "erro sem mensagem"
    except subprocess.TimeoutExpired:
        return False, "tempo limite de %ds excedido" % LIMITE
    finally:
        if arquivo and os.path.exists(arquivo):
            os.unlink(arquivo)


def carregar():
    saida = subprocess.run(["node", os.path.join("tools", "dump-exercicios.js")],
                           cwd=RAIZ, capture_output=True, text=True, encoding="utf-8")
    if saida.returncode != 0:
        print("falha ao ler os exercicios:", saida.stderr)
        sys.exit(1)
    return json.loads(saida.stdout)


def main():
    dados = carregar()
    exercicios = [e for e in dados["exercicios"] if e.get("tipo") == "python"]

    if not exercicios:
        print("nenhum exercicio de Python encontrado.")
        return 0

    print("\nExecutando %d exercicio(s) de Python em %s.\n"
          % (len(exercicios), sys.version.split()[0]))

    falhas = []
    for e in exercicios:
        nome = e["id"]
        teste = e.get("teste", "")

        passou_gabarito, erro_gab = rodar(e.get("gabarito", ""), teste)
        passou_starter, _ = rodar(e.get("starter", ""), teste)

        problemas = []
        if not passou_gabarito:
            problemas.append("gabarito NAO passa -> " + erro_gab)
        if passou_starter:
            problemas.append("starter JA passa (exercicio nasce resolvido)")

        if problemas:
            falhas.append((nome, problemas))
            print("  %-22s FALHOU" % nome)
            for p in problemas:
                print("      " + p)
        else:
            print("  %-22s ok" % nome)

    print("")
    if falhas:
        print("FALHOU - %d exercicio(s) com problema." % len(falhas))
        return 1

    print("OK: %d exercicios de Python conferem (gabarito passa, starter reprova)."
          % len(exercicios))
    return 0


if __name__ == "__main__":
    sys.exit(main())
