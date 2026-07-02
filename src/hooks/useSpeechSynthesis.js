import { useCallback, useEffect, useState } from "react";

export function useSpeechSynthesis() {
  const suportado = typeof window !== "undefined" && "speechSynthesis" in window;
  const [falando, setFalando] = useState(false);

  useEffect(() => {
    if (!suportado) {
      return undefined;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [suportado]);

  const falar = useCallback(
    (texto) => {
      if (!suportado || !texto) {
        return;
      }

      window.speechSynthesis.cancel();

      const enunciado = new SpeechSynthesisUtterance(texto);
      enunciado.lang = "pt-BR";
      enunciado.onstart = () => setFalando(true);
      enunciado.onend = () => setFalando(false);
      enunciado.onerror = () => setFalando(false);

      window.speechSynthesis.speak(enunciado);
    },
    [suportado]
  );

  const parar = useCallback(() => {
    if (!suportado) {
      return;
    }

    window.speechSynthesis.cancel();
    setFalando(false);
  }, [suportado]);

  return { suportado, falando, falar, parar };
}
