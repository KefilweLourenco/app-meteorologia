const codigosClima = {
  0: "Ceu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com geada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  80: "Pancadas leves",
  81: "Pancadas moderadas",
  82: "Pancadas fortes",
  95: "Trovoadas"
};

async function converterRespostaEmJson(resposta) {
  try {
    return await resposta.json();
  } catch {
    throw new Error("Nao foi possivel interpretar a resposta da API.");
  }
}

async function buscarCidade(cidade) {
  let resposta;

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
    resposta = await fetch(url);
  } catch {
    throw new Error("Falha de conexao ao buscar a cidade. Verifique sua internet e tente novamente.");
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok || !dados.results || dados.results.length === 0) {
    throw new Error("Cidade nao encontrada. Tente outro nome.");
  }

  return dados.results[0];
}

async function buscarNomeDaLocalizacao(latitude, longitude) {
  let resposta;

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`;
    resposta = await fetch(url);
  } catch {
    return `Sua localizacao atual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok || !dados.address) {
    return `Sua localizacao atual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
  }

  const cidade =
    dados.address.city ||
    dados.address.town ||
    dados.address.village ||
    dados.address.municipality ||
    dados.address.county;

  const estado = dados.address.state;
  const pais = dados.address.country;

  if (!cidade) {
    return `Sua localizacao atual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
  }

  return `${cidade}${estado ? `, ${estado}` : ""}${pais ? `, ${pais}` : ""}`;
}

function descreverCodigoClima(codigo) {
  return codigosClima[codigo] || "Sem descricao";
}

function montarRespostaClima(local, dados, origem = "cidade atual") {
  const nomeCompletoCidade = `${local.name}${local.admin1 ? `, ${local.admin1}` : ""}${local.country ? `, ${local.country}` : ""}`;

  return {
    cidade: nomeCompletoCidade,
    origem,
    temperatura: dados.current.temperature_2m,
    sensacaoTermica: dados.current.apparent_temperature,
    umidade: dados.current.relative_humidity_2m,
    velocidadeVento: dados.current.wind_speed_10m,
    descricao: descreverCodigoClima(dados.current.weather_code),
    previsao: dados.daily.time.map((data, indice) => ({
      data,
      descricao: descreverCodigoClima(dados.daily.weather_code[indice]),
      maxima: dados.daily.temperature_2m_max[indice],
      minima: dados.daily.temperature_2m_min[indice]
    }))
  };
}

async function buscarPrevisao(latitude, longitude) {
  let resposta;

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`;
    resposta = await fetch(url);
  } catch {
    throw new Error("Falha de conexao ao buscar o clima. Verifique sua internet e tente novamente.");
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok) {
    throw new Error("Nao foi possivel buscar o clima agora.");
  }

  return dados;
}

export async function buscarClimaPorCidade(cidade) {
  const local = await buscarCidade(cidade);
  const dados = await buscarPrevisao(local.latitude, local.longitude);
  return montarRespostaClima(local, dados, "busca por cidade");
}

export async function buscarClimaPorCoordenadas(latitude, longitude) {
  const [dados, nomeDaLocalizacao] = await Promise.all([
    buscarPrevisao(latitude, longitude),
    buscarNomeDaLocalizacao(latitude, longitude)
  ]);

  return {
    cidade: nomeDaLocalizacao,
    origem: "localizacao atual",
    temperatura: dados.current.temperature_2m,
    sensacaoTermica: dados.current.apparent_temperature,
    umidade: dados.current.relative_humidity_2m,
    velocidadeVento: dados.current.wind_speed_10m,
    descricao: descreverCodigoClima(dados.current.weather_code),
    previsao: dados.daily.time.map((data, indice) => ({
      data,
      descricao: descreverCodigoClima(dados.daily.weather_code[indice]),
      maxima: dados.daily.temperature_2m_max[indice],
      minima: dados.daily.temperature_2m_min[indice]
    }))
  };
}