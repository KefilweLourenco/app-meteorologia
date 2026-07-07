import { useCallback, useEffect, useRef, useState } from "react";

function obterConstrutorReconhecimento() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

const mensagensDeErro = {
  "not-allowed": "Permita o acesso ao microfone para usar a busca por voz.",
  "no-speech": "Não conseguimos ouvir nada. Tente falar novamente.",
  "audio-capture": "Nenhum microfone foi encontrado neste dispositivo.",
  network: "Falha de conexão durante o reconhecimento de voz."
};

function descreverErroDeReconhecimento(codigo) {
  return mensagensDeErro[codigo] || "Não foi possível reconhecer sua voz. Tente novamente.";
}

export function useReconhecimentoDeVoz() {
  const ConstrutorReconhecimento = obterConstrutorReconhecimento();
  const suportado = Boolean(ConstrutorReconhecimento);
  const [ouvindo, setOuvindo] = useState(false);
  const [transcricao, setTranscricao] = useState("");
  const [erro, setErro] = useState(null);
  const reconhecimentoRef = useRef(null);

  useEffect(() => {
    return () => {
      reconhecimentoRef.current?.stop();
    };
  }, []);

  const iniciar = useCallback(() => {
    if (!suportado) {
      setErro("Seu navegador não suporta busca por voz.");
      return;
    }

    setErro(null);
    setTranscricao("");

    const reconhecimento = new ConstrutorReconhecimento();
    reconhecimento.lang = "pt-BR";
    reconhecimento.continuous = false;
    reconhecimento.interimResults = false;

    reconhecimento.onresult = (evento) => {
      const resultado = evento.results[0]?.[0]?.transcript || "";
      setTranscricao(resultado.trim());
    };

    reconhecimento.onerror = (evento) => {
      setErro(descreverErroDeReconhecimento(evento.error));
      setOuvindo(false);
    };

    reconhecimento.onend = () => {
      setOuvindo(false);
    };

    reconhecimentoRef.current = reconhecimento;
    setOuvindo(true);
    reconhecimento.start();
  }, [suportado, ConstrutorReconhecimento]);

  const parar = useCallback(() => {
    reconhecimentoRef.current?.stop();
    setOuvindo(false);
  }, []);

  const limparTranscricao = useCallback(() => setTranscricao(""), []);

  return { suportado, ouvindo, transcricao, erro, iniciar, parar, limparTranscricao };
}
