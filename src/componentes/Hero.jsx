import { IconeAcessibilidade } from "./Icones";

function Hero({ aoAbrirPreferencias }) {
  return (
    <header className="hero">
      <p className="etiqueta">Clima em tempo real</p>
      <h1>App de Meteorologia</h1>
      <p className="subtitulo">
        Consulte o clima atual da sua cidade ou use sua localizacao.
      </p>
      <button type="button" className="botao-preferencias" onClick={aoAbrirPreferencias}>
        <IconeAcessibilidade className="icone-inline" />
        <span>Preferencias de acessibilidade</span>
      </button>
    </header>
  );
}

export default Hero;
