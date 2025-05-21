const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const setupSwagger = require('./swagger'); // ajuste o caminho se for diferente

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

// Configura Swagger
setupSwagger(app);

// Rotas
const memberRoutes = require('./routes/memberRoutes');
app.use('/api/members', memberRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('API funcionando...');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
