# Acessibilidade

Este documento resume as melhorias de acessibilidade aplicadas no app de meteorologia com foco em leitura, compreensao e autonomia.

## Intencao

As melhorias foram pensadas para tornar a interface mais previsivel, legivel e respeitosa para diferentes formas de perceber, compreender e navegar. A proposta segue principios de desenho universal: a tela foi refinada para ficar melhor para todo mundo.

A referencia humana por tras dessas decisoes considera uma experiencia pratica com tecnologia assistiva e autonomia, inspirada por vivencias em acessibilidade ao decorrer das minhas experiencias profissionais. Isso influenciou escolhas de linguagem mais clara, hierarquia visual mais estavel e maior cuidado com texto, foco, contraste e previsibilidade.

O projeto passou por uma segunda rodada de refatoracao com um objetivo especifico: sair de um unico botao "ativar modo acessivel" (que ligava varias mudancas ao mesmo tempo, sem escolha) para um **painel de preferencias com controles independentes**. A ideia central e que a pessoa usuaria ative so o que faz sentido para ela, sem herdar ajustes que nao pediu.

## Melhorias feitas

### Tipografia e legibilidade

- pilha de fontes sans-serif mais segura, usando `system-ui`, `Segoe UI`, `Roboto`, `Arial` e `Verdana`;
- tamanhos minimos mais confortaveis para texto, labels, botoes e mensagens;
- temperatura principal com destaque entre `2.5rem` e `4rem`;
- cidade e localizacao com destaque maior e leitura mais facil;
- line-height mais generoso para reduzir cansaco visual;
- uso de `rem` e `clamp()` para melhorar escalabilidade;
- fonte aumentada disponivel como preferencia independente no painel (nao depende de mais nada ser ativado junto).

### Hierarquia visual

A ordem principal da informacao continua previsivel:

1. localizacao ou cidade;
2. temperatura atual;
3. clima agora;
4. sensacao termica, chance de chuva, umidade do ar e vento (em chips compactos);
5. previsao dos proximos dias;
6. clima na pratica (insights para a rotina).

### Linguagem simples

- termos diretos, como `Clima agora`, `Chance de chuva`, `Umidade do ar` e `Vento`;
- mensagens objetivas para erro, sucesso e carregamento;
- preferencia `Linguagem simplificada` no painel: quando ativa, mostra um resumo do clima em uma frase corrida, sem depender de icones ou termos tecnicos.

### Contraste e temas

- textos secundarios com contraste validado (WCAG AA) tanto no tema claro quanto no escuro;
- tema escuro real via `prefers-color-scheme`, com paleta propria (nao e so inverter cores);
- alto contraste automatico via `prefers-contrast: more`, reforçando bordas e texto de apoio;
- preferencia manual de tema (`Claro` / `Escuro` / `Automatico`) e de alto contraste no painel, que sobrepoe a preferencia do sistema quando escolhida;
- mensagens nao dependem apenas de cor (icone + texto sempre juntos nos selos de nivel).

### Navegacao e autonomia

- skip link ("Pular para o conteudo principal") como primeiro elemento focavel da pagina, levando direto para a secao de busca;
- foco visivel preservado em todos os controles, com opcao de destacar ainda mais o contorno de foco pelo painel;
- sugestoes de cidade continuam acessiveis por teclado (setas, Enter, Escape);
- leitor de tela recebe mensagens dinamicas com `aria-live`;
- formulario de busca marcado com `role="search"`;
- elementos interativos continuam sendo `button`, `input` e `form`.

### Movimento

- `prefers-reduced-motion` do sistema operacional ja desativa transicoes e animacoes automaticamente;
- preferencia manual `Reduzir animacoes` no painel faz o mesmo, para quem nao mudou essa configuracao no sistema mas prefere uma interface mais parada.

### Leitura em voz alta e busca por voz

- usa a Web Speech API nativa do navegador (`speechSynthesis` e `SpeechRecognition`), sem depender de nenhuma biblioteca externa ou servico pago;
- `Ler previsao em voz alta`: preferencia do painel que adiciona um botao no cartao de clima para ouvir um resumo falado da previsao;
- busca por voz: botao de microfone sempre visivel ao lado de "usar minha localizacao atual" — ao reconhecer a fala, a busca acontece automaticamente, sem etapa extra de confirmacao;
- mensagens de erro especificas por causa (permissao de microfone negada, nenhum microfone encontrado, sem rede), em vez de um erro generico.

### Painel de Preferencias de Acessibilidade

O antigo botao unico "Ativar modo acessivel" foi substituido por um painel (`<dialog>` nativo do HTML, que ja cuida de foco preso dentro do painel, tecla Escape para fechar e devolucao do foco ao botao que abriu) com **7 controles independentes**, cada um salvo separadamente em `localStorage`:

- Aumentar fonte
- Alto contraste
- Tema (claro / escuro / automatico)
- Reduzir animacoes
- Ler previsao em voz alta
- Destacar foco do teclado
- Linguagem simplificada

Cada preferencia liga um atributo `data-*` proprio no `<html>` (`data-fonte`, `data-contraste`, `data-tema`, `data-movimento`, `data-foco`, `data-linguagem`), e o CSS reage a cada atributo de forma isolada. Isso e o que garante a independencia: ativar "Aumentar fonte" nunca muda espacamento de card ou tamanho de botao, por exemplo — cada preferencia faz exatamente uma coisa.

A busca por voz ficou de fora do painel: como e um metodo de entrada (nao uma adaptacao de leitura), o botao de microfone fica sempre visivel na tela, sem precisar abrir o painel.

## Barreiras reduzidas

Essas mudancas ajudam especialmente:

- pessoas com baixa visao;
- pessoas com deficiencia intelectual;
- pessoas autistas;
- pessoas com dislexia;
- pessoas idosas;
- pessoas com baixa familiaridade digital;
- pessoas que preferem ou precisam usar comandos de voz;
- pessoas que precisam ampliar o conteudo sem quebrar a interface;
- pessoas que usam o navegador no escuro por conforto visual ou sensibilidade a luz.

## Como testar manualmente

### 1. Leitura geral

- abra a tela em desktop e mobile;
- observe se a cidade aparece claramente antes dos demais dados;
- observe se a temperatura atual se destaca sem competir com outros elementos.

Resultado esperado:

- a leitura fica mais facil;
- a pessoa entende rapidamente onde esta, qual a temperatura e qual o clima agora.

### 2. Navegacao por teclado

- aperte `Tab` uma vez ao carregar a pagina e confirme que o skip link aparece;
- use `Tab` para navegar pelo restante da pagina;
- use `ArrowDown` e `ArrowUp` nas sugestoes de cidade;
- use `Enter` para escolher uma sugestao e `Escape` para fechar a lista.

Resultado esperado:

- todos os controles funcionam sem mouse;
- o foco permanece visivel;
- a ordem do teclado acompanha a ordem visual da tela.

### 3. Leitor de tela

- use NVDA, Narrador do Windows ou VoiceOver;
- navegue ate o campo de busca;
- escute as mensagens de erro, sucesso e carregamento;
- escute os cards do resultado e do painel de preferencias.

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

### 5. Painel de preferencias

- abra o painel pelo botao "Preferencias de acessibilidade" no topo da pagina;
- ative um controle de cada vez e confirme que so aquele efeito muda (ex.: "Aumentar fonte" nao deveria mudar padding de card);
- feche com o botao de fechar, com `Escape` e clicando fora do painel;
- recarregue a pagina e confirme que as preferencias ativadas continuam salvas.

Resultado esperado:

- cada preferencia funciona de forma isolada;
- o foco volta para o botao que abriu o painel ao fechar;
- as preferencias persistem entre recarregamentos.

### 6. Tema escuro

- troque o sistema operacional ou o navegador para tema escuro (ou use as ferramentas de desenvolvedor: Rendering > `prefers-color-scheme`);
- confirme que o app muda para o tema escuro automaticamente, sem precisar mexer no painel;
- no painel, force manualmente "Escuro" e depois "Claro" e confirme que a escolha manual sobrepoe a do sistema.

Resultado esperado:

- contraste de texto continua adequado nos dois temas;
- nenhum card fica com fundo claro sobre texto claro (ou o inverso).

### 7. Busca por voz

- clique no botao de microfone ao lado de "usar minha localizacao atual";
- fale o nome de uma cidade (ex.: "clima em Fortaleza");
- se o navegador ou sistema negar a permissao de microfone, confirme que a mensagem de erro explica isso especificamente.

Resultado esperado:

- a busca acontece automaticamente ao reconhecer a fala, sem etapa extra;
- mensagens de erro sao especificas por causa (permissao, microfone ausente, rede).

### 8. Movimento reduzido

- ative reducao de movimento no sistema operacional, ou use a preferencia "Reduzir animacoes" no painel;
- abra o app novamente.

Resultado esperado:

- animacoes e transicoes deixam de acontecer;
- a tela continua funcional e previsivel.
