# Implementação da melhoria: cache de buscas

## Objetivo

Melhorar o desempenho e a usabilidade do aplicativo de meteorologia, evitando chamadas repetidas para a Open-Meteo quando o usuário pesquisa a mesma cidade ou solicita novamente a mesma previsão em um curto intervalo de tempo.

## O que foi implementado

Foi adicionado um cache simples com `sessionStorage` no arquivo `src/servicos/apiClima.js`.

O cache funciona em dois pontos:

- **Geocoding API**: armazena o resultado da busca da cidade.
- **Forecast API**: armazena o resultado da previsão com base em latitude e longitude.

## Estratégia usada

### 1. Cache por cidade

Ao chamar `buscarCidade`, o serviço:

1. normaliza o nome da cidade;
2. monta uma chave no formato `cidade:nome-da-cidade`;
3. verifica se já existe um valor salvo em `sessionStorage`;
4. se existir e ainda estiver válido, retorna o dado em cache;
5. se não existir, faz a chamada para a Geocoding API e salva o resultado.

### 2. Cache por coordenadas

Ao chamar `buscarPrevisao`, o serviço:

1. monta uma chave no formato `previsao:latitude,longitude`;
2. verifica se já existe uma previsão válida salva em cache;
3. se existir, retorna imediatamente;
4. se não existir, consulta a Forecast API e salva a resposta.

## Tempo de validade

O cache foi configurado com duração de **10 minutos**:

```js
const DURACAO_CACHE_EM_MS = 10 * 60 * 1000;
```

Depois desse período, o valor é considerado expirado e a próxima busca volta a consultar a API.

## Segurança da implementação

A melhoria foi feita para **não quebrar o funcionamento atual**:

- se `sessionStorage` não existir, o app continua funcionando normalmente;
- se ocorrer erro ao ler ou salvar o cache, o fluxo principal continua sem interromper a busca;
- nenhuma mudança foi feita na interface principal do React;
- o comportamento da busca continua o mesmo para o usuário.

## Benefícios

- melhora o tempo de resposta em buscas repetidas;
- reduz chamadas desnecessárias para a Open-Meteo;
- melhora a experiência do usuário;
- respeita melhor o uso da API externa;
- mantém o código simples e fácil de entender.

## Arquivo alterado

- `src/servicos/apiClima.js`
