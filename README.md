# Organizador de Faculdade

O **Organizador de Faculdade** é um site que ajuda estudantes a gerenciar suas tarefas acadêmicas de forma prática e eficiente. Com este sistema, você pode adicionar **trabalhos**, **provas** e suas respectivas **datas**. O site organiza suas tarefas de maneira intuitiva, facilitando o acompanhamento das atividades.

## Funcionalidades

- **Adição de Tarefas**: Adicione trabalhos e provas com a data de entrega ou realização.
- **Organização por Data**: As tarefas são organizadas por **data**, com as mais recentes sempre exibidas no topo.
- **Visualização Mensal**: As tarefas são agrupadas por **mês**. Por exemplo, no mês de **abril** aparecerão apenas as tarefas para **abril**, no mês de **maio** somente as de **maio**, e assim por diante.
- **Identificação de Tarefas Atrasadas**: O sistema consegue identificar automaticamente **tarefas não concluídas e atrasadas**, destacando-as para você.
- **Concluir Tarefas**: É possível marcar as tarefas como **concluídas**, o que altera a cor delas, permitindo que você visualize facilmente as tarefas que já foram finalizadas.
- **Login e Autenticação**: O sistema oferece **login seguro**, utilizando validação de **token** para autenticação do usuário.
- **Responsivo**: O site é **responsivo**, funcionando bem em dispositivos móveis, tablets e desktops.
  
## Tecnologias Utilizadas

- **Frontend**: JavaScript, HTML, CSS
- **Backend**: Node.js, Express
- **Autenticação**: JSON Web Tokens (jsonwebtoken)
- **Banco de Dados**: MongoDB

## Como Rodar

- Abra o projeto em seu Visual Studio Code
- Abra o terminal e digite cd backend
- Instale as dependencias necessárias com o comando npm i
- Dentro da pasta backend crie o arquivo .env. Esse arquivo deve conter as seguintes variáveis:
    DB_USER: seu nome de usuário do banco MongoDB.
    DB_PASS: sua senha do banco MongoDB.
    SECRET: uma chave secreta composta por números e letras aleatórias, usada para assinar tokens de autenticação.
- Abra o terminal novamente, dentro da pasta backend, de o comando npm start para iniciar o programa.

## Contribuindo

Se você deseja contribuir para este projeto, fique à vontade para abrir **issues** ou enviar **pull requests**.
