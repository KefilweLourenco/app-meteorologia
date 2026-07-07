# App Meteorologia

Aplicativo web de previsão do tempo desenvolvido com **React** e **Vite**, com foco em acessibilidade real, design responsivo e experiência de uso.

O projeto usa a **API Open-Meteo** para consultar o clima atual e a previsão dos próximos dias. A pessoa usuária pode pesquisar uma cidade pelo nome, escolher uma sugestão de cidade, usar a localização atual do navegador ou buscar por voz.

## Tecnologias utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-1F2937?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-111827?style=for-the-badge&logo=html5&logoColor=E34F26)
![CSS3](https://img.shields.io/badge/CSS3-0F172A?style=for-the-badge&logo=css3&logoColor=1572B6)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-0EA5E9?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-1F2937?style=for-the-badge&logo=vitest&logoColor=6E9F18)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Acesse a página

[Ver aplicação publicada](https://app-meteorologia-iota.vercel.app/)

## Funcionalidades

- buscar clima pelo nome da cidade;
- receber sugestões de cidades durante a digitação, navegáveis por teclado;
- usar a localização atual do navegador;
- buscar por voz (Web Speech API nativa, sem dependência externa) — a busca acontece automaticamente ao reconhecer a fala;
- ouvir a previsão em voz alta e ouvir os insights de "Clima na prática" em voz alta (ativável no painel de preferências);
- exibir temperatura atual, sensação térmica, chance de chuva, umidade e vento em chips compactos;
- mostrar previsão dos próximos dias com ícone por condição do tempo;
- seção "Clima na prática" com recomendações para rotina (roupa do dia, lavar roupa, pele ressecada, mosquitos, vitamina D e mobilidade urbana), com título e texto adaptados à cidade pesquisada;
- painel de preferências de acessibilidade com 7 controles independentes: tamanho da fonte (padrão/grande/muito grande), alto contraste, tema (claro/escuro/automático), reduzir animações, ler previsão em voz alta, destacar foco do teclado e linguagem simplificada — cada um salvo separadamente e sem afetar os outros;
- alto contraste real (preto/branco quase puro, sem gradiente nem desfoque) e tema escuro, automáticos via preferências do sistema (`prefers-color-scheme` e `prefers-contrast`) ou manuais pelo painel;
- skip link para pular direto ao conteúdo principal;
- layouts específicos por tamanho de tela (não é só encolher: notebook/tablet paisagem, tablet retrato, celular grande e celular pequeno reorganizam os grids de forma diferente);
- tratar erros, como cidade inválida, falha na API ou permissão de localização/microfone negada, com mensagens específicas por causa.

## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/KefilweLourenco/app-meteorologia.git
```

Acesse a pasta do projeto:

```bash
cd app-meteorologia
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Depois, abra no navegador o endereço exibido no terminal. Normalmente:

```bash
http://localhost:5173/
```

### Testar em um celular real

Para abrir o app em um celular na mesma rede Wi-Fi (sem precisar publicar nada):

```bash
npm run dev -- --host
```

O terminal mostra uma URL `Network` (ex.: `http://192.168.x.x:5173/`) — abra essa URL no navegador do celular, com os dois dispositivos na mesma rede.

## Gerar build de produção

```bash
npm run build
```

## Executar testes

```bash
npm run test
```

## Deploy

O deploy oficial é feito pela **Vercel**, conectada ao repositório: todo push na branch `main` gera o build e publica automaticamente em [app-meteorologia-iota.vercel.app](https://app-meteorologia-iota.vercel.app/).

Também existe um workflow de GitHub Actions (`.github/workflows/pages.yml`) publicando em paralelo no GitHub Pages via branch `gh-pages`. Esse link é mantido como alternativo, mas pode ficar desatualizado — o serviço de deploy do GitHub Pages tem apresentado falhas intermitentes ("Deployment failed, try again later") sem correção da parte deles até o momento.

**Nota de configuração:** como o workflow do GitHub Pages força um commit novo na branch `gh-pages` a cada deploy, a Vercel tenta criar automaticamente um deploy de preview para essa branch também — e falha, já que ela só contém os arquivos já compilados (sem `package.json`). Para evitar isso, em **Vercel → Project Settings → Git → Ignored Build Step**, use:

```bash
if [ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]; then exit 0; else exit 1; fi
```

## Documentação complementar

- [Acessibilidade](./docs/acessibilidade.md)
- [Casos de teste](./docs/casos-de-teste.md)
- [Implementação da seção Clima na prática](./docs/implementacao-clima-na-pratica.md)
- [Implementação da melhoria de cache](./docs/implementacao-cache.md)
- [Testes da melhoria de cache](./docs/testes-cache.md)
- [Prompt TRACI e análise do projeto](./docs/traci-e-analise.md)

## Relação com a Generation Brasil

Este projeto foi desenvolvido como prática de front-end na **Generation Brasil**, aplicando consumo de API, componentização, responsividade, tratamento de erros, testes automatizados, melhoria de cache, acessibilidade e deploy. A interface e a camada de acessibilidade passaram por uma refatoração completa como aprofundamento pessoal do projeto, com foco em UX, design responsivo e WCAG 2.2.

---

Última atualização: 07/07/2026 às 14h18.
