// Importa as funções do Vitest usadas para organizar e validar os testes.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Importa as funções do serviço que queremos testar.
import { buscarCidade, buscarPrevisao } from "./apiClima";

// Cria uma resposta falsa parecida com a que o fetch devolveria.
function criarRespostaJson(dados, ok = true) {
  return {
    ok,
    json: vi.fn().mockResolvedValue(dados)
  };
}

// Grupo principal dos testes do arquivo apiClima.
describe("apiClima", () => {
  beforeEach(() => {
    // Antes de cada teste, cria um fetch falso para evitar chamadas reais.
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Depois de cada teste, limpa os mocks para não misturar resultados.
    vi.restoreAllMocks();
  });

  // Testes da função que busca latitude e longitude da cidade.
  describe("buscarCidade", () => {
    it("deve retornar cidade, latitude e longitude quando a Geocoding API responde com sucesso", async () => {
      const respostaApi = {
        results: [
          {
            name: "Sao Paulo",
            latitude: -23.55,
            longitude: -46.63,
            country: "Brasil",
            admin1: "Sao Paulo"
          }
        ]
      };

      fetch.mockResolvedValue(criarRespostaJson(respostaApi));

      const resultado = await buscarCidade("Sao Paulo");

      // Verifica se a API foi chamada uma vez e com a URL correta.
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch.mock.calls[0][0]).toContain("https://geocoding-api.open-meteo.com/v1/search?");
      expect(fetch.mock.calls[0][0]).toContain("name=Sao+Paulo");
      // Confirma que o retorno foi exatamente o primeiro resultado da API.
      expect(resultado).toEqual(respostaApi.results[0]);
    });

    it("deve lancar erro quando a cidade nao existe", async () => {
      fetch.mockResolvedValue(criarRespostaJson({ results: [] }));

      await expect(buscarCidade("CidadeFake123")).rejects.toThrow(
        "Cidade nao encontrada. Tente outro nome."
      );
    });

    it("deve lancar erro quando a API retorna erro", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({ error: true, reason: "Parametro invalido" }, false)
      );

      await expect(buscarCidade("Sao Paulo")).rejects.toThrow("Parametro invalido");
    });

    it("deve lancar erro quando a entrada estiver vazia", async () => {
      await expect(buscarCidade("   ")).rejects.toThrow("Digite o nome de uma cidade.");
      // Nesse caso a API nem deve ser chamada.
      expect(fetch).not.toHaveBeenCalled();
    });

    it("deve lancar erro em falha de rede", async () => {
      fetch.mockRejectedValue(new Error("Network error"));

      await expect(buscarCidade("Sao Paulo")).rejects.toThrow(
        "Falha de conexao ao buscar a cidade. Verifique sua internet e tente novamente."
      );
    });
  });

  // Testes da função que busca previsão usando latitude e longitude.
  describe("buscarPrevisao", () => {
    it("deve montar a requisicao usando latitude e longitude", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({
          current: {
            temperature_2m: 24,
            apparent_temperature: 23,
            relative_humidity_2m: 56,
            weather_code: 3,
            wind_speed_10m: 11
          },
          daily: {
            time: ["2026-05-10"],
            weather_code: [3],
            temperature_2m_max: [24],
            temperature_2m_min: [10]
          }
        })
      );

      await buscarPrevisao(-23.55, -46.63);

      // Confirma se a URL final foi montada com os parâmetros principais.
      const url = fetch.mock.calls[0][0];
      expect(url).toContain("https://api.open-meteo.com/v1/forecast?");
      expect(url).toContain("latitude=-23.55");
      expect(url).toContain("longitude=-46.63");
      expect(url).toContain("current=");
      expect(url).toContain("daily=");
    });

    it("deve retornar dados quando a Forecast API responde corretamente", async () => {
      const respostaApi = {
        current: {
          temperature_2m: 24,
          apparent_temperature: 23,
          relative_humidity_2m: 56,
          weather_code: 3,
          wind_speed_10m: 11
        },
        daily: {
          time: ["2026-05-10"],
          weather_code: [3],
          temperature_2m_max: [24],
          temperature_2m_min: [10]
        }
      };

      fetch.mockResolvedValue(criarRespostaJson(respostaApi));

      const resultado = await buscarPrevisao(-23.55, -46.63);

      // Garante que a função devolve os dados corretamente quando a API responde bem.
      expect(resultado).toEqual(respostaApi);
    });

    it("deve lancar erro quando a resposta nao tiver current", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({
          daily: {
            time: ["2026-05-10"],
            weather_code: [3],
            temperature_2m_max: [24],
            temperature_2m_min: [10]
          }
        })
      );

      await expect(buscarPrevisao(-23.55, -46.63)).rejects.toThrow(
        "A API retornou uma resposta incompleta. Tente novamente."
      );
    });

    it("deve lancar erro quando a resposta nao tiver daily", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({
          current: {
            temperature_2m: 24,
            apparent_temperature: 23,
            relative_humidity_2m: 56,
            weather_code: 3,
            wind_speed_10m: 11
          }
        })
      );

      await expect(buscarPrevisao(-23.55, -46.63)).rejects.toThrow(
        "A API retornou uma resposta incompleta. Tente novamente."
      );
    });

    it("deve lancar erro quando daily.time nao for um array", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({
          current: {
            temperature_2m: 24,
            apparent_temperature: 23,
            relative_humidity_2m: 56,
            weather_code: 3,
            wind_speed_10m: 11
          },
          daily: {
            time: null,
            weather_code: [3],
            temperature_2m_max: [24],
            temperature_2m_min: [10]
          }
        })
      );

      await expect(buscarPrevisao(-23.55, -46.63)).rejects.toThrow(
        "A API retornou uma resposta incompleta. Tente novamente."
      );
    });

    it("deve lancar erro em falha de rede", async () => {
      fetch.mockRejectedValue(new Error("Network error"));

      await expect(buscarPrevisao(-23.55, -46.63)).rejects.toThrow(
        "Falha de conexao ao buscar o clima. Verifique sua internet e tente novamente."
      );
    });

    it("deve lancar erro quando a Forecast API retorna erro", async () => {
      fetch.mockResolvedValue(
        criarRespostaJson({ error: true, reason: "Latitude invalida" }, false)
      );

      await expect(buscarPrevisao(-23.55, -46.63)).rejects.toThrow("Latitude invalida");
    });
  });
});
