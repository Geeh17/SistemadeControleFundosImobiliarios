const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./utils/auth');

const authRoutes = require('./routes/authRoutes');
const ativosRoutes = require('./routes/ativosRoutes'); 

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes); // Rotas de autenticação
app.use('/ativos', ativosRoutes); // Montando as rotas de ativos na URL /ativos

module.exports = app;
