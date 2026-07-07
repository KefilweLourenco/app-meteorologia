import { useEffect, useState } from "react";
import { buscarSugestoesCidade } from "../servicos/apiClima";

/**
 * @param {(cidade: string, sugestao: object | null) => void} aoConfirmar
 *   Chamado quando o usuário confirma uma busca (submit do formulário,
 *   clique numa sugestão ou Enter com uma sugestão ativa).
 */
export function useBuscaDeCidade(aoConfirmar) {
  const [cidade, setCidade] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [indiceSugestaoAtiva, setIndiceSugestaoAtiva] = useState(-1);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState(null);

  useEffect(() => {
    const termo = cidade.trim();

    if (termo.length < 2) {
      setSugestoes([]);
      setCarregandoSugestoes(false);
      setIndiceSugestaoAtiva(-1);
      return undefined;
    }

    let ativo = true;
    setCarregandoSugestoes(true);

    const temporizador = window.setTimeout(async () => {
      const resultado = await buscarSugestoesCidade(termo);

      if (!ativo) {
        return;
      }

      setSugestoes(resultado);
      setCarregandoSugestoes(false);
      setIndiceSugestaoAtiva(resultado.length > 0 ? 0 : -1);
    }, 350);

    return () => {
      ativo = false;
      window.clearTimeout(temporizador);
    };
  }, [cidade]);

  function aoAlterarCidade(valor) {
    setCidade(valor);
    setSugestaoSelecionada(null);
    setMostrarSugestoes(true);
    setIndiceSugestaoAtiva(-1);
  }

  function aoFocarCampo() {
    if (sugestoes.length > 0) {
      setMostrarSugestoes(true);
    }
  }

  function selecionarSugestao(sugestao) {
    setCidade(sugestao.label);
    setSugestaoSelecionada(sugestao);
    setSugestoes([]);
    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);
  }

  function buscarPorTexto(texto) {
    const cidadeFormatada = texto.trim();

    if (!cidadeFormatada) {
      return;
    }

    setCidade(cidadeFormatada);
    setSugestaoSelecionada(null);
    setSugestoes([]);
    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);
    aoConfirmar(cidadeFormatada, null);
  }

  function confirmarBusca() {
    const cidadeFormatada = cidade.trim();

    if (!cidadeFormatada) {
      return { sucesso: false };
    }

    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);

    const deveUsarSugestaoSelecionada =
      sugestaoSelecionada && cidadeFormatada === sugestaoSelecionada.label;

    aoConfirmar(cidadeFormatada, deveUsarSugestaoSelecionada ? sugestaoSelecionada : null);
    return { sucesso: true };
  }

  function aoTeclarNoCampo(evento) {
    if (!mostrarSugestoes || sugestoes.length === 0) {
      return;
    }

    if (evento.key === "ArrowDown") {
      evento.preventDefault();
      setIndiceSugestaoAtiva((indiceAtual) => {
        const proximoIndice = indiceAtual + 1;
        return proximoIndice >= sugestoes.length ? 0 : proximoIndice;
      });
      return;
    }

    if (evento.key === "ArrowUp") {
      evento.preventDefault();
      setIndiceSugestaoAtiva((indiceAtual) => {
        const proximoIndice = indiceAtual - 1;
        return proximoIndice < 0 ? sugestoes.length - 1 : proximoIndice;
      });
      return;
    }

    if (evento.key === "Enter" && indiceSugestaoAtiva >= 0) {
      evento.preventDefault();
      const sugestaoEscolhida = sugestoes[indiceSugestaoAtiva];
      selecionarSugestao(sugestaoEscolhida);
      aoConfirmar(sugestaoEscolhida.label, sugestaoEscolhida);
      return;
    }

    if (evento.key === "Escape") {
      setMostrarSugestoes(false);
      setIndiceSugestaoAtiva(-1);
    }
  }

  return {
    cidade,
    sugestoes,
    carregandoSugestoes,
    mostrarSugestoes,
    indiceSugestaoAtiva,
    aoAlterarCidade,
    aoFocarCampo,
    aoTeclarNoCampo,
    selecionarSugestao,
    confirmarBusca,
    buscarPorTexto
  };
}
