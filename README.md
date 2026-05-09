# App Meteorologia

Aplicativo web de meteorologia desenvolvido em React, com consumo da API Open-Meteo para consulta do clima atual e previsão dos próximos dias. O projeto permite pesquisa por cidade e também oferece a opção de usar a localização atual do usuário, mediante permissão do navegador.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## Link do projeto

[Acessar aplicação publicada](https://kefilwelourenco.github.io/app-meteorologia/)

## Demonstração em vídeo

- [Vídeo da versão mobile](./public/videos/demo-mobile.mp4)
- [Vídeo da versão desktop](./public/videos/demo-desktop.mp4)

## Funcionalidades

- Busca do clima pelo nome da cidade.
- Consulta automática com base na localização atual do usuário.
- Exibição de temperatura atual, sensação térmica, umidade e velocidade do vento.
- Previsão dos próximos dias.
- Identificação da origem da consulta: cidade pesquisada ou localização atual.
- Interface responsiva para desktop e mobile.

## Permissão de localização

Para usar a funcionalidade de localização em tempo real, é importante verificar se o navegador tem permissão para acessar a localização do dispositivo.

## Estrutura do projeto

```text
app-meteorologia/
├── public/
│   └── videos/
│       ├── demo-desktop.mp4
│       └── demo-mobile.mp4
├── src/
│   ├── componentes/
│   │   └── CartaoClima.jsx
│   ├── servicos/
│   │   └── apiClima.js
│   ├── utilitarios/
│   │   └── formatadores.js
│   ├── App.jsx
│   ├── estilos.css
│   └── main.jsx
├── .github/
│   └── workflows/
│       └── pages.yml
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Como executar localmente

```bash
npm install
npm run dev
```

Depois, abra o endereço exibido no terminal, normalmente:

```bash
http://localhost:5173/
```

## Build de produção

```bash
npm run build
```

## Publicação

Este projeto está configurado para publicação no GitHub Pages com GitHub Actions.

## Relação com a Generation Brasil

Este projeto representa minha experiência prática na Generation Brasil, aplicando conceitos de desenvolvimento front-end, organização de componentes, consumo de API, responsividade, versionamento e deploy.

Além da funcionalidade principal de consulta de clima, o projeto também demonstra evolução incremental de requisitos, preocupação com experiência do usuário e integração entre interface, dados externos e publicação web.
