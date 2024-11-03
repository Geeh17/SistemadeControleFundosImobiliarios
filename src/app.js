require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./utils/auth'); 

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.use('/auth', authRoutes);

module.exports = app;
