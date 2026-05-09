export function formatarTemperatura(valor) {
  return `${Math.round(valor)}°C`;
}

export function formatarUmidade(valor) {
  return `${Math.round(valor)}%`;
}

export function formatarVelocidadeVento(valor) {
  return `${Math.round(valor)} km/h`;
}

export function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(`${data}T12:00:00`));
}