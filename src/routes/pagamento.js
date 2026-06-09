const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /pagamentos — lista todos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pagamento');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /pagamentos/:id — busca por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM pagamento WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0)
      return res.status(404).json({ erro: 'Pagamento não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// GET /pagamentos/pedido/:pedidoId — busca pelo ID do pedido
// Esse endpoint será usado pelo grupo de entrega
router.get('/pedido/:pedidoId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM pagamento WHERE pedido = ?',
      [req.params.pedidoId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// POST /pagamentos — registra novo pagamento
router.post('/', async (req, res) => {
  const { pedido, forma_pagamento, valor } = req.body;

  if (!pedido || !forma_pagamento || !valor)
    return res.status(400).json({ erro: 'Campos obrigatórios: pedido, forma_pagamento, valor' });

  try {
    const [result] = await db.query(
      'INSERT INTO pagamento (pedido, forma_pagamento, valor) VALUES (?, ?, ?)',
      [pedido, forma_pagamento, valor]
    );
    res.status(201).json({ id: result.insertId, pedido, forma_pagamento, valor });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// PUT /pagamentos/:id — atualiza pagamento
router.put('/:id', async (req, res) => {
  const { forma_pagamento, valor } = req.body;
  try {
    await db.query(
      'UPDATE pagamento SET forma_pagamento = ?, valor = ? WHERE id = ?',
      [forma_pagamento, valor, req.params.id]
    );
    res.json({ mensagem: 'Pagamento atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// DELETE /pagamentos/:id — remove pagamento
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM pagamento WHERE id = ?', [req.params.id]);
    res.json({ mensagem: 'Pagamento removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;