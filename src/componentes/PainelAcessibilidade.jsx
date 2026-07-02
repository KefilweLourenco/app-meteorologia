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
  { valor: "automatico", rotulo: "Automatico" }
];

function LinhaAlternavel({ icone: Icone, rotulo, chave, valor, aoAlternar }) {
  return (
    <label className="linha-preferencia">
      <span className="rotulo-preferencia">
        <Icone className="icone-inline" />
        {rotulo}
      </span>
      <span className="interruptor">
        <input type="checkbox" checked={valor} onChange={() => aoAlternar(chave)} />
        <span className="trilho-interruptor" aria-hidden="true"></span>
      </span>
    </label>
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
        <h2 id="titulo-painel-acessibilidade">Preferencias de acessibilidade</h2>
        <button
          type="button"
          className="botao-fechar-painel"
          onClick={aoFechar}
          aria-label="Fechar preferencias de acessibilidade"
        >
          <IconeFechar className="icone-inline" />
        </button>
      </div>

      <p className="texto-ajuda-painel">
        Cada preferencia funciona sozinha. Ative apenas o que voce precisa.
      </p>

      <div className="lista-preferencias">
        <LinhaAlternavel
          icone={IconeFonte}
          rotulo="Aumentar fonte"
          chave="fonteAumentada"
          valor={preferencias.fonteAumentada}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeContraste}
          rotulo="Alto contraste"
          chave="altoContraste"
          valor={preferencias.altoContraste}
          aoAlternar={alternarPreferencia}
        />

        <div className="linha-preferencia">
          <span className="rotulo-preferencia">
            <IconeTela className="icone-inline" />
            Tema
          </span>
          <div className="segmentado" role="radiogroup" aria-label="Tema">
            {opcoesTema.map((opcao) => (
              <button
                key={opcao.valor}
                type="button"
                role="radio"
                aria-checked={preferencias.tema === opcao.valor}
                className={`opcao-segmentada ${preferencias.tema === opcao.valor ? "opcao-segmentada-ativa" : ""}`}
                onClick={() => atualizarPreferencia("tema", opcao.valor)}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        <LinhaAlternavel
          icone={IconeMovimento}
          rotulo="Reduzir animacoes"
          chave="reduzirAnimacoes"
          valor={preferencias.reduzirAnimacoes}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeVoz}
          rotulo="Ler previsao em voz alta"
          chave="leituraEmVozAlta"
          valor={preferencias.leituraEmVozAlta}
          aoAlternar={alternarPreferencia}
        />

        <LinhaAlternavel
          icone={IconeTeclado}
          rotulo="Destacar foco do teclado"
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
