
# Trabalho WebService

Para obter o token de autenticação: **[GET]** `http://localhost:3000/auth/google`

# API de Controle de Usuários e Ativos

A API permite que os usuários autenticados gerenciem seus dados pessoais e seus ativos financeiros, incluindo a criação, leitura, atualização e exclusão de usuários e ativos. A API utiliza autenticação com Google OAuth e Prisma para manipulação de dados.

## Endpoints de Autenticação

### 1. **Autenticação com Google**
   - **Método**: GET
   - **URL**: `http://localhost:3000/auth/google`
   - **Descrição**: Redireciona para a autenticação com o Google.

### 2. **Callback da Autenticação Google**
   - **Método**: GET
   - **URL**: `http://localhost:3000/auth/google/callback`
   - **Descrição**: Endpoint de retorno da autenticação do Google, que gera um token de autenticação.

---

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

---

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

- **Autenticação**: Os endpoints requer um Bearer Token obtido através da autenticação com Google OAuth.

- **Tecnologias**: Node Js, Prisma para gerenciar o banco de dados e o Google OAuth para autenticação.

- **Banco de Dados**: Banco de dados MySQL.
