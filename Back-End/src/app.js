const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./utils/auth');
const { apiLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const ativosRoutes = require('./routes/ativosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes'); 
const transacoesRoutes = require('./routes/transacoesRoutes');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(apiLimiter);

app.use('/auth', authRoutes);
app.use('/ativos', ativosRoutes);
app.use('/usuarios', usuariosRoutes); 
app.use('/transacoes', transacoesRoutes);

module.exports = app;
