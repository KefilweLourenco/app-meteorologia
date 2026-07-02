import { useEffect, useRef } from "react";
import { useReconhecimentoDeVoz } from "../hooks/useReconhecimentoDeVoz";
import { IconeMicrofone } from "./Icones";

function extrairCidadeDaFala(transcricao) {
  return transcricao
    .toLowerCase()
    .replace(/previsao( do tempo)? para/g, "")
    .replace(/tempo em/g, "")
    .replace(/clima em/g, "")
    .trim();
}

function BuscaPorVoz({ aoConfirmarCidade }) {
  const { suportado, ouvindo, transcricao, erro, iniciar } = useReconhecimentoDeVoz();
  const ultimaTranscricaoProcessada = useRef("");

  useEffect(() => {
    if (!transcricao || transcricao === ultimaTranscricaoProcessada.current) {
      return;
    }

    const cidade = extrairCidadeDaFala(transcricao);
    ultimaTranscricaoProcessada.current = transcricao;

    if (cidade) {
      aoConfirmarCidade(cidade);
    }
  }, [transcricao, aoConfirmarCidade]);

  if (!suportado) {
    return null;
  }

  return (
    <div className="busca-por-voz">
      <button
        type="button"
        className="botao-voz"
        onClick={iniciar}
        aria-pressed={ouvindo}
        aria-label={ouvindo ? "Ouvindo comando de voz" : "Buscar por voz"}
      >
        <IconeMicrofone className="icone" />
      </button>

      {ouvindo ? (
        <p className="status-voz" role="status">Ouvindo... fale o nome da cidade.</p>
      ) : null}

      {erro ? (
        <p className="erro-voz" role="alert">{erro}</p>
      ) : null}
    </div>
  );
}

export default BuscaPorVoz;
