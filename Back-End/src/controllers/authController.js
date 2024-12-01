const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../utils/jwt'); 

async function googleCallback(req, res) {
  const user = req.user;
  const token = generateToken(user); 

  res.json({ token, message: "Autenticado com sucesso!" });
}

module.exports = {
  googleCallback,
};
