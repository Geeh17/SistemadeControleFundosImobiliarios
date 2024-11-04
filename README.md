
# Trabalho WebService

Para conseguir o token http://localhost:3000/auth/google

# API de Controle de Ativos
A API permite que os usuários autenticados gerenciem seus ativos financeiros, incluindo a criação, leitura, atualização e exclusão de ativos. A API utiliza autenticação com Google OAuth e Prisma para manipulação de dados.

# Endpoints
Autenticação
GET /auth/google
Redireciona para a autenticação com o Google.

GET /auth/google/callback
Callback para autenticação do Google, que retorna um token de autenticação.

# CRUD de Ativos

1. Listar Todos os Ativos do Usuário
Método: GET
URL: http://localhost:3000/ativos
Descrição: Retorna todos os ativos associados ao usuário autenticado.

2. Criar um Novo Ativo
Método: POST
URL: http://localhost:3000/ativos
Body:

{
  "nome": "Ativo Teste",
  "tipo": "acao",
  "quantidade": 6,
  "preco": 50.0
}

3. Buscar um Ativo Específico
Método: GET
URL: http://localhost:3000/ativos/:id
Descrição: Retorna os detalhes de um ativo específico associado ao usuário autenticado.
Parâmetros:
:id - ID do ativo.

4. Atualizar um Ativo
Método: PUT
URL: http://localhost:3000/ativos/:id
Body:
{
  "nome": "Ativo Atualizado",
  "tipo": "acao",
  "quantidade": 10,
  "preco": 60.0
}
Parâmetros:
:id - ID do ativo.

5. Excluir um Ativo
Método: DELETE
URL: http://localhost:3000/ativos/:id
Exclui um ativo específico associado ao usuário autenticado.
Parâmetros:
:id - ID do ativo



