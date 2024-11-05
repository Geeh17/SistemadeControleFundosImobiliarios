const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint para criar uma nova transação (depósito, retirada, compra, venda)
router.post('/', authMiddleware, async (req, res) => {
    const { tipo, valor, quantidade, ativoId } = req.body;
    const userId = req.user.id;

    // Verificação condicional da quantidade: necessária apenas para certos tipos de transação
    if (!valor || valor <= 0 || !['DEPOSITO', 'RETIRADA', 'COMPRA', 'VENDA'].includes(tipo) ||
        ((tipo === 'COMPRA' || tipo === 'VENDA') && (!quantidade || quantidade <= 0))) {
        return res.status(400).json({ message: 'Dados de transação inválidos.' });
    }

    try {
        const transacao = await prisma.transacao.create({
            data: {
                tipo,
                valor: tipo === 'RETIRADA' ? -valor : valor,
                quantidade: quantidade || null,
                usuarioId: userId,
                ativoId: ativoId || null,
                data: new Date(),
            },
        });
        res.status(201).json({ message: 'Transação criada com sucesso.', transacao });
    } catch (error) {
        console.error("Erro ao criar transação:", error);
        res.status(500).json({ message: 'Erro ao criar transação.', error: error.message || error });
    }
});

// Endpoint para listar todas as transações do usuário autenticado
router.get('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const transacoes = await prisma.transacao.findMany({
            where: {
                usuarioId: userId,
            },
            include: {
                ativo: true, // Inclui informações sobre o ativo relacionado
            },
        });
        res.status(200).json({ transacoes });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar transações.', error });
    }
});

// Endpoint para obter uma transação específica pelo ID
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const transacao = await prisma.transacao.findFirst({
            where: {
                id: Number(id),
                usuarioId: userId,
            },
        });

        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }

        res.status(200).json({ transacao });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar transação.', error });
    }
});

// Endpoint para atualizar uma transação existente
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { tipo, valor, quantidade } = req.body;
    const userId = req.user.id;

    if (!valor || valor <= 0 || !['DEPOSITO', 'RETIRADA', 'COMPRA', 'VENDA'].includes(tipo) ||
        ((tipo === 'COMPRA' || tipo === 'VENDA') && (!quantidade || quantidade <= 0))) {
        return res.status(400).json({ message: 'Dados de transação inválidos.' });
    }

    try {
        const transacao = await prisma.transacao.updateMany({
            where: {
                id: Number(id),
                usuarioId: userId,
            },
            data: {
                tipo,
                valor: tipo === 'RETIRADA' ? -valor : valor,
                quantidade: quantidade || null,
                data: new Date(),
            },
        });

        if (transacao.count === 0) {
            return res.status(404).json({ message: 'Transação não encontrada ou não pertence ao usuário.' });
        }

        res.status(200).json({ message: 'Transação atualizada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar transação.', error });
    }
});

// Endpoint para excluir uma transação existente
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const transacao = await prisma.transacao.deleteMany({
            where: {
                id: Number(id),
                usuarioId: userId,
            },
        });

        if (transacao.count === 0) {
            return res.status(404).json({ message: 'Transação não encontrada ou não pertence ao usuário.' });
        }

        res.status(200).json({ message: 'Transação excluída com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir transação.', error });
    }
});

module.exports = router;
