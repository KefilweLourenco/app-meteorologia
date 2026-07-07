import { useEffect, useRef } from "react";
import { useAcessibilidade } from "../contexto/AcessibilidadeContext";
import {
  IconeContraste,
  IconeFechar,
  IconeFonte,
  IconeMovimento,
  IconeTeclado,
  IconeTela,
  IconeTexto,
  IconeVoz
} from "./Icones";

const opcoesTema = [
  { valor: "claro", rotulo: "Claro" },
  { valor: "escuro", rotulo: "Escuro" },
  { valor: "automatico", rotulo: "Automático" }
];

const opcoesFonte = [
  { valor: "padrao", rotulo: "Padrão" },
  { valor: "grande", rotulo: "Grande" },
  { valor: "muito-grande", rotulo: "Muito grande" }
];

function LinhaAlternavel({ icone: Icone, rotulo, descricao, chave, valor, aoAlternar }) {
  return (
    <label className="linha-preferencia">
      <span className="rotulo-preferencia-bloco">
        <span className="rotulo-preferencia">
          <Icone className="icone-inline" />
          {rotulo}
        </span>
        {descricao ? <span className="descricao-preferencia">{descricao}</span> : null}
      </span>
      <span className="interruptor">
        <input type="checkbox" checked={valor} onChange={() => aoAlternar(chave)} />
        <span className="trilho-interruptor" aria-hidden="true"></span>
      </span>
    </label>
  );
}

function LinhaSegmentada({ icone: Icone, rotulo, opcoes, valorAtual, aoEscolher }) {
  return (
    <div className="linha-preferencia linha-preferencia-segmentada">
      <span className="rotulo-preferencia">
        <Icone className="icone-inline" />
        {rotulo}
      </span>
      <div className="segmentado" role="radiogroup" aria-label={rotulo}>
        {opcoes.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            role="radio"
            aria-checked={valorAtual === opcao.valor}
            className={`opcao-segmentada ${valorAtual === opcao.valor ? "opcao-segmentada-ativa" : ""}`}
            onClick={() => aoEscolher(opcao.valor)}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>
    </div>
  );
}

function PainelAcessibilidade({ aberto, aoFechar }) {
  const { preferencias, alternarPreferencia, atualizarPreferencia } = useAcessibilidade();
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogo = dialogRef.current;

    if (!dialogo) {
      return;
    }

    if (aberto && !dialogo.open) {
      dialogo.showModal();
    } else if (!aberto && dialogo.open) {
      dialogo.close();
    }
  }, [aberto]);

  return (
    <dialog
      ref={dialogRef}
      className="painel-acessibilidade"
      aria-labelledby="titulo-painel-acessibilidade"
      onClose={aoFechar}
      onCancel={aoFechar}
    >
      <div className="cabecalho-painel-acessibilidade">
        <h2 id="titulo-painel-acessibilidade">Preferências de acessibilidade</h2>
        <button
          type="button"
          className="botao-fechar-painel"
          onClick={aoFechar}
          aria-label="Fechar preferências de acessibilidade"
        >
          <IconeFechar className="icone-inline" />
        </button>
      </div>

      <p className="texto-ajuda-painel">
        Cada preferência funciona sozinha. Ative apenas o que você precisa.
      </p>

      <div className="lista-preferencias">
        <LinhaSegmentada
          icone={IconeFonte}
          rotulo="Tamanho da fonte"
          opcoes={opcoesFonte}
          valorAtual={preferencias.tamanhoFonte}
          aoEscolher={(valor) => atualizarPreferencia("tamanhoFonte", valor)}
        />

        <LinhaAlternavel
          icone={IconeContraste}
          rotulo="Alto contraste"
          chave="altoContraste"
          valor={preferencias.altoContraste}
          aoAlternar={alternarPreferencia}
        />

        <LinhaSegmentada
          icone={IconeTela}
          rotulo="Tema"
          opcoes={opcoesTema}
          valorAtual={preferencias.tema}
          aoEscolher={(valor) => atualizarPreferencia("tema", valor)}
        />

        <LinhaAlternavel
          icone={IconeMovimento}
          rotulo="Reduzir animações"
          chave="reduzirAnimacoes"
          valor={preferencias.reduzirAnimacoes}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeVoz}
          rotulo="Ler previsão em voz alta"
          chave="leituraEmVozAlta"
          valor={preferencias.leituraEmVozAlta}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeTeclado}
          rotulo="Destacar foco do teclado"
          descricao="Deixa o contorno de foco mais grosso ao navegar com a tecla Tab."
          chave="destacarFoco"
          valor={preferencias.destacarFoco}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeTexto}
          rotulo="Linguagem simplificada"
          chave="linguagemSimples"
          valor={preferencias.linguagemSimples}
          aoAlternar={alternarPreferencia}
        />
      </div>
    </dialog>
  );
}

export default PainelAcessibilidade;
