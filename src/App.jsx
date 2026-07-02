import { useState } from "react";
import BotaoLocalizacao from "./componentes/BotaoLocalizacao";
import BuscaClima from "./componentes/BuscaClima";
import BuscaPorVoz from "./componentes/BuscaPorVoz";
import CartaoClima from "./componentes/CartaoClima";
import ClimaNaPratica from "./componentes/ClimaNaPratica";
import Hero from "./componentes/Hero";
import PainelAcessibilidade from "./componentes/PainelAcessibilidade";
import Rodape from "./componentes/Rodape";
import { useClima } from "./hooks/useClima";
import { useBuscaDeCidade } from "./hooks/useBuscaDeCidade";

function App() {
  const [painelAberto, setPainelAberto] = useState(false);
  const clima = useClima();
  const busca = useBuscaDeCidade((cidadeConfirmada, sugestao) => {
    clima.buscarPorCidade(cidadeConfirmada, sugestao);
  });

  function aoEnviarFormulario(evento) {
    evento.preventDefault();

    const { sucesso } = busca.confirmarBusca();

    if (!sucesso) {
      clima.atualizarMensagem("Erro: digite o nome de uma cidade para buscar a previsao.", "erro");
    }
  }

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <main className="aplicativo">
        <Hero aoAbrirPreferencias={() => setPainelAberto(true)} />

        <section
          id="conteudo-principal"
          className="painel-principal"
          aria-busy={clima.carregando}
          aria-labelledby="titulo-busca"
          tabIndex={-1}
        >
          <h2 id="titulo-busca" className="titulo-secao">Buscar clima</h2>

          <BuscaClima busca={busca} carregando={clima.carregando} aoEnviar={aoEnviarFormulario} />

          <div className="linha-acoes-entrada">
            <BotaoLocalizacao aoClicar={clima.buscarPorLocalizacaoAtual} carregando={clima.carregando} />
            <BuscaPorVoz aoConfirmarCidade={busca.buscarPorTexto} />
          </div>

          <p
            className={`mensagem mensagem-${clima.tipoMensagem}`}
            role={clima.tipoMensagem === "erro" ? "alert" : "status"}
            aria-live={clima.tipoMensagem === "erro" ? "assertive" : "polite"}
          >
            {clima.mensagem}
          </p>

          {clima.dadosClima ? (
            <>
              <CartaoClima dados={clima.dadosClima} />
              <ClimaNaPratica dados={clima.dadosClima} />
            </>
          ) : null}
        </section>
      </main>

      <Rodape />

      <PainelAcessibilidade aberto={painelAberto} aoFechar={() => setPainelAberto(false)} />
    </>
  );
}

export default App;
