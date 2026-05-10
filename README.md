# App Meteorologia

Aplicativo web de previsao do tempo desenvolvido com **React** e **Vite**.

O projeto usa a **API Open-Meteo** para consultar o clima atual e a previsao dos proximos dias. O usuario pode pesquisar uma cidade pelo nome ou usar a localizacao atual do navegador.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-1F2937?style=for-the-badge&logo=vitest&logoColor=6E9F18)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## Acesse o projeto

[Ver aplicacao publicada](https://kefilwelourenco.github.io/app-meteorologia/)

## Demonstracao

O video abaixo mostra o app funcionando no GitHub Pages:

- busca pela localizacao atual;
- exibicao da cidade encontrada;
- dados atuais do clima;
- previsao dos proximos dias;
- mensagem de erro para cidade invalida.

https://github.com/user-attachments/assets/ca3fb47e-f630-4c01-a768-020679fcab44

## Funcionalidades

- Buscar clima pelo nome da cidade;
- Usar a localizacao atual do usuario;
- Exibir temperatura atual;
- Exibir sensacao termica;
- Exibir umidade;
- Exibir velocidade do vento;
- Mostrar previsao dos proximos dias;
- Tratar erros, como cidade invalida ou falha na API.

## Como o app usa a API

O app nao busca o clima diretamente pelo nome da cidade.

O fluxo funciona assim:

1. O usuario digita o nome de uma cidade.
2. O app consulta a **Geocoding API** da Open-Meteo.
3. A API retorna a **latitude** e a **longitude** da cidade.
4. O app usa essas coordenadas na **Forecast API**.
5. A previsao do tempo e exibida na tela.

Esse fluxo garante que a busca do clima seja feita por coordenadas, como recomendado pela documentacao da Open-Meteo.

## Permissao de localizacao

Para usar a localizacao atual, o navegador precisa ter permissao para acessar a localizacao do dispositivo.

Se a permissao for negada, o app mostra uma mensagem de erro para o usuario.

## Estrutura do projeto

```text
app-meteorologia/
|-- docs/
|   |-- casos-de-teste.md
|-- public/
|   |-- videos/
|       |-- demo-desktop.mp4
|       |-- demo-mobile.mp4
|-- src/
|   |-- componentes/
|   |   |-- CartaoClima.jsx
|   |-- servicos/
|   |   |-- apiClima.js
|   |   |-- apiClima.test.js
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

## Como executar o projeto

Clone o repositorio:

```bash
git clone https://github.com/KefilweLourenco/app-meteorologia.git
```

Acesse a pasta do projeto:

```bash
cd app-meteorologia
```

Instale as dependencias:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Depois, abra no navegador o endereco exibido no terminal. Normalmente:

```bash
http://localhost:5173/
```

## Gerar build de producao

```bash
npm run build
```

## Rodar testes automatizados

```bash
npm run test
```

## Documentacao complementar

- [Casos de teste](./docs/casos-de-teste.md)

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
- criacao de testes automatizados com Vitest e mock de `fetch`.

## Teste realizado

Teste feito com a cidade **Sao Paulo**.

Fluxo validado:

1. O usuario informa o nome da cidade.
2. O app consulta a Geocoding API.
3. A API retorna latitude e longitude.
4. O app consulta a Forecast API usando as coordenadas.
5. O app exibe os dados do clima na tela.

Tambem foi testado o comportamento com cidade invalida, exibindo mensagem de erro para o usuario.

## Relacao com a Generation Brasil

Este projeto foi desenvolvido como pratica de front-end na **Generation Brasil**.

Ele reune conceitos de:

- React;
- componentizacao;
- consumo de API;
- tratamento de erros;
- responsividade;
- versionamento com Git e GitHub;
- deploy com GitHub Pages;
- testes automatizados com Vitest.

## Publicacao

O projeto esta publicado no **GitHub Pages**.