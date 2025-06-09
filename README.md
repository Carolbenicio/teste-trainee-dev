
##Relatório Técnico - Caroline Benicio Pinheiro

**Visão geral:** A aplicação de lista de tarefas apresentava bugs e instabilidade quando foi entregue. Foi realizado um tratamento de todos os erros e implementação de funcionalidades conforme os requisitos solicitados com três passos principais 

1. **Regularização do ambiente:** Investigação e reconhecimento do que estava impedindo a aplicação de iniciar da forma correta. 

2. **Reparo de bugs:** Correção de todos os erros identificados pela equipe de QA tantos os funcionais como os de usabilidade garantindo o funcionamento da forma esperada.

3. **Implementação de aperfeiçoamentos:** Foram implantados seis novas funcionalidades na aplicação, sendo que três delas fazem uso de bibliotecas como solicitado. 




## Como executar a aplicação

Clone o projeto

```bash
  git clone https://github.com/Carolbenicio/teste-trainee-dev.git
```

1. Vá até o diretório da aplicação

```bash
  cd teste-trainee-dev
```

2. Instale as depedências do projeto

```bash
  npm install
```

3. Inicie o servidor

```bash
  npm run start
```
A aplicação está disponível em: http://localhost:4200/#/todo

## Correção dos erros iniciais

1. Adição de "start" no package.json 

2. Correção do erro ortográfico em Header.component.ts estava escrito "HeadeComponent" alteração para "HeaderComponent"

3. Remoção das declarações de HeaderComponent em Layout.module.ts

4. Adição da dependência do FontAwesome 

5. Correção da importação de TodoService em NewTask

## Relatório de Correção de Bugs

- **Erro: Ao clicar no botão “Salvar”, a tarefa está sendo adicionada duas vezes.**
    - **Causa raiz:** A chamada do método estava duplicada 
    - **Solução:** Remoção da duplicata 

- **Erro: Só está sendo possível salvar uma tarefa a primeira vez que clica no botão “Salvar”, só é possível salvar uma nova tarefa após atualizar a página (F5)**
  - **Causa raiz:** A aplicação não permitia a adição de novas tarefas sem atualizar a página pois o campo não ficava limpo 
  - **Solução:** A variável `count` e a verificação `if (this.count > 0) return` estavam impedindo que uma nova tarefa fosse adicionada sem antes atualizar a página. Depois de removidas, a função `addTask()`agora pode ser chamada livremente usando `todoService.addTodo()`

- **Erro: O texto do botão de limpar todas as tarefas não está em português**
    - **Causa raiz:** O botão de limpar tarefas estava em inglês conflitando com o restante que estão em português
    - **Solução:** Alteração do idioma para português

- **Erro: Inversão dos botões Exibir Tarefas Concluídas e “Ocultar Tarefas Concluídas**
  - **Causa raiz:** A ordem dos botões estava incorreta 
  - **Solução:** Inversão para a ordem correta 
- **Erro: Ao clicar em “Limpar Tarefas Concluídas”, a ação é executada sem pedir uma confirmação ao usuário.**
    - **Causa raiz:** A funçaõ de Limpar Tarefas Concluídas não exigia uma confirmação antes de apagar todas causando riscos ao usuário
    - **Solução:** Implantação de uma mensagem de confirmação para evitar limpeza indesejada 
    - **Erro: O botão “Limpar Tarefas Concluídas” está removendo as tarefas não concluídas em vez das concluídas.**
     - **Causa raiz:** A lógica `this.todos = this.todos.filter(({ completed }) => completed === true);` estava apagando as tarefas que não estavam concluídas
     - **Solução:** Feito a substituição para `this.todos = this.todos.filter(todo => !todo.completed);` que apaga corretamente 
- **Erro: O botão “Editar” não está funcional. O comportamento esperado é: ao clicar, o campo “Título da Tarefa” deve ser preenchido com o texto da tarefa selecionada. Ao salvar, o item na lista deve ser atualizado e o campo de texto limpo.**
  - **Causa raiz:** O botão não tinha lógica alguma implatada e não fazia a chamada no método 
  - **Solução:** Aplicação da lógica correta para tornar a edição possível e o botão agora realiza a chamada do método `editTodo()`
- **Erro: O botão “Editar” está desalinhado e deve ser posicionado ao lado do botão “Remover”**
  - **Causa raiz:** A div que mantinha os botões estava descentralizada e não existia CSS para isso
  - **Solução:** Botões colocados em formato de lista para ficarem alinhados e criação de CSS para deixar um ao lado do outro. 
-**Erro: O botão “Remover” deve ter a cor vermelha para indicar uma ação destrutiva.**
  - **Causa raiz:** Botão não tinha cor que indicasse sua açaõ
  - **Solução:** Alteração da cor do botão para `rgb(255, 0, 0)`
- **Erro: A lista de tarefas não apresenta uma barra de rolagem quando o número de itens ultrapassa a altura do painel, impedindo a visualização de todas as tarefas.**
  - **Causa raiz:** Quando a lista alcançava um certo número a visualização se tornava impossível 
   - **Solução:** Alteração do comportamento da barra de rolagem de `overflow-y: hidden;` para `overflow-y: auto;`
- **Erro: Adição de valores nulos é possível**
  - **Causa raiz:** Era permitida o envio de tarefas vazias ou ainda ' ' somente o espaço
  - **Solução:** adicionada uma verificação que impede a adição de valores nulos de qualquer natureza  


## Implementação

- **Adição de Tarefas pela tecla enter:** Em `src/app/todo/new-task/new-task.component.html` foi realizada a adição do comando `(keyup.enter)="addTask()"` para que permitisse que a tecla enter adicione novas tarefas 
- **Botão “Ordenar Tarefas” que, ao ser clicado, ordene alfabeticamente a lista de tarefas visíveis:** Em ´src/app/todo/todo.component.html` foi adicionado um botão chamado “Ordenar Tarefas” e feita a lógica necessária para que ele organize de a-z 
- **Permitida a adição de múltiplas tarefas de uma só vez. O usuário deverá digitar os títulos separados pelo caractere | (pipe):** Em `src/app/shared/services/todo.service.ts` a criação de `getNextId()` que permite crar mais de um id simultanêo e em `src/app/todo/new-task/new-task.component.ts` foi criada a lógica para que fosse possível a criação de duas tarefas simultanêas 
- **Implementação um filtro de palavras obscenas:** 
  - *Biblioteca usada:* github.com/web-mech/badwords
  - Feita a importação correta da Biblioteca ao projeto o próximo passo foi implantar de acordo com as instruções do github e adicionar palavras em português de baixo calão
- **Funcionalidade de exportar a lista de tarefas atual para um arquivo PDF:** 
- *Biblioteca usada:* https://github.com/parallax/jsPDF
- Feita a importação correta da Biblioteca seguinte passo foi implementar os metodos no projeto e configurar conforme o desejado ` doc.text('Lista de Tarefas', 10, 10);`
- **Substituição de todos os alerts e confirms nativos do navegador:** 
- *Biblioteca usada:* https://sweetalert2.github.io/
- Com a importação, a substituição de todos os alerts confirms para os da Biblioteca foi feita dando assim um ar muito mais moderno e agradavél ao site. 


## Relatório de Melhorias

 1. Implementação de sincronização com agendas (Microsoft/Google) para facilitar a visualização das tarefas
 2. Poder criar listas de tarefas específicas 
 3. Inserir datas e hora de realização de tarefas 
