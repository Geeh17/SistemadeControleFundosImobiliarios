const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições deste IP, tente novamente em 15 minutos.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas de autenticação, tente novamente em 15 minutos.'
});

const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Muitas tentativas de criação de usuário, tente novamente em 1 hora.'
});

module.exports = { apiLimiter, authLimiter, createUserLimiter };
