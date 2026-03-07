const express = require('express');
const passport = require('passport');
const { googleCallback } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const router = express.Router();

// Endpoint de autenticação com Google OAuth
router.get('/google', authLimiter, (req, res, next) => {
  console.log("Iniciando autenticação com scope:", ['profile', 'email']);
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  googleCallback
);

module.exports = router;
