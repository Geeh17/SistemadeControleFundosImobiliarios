const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { obterPrecoAtivo } = require('../utils/precoService'); 

// Endpoint para calcular a rentabilidade mensal dos ativos (GET /ativos/rentabilidade-mensal)
router.get('/rentabilidade-mensal', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const dataInicio = new Date();
  dataInicio.setDate(1); 
  const dataFim = new Date();

  try {
     const ativos = await prisma.ativo.findMany({
          where: { usuarioId: userId },
          include: {
              transacoes: {
                  where: {
                      data: {
                          gte: dataInicio,
                          lte: dataFim
                      }
                  }
              }
          }
      });

      let rentabilidadeTotal = 0;
      for (const ativo of ativos) {
          let custoTotal = 0;
          let quantidadeTotal = 0;
          let dividendos = 0;
          ativo.transacoes.forEach(transacao => {
              if (transacao.tipo === 'COMPRA') {
                  custoTotal += transacao.quantidade * transacao.valor;
                  quantidadeTotal += transacao.quantidade;
              } else if (transacao.tipo === 'VENDA') {
                  custoTotal -= transacao.quantidade * transacao.valor;
                  quantidadeTotal -= transacao.quantidade;
              } else if (transacao.tipo === 'DIVIDENDO') {
                  dividendos += transacao.valor;
              }
          });
          const precoAtual = await obterPrecoAtivo(ativo.nome);
          const valorAtual = precoAtual * quantidadeTotal;
          const rentabilidade = (valorAtual + dividendos - custoTotal);
          rentabilidadeTotal += rentabilidade;
      }

      res.status(200).json({
          message: 'Rentabilidade mensal calculada com sucesso.',
          rentabilidadeTotal
      });
  } catch (error) {
      console.error('Erro ao calcular rentabilidade mensal:', error);
      res.status(500).json({ message: 'Erro ao calcular rentabilidade mensal.', error });
  }
});

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
  if (isNaN(ativoId)) {
    return res.status(400).json({ message: 'ID inválido fornecido.' });
  }
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

// Obter o preço atual de um ativo específico, tanto do banco interno quanto da API externa (GET /ativos/:id/preco)
router.get('/:id/preco', authMiddleware, async (req, res) => {
  const ativoId = parseInt(req.params.id, 10);

  try {
    const ativo = await prisma.ativo.findUnique({
      where: { id: ativoId },
      select: { nome: true, precoCompra: true, usuarioId: true }
    });

    if (!ativo || ativo.usuarioId !== req.user.id) {
      return res.status(404).json({ message: 'Ativo não encontrado' });
    }

    let precoAtual;
    try {
      precoAtual = await obterPrecoAtivo(ativo.nome);
    } catch (error) {
      console.error('Erro ao obter preço externo:', error);
      return res.json({ nome: ativo.nome, precoBanco: ativo.precoCompra, message: 'Erro ao buscar preço externo, exibindo apenas o preço interno.' });
    }

    res.json({
      nome: ativo.nome,
      precoBanco: ativo.precoCompra,
      precoAtual: precoAtual
    });
    
  } catch (error) {
    console.error('Erro ao obter preço do ativo:', error);
    res.status(500).json({ message: 'Erro ao obter preço do ativo' });
  }
});

module.exports = router;
