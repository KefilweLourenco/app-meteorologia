// Arredonda a temperatura e devolve um texto pronto para exibir na tela.
export function formatarTemperatura(valor) {
  return `${Math.round(valor)}°C`;
}

// Arredonda a umidade e adiciona o símbolo de porcentagem.
export function formatarUmidade(valor) {
  return `${Math.round(valor)}%`;
}

// Arredonda a velocidade do vento e adiciona a unidade km/h.
export function formatarVelocidadeVento(valor) {
  return `${Math.round(valor)} km/h`;
}

// Formata a data da API para um texto curto em português.
export function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(new Date(`${data}T12:00:00`));
}
