const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo ativo (POST /ativos)
router.post('/', authMiddleware, async (req, res) => {
  const { nome, tipo, quantidade, preco } = req.body;
  const userId = req.user.id;

  if (!nome || !tipo || !quantidade || !preco) {
    return res.status(400).json({ message: 'Todos os campos são necessários: nome, tipo, quantidade, preco' });
  }

  try {
    const ativo = await prisma.ativo.create({
      data: { nome, tipo, quantidade, precoCompra: preco, usuarioId: userId },
    });
    res.status(201).json({ message: 'Ativo criado com sucesso!', ativo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar ativo' });
  }
});

// Obter todos os ativos do usuário (GET /ativos)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ativos = await prisma.ativo.findMany({
      where: { usuarioId: req.user.id },
    });
    res.json(ativos);
  } catch (error) {
    console.error("Erro ao buscar ativos:", error);
    res.status(500).json({ message: "Erro ao buscar ativos" });
  }
});

// Obter um ativo pelo ID (GET /ativos/:id)
router.get('/:id', authMiddleware, async (req, res) => {
  const ativoId = parseInt(req.params.id, 10);

  try {
    const ativo = await prisma.ativo.findUnique({
      where: { id: ativoId },
    });

    if (!ativo || ativo.usuarioId !== req.user.id) {
      return res.status(404).json({ message: 'Ativo não encontrado' });
    }

    res.json(ativo);
  } catch (error) {
    console.error("Erro ao buscar ativo:", error);
    res.status(500).json({ message: "Erro ao buscar ativo" });
  }
});

// Atualizar um ativo existente (PUT /ativos/:id)
router.put('/:id', authMiddleware, async (req, res) => {
  const ativoId = parseInt(req.params.id, 10);
  const { nome, tipo, quantidade, preco } = req.body;

  try {
    const ativoExistente = await prisma.ativo.findUnique({
      where: { id: ativoId },
    });

    if (!ativoExistente || ativoExistente.usuarioId !== req.user.id) {
      return res.status(404).json({ message: 'Ativo não encontrado' });
    }

    const ativoAtualizado = await prisma.ativo.update({
      where: { id: ativoId },
      data: { nome, tipo, quantidade, precoCompra: preco },
    });

    res.json({ message: 'Ativo atualizado com sucesso!', ativoAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar ativo:", error);
    res.status(500).json({ message: "Erro ao atualizar ativo" });
  }
});

// Excluir um ativo pelo ID (DELETE /ativos/:id)
router.delete('/:id', authMiddleware, async (req, res) => {
  const ativoId = parseInt(req.params.id, 10);

  try {
    const ativo = await prisma.ativo.findUnique({
      where: { id: ativoId },
    });

    if (!ativo || ativo.usuarioId !== req.user.id) {
      return res.status(404).json({ message: 'Ativo não encontrado' });
    }

    await prisma.ativo.delete({
      where: { id: ativoId },
    });

    res.json({ message: 'Ativo excluído com sucesso!' });
  } catch (error) {
    console.error("Erro ao excluir ativo:", error);
    res.status(500).json({ message: "Erro ao excluir ativo" });
  }
});

// Obter o preço atual de um ativo específico (GET /ativos/:id/preco)
router.get('/:id/preco', authMiddleware, async (req, res) => {
  const ativoId = parseInt(req.params.id, 10);

  try {
    const ativo = await prisma.ativo.findUnique({
      where: { id: ativoId },
      select: { nome: true, precoCompra: true }
    });

    if (!ativo || ativo.usuarioId !== req.user.id) {
      return res.status(404).json({ message: 'Ativo não encontrado' });
    }

    res.json({ nome: ativo.nome, precoAtual: ativo.precoCompra });
  } catch (error) {
    console.error('Erro ao obter preço do ativo:', error);
    res.status(500).json({ message: 'Erro ao obter preço do ativo' });
  }
});

module.exports = router;
