# Acessibilidade

Este documento resume as melhorias de acessibilidade aplicadas no app de meteorologia e como validar essas decisoes manualmente.

## Intencao do projeto

As melhorias foram pensadas para ampliar autonomia, clareza e previsibilidade de uso. A proposta segue a ideia de desenho universal: a interface nao foi "simplificada porque alguem nao entende", e sim ajustada para respeitar diferentes formas de perceber, navegar, aprender e usar tecnologia.

Como referencia humana, a proposta considera uma experiencia pratica com tecnologia assistiva e autonomia, inspirada por vivencias no Instituto Jo Clemente. Isso orientou escolhas mais objetivas, menos ambiguidade nas mensagens e mais apoio ao uso por teclado e leitor de tela.

## Barreiras reduzidas

As mudancas buscaram reduzir barreiras para:

- pessoas cegas ou com baixa visao;
- pessoas que usam leitor de tela;
- pessoas autistas ou neurodivergentes;
- pessoas com deficiencia intelectual;
- pessoas com baixa familiaridade digital;
- pessoas que navegam sem mouse;
- pessoas que precisam compreender a interface sem depender de cor, som ou memoria.

## Melhorias aplicadas

### Estrutura semantica

- uso de `header` para a apresentacao;
- uso de `main` para o conteudo principal;
- uso de `section` para agrupar busca e resultado;
- uso de `form`, `label`, `input` e `button` com funcao clara;
- manutencao de botoes reais para acoes clicaveis.

### Formulario mais claro

- campo de busca com `label` visivel;
- texto de ajuda logo abaixo do campo;
- orientacao curta sobre sugestoes, setas do teclado e `Enter`;
- ordem visual coerente com a ordem de navegacao por `Tab`.

### Leitores de tela

- mensagens dinamicas com `aria-live`;
- erro com `role="alert"` e anuncio mais imediato;
- carregamento e sucesso com anuncio educado;
- campo configurado como `combobox`;
- lista de sugestoes configurada como `listbox`;
- item ativo informado com `aria-activedescendant`;
- resultado com rotulos mais descritivos nos blocos principais.

### Navegacao por teclado

- `Tab` percorre os elementos na ordem visual;
- `ArrowDown` e `ArrowUp` navegam nas sugestoes;
- `Enter` escolhe a sugestao ativa;
- `Escape` fecha a lista de sugestoes;
- foco visivel reforcado em campo, botoes e sugestoes.

### Clareza sem infantilizacao

- mensagens diretas e respeitosas;
- prefixos como `Erro:` e `Sucesso:` para facilitar percepcao rapida;
- menos linguagem tecnica desnecessaria;
- instrucoes curtas, sem tom infantil.

### Reducao de sobrecarga visual

- organizacao em blocos previsiveis;
- espaco respirando entre secoes;
- caixa visual para mensagens importantes;
- hierarquia visual mais clara entre busca, retorno atual e previsao.

### Contraste, texto e significado

- contraste reforcado em textos auxiliares e mensagens;
- foco visivel sem remover contorno padrao sem alternativa;
- informacoes importantes nao dependem apenas de cor;
- icones acompanham texto visivel, sem carregar o significado sozinhos.

### Movimento reduzido

- suporte a `prefers-reduced-motion`;
- animacoes e transicoes desativadas quando o usuario prefere menos movimento;
- layout mantido estavel, sem piscadas ou mudancas bruscas.

### Pessoas surdas ou com deficiencia auditiva

- nenhuma mensagem importante depende de som;
- todas as respostas principais aparecem em texto;
- se houver videos de demonstracao na documentacao, recomenda-se incluir um pequeno resumo textual do que o video mostra.

## Como isso melhora autonomia

Essas mudancas ajudam o usuario a:

- entender o que fazer sem depender de tentativa e erro;
- perceber quando o sistema esta carregando, falhou ou concluiu uma acao;
- navegar sem mouse;
- escolher sugestoes sem perder contexto;
- usar leitor de tela com mais previsibilidade;
- interpretar a interface sem depender apenas de cor ou simbolo.

## Como testar manualmente

### 1. Teste de teclado

- abrir o campo da cidade com `Tab`;
- digitar duas letras;
- usar `ArrowDown` e `ArrowUp` nas sugestoes;
- apertar `Enter` para escolher;
- apertar `Escape` para fechar a lista.

Resultado esperado:

- todos os elementos interativos funcionam sem mouse;
- o foco fica visivel o tempo todo;
- a ordem do `Tab` acompanha a ordem visual.

### 2. Teste de mensagens

- clicar em buscar com o campo vazio;
- negar permissao de localizacao;
- digitar uma cidade invalida;
- fazer uma busca valida.

Resultado esperado:

- o sistema informa carregamento, erro e sucesso com texto claro;
- a pessoa entende o que aconteceu e o que pode fazer em seguida.

### 3. Teste com leitor de tela

- usar NVDA, Narrador do Windows ou VoiceOver;
- navegar ate o campo da cidade;
- abrir a lista de sugestoes;
- mover entre as sugestoes com setas;
- observar a leitura das mensagens dinamicas.

Resultado esperado:

- o campo e anunciado com contexto suficiente;
- as sugestoes sao lidas de forma compreensivel;
- mensagens de erro, sucesso e carregamento sao anunciadas.

### 4. Teste de contraste e foco

- observar textos auxiliares;
- observar mensagens de erro e sucesso;
- navegar com teclado entre botoes e sugestoes.

Resultado esperado:

- textos permanecem legiveis no fundo escolhido;
- o foco pode ser percebido sem esforco;
- erro e sucesso nao dependem apenas da cor para serem entendidos.

### 5. Teste de movimento reduzido

- ativar reducao de movimento no sistema operacional;
- abrir novamente o app;
- navegar pela interface.

Resultado esperado:

- a interface evita transicoes e movimentos desnecessarios;
- a experiencia continua estavel e previsivel.

### 6. Teste de baixa familiaridade digital

- pedir para outra pessoa usar a busca sem explicacao longa;
- observar se ela entende o que deve digitar e como confirmar.

Resultado esperado:

- a pessoa entende a tarefa olhando a tela;
- a interface apoia a acao sem exigir memoria ou conhecimento tecnico.
