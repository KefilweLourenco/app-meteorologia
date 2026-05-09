# App Meteorologia

Aplicativo web de meteorologia desenvolvido em React, com consumo da API Open-Meteo para consulta do clima atual e previsao dos proximos dias. O projeto permite pesquisa por cidade e tambem oferece a opcao de usar a localizacao atual do usuario, mediante permissao do navegador.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## Link do projeto

[Acessar aplicacao publicada](https://kefilwelourenco.github.io/app-meteorologia/)

## Demonstracao em video

- [Video da versao mobile](./public/videos/demo-mobile.mp4)
- [Video da versao desktop](./public/videos/demo-desktop.mp4)

## Funcionalidades

- Busca do clima pelo nome da cidade.
- Consulta automatica com base na localizacao atual do usuario.
- Exibicao de temperatura atual, sensacao termica, umidade e velocidade do vento.
- Previsao dos proximos dias.
- Identificacao da origem da consulta: cidade pesquisada ou localizacao atual.
- Interface responsiva para desktop e mobile.

## Permissao de localizacao

Para usar a funcionalidade de localizacao em tempo real, e importante verificar se o navegador tem permissao para acessar a localizacao do dispositivo.

## Estrutura do projeto

```text
app-meteorologia/
|-- public/
|   |-- videos/
|       |-- demo-desktop.mp4
|       |-- demo-mobile.mp4
|-- src/
|   |-- componentes/
|   |   |-- CartaoClima.jsx
|   |-- servicos/
|   |   |-- apiClima.js
|   |-- utilitarios/
|   |   |-- formatadores.js
|   |-- App.jsx
|   |-- estilos.css
|   |-- main.jsx
|-- .github/
|   |-- workflows/
|       |-- pages.yml
|-- index.html
|-- package.json
|-- vite.config.js
|-- README.md
```

## Como executar localmente

```bash
npm install
npm run dev
```

Depois, abra o endereco exibido no terminal, normalmente:

```bash
http://localhost:5173/
```

## Build de producao

```bash
npm run build
```

## Publicacao

Este projeto esta configurado para publicacao no GitHub Pages com GitHub Actions.

## Relacao com a Generation Brasil

Este projeto representa minha experiencia pratica na Generation Brasil, aplicando conceitos de desenvolvimento front-end, organizacao de componentes, consumo de API, responsividade, versionamento e deploy.

Alem da funcionalidade principal de consulta de clima, o projeto tambem demonstra evolucao incremental de requisitos, preocupacao com experiencia do usuario e integracao entre interface, dados externos e publicacao web.

## Prompt utilizado com framework TRACI

**Tarefa:** Criar uma funcao que receba o nome de uma cidade, consulte a API de Geocodificacao da Open-Meteo para obter latitude e longitude, e depois consulte a API de previsao do tempo usando essas coordenadas.

**Papel:** Usar JavaScript moderno, fetch API, React e boas praticas de organizacao em funcoes assincronas.

**Publico:** Codigo amigavel para iniciantes, com nomes claros, separacao de responsabilidades e mensagens de erro compreensiveis.

**Criar:** A funcao deve retornar um objeto com cidade, origem da consulta, temperatura atual, sensacao termica, umidade, velocidade do vento, descricao do clima e previsao dos proximos dias.

**Intencao:** A funcao deve tratar cidade vazia, cidade invalida, erro de conexao, erro da API e resposta incompleta. A previsao deve ser buscada sempre por latitude e longitude, nunca diretamente pelo nome da cidade.

## Analise da funcao gerada

A funcao segue a instrucao principal porque primeiro usa a Geocoding API para transformar o nome da cidade em latitude e longitude. Depois usa essas coordenadas no endpoint Forecast da Open-Meteo.

Foram tratados:

- entrada vazia;
- cidade nao encontrada;
- falha de conexao;
- erro retornado pela API;
- resposta incompleta da API;
- permissao negada de geolocalizacao, quando aplicavel.

## Refinamento aplicado

Melhorias aplicadas no projeto:

- correcao do parametro `current` na Forecast API;
- uso de `URLSearchParams` para montar URLs com mais seguranca;
- validacao de `dados.current` e `dados.daily` antes do uso;
- validacao da estrutura da previsao diaria;
- mensagens de erro mais claras para o usuario;
- organizacao do fluxo entre geocodificacao, previsao e interface React.

## Teste final

Teste realizado com a cidade: Sao Paulo.

Fluxo validado:

1. O usuario digita o nome da cidade.
2. O app consulta a Geocoding API da Open-Meteo.
3. A API retorna latitude e longitude.
4. O app usa essas coordenadas para consultar a Forecast API.
5. O app exibe temperatura atual, sensacao termica, umidade, vento e previsao dos proximos dias.

Resultado esperado:

O app deve exibir os dados climaticos sem erro e sem buscar clima diretamente pelo nome da cidade.