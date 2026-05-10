# Implementacao da secao Clima na pratica

## Objetivo

Criar uma camada de orientacao pratica sem tirar o foco do app principal de clima.

A secao `Clima na pratica` transforma dados meteorologicos em decisoes curtas para a rotina, com foco especial em deslocamentos urbanos, conforto no dia a dia e leitura acessivel.

## Cards implementados

- Roupa do dia
- Lavar roupa
- Pele ressecada
- Mosquitos
- Vitamina D
- Mobilidade em SP

## Dados usados hoje

Esta versao usa dados reais que ja existem na integracao atual com a Open-Meteo:

- temperatura
- sensacao termica
- chance de chuva
- umidade do ar
- vento
- descricao do clima

Esses dados alimentam interpretacoes do cotidiano. Por isso, a confiabilidade exibida nos cards desta fase e `estimativa`.

## Logica aplicada

### Roupa do dia
- considera temperatura, sensacao termica, chuva e vento
- orienta roupa leve, blusa, casaco e protecao para chuva

### Lavar roupa
- considera chuva, umidade, vento e condicao do ceu
- orienta se a secagem tende a ajudar, atrasar ou pedir area coberta

### Pele ressecada
- usa principalmente umidade do ar
- traz orientacao preventiva e simples, sem linguagem medica

### Mosquitos
- estima tendencia com base em calor e umidade
- usa linguagem responsavel como `pode favorecer`

### Vitamina D
- usa horario do dia e condicao do ceu
- se houver UV no futuro, a logica pode ficar mais precisa
- nao faz orientacao medica e nao indica tempo exato de exposicao

### Mobilidade em SP
- considera chuva, vento, frio e calor
- transforma o clima em orientacao para deslocamentos urbanos
- prioriza recomendacoes realistas para Sao Paulo e regiao metropolitana

## O que ficou preparado para o futuro

Nesta etapa, `Indice UV` e `Qualidade do ar` nao aparecem na tela porque ainda nao ha dados reais integrados.

Integracoes futuras recomendadas:

- API de indice UV por latitude e longitude
- API de qualidade do ar com AQI e poluentes como PM2.5, PM10, O3, NO2 e CO

## Acessibilidade aplicada

- linguagem simples, adulta e respeitosa
- cards com titulo, nivel, descricao e recomendacao
- informacao importante sempre em texto, sem depender so de cor
- responsividade:
  - mobile: 1 coluna
  - tablet: 2 colunas
  - desktop: 3 colunas
- estrutura semantica com `section` e `article`

## Como testar

1. Rode `npm run dev`
2. Busque uma cidade ou use a localizacao atual
3. Verifique se a secao aparece abaixo do cartao principal
4. Teste clima quente, frio e chuvoso para observar as mudancas de nivel
5. Teste o layout em mobile, tablet e desktop
