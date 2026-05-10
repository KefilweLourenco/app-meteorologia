// Hook do React para guardar e atualizar estados da tela.
import { useState } from "react";
// Componente responsável por mostrar os dados do clima.
import CartaoClima from "./componentes/CartaoClima";
// Funções que consultam o clima pela cidade ou pela localização atual.
import { buscarClimaPorCidade, buscarClimaPorCoordenadas } from "./servicos/apiClima";

function App() {
  // Guarda o que o usuário digitou no campo de cidade.
  const [cidade, setCidade] = useState("");
  // Guarda a mensagem exibida para orientar o usuário.
  const [mensagem, setMensagem] = useState("Digite uma cidade ou use sua localizacao atual.");
  // Guarda os dados do clima recebidos da API.
  const [dadosClima, setDadosClima] = useState(null);
  // Controla o estado de carregamento para evitar ações duplicadas.
  const [carregando, setCarregando] = useState(false);

  // Executa a busca quando o usuário envia o formulário da cidade.
  async function aoEnviarFormulario(evento) {
    // Evita recarregar a página ao enviar o formulário.
    evento.preventDefault();

    // Remove espaços extras antes de validar a entrada.
    const cidadeFormatada = cidade.trim();
    if (!cidadeFormatada) {
      setMensagem("Digite o nome de uma cidade.");
      return;
    }

    // Ativa o estado de carregamento e informa o que está acontecendo.
    setCarregando(true);
    setMensagem("Buscando previsao...");

    try {
      // Busca o clima usando o nome da cidade digitada.
      const resposta = await buscarClimaPorCidade(cidadeFormatada);
      setDadosClima(resposta);
      setMensagem("Clima carregado com sucesso.");
    } catch (erro) {
      // Em caso de erro, limpa os dados antigos e mostra a mensagem recebida.
      setDadosClima(null);
      setMensagem(erro.message || "Nao foi possivel buscar o clima agora.");
    } finally {
      // Finaliza o carregamento mesmo que a busca dê erro.
      setCarregando(false);
    }
  }

  // Pede ao navegador as coordenadas atuais do usuário.
  function obterCoordenadasAtuais() {
    return new Promise((resolve, reject) => {
      // Se o navegador não tiver suporte, o app já avisa o usuário.
      if (!navigator.geolocation) {
        reject(new Error("Seu navegador nao suporta geolocalizacao."));
        return;
      }

      // Solicita latitude e longitude ao navegador.
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }

  // Executa a busca quando o usuário pede para usar a localização atual.
  async function aoUsarLocalizacaoAtual() {
    setCarregando(true);
    setMensagem("Solicitando sua localizacao...");

    try {
      // Primeiro pega as coordenadas do navegador.
      const posicao = await obterCoordenadasAtuais();
      const { latitude, longitude } = posicao.coords;
      setMensagem("Buscando clima da sua localizacao atual...");

      // Depois busca o clima usando latitude e longitude.
      const resposta = await buscarClimaPorCoordenadas(latitude, longitude);
      setDadosClima(resposta);
      setMensagem("Clima da sua localizacao carregado com sucesso.");
    } catch (erro) {
      setDadosClima(null);

      // Trata os principais erros de geolocalização de forma amigável.
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
      {/* Área de apresentação do projeto. */}
      <section className="hero">
        <p className="etiqueta">Clima em tempo real</p>
        <h1>App de Meteorologia</h1>
        <p className="subtitulo">
          Consulte o clima atual da sua cidade ou permita que o site identifique sua localizacao automaticamente.
        </p>
      </section>

      {/* Painel principal com busca e resultado. */}
      <section className="painel-principal">
        {/* Formulário usado para pesquisar pelo nome da cidade. */}
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
            {/* O botão muda de texto enquanto a busca está acontecendo. */}
            <button type="submit" disabled={carregando}>
              {carregando ? "Carregando..." : "Buscar"}
            </button>
          </div>
        </form>

        {/* Botão para usar a localização atual do navegador. */}
        <button
          type="button"
          className="botao-localizacao"
          onClick={aoUsarLocalizacaoAtual}
          disabled={carregando}
        >
          {carregando ? "Aguarde..." : "Usar minha localizacao atual"}
        </button>

        {/* Mensagem de status da busca. */}
        <p className={`mensagem ${dadosClima ? "mensagem-sucesso" : ""}`}>{mensagem}</p>

        {/* Só mostra o cartão quando já existem dados para exibir. */}
        {dadosClima ? <CartaoClima dados={dadosClima} /> : null}
      </section>

      {/* Rodapé simples com assinatura do projeto. */}
      <footer className="rodape">
        <p>2026</p>
        <p>Desenvolvido por Kefilwe Lourenco</p>
      </footer>
    </main>
  );
}

export default App;
