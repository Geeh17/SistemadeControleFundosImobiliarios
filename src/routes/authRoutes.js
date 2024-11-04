const express = require('express');
const passport = require('passport');
const authMiddleware = require('../middleware/authMiddleware');
const { googleCallback } = require('../controllers/authController');
const router = express.Router();

// Endpoint de autenticação com Google OAuth
router.get('/google', (req, res, next) => {
  console.log("Iniciando autenticação com scope:", ['profile', 'email']);
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

// Endpoint para compra de ativos (protegido)
router.post('/ativos/comprar', authMiddleware, async (req, res) => {
  const { nome, tipo, quantidade, preco } = req.body;
  const userId = req.user.id;

  if (!nome || !tipo || !quantidade || !preco) {
    return res.status(400).json({ message: 'Todos os campos são necessários: nome, tipo, quantidade, preco' });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    const custoTotal = quantidade * preco;

    if (usuario.saldo < custoTotal) {
      return res.status(400).json({ message: 'Saldo insuficiente para a compra' });
    }

    await prisma.usuario.update({
      where: { id: userId },
      data: { saldo: usuario.saldo - custoTotal },
    });

    const ativo = await prisma.ativo.create({
      data: { nome, tipo, quantidade, precoCompra: preco, usuarioId: userId },
    });

    res.status(201).json({ message: 'Ativo comprado com sucesso!', ativo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao comprar ativo' });
  }
});



module.exports = router;
