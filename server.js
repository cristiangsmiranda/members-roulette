const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const setupSwagger = require('./swagger');

// Importa middlewares de autenticação
const { isAuthenticated, isLoggedIn } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  }
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

setupSwagger(app);

const memberRoutes = require('./routes/memberRoutes');
app.use('/api/members', memberRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.send('Login com Google realizado com sucesso!');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.send('Logout realizado com sucesso!');
  });
});

app.get('/auth/failure', (req, res) => {
  res.send('Falha na autenticação.');
});

// Rotas protegidas usando os middlewares importados
app.get('/private-local', isAuthenticated, (req, res) => {
  res.send(`Você está autenticado localmente como usuário ${req.session.username}`);
});

app.get('/private-google', isLoggedIn, (req, res) => {
  res.send(`Você está autenticado via Google como ${req.user.displayName}`);
});

app.get('/', (req, res) => {
  res.send('API funcionando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
