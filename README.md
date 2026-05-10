# App Meteorologia

Aplicativo web de previsao do tempo desenvolvido com **React** e **Vite**.

O projeto usa a **API Open-Meteo** para consultar o clima atual e a previsao dos proximos dias. A pessoa usuaria pode pesquisar uma cidade pelo nome, escolher uma sugestao de cidade ou usar a localizacao atual do navegador.

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

https://github.com/user-attachments/assets/ca3fb47e-f630-4c01-a768-020679fcab44

## Funcionalidades

- buscar clima pelo nome da cidade;
- receber sugestoes de cidades durante a digitacao;
- usar a localizacao atual do navegador;
- exibir temperatura atual;
- exibir clima agora em linguagem simples;
- exibir sensacao termica;
- exibir chance de chuva;
- exibir umidade do ar;
- exibir vento;
- mostrar previsao dos proximos dias;
- ativar modo acessivel com fonte maior e mais espacamento;
- tratar erros, como cidade invalida ou falha na API.

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

## Executar testes

```bash
npm run test
```

## Documentacao complementar

- [Acessibilidade](./docs/acessibilidade.md)
- [Casos de teste](./docs/casos-de-teste.md)
- [Implementacao da secao Clima na pratica](./docs/implementacao-clima-na-pratica.md)
- [Implementacao da melhoria de cache](./docs/implementacao-cache.md)
- [Testes da melhoria de cache](./docs/testes-cache.md)
- [Prompt TRACI e analise do projeto](./docs/traci-e-analise.md)

## Relacao com a Generation Brasil

Este projeto foi desenvolvido como pratica de front-end na **Generation Brasil**, aplicando consumo de API, componentizacao, responsividade, tratamento de erros, testes automatizados, melhoria de cache, acessibilidade e deploy com GitHub Pages.
