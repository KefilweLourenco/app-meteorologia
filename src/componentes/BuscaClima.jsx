import { useAcessibilidade } from "../contexto/AcessibilidadeContext";
import { IconeBusca } from "./Icones";
import SugestoesCidade from "./SugestoesCidade";

function BuscaClima({ busca, carregando, aoEnviar }) {
  const { preferencias } = useAcessibilidade();

  return (
    <form className="formulario-busca" role="search" onSubmit={aoEnviar}>
      <label htmlFor="cidade" className="rotulo-campo">Nome da cidade</label>
      <p id="ajuda-cidade" className="texto-ajuda">
        {preferencias.linguagemSimples
          ? "Digite ao menos 2 letras para ver sugestões de cidade."
          : "Digite duas letras ou mais para ver sugestões."}
      </p>

      <div className="area-busca">
        <div className="linha-busca">
          <input
            id="cidade"
            type="text"
            placeholder="Ex.: São Paulo"
            autoComplete="off"
            value={busca.cidade}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={busca.mostrarSugestoes && busca.sugestoes.length > 0}
            aria-controls="lista-sugestoes-cidade"
            aria-activedescendant={
              busca.indiceSugestaoAtiva >= 0 ? `sugestao-cidade-${busca.indiceSugestaoAtiva}` : undefined
            }
            aria-describedby="ajuda-cidade"
            onChange={(evento) => busca.aoAlterarCidade(evento.target.value)}
            onFocus={busca.aoFocarCampo}
            onKeyDown={busca.aoTeclarNoCampo}
          />

          <button type="submit" disabled={carregando} className="botao-busca">
            <IconeBusca className={carregando ? "icone-carregando" : ""} />
            <span>{carregando ? "Carregando..." : "Buscar"}</span>
          </button>
        </div>

        {busca.mostrarSugestoes && (busca.sugestoes.length > 0 || busca.carregandoSugestoes) ? (
          <SugestoesCidade
            sugestoes={busca.sugestoes}
            carregando={busca.carregandoSugestoes}
            indiceAtivo={busca.indiceSugestaoAtiva}
            onSelecionar={busca.selecionarSugestao}
          />
        ) : null}
      </div>
    </form>
  );
}

export default BuscaClima;
