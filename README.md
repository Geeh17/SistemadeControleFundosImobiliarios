
# Trabalho WebService

Para obter o token de autenticação: **[GET]** `http://localhost:3000/auth/google`

# API de Controle de Usuários e Ativos

A API permite que os usuários autenticados gerenciem seus dados pessoais e seus ativos financeiros, incluindo a criação, leitura, atualização e exclusão de usuários e ativos. A API utiliza autenticação com Google OAuth e Prisma para manipulação de dados.

- **Autenticação**: Os endpoints requer um Bearer Token obtido através da autenticação com Google OAuth.

- **Tecnologias**: Node Js, Prisma para gerenciar o banco de dados e o Google OAuth para autenticação.

- **Banco de Dados**: Banco de dados MySQL.

- **API Externa**: https://www.alphavantage.co/ (https://www.alphavantage.co/documentation/)

## Endpoints de Autenticação

### 1. **Autenticação com Google**
   - **Método**: GET
   - **URL**: `http://localhost:3000/auth/google`
   - **Descrição**: Redireciona para a autenticação com o Google.

### 2. **Callback da Autenticação Google**
   - **Método**: GET
   - **URL**: `http://localhost:3000/auth/google/callback`
   - **Descrição**: Endpoint de retorno da autenticação do Google, que gera um token de autenticação.


## CRUD de Usuários

### 1. **Criar Usuário**
   - **Método**: POST
   - **URL**: `http://localhost:3000/usuarios`
   - **Body**:
     ```json
     {
       "nome": "Teste",
       "email": "usuario15@teste.com.br",
       "senha": "senha12356",
       "googleId": "12345678901"
     }
     ```
   - **Descrição**: Cria um novo usuário no sistema.

### 2. **Listar Todos os Usuários**
   - **Método**: GET
   - **URL**: `http://localhost:3000/usuarios`
   - **Descrição**: Retorna uma lista de todos os usuários cadastrados (apenas para usuários autenticados).

### 3. **Obter Usuário Específico**
   - **Método**: GET
   - **URL**: `http://localhost:3000/usuarios/:id`
   - **Descrição**: Retorna os dados de um usuário específico.
   - **Parâmetros**:
     - `:id` - ID do usuário.

### 4. **Atualizar Usuário**
   - **Método**: PUT
   - **URL**: `http://localhost:3000/usuarios/:id`
   - **Body**:
     ```json
     {
       "nome": "Usuário Atualizado",
       "email": "usuario@atualizado.com",
       "senha": "novaSenha123",
       "googleId": "1234567890"
     }
     ```
   - **Descrição**: Atualiza os dados de um usuário específico.
   - **Parâmetros**:
     - `:id` - ID do usuário.

### 5. **Excluir Usuário**
   - **Método**: DELETE
   - **URL**: `http://localhost:3000/usuarios/:id`
   - **Descrição**: Exclui um usuário específico.
   - **Parâmetros**:
     - `:id` - ID do usuário.

## CRUD de Ativos

### 1. **Listar Todos os Ativos do Usuário**
   - **Método**: GET
   - **URL**: `http://localhost:3000/ativos`
   - **Descrição**: Retorna todos os ativos associados ao usuário autenticado.

### 2. **Criar um Novo Ativo**
   - **Método**: POST
   - **URL**: `http://localhost:3000/ativos`
   - **Body**:
     ```json
     {
       "nome": "Ativo Teste",
       "tipo": "acao",
       "quantidade": 6,
       "preco": 50.0
     }
     ```
   - **Descrição**: Cria um novo ativo financeiro associado ao usuário autenticado.

### 3. **Buscar um Ativo Específico**
   - **Método**: GET
   - **URL**: `http://localhost:3000/ativos/:id`
   - **Descrição**: Retorna os detalhes de um ativo específico associado ao usuário autenticado.
   - **Parâmetros**:
     - `:id` - ID do ativo.

### 4. **Atualizar um Ativo**
   - **Método**: PUT
   - **URL**: `http://localhost:3000/ativos/:id`
   - **Body**:
     ```json
     {
       "nome": "Ativo Atualizado",
       "tipo": "acao",
       "quantidade": 10,
       "preco": 60.0
     }
     ```
   - **Descrição**: Atualiza os dados de um ativo específico associado ao usuário autenticado.
   - **Parâmetros**:
     - `:id` - ID do ativo.

### 5. **Excluir um Ativo**
   - **Método**: DELETE
   - **URL**: `http://localhost:3000/ativos/:id`
   - **Descrição**: Exclui um ativo específico associado ao usuário autenticado.
   - **Parâmetros**:
     - `:id` - ID do ativo.

## CRUD de Transações

### 1. **Criar uma Nova Transação**
   - **Método**: POST
   - **URL**: `http://localhost:3000/transacoes`
   - **Body**:
     ```json
     {
       "tipo": "DEPOSITO",
       "valor": 100.0,
       "quantidade": 1,
       "ativoId": 1
     }
     ```
   - **Descrição**: Cria uma nova transação associada ao usuário autenticado. O tipo de transação pode ser "DEPOSITO", "RETIRADA", "COMPRA" ou "VENDA".
   - **Observação**: `quantidade` e `ativoId` são opcionais para transações de "DEPOSITO" e "RETIRADA".

### 2. **Listar Todas as Transações do Usuário**
   - **Método**: GET
   - **URL**: `http://localhost:3000/transacoes`
   - **Descrição**: Retorna todas as transações associadas ao usuário autenticado.

### 3. **Buscar uma Transação Específica**
   - **Método**: GET
   - **URL**: `http://localhost:3000/transacoes/:id`
   - **Descrição**: Retorna os detalhes de uma transação específica associada ao usuário autenticado.
   - **Parâmetros**:
     - `:id` - ID da transação.

### 4. **Atualizar uma Transação**
   - **Método**: PUT
   - **URL**: `http://localhost:3000/transacoes/:id`
   - **Body**:
     ```json
     {
       "tipo": "VENDA",
       "valor": 150.0,
       "quantidade": 2
     }
     ```
   - **Descrição**: Atualiza os dados de uma transação específica associada ao usuário autenticado. O tipo de transação pode ser "DEPOSITO", "RETIRADA", "COMPRA" ou "VENDA".
   - **Parâmetros**:
     - `:id` - ID da transação.

### 5. **Excluir uma Transação**
   - **Método**: DELETE
   - **URL**: `http://localhost:3000/transacoes/:id`
   - **Descrição**: Exclui uma transação específica associada ao usuário autenticado.
   - **Parâmetros**:
     - `:id` - ID da transação.

### Filtros e Pesquisa de Ativos

- **Método**: GET
- **URL**: `http://localhost:3000/ativos`
- **Query Params**:
  - `tipo`: Filtra os ativos pelo tipo específico (ex.: "Ações", "Fundos Imobiliários").
  - `nome`: Realiza uma pesquisa parcial pelo nome do ativo.
  - `pagina`: Número da página para paginação.
  - `limite`: Número de itens por página.

- **Exemplo de Requisição**:
  ```http
  GET /ativos?tipo=Ações&nome=Petro&pagina=1&limite=10
  ```
  - **Descrição**: Retorna os ativos do usuário filtrados pelo tipo "Ações" e que contêm "Petro" no nome, limitando a resposta a 10 itens na primeira página.

### Filtros e Paginação de Transações

- **Método**: GET
- **URL**: `http://localhost:3000/transacoes`
- **Query Params**:
  - `tipo`: Filtra as transações pelo tipo (ex.: "COMPRA", "VENDA").
  - `dataInicio` e `dataFim`: Filtram as transações realizadas dentro de um intervalo de datas.
  - `pagina`: Número da página para paginação.
  - `limite`: Número de itens por página.

- **Exemplo de Requisição**:
  ```http
  GET /transacoes?tipo=COMPRA&dataInicio=2024-01-01&dataFim=2024-12-31&pagina=2&limite=5
  ```
  - **Descrição**: Retorna as transações de compra realizadas entre 1º de janeiro e 31 de dezembro de 2024, exibindo 5 resultados por página na segunda página.