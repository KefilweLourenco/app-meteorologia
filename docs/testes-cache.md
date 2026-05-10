# Testes da melhoria de cache

## Objetivo

Validar a melhoria de cache adicionada ao serviço `apiClima.js`, garantindo que o app continue funcionando corretamente e que o uso de `sessionStorage` não quebre o fluxo atual.

## O que deve ser validado

### 1. Busca por cidade com cache

**Cenário:** o usuário pesquisa uma cidade pela primeira vez.

**Comportamento esperado:**
- o app chama a Geocoding API;
- salva o resultado no `sessionStorage`.

**Segunda execução da mesma busca:**
- o app deve retornar o valor em cache;
- não deve fazer nova chamada para a API.

## 2. Busca de previsão com cache

**Cenário:** o app busca a previsão usando latitude e longitude pela primeira vez.

**Comportamento esperado:**
- a Forecast API é chamada normalmente;
- a resposta é salva no `sessionStorage`.

**Segunda execução com as mesmas coordenadas:**
- o app deve reutilizar o dado salvo;
- não deve chamar a Forecast API novamente.

## 3. Expiração do cache

**Cenário:** o tempo de validade do cache expira.

**Comportamento esperado:**
- o item salvo deve ser ignorado;
- a API deve ser chamada novamente;
- o valor novo deve substituir o cache antigo.

## 4. Navegador sem sessionStorage

**Cenário:** o ambiente não possui `sessionStorage`.

**Comportamento esperado:**
- o app continua funcionando normalmente;
- as buscas acontecem pela API sem depender do cache.

## 5. Erro ao salvar no cache

**Cenário:** ocorre falha ao salvar no `sessionStorage`.

**Comportamento esperado:**
- o app não deve quebrar;
- a resposta da API ainda deve ser retornada ao usuário.

## 6. Erro ao ler o cache

**Cenário:** o valor salvo no cache está corrompido ou inválido.

**Comportamento esperado:**
- o app ignora o valor inválido;
- faz a chamada normal para a API.

## Como testar manualmente

1. Pesquisar uma cidade válida.
2. Pesquisar a mesma cidade novamente.
3. Confirmar que a segunda busca responde mais rápido.
4. Fazer o mesmo teste com a localização atual ou com as mesmas coordenadas.
5. Limpar o `sessionStorage` e repetir a busca.
6. Esperar o tempo de expiração e repetir a busca.

## Resultado esperado

O cache deve melhorar o desempenho em buscas repetidas, sem alterar o comportamento funcional do aplicativo e sem comprometer a integração correta com a Open-Meteo.
