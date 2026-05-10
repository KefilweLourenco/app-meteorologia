// Tabela que transforma os códigos numéricos da Open-Meteo em textos fáceis de entender.
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

// Tempo de validade do cache: 10 minutos.
const DURACAO_CACHE_EM_MS = 10 * 60 * 1000;

// Tenta acessar o sessionStorage do navegador.
// Se o ambiente não tiver navegador, devolve null.
function obterArmazenamentoDeSessao() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

// Procura um item salvo no cache e só devolve se ele ainda estiver válido.
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

    // Se o tempo de cache já passou, remove o item antigo.
    if (expirou) {
      armazenamento.removeItem(chave);
      return null;
    }

    return item.data;
  } catch {
    return null;
  }
}

// Salva um valor no cache junto com o horário em que ele foi salvo.
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

// Converte a resposta da API para JSON.
// Se a resposta vier quebrada, o app mostra uma mensagem de erro.
async function converterRespostaEmJson(resposta) {
  try {
    return await resposta.json();
  } catch {
    throw new Error("Nao foi possivel interpretar a resposta da API.");
  }
}

// Busca a cidade digitada na Geocoding API para descobrir latitude e longitude.
export async function buscarCidade(cidade) {
  // Primeiro garante que o usuário digitou algo válido.
  if (!cidade || !cidade.trim()) {
    throw new Error("Digite o nome de uma cidade.");
  }

  // Normaliza o texto para montar a chave do cache.
  const cidadeNormalizada = cidade.trim();
  const chaveCacheCidade = `cidade:${cidadeNormalizada.toLowerCase()}`;
  const cidadeEmCache = lerCache(chaveCacheCidade);

  // Se a cidade já estiver no cache, usa esse resultado sem chamar a API.
  if (cidadeEmCache) {
    return cidadeEmCache;
  }

  let resposta;

  try {
    // Monta os parâmetros da busca de forma mais segura.
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

  // Trata erro retornado pela API ou resposta HTTP com falha.
  if (!resposta.ok || dados.error) {
    throw new Error(dados.reason || "Nao foi possivel buscar a cidade agora.");
  }

  // Se não encontrar resultado, o usuário recebe uma mensagem clara.
  if (!dados.results || dados.results.length === 0) {
    throw new Error("Cidade nao encontrada. Tente outro nome.");
  }

  // Salva a primeira cidade encontrada no cache.
  const cidadeEncontrada = dados.results[0];
  salvarCache(chaveCacheCidade, cidadeEncontrada);

  return cidadeEncontrada;
}

// Busca o nome da localização atual a partir da latitude e longitude.
// Isso é usado quando o usuário escolhe usar a localização do navegador.
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

  // Se a API não conseguir descobrir o nome da cidade, usa um texto com coordenadas.
  if (!cidade) {
    return `Sua localizacao atual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
  }

  return `${cidade}${estado ? `, ${estado}` : ""}${pais ? `, ${pais}` : ""}`;
}

// Traduz o código numérico do clima para um texto amigável.
function descreverCodigoClima(codigo) {
  return codigosClima[codigo] || "Sem descricao";
}

// Monta a previsão diária em formato fácil de usar dentro do React.
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

// Junta os dados da cidade com os dados da previsão em um único objeto.
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

// Busca a previsão usando latitude e longitude.
// Essa função nunca busca clima diretamente pelo nome da cidade.
export async function buscarPrevisao(latitude, longitude) {
  // Usa uma chave própria para armazenar a previsão no cache.
  const chaveCachePrevisao = `previsao:${latitude},${longitude}`;
  const previsaoEmCache = lerCache(chaveCachePrevisao);

  // Se a previsão já estiver salva, reutiliza o resultado.
  if (previsaoEmCache) {
    return previsaoEmCache;
  }

  let resposta;

  try {
    // Monta a URL da Forecast API usando URLSearchParams para evitar erros.
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

  // Trata erro HTTP e erro informado pela própria API.
  if (!resposta.ok || dados.error) {
    throw new Error(dados.reason || "Nao foi possivel buscar o clima agora.");
  }

  // Garante que os blocos principais da resposta existam antes de usar.
  if (!dados.current || !dados.daily || !Array.isArray(dados.daily.time)) {
    throw new Error("A API retornou uma resposta incompleta. Tente novamente.");
  }

  // Salva a previsão no cache para acelerar consultas repetidas.
  salvarCache(chaveCachePrevisao, dados);

  return dados;
}

// Fluxo completo quando a busca é feita pelo nome da cidade.
export async function buscarClimaPorCidade(cidade) {
  const local = await buscarCidade(cidade);
  const dados = await buscarPrevisao(local.latitude, local.longitude);
  return montarRespostaClima(local, dados, "busca por cidade");
}

// Fluxo completo quando a busca é feita usando a localização atual.
export async function buscarClimaPorCoordenadas(latitude, longitude) {
  const [dados, nomeDaLocalizacao] = await Promise.all([
    buscarPrevisao(latitude, longitude),
    buscarNomeDaLocalizacao(latitude, longitude)
  ]);

  // Devolve o mesmo formato usado na busca por cidade para a interface ficar simples.
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
