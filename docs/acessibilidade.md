# Acessibilidade

Este documento resume as melhorias de acessibilidade aplicadas no app de meteorologia com foco em leitura, compreensao e autonomia.

## Intencao

As melhorias foram pensadas para tornar a interface mais previsivel, legivel e respeitosa para diferentes formas de perceber, compreender e navegar. A proposta segue principios de desenho universal: a tela foi refinada para ficar melhor para todo mundo.

A referencia humana por tras dessas decisoes considera uma experiencia pratica com tecnologia assistiva e autonomia, inspirada por vivências em acessibilidade ao decorrer das minhas experiências profissionais. Isso influenciou escolhas de linguagem mais clara, hierarquia visual mais estavel e maior cuidado com texto, foco, contraste e previsibilidade.

## Melhorias feitas

### Tipografia e legibilidade

- pilha de fontes sans-serif mais segura, usando `system-ui`, `Segoe UI`, `Roboto`, `Arial` e `Verdana`;
- tamanhos minimos mais confortaveis para texto, labels, botoes e mensagens;
- temperatura principal com destaque entre `2.5rem` e `4rem`;
- cidade e localizacao com destaque maior e leitura mais facil;
- line-height mais generoso para reduzir cansaco visual;
- uso de `rem` e `clamp()` para melhorar escalabilidade.

### Hierarquia visual

A ordem principal da informacao ficou mais previsivel:

1. localizacao ou cidade;
2. temperatura atual;
3. clima agora;
4. sensacao termica;
5. chance de chuva;
6. umidade do ar;
7. vento;
8. previsao dos proximos dias.

### Linguagem simples

- termos mais diretos, como `Clima agora`, `Chance de chuva`, `Umidade do ar` e `Vento`;
- microexplicacoes curtas em cards importantes;
- mensagens objetivas para erro, sucesso e carregamento;
- menos termos tecnicos desnecessarios.

### Contraste e compreensao visual

- textos secundarios com contraste melhor;
- cards mais arejados e com espacamento consistente;
- mensagens nao dependem apenas de cor;
- estado da interface continua compreensivel mesmo sem interpretar icones.

### Navegacao e autonomia

- foco visivel preservado;
- sugestoes continuam acessiveis por teclado;
- leitor de tela recebe mensagens dinamicas com `aria-live`;
- elementos interativos continuam sendo `button`, `input` e `form`.

### Modo acessivel

Foi criada a classe `.modo-acessivel` e ela ja esta conectada ao botao:

- `Ativar modo acessivel`

Quando ativado, o modo aumenta:

- tamanho da fonte;
- espacamento interno;
- area clicavel dos botoes;
- tamanho dos cards;
- respiracao visual do layout.

## Barreiras reduzidas

Essas mudancas ajudam especialmente:

- pessoas com baixa visao;
- pessoas com deficiencia intelectual;
- pessoas autistas;
- pessoas com dislexia;
- pessoas idosas;
- pessoas com baixa familiaridade digital;
- pessoas que precisam ampliar o conteudo sem quebrar a interface.

## Como testar manualmente

### 1. Leitura geral

- abra a tela em desktop e mobile;
- observe se a cidade aparece claramente antes dos demais dados;
- observe se a temperatura atual se destaca sem competir com outros elementos.

Resultado esperado:

- a leitura fica mais facil;
- a pessoa entende rapidamente onde esta, qual a temperatura e qual o clima agora.

### 2. Navegacao por teclado

- use `Tab` para navegar;
- use `ArrowDown` e `ArrowUp` nas sugestoes;
- use `Enter` para escolher;
- use `Escape` para fechar a lista.

Resultado esperado:

- todos os controles funcionam sem mouse;
- o foco permanece visivel;
- a ordem do teclado acompanha a ordem visual da tela.

### 3. Leitor de tela

- use NVDA, Narrador do Windows ou VoiceOver;
- navegue ate o campo de busca;
- escute as mensagens de erro, sucesso e carregamento;
- escute os cards do resultado.

Resultado esperado:

- o campo tem label claro;
- as mensagens dinamicas sao anunciadas;
- os cards principais fazem sentido mesmo sem apoio visual.

### 4. Zoom em 200%

- no navegador, aumente o zoom ate 200%;
- confira o layout em desktop e em largura reduzida.

Resultado esperado:

- nenhum texto fica cortado;
- os cards nao se sobrepoem;
- os botoes continuam clicaveis;
- a ordem das informacoes continua clara.

### 5. Contraste

- observe textos secundarios, ajuda do campo, mensagens e cards;
- compare legibilidade no fundo claro e no painel branco.

Resultado esperado:

- textos importantes permanecem legiveis;
- informacoes nao somem por usar cinza claro demais.

### 6. Modo acessivel

- clique em `Ativar modo acessivel`;
- observe fonte, espacamento, botoes e cards;
- repita navegacao por teclado e leitura geral.

Resultado esperado:

- a interface fica mais folgada;
- o texto fica mais facil de acompanhar;
- o layout continua estavel e responsivo.

### 7. Movimento reduzido

- ative reducao de movimento no sistema operacional;
- abra o app novamente.

Resultado esperado:

- animacoes e transicoes desnecessarias deixam de ser priorizadas;
- a tela continua funcional e previsivel.
