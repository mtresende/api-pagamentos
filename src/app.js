const express = require('express');
const cors = require('cors');
const path = require('path');
const pagamentoRoutes = require('./routes/pagamento');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/pagamentos', pagamentoRoutes);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

module.exports = app;