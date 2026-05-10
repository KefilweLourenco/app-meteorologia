import {
  formatarData,
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
  IconeVento
} from "./Icones";

function obterIconeDoClimaAtual(descricao) {
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
  const IconeClimaAtual = obterIconeDoClimaAtual(dados.descricao);

  return (
    <section className="cartao-clima" aria-labelledby="titulo-resultado-clima">
      <div className="cabecalho-clima">
        <div>
          <p className="legenda">Resultado atual</p>
          <h2 id="titulo-resultado-clima">{dados.cidade}</h2>
          <p className="descricao-clima">
            <IconeNuvem className="icone-inline" />
            <span>{dados.descricao}</span>
          </p>
          <p className="origem-clima">Origem: {dados.origem}</p>
        </div>
        <div className="temperatura-principal">
          <IconeClimaAtual className="icone-temperatura-principal" />
          <p className="temperatura-destaque">{formatarTemperatura(dados.temperatura)}</p>
        </div>
      </div>

      <div className="grade-detalhes">
        <article className="cartao-detalhe" aria-label={`Sensacao termica de ${formatarTemperatura(dados.sensacaoTermica)}`}>
          <span className="titulo-detalhe">
            <IconeTermometro className="icone-inline" />
            <span>Sensacao termica</span>
          </span>
          <strong>{formatarTemperatura(dados.sensacaoTermica)}</strong>
        </article>
        <article className="cartao-detalhe" aria-label={`Umidade de ${formatarUmidade(dados.umidade)}`}>
          <span className="titulo-detalhe">
            <IconeGota className="icone-inline" />
            <span>Umidade</span>
          </span>
          <strong>{formatarUmidade(dados.umidade)}</strong>
        </article>
        <article className="cartao-detalhe" aria-label={`Velocidade do vento de ${formatarVelocidadeVento(dados.velocidadeVento)}`}>
          <span className="titulo-detalhe">
            <IconeVento className="icone-inline" />
            <span>Velocidade do vento</span>
          </span>
          <strong>{formatarVelocidadeVento(dados.velocidadeVento)}</strong>
        </article>
      </div>

      <section className="secao-previsao" aria-labelledby="titulo-previsao">
        <h3 id="titulo-previsao">
          <IconeCalendario className="icone-inline" />
          <span>Previsao dos proximos dias</span>
        </h3>
        <div className="grade-previsao">
          {dados.previsao.map((dia) => (
            <article
              key={dia.data}
              className="cartao-previsao"
              aria-label={`${formatarData(dia.data)} com ${dia.descricao}. Maxima de ${formatarTemperatura(dia.maxima)} e minima de ${formatarTemperatura(dia.minima)}`}
            >
              <strong>{formatarData(dia.data)}</strong>
              <p>{dia.descricao}</p>
              <p>
                {formatarTemperatura(dia.maxima)} / {formatarTemperatura(dia.minima)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default CartaoClima;
