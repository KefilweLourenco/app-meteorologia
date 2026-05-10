import {
  formatarChanceChuva,
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

      <div className="grade-detalhes">
        <article className="cartao-detalhe" aria-label={`Sensacao termica de ${formatarTemperatura(dados.sensacaoTermica)}`}>
          <span className="titulo-detalhe">
            <IconeTermometro className="icone-inline" />
            <span>Sensacao termica</span>
          </span>
          <strong>{formatarTemperatura(dados.sensacaoTermica)}</strong>
          <p className="texto-apoio">Como o corpo sente a temperatura.</p>
        </article>

        <article className="cartao-detalhe" aria-label={`Chance de chuva de ${formatarChanceChuva(dados.chanceChuva)}`}>
          <span className="titulo-detalhe">
            <IconeChuva className="icone-inline" />
            <span>Chance de chuva</span>
          </span>
          <strong>{formatarChanceChuva(dados.chanceChuva)}</strong>
          <p className="texto-apoio">Ajuda a planejar saidas e deslocamentos.</p>
        </article>

        <article className="cartao-detalhe" aria-label={`Umidade do ar de ${formatarUmidade(dados.umidade)}`}>
          <span className="titulo-detalhe">
            <IconeGota className="icone-inline" />
            <span>Umidade do ar</span>
          </span>
          <strong>{formatarUmidade(dados.umidade)}</strong>
          <p className="texto-apoio">Umidade alta pode deixar o ar mais abafado.</p>
        </article>

        <article className="cartao-detalhe" aria-label={`Vento de ${formatarVelocidadeVento(dados.velocidadeVento)}`}>
          <span className="titulo-detalhe">
            <IconeVento className="icone-inline" />
            <span>Vento</span>
          </span>
          <strong>{formatarVelocidadeVento(dados.velocidadeVento)}</strong>
          <p className="texto-apoio">Mostra se o vento esta fraco ou mais presente.</p>
        </article>
      </div>

      <section className="secao-previsao" aria-labelledby="titulo-previsao">
        <h4 id="titulo-previsao" className="titulo-secao-interna">
          <IconeCalendario className="icone-inline" />
          <span>Previsao dos proximos dias</span>
        </h4>
        <div className="grade-previsao">
          {dados.previsao.map((dia) => (
            <article
              key={dia.data}
              className="cartao-previsao"
              aria-label={`${formatarData(dia.data)} com ${dia.descricao}. Maxima de ${formatarTemperatura(dia.maxima)} e minima de ${formatarTemperatura(dia.minima)}`}
            >
              <strong>{formatarData(dia.data)}</strong>
              <p>{dia.descricao}</p>
              <p>{formatarTemperatura(dia.maxima)} / {formatarTemperatura(dia.minima)}</p>
              <p className="texto-previsao-extra">
                Chance de chuva: {formatarChanceChuva(dia.chanceChuva)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default CartaoClima;
