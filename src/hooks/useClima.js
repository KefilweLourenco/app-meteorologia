import { useState } from "react";
import {
  buscarClimaPorCidade,
  buscarClimaPorCoordenadas,
  buscarClimaPorSugestao
} from "../servicos/apiClima";

function obterCoordenadasAtuais() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Seu navegador não suporta geolocalização."));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  });
}

function descreverErroDeLocalizacao(erro) {
  if (erro.code === 1) {
    return "Erro: permissão de localização negada. Você ainda pode buscar por cidade.";
  }

  if (erro.code === 2) {
    return "Erro: não foi possível identificar sua localização atual.";
  }

  if (erro.code === 3) {
    return "Erro: a localização demorou para responder. Tente novamente.";
  }

  return erro.message || "Erro: não foi possível usar sua localização agora.";
}

export function useClima() {
  const [dadosClima, setDadosClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("Digite uma cidade ou use sua localização.");
  const [tipoMensagem, setTipoMensagem] = useState("info");

  function atualizarMensagem(texto, tipo = "info") {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  async function buscarPorCidade(textoCidade, sugestaoEscolhida = null) {
    setCarregando(true);
    atualizarMensagem("Carregando previsão do tempo...", "info");

    try {
      const resposta = sugestaoEscolhida
        ? await buscarClimaPorSugestao(sugestaoEscolhida)
        : await buscarClimaPorCidade(textoCidade);

      setDadosClima(resposta);
      atualizarMensagem("Sucesso: clima carregado.", "sucesso");
    } catch (erro) {
      setDadosClima(null);
      atualizarMensagem(erro.message || "Erro: não foi possível buscar o clima agora.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  async function buscarPorLocalizacaoAtual() {
    setCarregando(true);
    atualizarMensagem("Solicitando sua localização...", "info");

    try {
      const posicao = await obterCoordenadasAtuais();
      const { latitude, longitude } = posicao.coords;
      atualizarMensagem("Carregando clima da sua localização...", "info");

      const resposta = await buscarClimaPorCoordenadas(latitude, longitude);
      setDadosClima(resposta);
      atualizarMensagem("Sucesso: clima da sua localização carregado.", "sucesso");
    } catch (erro) {
      setDadosClima(null);
      atualizarMensagem(descreverErroDeLocalizacao(erro), "erro");
    } finally {
      setCarregando(false);
    }
  }

  return {
    dadosClima,
    carregando,
    mensagem,
    tipoMensagem,
    atualizarMensagem,
    buscarPorCidade,
    buscarPorLocalizacaoAtual
  };
}
