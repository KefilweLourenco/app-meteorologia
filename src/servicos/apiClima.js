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

const DURACAO_CACHE_EM_MS = 10 * 60 * 1000;

function obterArmazenamentoDeSessao() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

function lerCache(chave) {
  const armazenamento = obterArmazenamentoDeSessao();

  if (!armazenamento) {
    return null;
  }

  try {
    const valor = armazenamento.getItem(chave);

    if (!valor) {
      return null;
    }

    const item = JSON.parse(valor);
    const expirou = Date.now() - item.timestamp > DURACAO_CACHE_EM_MS;

    if (expirou) {
      armazenamento.removeItem(chave);
      return null;
    }

    return item.data;
  } catch {
    return null;
  }
}

function salvarCache(chave, dados) {
  const armazenamento = obterArmazenamentoDeSessao();

  if (!armazenamento) {
    return;
  }

  try {
    armazenamento.setItem(
      chave,
      JSON.stringify({
        timestamp: Date.now(),
        data: dados
      })
    );
  } catch {
    // Ignora falhas de escrita no cache para nao bloquear o fluxo principal.
  }
}

async function converterRespostaEmJson(resposta) {
  try {
    return await resposta.json();
  } catch {
    throw new Error("Nao foi possivel interpretar a resposta da API.");
  }
}

export async function buscarCidade(cidade) {
  if (!cidade || !cidade.trim()) {
    throw new Error("Digite o nome de uma cidade.");
  }

  const cidadeNormalizada = cidade.trim();
  const chaveCacheCidade = `cidade:${cidadeNormalizada.toLowerCase()}`;
  const cidadeEmCache = lerCache(chaveCacheCidade);

  if (cidadeEmCache) {
    return cidadeEmCache;
  }

  let resposta;

  try {
    const parametros = new URLSearchParams({
      name: cidadeNormalizada,
      count: "1",
      language: "pt",
      format: "json"
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${parametros.toString()}`;
    resposta = await fetch(url);
  } catch {
    throw new Error("Falha de conexao ao buscar a cidade. Verifique sua internet e tente novamente.");
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok || dados.error) {
    throw new Error(dados.reason || "Nao foi possivel buscar a cidade agora.");
  }

  if (!dados.results || dados.results.length === 0) {
    throw new Error("Cidade nao encontrada. Tente outro nome.");
  }

  const cidadeEncontrada = dados.results[0];
  salvarCache(chaveCacheCidade, cidadeEncontrada);

  return cidadeEncontrada;
}

async function buscarNomeDaLocalizacao(latitude, longitude) {
  let resposta;

  try {
    const parametros = new URLSearchParams({
      format: "jsonv2",
      lat: String(latitude),
      lon: String(longitude),
      "accept-language": "pt-BR"
    });

    const url = `https://nominatim.openstreetmap.org/reverse?${parametros.toString()}`;
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

function montarPrevisaoDiaria(dadosDaily) {
  if (
    !dadosDaily.time ||
    !dadosDaily.weather_code ||
    !dadosDaily.temperature_2m_max ||
    !dadosDaily.temperature_2m_min
  ) {
    throw new Error("A API retornou uma resposta incompleta. Tente novamente.");
  }

  return dadosDaily.time.map((data, indice) => ({
    data,
    descricao: descreverCodigoClima(dadosDaily.weather_code[indice]),
    maxima: dadosDaily.temperature_2m_max[indice],
    minima: dadosDaily.temperature_2m_min[indice]
  }));
}

function montarRespostaClima(local, dados, origem = "cidade atual") {
  if (!dados.current || !dados.daily) {
    throw new Error("A API retornou uma resposta incompleta. Tente novamente.");
  }

  const nomeCompletoCidade = `${local.name}${local.admin1 ? `, ${local.admin1}` : ""}${local.country ? `, ${local.country}` : ""}`;

  return {
    cidade: nomeCompletoCidade,
    origem,
    temperatura: dados.current.temperature_2m,
    sensacaoTermica: dados.current.apparent_temperature,
    umidade: dados.current.relative_humidity_2m,
    velocidadeVento: dados.current.wind_speed_10m,
    descricao: descreverCodigoClima(dados.current.weather_code),
    previsao: montarPrevisaoDiaria(dados.daily)
  };
}

export async function buscarPrevisao(latitude, longitude) {
  const chaveCachePrevisao = `previsao:${latitude},${longitude}`;
  const previsaoEmCache = lerCache(chaveCachePrevisao);

  if (previsaoEmCache) {
    return previsaoEmCache;
  }

  let resposta;

  try {
    const parametros = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      forecast_days: "5",
      timezone: "auto"
    });

    const url = `https://api.open-meteo.com/v1/forecast?${parametros.toString()}`;
    resposta = await fetch(url);
  } catch {
    throw new Error("Falha de conexao ao buscar o clima. Verifique sua internet e tente novamente.");
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok || dados.error) {
    throw new Error(dados.reason || "Nao foi possivel buscar o clima agora.");
  }

  if (!dados.current || !dados.daily || !Array.isArray(dados.daily.time)) {
    throw new Error("A API retornou uma resposta incompleta. Tente novamente.");
  }

  salvarCache(chaveCachePrevisao, dados);

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
    previsao: montarPrevisaoDiaria(dados.daily)
  };
}
