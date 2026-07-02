import { useAcessibilidade } from "../contexto/AcessibilidadeContext";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import {
  formatarChanceChuva,
  formatarData,
  formatarResumoClima,
  formatarTemperatura,
  formatarUmidade,
  formatarVelocidadeVento
} from "../utilitarios/formatadores";
import {
  IconeCalendario,
  IconeGota,
  IconeNuvem,
  IconeChuva,
  IconeSol,
  IconeTermometro,
  IconeTrovoada,
  IconeVento,
  IconeVoz
} from "./Icones";

function obterIconeDoClima(descricao) {
  const descricaoNormalizada = descricao.toLowerCase();

  if (descricaoNormalizada.includes("trovo")) {
    return IconeTrovoada;
  }

  if (descricaoNormalizada.includes("chuva") || descricaoNormalizada.includes("garoa")) {
    return IconeChuva;
  }

  if (descricaoNormalizada.includes("limpo")) {
    return IconeSol;
  }

  return IconeNuvem;
}

function CartaoClima({ dados }) {
  const { preferencias } = useAcessibilidade();
  const { suportado: leituraSuportada, falando, falar, parar } = useSpeechSynthesis();
  const IconeClimaAtual = obterIconeDoClima(dados.descricao);
  const resumoSimples = formatarResumoClima(dados);

  function aoClicarOuvir() {
    if (falando) {
      parar();
      return;
    }

    falar(resumoSimples);
  }

  return (
    <section className="cartao-clima" aria-labelledby="titulo-resultado-clima">
      <div className="cabecalho-clima">
        <div className="bloco-cidade">
          <p className="legenda">Clima agora</p>
          <h3 id="titulo-resultado-clima" className="titulo-cidade">{dados.cidade}</h3>
          <p className="descricao-clima">
            <IconeClimaAtual className="icone-inline" />
            <span>{dados.descricao}</span>
          </p>
          <p className="origem-clima">Origem: {dados.origem}</p>
        </div>

        <div className="temperatura-principal">
          <p className="temperatura-destaque">{formatarTemperatura(dados.temperatura)}</p>
          <p className="temperatura-apoio">Temperatura atual</p>
        </div>
      </div>

      {preferencias.linguagemSimples ? (
        <p className="resumo-simples">{resumoSimples}</p>
      ) : null}

      {preferencias.leituraEmVozAlta && leituraSuportada ? (
        <button type="button" className="botao-ouvir-previsao" onClick={aoClicarOuvir}>
          <IconeVoz className="icone-inline" />
          <span>{falando ? "Parar leitura" : "Ouvir previsao"}</span>
        </button>
      ) : null}

      <div className="grade-detalhes">
        <article className="chip-clima" aria-label={`Sensacao termica de ${formatarTemperatura(dados.sensacaoTermica)}`}>
          <IconeTermometro className="icone-chip" aria-hidden="true" />
          <strong>{formatarTemperatura(dados.sensacaoTermica)}</strong>
          <span>Sensacao</span>
        </article>

        <article className="chip-clima" aria-label={`Chance de chuva de ${formatarChanceChuva(dados.chanceChuva)}`}>
          <IconeChuva className="icone-chip" aria-hidden="true" />
          <strong>{formatarChanceChuva(dados.chanceChuva)}</strong>
          <span>Chuva</span>
        </article>

        <article className="chip-clima" aria-label={`Umidade do ar de ${formatarUmidade(dados.umidade)}`}>
          <IconeGota className="icone-chip" aria-hidden="true" />
          <strong>{formatarUmidade(dados.umidade)}</strong>
          <span>Umidade</span>
        </article>

        <article className="chip-clima" aria-label={`Vento de ${formatarVelocidadeVento(dados.velocidadeVento)}`}>
          <IconeVento className="icone-chip" aria-hidden="true" />
          <strong>{formatarVelocidadeVento(dados.velocidadeVento)}</strong>
          <span>Vento</span>
        </article>
      </div>

      <section className="secao-previsao" aria-labelledby="titulo-previsao">
        <h4 id="titulo-previsao" className="titulo-secao-interna">
          <IconeCalendario className="icone-inline" />
          <span>Previsao dos proximos dias</span>
        </h4>
        <div className="grade-previsao">
          {dados.previsao.map((dia) => {
            const IconeDoDia = obterIconeDoClima(dia.descricao);

            return (
              <article
                key={dia.data}
                className="dia-previsao"
                aria-label={`${formatarData(dia.data)} com ${dia.descricao}. Maxima de ${formatarTemperatura(dia.maxima)} e minima de ${formatarTemperatura(dia.minima)}. Chance de chuva: ${formatarChanceChuva(dia.chanceChuva)}`}
              >
                <p className="dia-previsao-data">{formatarData(dia.data)}</p>
                <IconeDoDia className="icone-chip" aria-hidden="true" />
                <p className="dia-previsao-temperaturas">
                  <strong>{formatarTemperatura(dia.maxima)}</strong> / {formatarTemperatura(dia.minima)}
                </p>
                <p className="dia-previsao-chuva">{formatarChanceChuva(dia.chanceChuva)}</p>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default CartaoClima;
