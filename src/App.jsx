import { useState } from "react";
import CartaoClima from "./componentes/CartaoClima";
import { buscarClimaPorCidade, buscarClimaPorCoordenadas } from "./servicos/apiClima";

function App() {
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("Digite uma cidade ou use sua localizacao atual.");
  const [dadosClima, setDadosClima] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function aoEnviarFormulario(evento) {
    evento.preventDefault();

    const cidadeFormatada = cidade.trim();
    if (!cidadeFormatada) {
      setMensagem("Digite o nome de uma cidade.");
      return;
    }

    setCarregando(true);
    setMensagem("Buscando previsao...");

    try {
      const resposta = await buscarClimaPorCidade(cidadeFormatada);
      setDadosClima(resposta);
      setMensagem("Clima carregado com sucesso.");
    } catch (erro) {
      setDadosClima(null);
      setMensagem(erro.message || "Nao foi possivel buscar o clima agora.");
    } finally {
      setCarregando(false);
    }
  }

  function obterCoordenadasAtuais() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Seu navegador nao suporta geolocalizacao."));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }

  async function aoUsarLocalizacaoAtual() {
    setCarregando(true);
    setMensagem("Solicitando sua localizacao...");

    try {
      const posicao = await obterCoordenadasAtuais();
      const { latitude, longitude } = posicao.coords;
      setMensagem("Buscando clima da sua localizacao atual...");

      const resposta = await buscarClimaPorCoordenadas(latitude, longitude);
      setDadosClima(resposta);
      setMensagem("Clima da sua localizacao carregado com sucesso.");
    } catch (erro) {
      setDadosClima(null);

      if (erro.code === 1) {
        setMensagem("Permissao de localizacao negada. Voce ainda pode buscar por cidade.");
      } else if (erro.code === 2) {
        setMensagem("Nao foi possivel identificar sua localizacao atual.");
      } else if (erro.code === 3) {
        setMensagem("A localizacao demorou para responder. Tente novamente.");
      } else {
        setMensagem(erro.message || "Nao foi possivel usar sua localizacao agora.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="aplicativo">
      <section className="hero">
        <p className="etiqueta">Clima em tempo real</p>
        <h1>App de Meteorologia</h1>
        <p className="subtitulo">
          Consulte o clima atual da sua cidade ou permita que o site identifique sua localizacao automaticamente.
        </p>
      </section>

      <section className="painel-principal">
        <form className="formulario-busca" onSubmit={aoEnviarFormulario}>
          <label htmlFor="cidade" className="rotulo-campo">Nome da cidade</label>
          <div className="linha-busca">
            <input
              id="cidade"
              type="text"
              placeholder="Ex.: Sao Paulo"
              value={cidade}
              onChange={(evento) => setCidade(evento.target.value)}
            />
            <button type="submit" disabled={carregando}>
              {carregando ? "Carregando..." : "Buscar"}
            </button>
          </div>
        </form>

        <button
          type="button"
          className="botao-localizacao"
          onClick={aoUsarLocalizacaoAtual}
          disabled={carregando}
        >
          {carregando ? "Aguarde..." : "Usar minha localizacao atual"}
        </button>

        <p className={`mensagem ${dadosClima ? "mensagem-sucesso" : ""}`}>{mensagem}</p>

        {dadosClima ? <CartaoClima dados={dadosClima} /> : null}
      </section>

      <footer className="rodape">
        <p>2026</p>
        <p>Desenvolvido por Kefilwe Lourenço</p>
      </footer>
    </main>
  );
}

export default App;
