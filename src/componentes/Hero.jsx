import { useAcessibilidade } from "../contexto/AcessibilidadeContext";
import { IconeAcessibilidade } from "./Icones";

function Hero({ aoAbrirPreferencias }) {
  const { preferencias } = useAcessibilidade();

  return (
    <header className="hero">
      <p className="etiqueta">Clima em tempo real</p>
      <h1>App de Meteorologia</h1>
      <p className="subtitulo">
        {preferencias.linguagemSimples
          ? "Digite o nome de uma cidade para ver o tempo agora."
          : "Consulte o clima atual da sua cidade ou use sua localização."}
      </p>
      <button type="button" className="botao-preferencias" onClick={aoAbrirPreferencias}>
        <IconeAcessibilidade className="icone-inline" />
        <span>Preferências de acessibilidade</span>
      </button>
    </header>
  );
}

export default Hero;
