function SugestoesCidade({ sugestoes, carregando, indiceAtivo, onSelecionar }) {
  return (
    <div
      className="lista-sugestoes"
      id="lista-sugestoes-cidade"
      role="listbox"
      aria-label="Sugestões de cidades"
    >
      {carregando ? (
        <p className="sugestao-status" role="status">Buscando sugestões...</p>
      ) : (
        sugestoes.map((sugestao, indice) => (
          <button
            key={sugestao.id}
            id={`sugestao-cidade-${indice}`}
            type="button"
            role="option"
            aria-selected={indice === indiceAtivo}
            className={`item-sugestao ${indice === indiceAtivo ? "item-sugestao-ativa" : ""}`}
            onMouseDown={(evento) => evento.preventDefault()}
            onClick={() => onSelecionar(sugestao)}
          >
            <strong>{sugestao.nome}</strong>
            <span>
              {sugestao.estado}
              {sugestao.estado && sugestao.pais ? ", " : ""}
              {sugestao.pais}
            </span>
          </button>
        ))
      )}
    </div>
  );
}

export default SugestoesCidade;
