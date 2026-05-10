// Funções que transformam números e datas em texto amigável para a interface.
import {
  formatarData,
  formatarTemperatura,
  formatarUmidade,
  formatarVelocidadeVento
} from "../utilitarios/formatadores";

// Este componente recebe os dados do clima e monta a área visual do resultado.
function CartaoClima({ dados }) {
  return (
    <section className="cartao-clima">
      {/* Cabeçalho com cidade, descrição e temperatura principal. */}
      <div className="cabecalho-clima">
        <div>
          <p className="legenda">Resultado atual</p>
          <h2>{dados.cidade}</h2>
          <p className="descricao-clima">{dados.descricao}</p>
          <p className="origem-clima">Origem: {dados.origem}</p>
        </div>
        <p className="temperatura-destaque">{formatarTemperatura(dados.temperatura)}</p>
      </div>

      {/* Bloco com detalhes extras do clima atual. */}
      <div className="grade-detalhes">
        <article className="cartao-detalhe">
          <span>Sensacao termica</span>
          <strong>{formatarTemperatura(dados.sensacaoTermica)}</strong>
        </article>
        <article className="cartao-detalhe">
          <span>Umidade</span>
          <strong>{formatarUmidade(dados.umidade)}</strong>
        </article>
        <article className="cartao-detalhe">
          <span>Velocidade do vento</span>
          <strong>{formatarVelocidadeVento(dados.velocidadeVento)}</strong>
        </article>
      </div>

      {/* Lista com a previsão dos próximos dias. */}
      <section className="secao-previsao">
        <h3>Previsao dos proximos dias</h3>
        <div className="grade-previsao">
          {/* Cada item do array vira um card de previsão. */}
          {dados.previsao.map((dia) => (
            <article key={dia.data} className="cartao-previsao">
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
