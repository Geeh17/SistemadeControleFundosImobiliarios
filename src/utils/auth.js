const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.usuario.findUnique({
        where: { googleId: profile.id },
      });

      if (!user) {
        user = await prisma.usuario.create({
          data: {
            nome: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          },
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
