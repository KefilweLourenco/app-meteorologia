import { useEffect, useState } from "react";
import CartaoClima from "./componentes/CartaoClima";
import ClimaNaPratica from "./componentes/ClimaNaPratica";
import { IconeBusca } from "./componentes/Icones";
import {
  buscarClimaPorCidade,
  buscarClimaPorCoordenadas,
  buscarClimaPorSugestao,
  buscarSugestoesCidade
} from "./servicos/apiClima";

function App() {
  const [cidade, setCidade] = useState("");
  const [mensagem, setMensagem] = useState("Digite uma cidade ou use sua localizacao.");
  const [tipoMensagem, setTipoMensagem] = useState("info");
  const [dadosClima, setDadosClima] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [sugestoes, setSugestoes] = useState([]);
  const [carregandoSugestoes, setCarregandoSugestoes] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [indiceSugestaoAtiva, setIndiceSugestaoAtiva] = useState(-1);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState(null);
  const [modoAcessivel, setModoAcessivel] = useState(false);

  function atualizarMensagem(texto, tipo = "info") {
    setMensagem(texto);
    setTipoMensagem(tipo);
  }

  useEffect(() => {
    const termo = cidade.trim();

    if (termo.length < 2) {
      setSugestoes([]);
      setCarregandoSugestoes(false);
      setIndiceSugestaoAtiva(-1);
      return undefined;
    }

    let ativo = true;
    setCarregandoSugestoes(true);

    const temporizador = window.setTimeout(async () => {
      const resultado = await buscarSugestoesCidade(termo);

      if (!ativo) {
        return;
      }

      setSugestoes(resultado);
      setCarregandoSugestoes(false);
      setIndiceSugestaoAtiva(resultado.length > 0 ? 0 : -1);
    }, 350);

    return () => {
      ativo = false;
      window.clearTimeout(temporizador);
    };
  }, [cidade]);

  async function buscarClimaPrincipal(textoCidade, sugestaoEscolhida = null) {
    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);
    setCarregando(true);
    atualizarMensagem("Carregando previsao do tempo...", "info");

    try {
      const resposta = sugestaoEscolhida
        ? await buscarClimaPorSugestao(sugestaoEscolhida)
        : await buscarClimaPorCidade(textoCidade);

      setDadosClima(resposta);
      atualizarMensagem("Sucesso: clima carregado.", "sucesso");
    } catch (erro) {
      setDadosClima(null);
      atualizarMensagem(erro.message || "Erro: nao foi possivel buscar o clima agora.", "erro");
    } finally {
      setCarregando(false);
    }
  }

  async function aoEnviarFormulario(evento) {
    evento.preventDefault();

    const cidadeFormatada = cidade.trim();
    if (!cidadeFormatada) {
      atualizarMensagem("Erro: digite o nome de uma cidade para buscar a previsao.", "erro");
      return;
    }

    const deveUsarSugestaoSelecionada =
      sugestaoSelecionada && cidadeFormatada === sugestaoSelecionada.label;

    await buscarClimaPrincipal(
      cidadeFormatada,
      deveUsarSugestaoSelecionada ? sugestaoSelecionada : null
    );
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
    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);
    setCarregando(true);
    atualizarMensagem("Solicitando sua localizacao...", "info");

    try {
      const posicao = await obterCoordenadasAtuais();
      const { latitude, longitude } = posicao.coords;
      atualizarMensagem("Carregando clima da sua localizacao...", "info");

      const resposta = await buscarClimaPorCoordenadas(latitude, longitude);
      setDadosClima(resposta);
      atualizarMensagem("Sucesso: clima da sua localizacao carregado.", "sucesso");
    } catch (erro) {
      setDadosClima(null);

      if (erro.code === 1) {
        atualizarMensagem(
          "Erro: permissao de localizacao negada. Voce ainda pode buscar por cidade.",
          "erro"
        );
      } else if (erro.code === 2) {
        atualizarMensagem("Erro: nao foi possivel identificar sua localizacao atual.", "erro");
      } else if (erro.code === 3) {
        atualizarMensagem("Erro: a localizacao demorou para responder. Tente novamente.", "erro");
      } else {
        atualizarMensagem(erro.message || "Erro: nao foi possivel usar sua localizacao agora.", "erro");
      }
    } finally {
      setCarregando(false);
    }
  }

  function aoSelecionarSugestao(sugestao) {
    setCidade(sugestao.label);
    setSugestaoSelecionada(sugestao);
    setSugestoes([]);
    setMostrarSugestoes(false);
    setIndiceSugestaoAtiva(-1);
  }

  function aoTeclarNoCampo(evento) {
    if (!mostrarSugestoes || sugestoes.length === 0) {
      return;
    }

    if (evento.key === "ArrowDown") {
      evento.preventDefault();
      setIndiceSugestaoAtiva((indiceAtual) => {
        const proximoIndice = indiceAtual + 1;
        return proximoIndice >= sugestoes.length ? 0 : proximoIndice;
      });
      return;
    }

    if (evento.key === "ArrowUp") {
      evento.preventDefault();
      setIndiceSugestaoAtiva((indiceAtual) => {
        const proximoIndice = indiceAtual - 1;
        return proximoIndice < 0 ? sugestoes.length - 1 : proximoIndice;
      });
      return;
    }

    if (evento.key === "Enter" && indiceSugestaoAtiva >= 0) {
      evento.preventDefault();
      const sugestaoEscolhida = sugestoes[indiceSugestaoAtiva];
      aoSelecionarSugestao(sugestaoEscolhida);
      buscarClimaPrincipal(sugestaoEscolhida.label, sugestaoEscolhida);
      return;
    }

    if (evento.key === "Escape") {
      setMostrarSugestoes(false);
      setIndiceSugestaoAtiva(-1);
    }
  }

  return (
    <main className={`aplicativo ${modoAcessivel ? "modo-acessivel" : ""}`}>
      <header className="hero">
        <p className="etiqueta">Clima em tempo real</p>
        <h1>App de Meteorologia</h1>
        <p className="subtitulo">
          Consulte o clima atual da sua cidade ou use sua localizacao.
        </p>
        <button
          type="button"
          className="botao-modo-acessivel"
          onClick={() => setModoAcessivel((valorAtual) => !valorAtual)}
          aria-pressed={modoAcessivel}
        >
          {modoAcessivel ? "Desativar modo acessivel" : "Ativar modo acessivel"}
        </button>
      </header>

      <section className="painel-principal" aria-busy={carregando} aria-labelledby="titulo-busca">
        <h2 id="titulo-busca" className="titulo-secao">Buscar clima</h2>

        <form className="formulario-busca" onSubmit={aoEnviarFormulario}>
          <label htmlFor="cidade" className="rotulo-campo">Nome da cidade</label>
          <p id="ajuda-cidade" className="texto-ajuda">
            Digite duas letras ou mais para ver sugestoes.
          </p>

          <div className="area-busca">
            <div className="linha-busca">
              <input
                id="cidade"
                type="text"
                placeholder="Ex.: Sao Paulo"
                autoComplete="off"
                value={cidade}
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={mostrarSugestoes && sugestoes.length > 0}
                aria-controls="lista-sugestoes-cidade"
                aria-activedescendant={
                  indiceSugestaoAtiva >= 0 ? `sugestao-cidade-${indiceSugestaoAtiva}` : undefined
                }
                aria-describedby="ajuda-cidade"
                onChange={(evento) => {
                  setCidade(evento.target.value);
                  setSugestaoSelecionada(null);
                  setMostrarSugestoes(true);
                  setIndiceSugestaoAtiva(-1);
                }}
                onFocus={() => {
                  if (sugestoes.length > 0) {
                    setMostrarSugestoes(true);
                  }
                }}
                onKeyDown={aoTeclarNoCampo}
              />

              <button type="submit" disabled={carregando} className="botao-busca">
                <IconeBusca />
                <span>{carregando ? "Carregando..." : "Buscar"}</span>
              </button>
            </div>

            {mostrarSugestoes && (sugestoes.length > 0 || carregandoSugestoes) ? (
              <div
                className="lista-sugestoes"
                id="lista-sugestoes-cidade"
                role="listbox"
                aria-label="Sugestoes de cidades"
              >
                {carregandoSugestoes ? (
                  <p className="sugestao-status" role="status">Buscando sugestoes...</p>
                ) : (
                  sugestoes.map((sugestao, indice) => (
                    <button
                      key={sugestao.id}
                      id={`sugestao-cidade-${indice}`}
                      type="button"
                      role="option"
                      aria-selected={indice === indiceSugestaoAtiva}
                      className={`item-sugestao ${indice === indiceSugestaoAtiva ? "item-sugestao-ativa" : ""}`}
                      onMouseDown={(evento) => evento.preventDefault()}
                      onClick={() => aoSelecionarSugestao(sugestao)}
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
            ) : null}
          </div>
        </form>

        <button
          type="button"
          className="botao-localizacao"
          onClick={aoUsarLocalizacaoAtual}
          disabled={carregando}
        >
          <span>{carregando ? "Aguarde..." : "Usar minha localizacao atual"}</span>
        </button>

        <p
          className={`mensagem mensagem-${tipoMensagem}`}
          role={tipoMensagem === "erro" ? "alert" : "status"}
          aria-live={tipoMensagem === "erro" ? "assertive" : "polite"}
        >
          {mensagem}
        </p>

        {dadosClima ? (
          <>
            <CartaoClima dados={dadosClima} />
            <ClimaNaPratica dados={dadosClima} />
          </>
        ) : null}
      </section>
    </main>
  );
}

export default App;
