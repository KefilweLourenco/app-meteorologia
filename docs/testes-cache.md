# Testes da melhoria de cache

## Objetivo

Validar a melhoria de cache adicionada ao servico `apiClima.js`, garantindo que o app continue funcionando corretamente e que o uso de `sessionStorage` nao quebre o fluxo atual.

## O que deve ser validado

### 1. Busca por cidade com cache

**Cenario:** a pessoa usuaria pesquisa uma cidade pela primeira vez.

**Comportamento esperado:**
- o app chama a Geocoding API;
- salva o resultado no `sessionStorage`.

**Segunda execucao da mesma busca:**
- o app deve retornar o valor em cache;
- nao deve fazer nova chamada para a API.

## 2. Busca de previsao com cache

**Cenario:** o app busca a previsao usando latitude e longitude pela primeira vez.

**Comportamento esperado:**
- a Forecast API e chamada normalmente;
- a resposta e salva no `sessionStorage`.

**Segunda execucao com as mesmas coordenadas:**
- o app deve reutilizar o dado salvo;
- nao deve chamar a Forecast API novamente.

## 3. Cache das sugestoes

**Cenario:** a pessoa digita o mesmo inicio de cidade mais de uma vez.

**Comportamento esperado:**
- a primeira consulta chama a Geocoding API;
- a segunda consulta reutiliza as sugestoes salvas, quando ainda estiverem validas.

## 4. Expiracao do cache

**Cenario:** o tempo de validade do cache expira.

**Comportamento esperado:**
- o item salvo deve ser ignorado;
- a API deve ser chamada novamente;
- o valor novo deve substituir o cache antigo.

## 5. Navegador sem sessionStorage

**Cenario:** o ambiente nao possui `sessionStorage`.

**Comportamento esperado:**
- o app continua funcionando normalmente;
- as buscas acontecem pela API sem depender do cache.

## 6. Erro ao salvar no cache

**Cenario:** ocorre falha ao salvar no `sessionStorage`.

**Comportamento esperado:**
- o app nao deve quebrar;
- a resposta da API ainda deve ser retornada a pessoa usuaria.

## 7. Erro ao ler o cache

**Cenario:** o valor salvo no cache esta corrompido ou invalido.

**Comportamento esperado:**
- o app ignora o valor invalido;
- faz a chamada normal para a API.

## Como testar manualmente

1. Pesquisar uma cidade valida.
2. Pesquisar a mesma cidade novamente.
3. Confirmar que a segunda busca responde mais rapido.
4. Fazer o mesmo teste com sugestoes de cidades.
5. Fazer o mesmo teste com a localizacao atual ou com as mesmas coordenadas.
6. Limpar o `sessionStorage` e repetir a busca.
7. Esperar o tempo de expiracao e repetir a busca.

## Resultado esperado

O cache deve melhorar o desempenho em buscas repetidas, sem alterar o comportamento funcional do aplicativo e sem comprometer a integracao correta com a Open-Meteo.
