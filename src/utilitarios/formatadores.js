export function formatarTemperatura(valor) {
  return `${Math.round(valor)}°C`;
}

export function formatarUmidade(valor) {
  return `${Math.round(valor)}%`;
}

export function formatarVelocidadeVento(valor) {
  return `${Math.round(valor)} km/h`;
}

export function formatarChanceChuva(valor) {
  if (typeof valor !== "number") {
    return "Nao informado";
  }

  return `${Math.round(valor)}%`;
}

export function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(`${data}T12:00:00`));
}

export function formatarResumoClima(dados) {
  const chance =
    typeof dados.chanceChuva === "number" ? `${Math.round(dados.chanceChuva)}%` : "sem previsao";

  return (
    `Em ${dados.cidade}, ${dados.descricao.toLowerCase()}, com temperatura de ` +
    `${Math.round(dados.temperatura)} graus e sensacao termica de ${Math.round(dados.sensacaoTermica)} graus. ` +
    `Umidade de ${Math.round(dados.umidade)} por cento e vento de ${Math.round(dados.velocidadeVento)} quilometros por hora. ` +
    `Chance de chuva: ${chance}.`
  );
}
