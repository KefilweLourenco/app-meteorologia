function BotaoLocalizacao({ aoClicar, carregando }) {
  return (
    <button type="button" className="botao-localizacao" onClick={aoClicar} disabled={carregando}>
      <span>{carregando ? "Aguarde..." : "Usar minha localizacao atual"}</span>
    </button>
  );
}

export default BotaoLocalizacao;
