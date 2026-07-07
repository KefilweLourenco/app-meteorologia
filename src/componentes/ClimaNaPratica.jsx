import { useAcessibilidade } from "../contexto/AcessibilidadeContext";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { formatarResumoPratica, gerarClimaNaPratica } from "../utilitarios/climaNaPratica";
import { IconeVoz } from "./Icones";

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

function CardInsight({ insight, linguagemSimples }) {
  return (
    <article className="cartao-pratico">
      <header className="cabecalho-cartao-pratico">
        <div className="bloco-titulo-pratico">
          <p className="categoria-pratica">{titulosCategoria[insight.categoria] || insight.categoria}</p>
          <h4>{insight.titulo}</h4>
        </div>
        <span className={`nivel-pratico nivel-${obterClasseDoNivel(insight.nivel)}`}>
          {insight.nivel}
        </span>
      </header>

      <p className="descricao-pratica">{insight.descricao}</p>
      <p className="recomendacao-pratica">
        <strong>{linguagemSimples ? "O que fazer:" : "Recomendação:"}</strong> {insight.recomendacao}
      </p>

      {linguagemSimples ? null : (
        <div className="rodape-pratico">
          <p>
            <span>Base:</span> {insight.dadoUsado}
          </p>
          <p>
            <span>Confiabilidade:</span> {insight.confiabilidade}
          </p>
        </div>
      )}
    </article>
  );
}

function ClimaNaPratica({ dados }) {
  const { preferencias } = useAcessibilidade();
  const { suportado: leituraSuportada, falando, falar, parar } = useSpeechSynthesis();
  const insights = gerarClimaNaPratica(dados);

  if (insights.length === 0) {
    return null;
  }

  function aoClicarOuvir() {
    if (falando) {
      parar();
      return;
    }

    falar(formatarResumoPratica(insights));
  }

  return (
    <section className="secao-clima-pratica" aria-labelledby="titulo-clima-pratica">
      <div className="cabecalho-pratica">
        <p className="etiqueta-pratica">Clima na prática</p>
        <h2 id="titulo-clima-pratica">Clima na prática</h2>
        <p className="subtitulo-pratica">
          {preferencias.linguagemSimples
            ? "Veja o que o tempo de hoje muda na sua rotina."
            : "Entenda como o tempo de hoje pode afetar sua rotina."}
        </p>

        {preferencias.leituraEmVozAlta && leituraSuportada ? (
          <button
            type="button"
            className="botao-ouvir-previsao botao-ouvir-previsao-pratica"
            onClick={aoClicarOuvir}
          >
            <IconeVoz className="icone-inline" />
            <span>{falando ? "Parar leitura" : "Ouvir clima na prática"}</span>
          </button>
        ) : null}
      </div>

      <section className="bloco-pratico" aria-labelledby="titulo-pratica-hoje">
        <h3 id="titulo-pratica-hoje" className="titulo-bloco-pratico">O que vale olhar hoje</h3>
        <div className="grade-pratica">
          {insights.map((insight) => (
            <CardInsight
              key={insight.id}
              insight={insight}
              linguagemSimples={preferencias.linguagemSimples}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default ClimaNaPratica;
