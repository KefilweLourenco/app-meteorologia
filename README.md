# App Meteorologia

Aplicativo web de previsao do tempo desenvolvido com **React** e **Vite**, com foco em acessibilidade real, design responsivo e experiencia de uso.

O projeto usa a **API Open-Meteo** para consultar o clima atual e a previsao dos proximos dias. A pessoa usuaria pode pesquisar uma cidade pelo nome, escolher uma sugestao de cidade, usar a localizacao atual do navegador ou buscar por voz.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-1F2937?style=for-the-badge&logo=vitest&logoColor=6E9F18)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-121013?style=for-the-badge&logo=github&logoColor=white)

## Acesse a página

[Ver aplicacao publicada](https://kefilwelourenco.github.io/app-meteorologia/)

## Demonstracao

https://github.com/user-attachments/assets/ac959305-a89f-42de-ab6e-d37802cbabcd

## Funcionalidades

- buscar clima pelo nome da cidade;
- receber sugestoes de cidades durante a digitacao, navegaveis por teclado;
- usar a localizacao atual do navegador;
- buscar por voz (Web Speech API nativa, sem dependencia externa) — a busca acontece automaticamente ao reconhecer a fala;
- ouvir a previsao em voz alta (ativavel no painel de preferencias);
- exibir temperatura atual, sensacao termica, chance de chuva, umidade e vento em chips compactos;
- mostrar previsao dos proximos dias com icone por condicao do tempo;
- secao "Clima na pratica" com recomendacoes para rotina (roupa do dia, lavar roupa, pele ressecada, mosquitos, vitamina D e mobilidade urbana), com titulo e texto adaptados a cidade pesquisada;
- painel de preferencias de acessibilidade com 7 controles independentes: aumentar fonte, alto contraste, tema (claro/escuro/automatico), reduzir animacoes, ler previsao em voz alta, destacar foco do teclado e linguagem simplificada — cada um salvo separadamente e sem afetar os outros;
- tema escuro e alto contraste tambem automaticos, respeitando as preferencias do sistema operacional (`prefers-color-scheme` e `prefers-contrast`);
- skip link para pular direto ao conteudo principal;
- layouts especificos por tamanho de tela (nao e so encolher: notebook/tablet paisagem, tablet retrato, celular grande e celular pequeno reorganizam os grids de forma diferente);
- tratar erros, como cidade invalida, falha na API ou permissao de localizacao/microfone negada, com mensagens especificas por causa.

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

### Testar em um celular real

Para abrir o app em um celular na mesma rede Wi-Fi (sem precisar publicar nada):

```bash
npm run dev -- --host
```

O terminal mostra uma URL `Network` (ex.: `http://192.168.x.x:5173/`) — abra essa URL no navegador do celular, com os dois dispositivos na mesma rede.

## Gerar build de producao

```bash
npm run build
```

## Executar testes

```bash
npm run test
```

## Deploy

O deploy para o GitHub Pages e automatico via GitHub Actions (`.github/workflows/pages.yml`): todo push na branch `main` gera o build e publica o conteudo de `dist/`.

## Documentacao complementar

- [Acessibilidade](./docs/acessibilidade.md)
- [Casos de teste](./docs/casos-de-teste.md)
- [Implementacao da secao Clima na pratica](./docs/implementacao-clima-na-pratica.md)
- [Implementacao da melhoria de cache](./docs/implementacao-cache.md)
- [Testes da melhoria de cache](./docs/testes-cache.md)
- [Prompt TRACI e analise do projeto](./docs/traci-e-analise.md)

## Relacao com a Generation Brasil

Este projeto foi desenvolvido como pratica de front-end na **Generation Brasil**, aplicando consumo de API, componentizacao, responsividade, tratamento de erros, testes automatizados, melhoria de cache, acessibilidade e deploy com GitHub Pages. A interface e a camada de acessibilidade passaram por uma refatoracao completa como aprofundamento pessoal do projeto, com foco em UX, design responsivo e WCAG 2.2.
