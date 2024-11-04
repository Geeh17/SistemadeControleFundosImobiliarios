const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint para buscar todos os ativos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const ativos = await prisma.ativo.findMany();

    res.json(ativos);
  } catch (error) {
    console.error("Erro ao buscar ativos:", error);
    res.status(500).json({ message: "Erro ao buscar ativos" });
  }
});

// Endpoint para buscar um ativo específico pelo ID
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

module.exports = router;
