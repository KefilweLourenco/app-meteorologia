// Tabela que transforma os codigos numericos da Open-Meteo em textos faceis de entender.
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
// Se o ambiente nao tiver navegador, devolve null.
function obterArmazenamentoDeSessao() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

// Procura um item salvo no cache e so devolve se ele ainda estiver valido.
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

    // Se o tempo de cache ja passou, remove o item antigo.
    if (expirou) {
      armazenamento.removeItem(chave);
      return null;
    }

    return item.data;
  } catch {
    return null;
  }
}

// Salva um valor no cache junto com o horario em que ele foi salvo.
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
  // Primeiro garante que o usuario digitou algo valido.
  if (!cidade || !cidade.trim()) {
    throw new Error("Digite o nome de uma cidade.");
  }

  // Normaliza o texto para montar a chave do cache.
  const cidadeNormalizada = cidade.trim();
  const chaveCacheCidade = `cidade:${cidadeNormalizada.toLowerCase()}`;
  const cidadeEmCache = lerCache(chaveCacheCidade);

  // Se a cidade ja estiver no cache, usa esse resultado sem chamar a API.
  if (cidadeEmCache) {
    return cidadeEmCache;
  }

  let resposta;

  try {
    // Monta os parametros da busca de forma mais segura.
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

  // Se nao encontrar resultado, o usuario recebe uma mensagem clara.
  if (!dados.results || dados.results.length === 0) {
    throw new Error("Cidade nao encontrada. Tente outro nome.");
  }

  // Salva a primeira cidade encontrada no cache.
  const cidadeEncontrada = dados.results[0];
  salvarCache(chaveCacheCidade, cidadeEncontrada);

  return cidadeEncontrada;
}

// Busca uma lista curta de cidades para sugerir enquanto o usuario digita.
export async function buscarSugestoesCidade(termo) {
  if (!termo || termo.trim().length < 2) {
    return [];
  }

  const termoNormalizado = termo.trim();
  const chaveCacheSugestoes = `sugestoes:${termoNormalizado.toLowerCase()}`;
  const sugestoesEmCache = lerCache(chaveCacheSugestoes);

  if (sugestoesEmCache) {
    return sugestoesEmCache;
  }

  let resposta;

  try {
    const parametros = new URLSearchParams({
      name: termoNormalizado,
      count: "5",
      language: "pt",
      format: "json"
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${parametros.toString()}`;
    resposta = await fetch(url);
  } catch {
    return [];
  }

  const dados = await converterRespostaEmJson(resposta);

  if (!resposta.ok || dados.error || !Array.isArray(dados.results)) {
    return [];
  }

  const sugestoes = dados.results.map((item) => ({
    id: String(item.id || `${item.latitude}-${item.longitude}`),
    nome: item.name,
    estado: item.admin1 || "",
    pais: item.country || "",
    latitude: item.latitude,
    longitude: item.longitude,
    label: `${item.name}${item.admin1 ? `, ${item.admin1}` : ""}${item.country ? `, ${item.country}` : ""}`
  }));

  salvarCache(chaveCacheSugestoes, sugestoes);
  return sugestoes;
}

// Busca o nome da localizacao atual a partir da latitude e longitude.
// Isso e usado quando o usuario escolhe usar a localizacao do navegador.
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

  // Se a API nao conseguir descobrir o nome da cidade, usa um texto com coordenadas.
  if (!cidade) {
    return `Sua localizacao atual (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
  }

  return `${cidade}${estado ? `, ${estado}` : ""}${pais ? `, ${pais}` : ""}`;
}

// Traduz o codigo numerico do clima para um texto amigavel.
function descreverCodigoClima(codigo) {
  return codigosClima[codigo] || "Sem descricao";
}

// Monta a previsao diaria em formato facil de usar dentro do React.
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

// Junta os dados da cidade com os dados da previsao em um unico objeto.
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

// Busca a previsao usando latitude e longitude.
// Essa funcao nunca busca clima diretamente pelo nome da cidade.
export async function buscarPrevisao(latitude, longitude) {
  // Usa uma chave propria para armazenar a previsao no cache.
  const chaveCachePrevisao = `previsao:${latitude},${longitude}`;
  const previsaoEmCache = lerCache(chaveCachePrevisao);

  // Se a previsao ja estiver salva, reutiliza o resultado.
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

  // Trata erro HTTP e erro informado pela propria API.
  if (!resposta.ok || dados.error) {
    throw new Error(dados.reason || "Nao foi possivel buscar o clima agora.");
  }

  // Garante que os blocos principais da resposta existam antes de usar.
  if (!dados.current || !dados.daily || !Array.isArray(dados.daily.time)) {
    throw new Error("A API retornou uma resposta incompleta. Tente novamente.");
  }

  // Salva a previsao no cache para acelerar consultas repetidas.
  salvarCache(chaveCachePrevisao, dados);

  return dados;
}

// Fluxo completo quando a busca e feita pelo nome da cidade.
export async function buscarClimaPorCidade(cidade) {
  const local = await buscarCidade(cidade);
  const dados = await buscarPrevisao(local.latitude, local.longitude);
  return montarRespostaClima(local, dados, "busca por cidade");
}

// Fluxo completo quando a busca usa uma sugestao escolhida pelo usuario.
export async function buscarClimaPorSugestao(sugestao) {
  const dados = await buscarPrevisao(sugestao.latitude, sugestao.longitude);

  return montarRespostaClima(
    {
      name: sugestao.nome,
      admin1: sugestao.estado,
      country: sugestao.pais
    },
    dados,
    "sugestao de cidade"
  );
}

// Fluxo completo quando a busca e feita usando a localizacao atual.
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
