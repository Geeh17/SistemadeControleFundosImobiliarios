const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Token inválido" });
  }

  req.user = user; 
  next();
}

module.exports = authMiddleware;
