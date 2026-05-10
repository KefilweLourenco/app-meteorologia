# Casos de Teste

Este documento reune os principais cenarios de teste do aplicativo de meteorologia, considerando busca por cidade, uso da localizacao atual, integracao com a Geocoding API da Open-Meteo e integracao com a Forecast API.

## Casos automatizados implementados com Vitest

Os testes automatizados foram criados no arquivo `src/servicos/apiClima.test.js`, com foco nas funcoes do servico `apiClima.js`.

### Resultado atual

- 14 testes aprovados;
- nenhum acesso real a API durante os testes;
- `fetch` totalmente mockado;
- foco na validacao do fluxo da Geocoding API, da Forecast API e das sugestoes de cidades.

### O que os testes validam

#### buscarCidade

- deve retornar cidade, latitude e longitude quando a Geocoding API responde com sucesso;
- deve lancar erro quando a cidade nao existe;
- deve lancar erro quando a API retorna erro;
- deve lancar erro quando a entrada estiver vazia;
- deve lancar erro em falha de rede.

#### buscarSugestoesCidade

- deve retornar uma lista curta de sugestoes quando a API responde com sucesso;
- deve retornar lista vazia quando o usuario digita menos de duas letras.

#### buscarPrevisao

- deve montar a requisicao usando latitude e longitude;
- deve incluir `precipitation_probability_max` na consulta;
- deve retornar dados quando a Forecast API responde corretamente;
- deve lancar erro quando a resposta nao tiver `current`;
- deve lancar erro quando a resposta nao tiver `daily`;
- deve lancar erro quando `daily.time` nao for um array;
- deve lancar erro em falha de rede;
- deve lancar erro quando a Forecast API retorna erro.

### Comando para executar

```bash
npm run test
```

## 1. Casos de sucesso

### Buscar clima com cidade valida

**Cenario:** a pessoa usuaria digita uma cidade existente, como `Sao Paulo`.

**Comportamento esperado:**
- o app chama a Geocoding API;
- obtem latitude e longitude;
- consulta a Forecast API com essas coordenadas;
- exibe cidade, temperatura, sensacao termica, chance de chuva, umidade do ar, vento e previsao dos proximos dias.

### Buscar clima com sugestao de cidade

**Cenario:** a pessoa usuaria digita duas letras, escolhe uma sugestao e confirma a busca.

**Comportamento esperado:**
- o app mostra sugestoes;
- a sugestao escolhida usa latitude e longitude diretamente;
- o resultado aparece sem exigir redigitacao.

### Buscar clima usando localizacao atual

**Cenario:** a pessoa usuaria permite acesso a localizacao do navegador.

**Comportamento esperado:**
- o navegador retorna latitude e longitude;
- o app consulta a Forecast API com essas coordenadas;
- os dados sao exibidos com a origem `localizacao atual`.

### Exibir previsao dos proximos dias

**Cenario:** a API retorna resposta completa.

**Comportamento esperado:**
- todos os cards da previsao sao renderizados corretamente;
- maximas, minimas, descricao e chance de chuva aparecem sem erro.

## 2. Casos de erro de entrada

### Campo vazio

**Cenario:** a pessoa usuaria tenta buscar sem digitar nada.

**Comportamento esperado:**
- o app nao chama nenhuma API;
- exibe a mensagem `Digite o nome de uma cidade para buscar a previsao.`

### Cidade invalida

**Cenario:** a pessoa usuaria digita uma cidade inexistente.

**Comportamento esperado:**
- a Geocoding API nao retorna resultados;
- o app exibe `Cidade nao encontrada. Verifique o nome e tente novamente.`

## 3. Casos de erro da API

### Falha de conexao na Geocoding API

**Cenario:** a requisicao de geocodificacao falha por falta de internet ou erro de rede.

**Comportamento esperado:**
- o app exibe `Falha de conexao ao buscar a cidade. Verifique sua internet e tente novamente.`

### Falha de conexao na Forecast API

**Cenario:** a requisicao de previsao falha por falta de internet ou erro de rede.

**Comportamento esperado:**
- o app exibe `Falha de conexao ao buscar o clima. Verifique sua internet e tente novamente.`

### Erro retornado pela API

**Cenario:** a API retorna erro com `reason`.

**Comportamento esperado:**
- o app usa `dados.reason` quando existir;
- caso contrario, exibe `Nao foi possivel buscar o clima agora.`

### Resposta incompleta da Forecast API

**Cenario:** a API retorna resposta sem `current`, sem `daily` ou com `daily.time` invalido.

**Comportamento esperado:**
- o app nao tenta acessar propriedades inexistentes;
- exibe `A API retornou uma resposta incompleta. Tente novamente.`

## 4. Casos extremos

### Permissao de localizacao negada

**Cenario:** o navegador bloqueia ou a pessoa usuaria recusa a geolocalizacao.

**Comportamento esperado:**
- o app informa que a permissao foi negada;
- a busca por cidade continua disponivel.

### Zoom em 200%

**Cenario:** a pagina e ampliada no navegador.

**Comportamento esperado:**
- o layout continua legivel;
- cards nao se sobrepoem;
- textos nao sao cortados.

### Modo acessivel ativado

**Cenario:** a pessoa ativa o modo acessivel.

**Comportamento esperado:**
- a tipografia aumenta;
- o espacamento entre blocos cresce;
- botoes e cards ficam mais confortaveis para leitura e clique.

## 5. Regras de comportamento esperado

- A Forecast API deve ser chamada sempre com `latitude` e `longitude`.
- A Geocoding API deve ser chamada antes da Forecast API quando a busca for por cidade.
- O app nunca deve buscar clima diretamente pelo nome da cidade na Forecast API.
- O app deve validar a entrada antes de chamar a API.
- O app deve exibir mensagens de erro claras para a pessoa usuaria.
- O app deve validar a estrutura da resposta antes de renderizar os dados.
- O app deve informar a origem da consulta: `busca por cidade`, `sugestao de cidade` ou `localizacao atual`.
