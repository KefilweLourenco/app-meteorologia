# Prompt TRACI e análise do projeto

## Prompt usado no framework TRACI

**Tarefa:** Criar uma funcao que receba o nome de uma cidade, busque latitude e longitude na API de Geocodificacao da Open-Meteo e depois consulte a previsao do tempo usando essas coordenadas.

**Papel:** Usar JavaScript moderno, React, Fetch API e boas praticas de organizacao de codigo.

**Publico:** O codigo deve ser amigavel para iniciantes, com nomes claros, funcoes bem separadas e mensagens de erro faceis de entender.

**Criar:** A funcao deve retornar dados como cidade, temperatura atual, sensacao termica, umidade, vento, descricao do clima e previsao dos proximos dias.

**Intencao:** A funcao deve tratar cidade vazia, cidade invalida, erro de conexao, erro da API e resposta incompleta. A previsao deve ser buscada sempre por latitude e longitude, nunca diretamente pelo nome da cidade.

## Analise da funcao gerada

A funcao segue a proposta porque primeiro transforma o nome da cidade em coordenadas usando a Geocoding API.

Depois, usa latitude e longitude para consultar a Forecast API da Open-Meteo.

O projeto tambem trata situacoes como:

- campo vazio;
- cidade nao encontrada;
- falha de conexao;
- erro retornado pela API;
- resposta incompleta;
- permissao de localizacao negada.

## Melhorias aplicadas

Durante o refinamento do codigo, foram feitas as seguintes melhorias:

- correcao do parametro `current` na Forecast API;
- uso de `URLSearchParams` para montar a URL com mais seguranca;
- validacao dos dados retornados pela API antes de usa-los;
- mensagens de erro mais claras;
- separacao do codigo em componentes, servicos e utilitarios;
- criacao de testes automatizados com Vitest e mock de `fetch`;
- implementacao de cache em `sessionStorage` para reduzir chamadas repetidas a API.

## Teste realizado

Teste feito com a cidade **Sao Paulo**.

Fluxo validado:

1. O usuario informa o nome da cidade.
2. O app consulta a Geocoding API.
3. A API retorna latitude e longitude.
4. O app consulta a Forecast API usando as coordenadas.
5. O app exibe os dados do clima na tela.

Tambem foi testado o comportamento com cidade invalida, exibindo mensagem de erro para o usuario.
