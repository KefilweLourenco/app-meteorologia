# App Meteorologia

Aplicativo de meteorologia desenvolvido com React e Vite, consumindo a API publica da Open-Meteo.

## Recursos do projeto

- busca por nome da cidade
- consulta do clima atual
- previsao dos proximos dias
- uso da localizacao atual do navegador com permissao do usuario

## Estrutura do projeto

- `index.html`: ponto de entrada da aplicacao
- `src/App.jsx`: componente principal
- `src/componentes/CartaoClima.jsx`: exibicao do resultado do clima
- `src/servicos/apiClima.js`: comunicacao com a Open-Meteo
- `src/utilitarios/formatadores.js`: formatacao dos dados
- `src/estilos.css`: estilos globais da interface

## Como executar

```bash
npm install
npm run dev
```

## Como gerar a versao final

```bash
npm run build
```

A pasta `dist` gerada pelo Vite pode ser publicada no GitHub Pages.