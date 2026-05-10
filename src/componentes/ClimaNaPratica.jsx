import { gerarClimaNaPratica } from "../utilitarios/climaNaPratica";

const titulosCategoria = {
  "rotina urbana": "Rotina urbana",
  casa: "Casa",
  "bem-estar": "Bem-estar",
  ambiente: "Ambiente"
};

function obterClasseDoNivel(nivel) {
  return nivel
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function CardInsight({ insight }) {
  return (
    <article className="cartao-pratico">
      <header className="cabecalho-cartao-pratico">
        <div>
          <p className="categoria-pratica">{titulosCategoria[insight.categoria] || insight.categoria}</p>
          <h4>{insight.titulo}</h4>
        </div>
        <span className={`nivel-pratico nivel-${obterClasseDoNivel(insight.nivel)}`}>
          {insight.nivel}
        </span>
      </header>

      <p className="descricao-pratica">{insight.descricao}</p>
      <p className="recomendacao-pratica">
        <strong>Recomendacao:</strong> {insight.recomendacao}
      </p>

      <div className="rodape-pratico">
        <p>
          <span>Base:</span> {insight.dadoUsado}
        </p>
        <p>
          <span>Confiabilidade:</span> {insight.confiabilidade}
        </p>
      </div>
    </article>
  );
}

function ClimaNaPratica({ dados }) {
  const insights = gerarClimaNaPratica(dados);

  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="secao-clima-pratica" aria-labelledby="titulo-clima-pratica">
      <div className="cabecalho-pratica">
        <p className="etiqueta-pratica">Clima na pratica</p>
        <h2 id="titulo-clima-pratica">Clima na pratica</h2>
        <p className="subtitulo-pratica">Entenda como o tempo de hoje pode afetar sua rotina.</p>
      </div>

      <section className="bloco-pratico" aria-labelledby="titulo-pratica-hoje">
        <h3 id="titulo-pratica-hoje" className="titulo-bloco-pratico">O que vale olhar hoje</h3>
        <div className="grade-pratica">
          {insights.map((insight) => (
            <CardInsight key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default ClimaNaPratica;
