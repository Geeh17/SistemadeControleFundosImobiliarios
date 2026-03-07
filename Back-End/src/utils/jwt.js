const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido nas variáveis de ambiente. Configure no arquivo .env');
}

const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
