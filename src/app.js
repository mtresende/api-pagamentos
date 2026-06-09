const express = require('express');
const cors = require('cors');
const pagamentoRoutes = require('./routes/pagamento');

const app = express();
app.use(cors()); // permite que outros grupos acessem sua API
app.use(express.json());

app.use('/pagamentos', pagamentoRoutes);

// Rota de health check — útil pra saber se a API está no ar
app.get('/', (req, res) => res.json({ status: 'API Pagamento rodando ✅' }));

module.exports = app;