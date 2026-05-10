# Casos de Teste

Este documento reune os principais cenarios de teste do aplicativo de meteorologia, considerando busca por cidade, uso da localizacao atual, integracao com a Geocoding API da Open-Meteo e integracao com a Forecast API.

## Casos automatizados implementados com Vitest

Os testes automatizados foram criados no arquivo `src/servicos/apiClima.test.js`, com foco nas funcoes do servico `apiClima.js`.

### Resultado atual

- 12 testes aprovados;
- nenhum acesso real a API durante os testes;
- `fetch` totalmente mockado;
- foco na validacao do fluxo da Geocoding API e da Forecast API.

### O que os testes validam

#### buscarCidade

- deve retornar cidade, latitude e longitude quando a Geocoding API responde com sucesso;
- deve lancar erro quando a cidade nao existe;
- deve lancar erro quando a API retorna erro;
- deve lancar erro quando a entrada estiver vazia;
- deve lancar erro em falha de rede.

#### buscarPrevisao

- deve montar a requisicao usando latitude e longitude;
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

**Cenario:** o usuario digita uma cidade existente, como `Sao Paulo`.

**Comportamento esperado:**
- o app chama a Geocoding API;
- obtem latitude e longitude;
- consulta a Forecast API com essas coordenadas;
- exibe cidade, temperatura, sensacao termica, umidade, vento e previsao dos proximos dias.

### Buscar clima com cidade valida contendo espaco

**Cenario:** o usuario digita uma cidade com espaco no nome.

**Comportamento esperado:**
- a entrada e tratada corretamente;
- a cidade e encontrada;
- os dados climaticos sao exibidos normalmente.

### Buscar clima com caracteres acentuados

**Cenario:** o usuario digita uma cidade com acentos.

**Comportamento esperado:**
- a cidade e enviada corretamente para a Geocoding API;
- a busca funciona sem quebrar a interface.

### Buscar clima usando localizacao atual

**Cenario:** o usuario permite acesso a localizacao do navegador.

**Comportamento esperado:**
- o navegador retorna latitude e longitude;
- o app consulta a Forecast API com essas coordenadas;
- os dados sao exibidos com a origem `localizacao atual`.

### Exibir previsao dos proximos dias

**Cenario:** a API retorna resposta completa.

**Comportamento esperado:**
- todos os cards da previsao sao renderizados corretamente;
- maximas, minimas e descricao do clima aparecem sem erro.

## 2. Casos de erro de entrada

### Campo vazio

**Cenario:** o usuario tenta buscar sem digitar nada.

**Comportamento esperado:**
- o app nao chama nenhuma API;
- exibe a mensagem `Digite o nome de uma cidade.`

### Campo com apenas espacos

**Cenario:** o usuario digita apenas espacos.

**Comportamento esperado:**
- o valor e tratado como vazio;
- a busca nao e executada;
- a mensagem de erro e exibida.

### Cidade invalida

**Cenario:** o usuario digita uma cidade inexistente.

**Comportamento esperado:**
- a Geocoding API nao retorna resultados;
- o app exibe `Cidade nao encontrada. Tente outro nome.`

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

### Resposta invalida em JSON

**Cenario:** a API retorna algo que nao pode ser interpretado como JSON.

**Comportamento esperado:**
- o app informa que nao foi possivel interpretar a resposta da API.

## 4. Casos extremos

### Cidade muito longa

**Cenario:** o usuario digita um nome extremamente grande.

**Comportamento esperado:**
- o app continua estavel;
- retorna resultado valido ou mensagem de cidade nao encontrada.

### Cidade com numeros e simbolos

**Cenario:** o usuario digita caracteres incomuns.

**Comportamento esperado:**
- o app nao quebra;
- exibe erro amigavel se a cidade nao existir.

### Permissao de localizacao negada

**Cenario:** o navegador bloqueia ou o usuario recusa a geolocalizacao.

**Comportamento esperado:**
- o app informa que a permissao foi negada;
- o usuario ainda pode buscar por cidade manualmente.

### Navegador sem suporte a geolocalizacao

**Cenario:** o navegador nao suporta `navigator.geolocation`.

**Comportamento esperado:**
- o app informa que o navegador nao suporta geolocalizacao.

### Timeout na localizacao

**Cenario:** a localizacao demora para responder.

**Comportamento esperado:**
- o app exibe mensagem informando que a localizacao demorou para responder.

### Nova busca apos erro anterior

**Cenario:** o usuario faz uma nova busca depois de uma falha.

**Comportamento esperado:**
- o app continua funcional;
- a nova busca substitui o estado anterior sem quebrar a interface.

## 5. Regras de comportamento esperado

- A Forecast API deve ser chamada sempre com `latitude` e `longitude`.
- A Geocoding API deve ser chamada antes da Forecast API quando a busca for por cidade.
- O app nunca deve buscar clima diretamente pelo nome da cidade na Forecast API.
- O app deve validar a entrada antes de chamar a API.
- O app deve exibir mensagens de erro claras para o usuario.
- O app deve validar a estrutura da resposta antes de renderizar os dados.
- O app deve informar a origem da consulta: `busca por cidade` ou `localizacao atual`.