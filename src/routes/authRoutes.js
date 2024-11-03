const express = require('express');
const passport = require('passport');
const { googleCallback } = require('../controllers/authController');

const router = express.Router();

router.get('/google', (req, res, next) => {
  console.log("Iniciando autenticação com scope:", ['profile', 'email']);
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

module.exports = router;
