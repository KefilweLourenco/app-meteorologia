# Casos de Teste

Este documento reúne os principais cenários de teste do aplicativo de meteorologia, considerando busca por cidade, uso da localização atual, integração com a Geocoding API da Open-Meteo e integração com a Forecast API.

## 1. Casos de sucesso

### Buscar clima com cidade válida

**Cenário:** o usuário digita uma cidade existente, como `São Paulo`.

**Comportamento esperado:**
- o app chama a Geocoding API;
- obtém latitude e longitude;
- consulta a Forecast API com essas coordenadas;
- exibe cidade, temperatura, sensação térmica, umidade, vento e previsão dos próximos dias.

### Buscar clima com cidade válida contendo espaço

**Cenário:** o usuário digita uma cidade com espaço no nome.

**Comportamento esperado:**
- a entrada é tratada corretamente;
- a cidade é encontrada;
- os dados climáticos são exibidos normalmente.

### Buscar clima com caracteres acentuados

**Cenário:** o usuário digita uma cidade com acentos.

**Comportamento esperado:**
- a cidade é enviada corretamente para a Geocoding API;
- a busca funciona sem quebrar a interface.

### Buscar clima usando localização atual

**Cenário:** o usuário permite acesso à localização do navegador.

**Comportamento esperado:**
- o navegador retorna latitude e longitude;
- o app consulta a Forecast API com essas coordenadas;
- os dados são exibidos com a origem `localizacao atual`.

### Exibir previsão dos próximos dias

**Cenário:** a API retorna resposta completa.

**Comportamento esperado:**
- todos os cards da previsão são renderizados corretamente;
- máximas, mínimas e descrição do clima aparecem sem erro.

## 2. Casos de erro de entrada

### Campo vazio

**Cenário:** o usuário tenta buscar sem digitar nada.

**Comportamento esperado:**
- o app não chama nenhuma API;
- exibe a mensagem `Digite o nome de uma cidade.`

### Campo com apenas espaços

**Cenário:** o usuário digita apenas espaços.

**Comportamento esperado:**
- o valor é tratado como vazio;
- a busca não é executada;
- a mensagem de erro é exibida.

### Cidade inválida

**Cenário:** o usuário digita uma cidade inexistente.

**Comportamento esperado:**
- a Geocoding API não retorna resultados;
- o app exibe `Cidade nao encontrada. Tente outro nome.`

## 3. Casos de erro da API

### Falha de conexão na Geocoding API

**Cenário:** a requisição de geocodificação falha por falta de internet ou erro de rede.

**Comportamento esperado:**
- o app exibe `Falha de conexao ao buscar a cidade. Verifique sua internet e tente novamente.`

### Falha de conexão na Forecast API

**Cenário:** a requisição de previsão falha por falta de internet ou erro de rede.

**Comportamento esperado:**
- o app exibe `Falha de conexao ao buscar o clima. Verifique sua internet e tente novamente.`

### Erro retornado pela API

**Cenário:** a API retorna erro com `reason`.

**Comportamento esperado:**
- o app usa `dados.reason` quando existir;
- caso contrário, exibe `Nao foi possivel buscar o clima agora.`

### Resposta incompleta da Forecast API

**Cenário:** a API retorna resposta sem `current`, sem `daily` ou com `daily.time` inválido.

**Comportamento esperado:**
- o app não tenta acessar propriedades inexistentes;
- exibe `A API retornou uma resposta incompleta. Tente novamente.`

### Resposta inválida em JSON

**Cenário:** a API retorna algo que não pode ser interpretado como JSON.

**Comportamento esperado:**
- o app informa que não foi possível interpretar a resposta da API.

## 4. Casos extremos

### Cidade muito longa

**Cenário:** o usuário digita um nome extremamente grande.

**Comportamento esperado:**
- o app continua estável;
- retorna resultado válido ou mensagem de cidade não encontrada.

### Cidade com números e símbolos

**Cenário:** o usuário digita caracteres incomuns.

**Comportamento esperado:**
- o app não quebra;
- exibe erro amigável se a cidade não existir.

### Permissão de localização negada

**Cenário:** o navegador bloqueia ou o usuário recusa a geolocalização.

**Comportamento esperado:**
- o app informa que a permissão foi negada;
- o usuário ainda pode buscar por cidade manualmente.

### Navegador sem suporte a geolocalização

**Cenário:** o navegador não suporta `navigator.geolocation`.

**Comportamento esperado:**
- o app informa que o navegador não suporta geolocalização.

### Timeout na localização

**Cenário:** a localização demora para responder.

**Comportamento esperado:**
- o app exibe mensagem informando que a localização demorou para responder.

### Nova busca após erro anterior

**Cenário:** o usuário faz uma nova busca depois de uma falha.

**Comportamento esperado:**
- o app continua funcional;
- a nova busca substitui o estado anterior sem quebrar a interface.

## 5. Regras de comportamento esperado

- A Forecast API deve ser chamada sempre com `latitude` e `longitude`.
- A Geocoding API deve ser chamada antes da Forecast API quando a busca for por cidade.
- O app nunca deve buscar clima diretamente pelo nome da cidade na Forecast API.
- O app deve validar a entrada antes de chamar a API.
- O app deve exibir mensagens de erro claras para o usuário.
- O app deve validar a estrutura da resposta antes de renderizar os dados.
- O app deve informar a origem da consulta: `busca por cidade` ou `localizacao atual`.
