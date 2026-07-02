import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CHAVE_ARMAZENAMENTO = "preferencias-acessibilidade";

const preferenciasPadrao = {
  fonteAumentada: false,
  altoContraste: false,
  tema: "automatico",
  reduzirAnimacoes: false,
  leituraEmVozAlta: false,
  destacarFoco: false,
  linguagemSimples: false
};

function lerPreferenciasSalvas() {
  if (typeof window === "undefined" || !window.localStorage) {
    return preferenciasPadrao;
  }

  try {
    const valorSalvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);

    if (!valorSalvo) {
      return preferenciasPadrao;
    }

    return { ...preferenciasPadrao, ...JSON.parse(valorSalvo) };
  } catch {
    return preferenciasPadrao;
  }
}

const AcessibilidadeContext = createContext(null);

export function AcessibilidadeProvider({ children }) {
  const [preferencias, setPreferencias] = useState(lerPreferenciasSalvas);

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(preferencias));
    } catch {
      // Modo privado ou armazenamento cheio: a preferencia so vale para esta sessao.
    }
  }, [preferencias]);

  useEffect(() => {
    const raiz = document.documentElement;

    raiz.setAttribute("data-fonte", preferencias.fonteAumentada ? "grande" : "padrao");
    raiz.setAttribute("data-contraste", preferencias.altoContraste ? "alto" : "padrao");
    raiz.setAttribute("data-tema", preferencias.tema);
    raiz.setAttribute("data-movimento", preferencias.reduzirAnimacoes ? "reduzido" : "padrao");
    raiz.setAttribute("data-foco", preferencias.destacarFoco ? "destacado" : "padrao");
    raiz.setAttribute("data-linguagem", preferencias.linguagemSimples ? "simples" : "padrao");
  }, [preferencias]);

  function atualizarPreferencia(chave, valor) {
    setPreferencias((atual) => ({ ...atual, [chave]: valor }));
  }

  function alternarPreferencia(chave) {
    setPreferencias((atual) => ({ ...atual, [chave]: !atual[chave] }));
  }

  const valorContexto = useMemo(
    () => ({ preferencias, atualizarPreferencia, alternarPreferencia }),
    [preferencias]
  );

  return (
    <AcessibilidadeContext.Provider value={valorContexto}>
      {children}
    </AcessibilidadeContext.Provider>
  );
}

export function useAcessibilidade() {
  const contexto = useContext(AcessibilidadeContext);

  if (!contexto) {
    throw new Error("useAcessibilidade precisa ser usado dentro de AcessibilidadeProvider.");
  }

  return contexto;
}
