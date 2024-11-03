const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(email, nome, googleId) {
  return await prisma.usuario.create({
    data: {
      email,
      nome,
      googleId,
    },
  });
}
