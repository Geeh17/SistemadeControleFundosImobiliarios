const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. Criar um Novo Usuário (POST /usuarios)
router.post('/', async (req, res) => {
  const { nome, email, senha, googleId } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já está em uso.' });
    }

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha, googleId } // Incluindo googleId como opcional
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', usuario });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

// 2. Listar Todos os Usuários (GET /usuarios)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

// 3. Obter um Usuário Específico (GET /usuarios/:id)
router.get('/:id', authMiddleware, async (req, res) => {
  const usuarioId = parseInt(req.params.id, 10);

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

// 4. Atualizar um Usuário (PUT /usuarios/:id)
router.put('/:id', authMiddleware, async (req, res) => {
  const usuarioId = parseInt(req.params.id, 10);
  const { nome, email, senha, googleId } = req.body;

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { nome, email, senha, googleId } // Atualizando com googleId como opcional
    });

    res.json({ message: 'Usuário atualizado com sucesso!', usuarioAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});

// 5. Excluir um Usuário (DELETE /usuarios/:id)
router.delete('/:id', authMiddleware, async (req, res) => {
  const usuarioId = parseInt(req.params.id, 10);

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    await prisma.usuario.delete({
      where: { id: usuarioId },
    });

    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ message: "Erro ao excluir usuário" });
  }
});

module.exports = router;
