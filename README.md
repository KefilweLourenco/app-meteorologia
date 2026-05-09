# App Meteorologia

Aplicativo web de previsão do tempo desenvolvido com **React** e **Vite**.

O projeto usa a **API Open-Meteo** para consultar o clima atual e a previsão dos próximos dias. O usuário pode pesquisar uma cidade pelo nome ou usar a localização atual do navegador.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## Acesse o projeto

[Ver aplicação publicada](https://kefilwelourenco.github.io/app-meteorologia/)

## Demonstração

O vídeo abaixo mostra o app funcionando no GitHub Pages:

- busca pela localização atual;
- exibição da cidade encontrada;
- dados atuais do clima;
- previsão dos próximos dias;
- mensagem de erro para cidade inválida.

https://github.com/user-attachments/assets/ca3fb47e-f630-4c01-a768-020679fcab44

## Funcionalidades

- Buscar clima pelo nome da cidade;
- Usar a localização atual do usuário;
- Exibir temperatura atual;
- Exibir sensação térmica;
- Exibir umidade;
- Exibir velocidade do vento;
- Mostrar previsão dos próximos dias;
- Tratar erros, como cidade inválida ou falha na API.

## Como o app usa a API

O app não busca o clima diretamente pelo nome da cidade.

O fluxo funciona assim:

1. O usuário digita o nome de uma cidade.
2. O app consulta a **Geocoding API** da Open-Meteo.
3. A API retorna a **latitude** e a **longitude** da cidade.
4. O app usa essas coordenadas na **Forecast API**.
5. A previsão do tempo é exibida na tela.

Esse fluxo garante que a busca do clima seja feita por coordenadas, como recomendado pela documentação da Open-Meteo.

## Permissão de localização

Para usar a localização atual, o navegador precisa ter permissão para acessar a localização do dispositivo.

Se a permissão for negada, o app mostra uma mensagem de erro para o usuário.

## Estrutura do projeto

```text
app-meteorologia/
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
|-- index.html
|-- package.json
|-- vite.config.js
|-- README.md
```

## Como executar o projeto

Clone o repositório:

git clone https://github.com/KefilweLourenco/app-meteorologia.git

Acesse a pasta do projeto:

cd app-meteorologia

Instale as dependências:

npm install

## Execute o projeto:

npm run dev

Depois, abra no navegador o endereço exibido no terminal. Normalmente:

http://localhost:5173/
Gerar build de produção
npm run build
Prompt usado no framework TRACI

## Tarefa:
Criar uma função que receba o nome de uma cidade, busque latitude e longitude na API de Geocodificação da Open-Meteo e depois consulte a previsão do tempo usando essas coordenadas.

Papel:
Usar JavaScript moderno, React, Fetch API e boas práticas de organização de código.

Público:
O código deve ser amigável para iniciantes, com nomes claros, funções bem separadas e mensagens de erro fáceis de entender.

Criar:
A função deve retornar dados como cidade, temperatura atual, sensação térmica, umidade, vento, descrição do clima e previsão dos próximos dias.

Intenção:
A função deve tratar cidade vazia, cidade inválida, erro de conexão, erro da API e resposta incompleta. A previsão deve ser buscada sempre por latitude e longitude, nunca diretamente pelo nome da cidade.

## Análise da função gerada

A função segue a proposta porque primeiro transforma o nome da cidade em coordenadas usando a Geocoding API.

Depois, usa latitude e longitude para consultar a Forecast API da Open-Meteo.

## O projeto também trata situações como:

campo vazio;
cidade não encontrada;
falha de conexão;
erro retornado pela API;
resposta incompleta;
permissão de localização negada.
Melhorias aplicadas

## Durante o refinamento do código, foram feitas as seguintes melhorias:

correção do parâmetro current na Forecast API;
uso de URLSearchParams para montar a URL com mais segurança;
validação dos dados retornados pela API antes de usá-los;
mensagens de erro mais claras;
separação do código em componentes, serviços e utilitários.
Teste realizado

Teste feito com a cidade São Paulo.

## Fluxo validado:

O usuário informa o nome da cidade.
O app consulta a Geocoding API.
A API retorna latitude e longitude.
O app consulta a Forecast API usando as coordenadas.
O app exibe os dados do clima na tela.

Também foi testado o comportamento com cidade inválida, exibindo mensagem de erro para o usuário.

## Relação com a Generation Brasil

Este projeto foi desenvolvido como prática de front-end na Generation Brasil.

Ele reúne conceitos de:

React;
componentização;
consumo de API;
tratamento de erros;
responsividade;
versionamento com Git e GitHub;
deploy com GitHub Pages.
Publicação

O projeto está publicado no GitHub Pages.
