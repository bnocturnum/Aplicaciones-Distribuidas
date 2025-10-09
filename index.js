const express = require('express');
const crypto = require('crypto');
const app = express();

app.use(express.json());

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// Función de validación general
function validarCampos(req, res, campos) {
  for (let campo of campos) {
    if (!req.body[campo]) {
      return res.json({
        name: req.body.name || null,
        id: req.body.id || null,
        error: `Falta el parámetro: ${campo}`,
      });
    }
  }
  return null;
}

// --- mascaracteres ---
app.post('/mascaracteres', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1', 'cadena2']);
  if (error) return;

  const { name, id, cadena1, cadena2 } = req.body;
  const resultado = cadena1.length >= cadena2.length ? cadena1 : cadena2;

  res.json({ name, id, resultado });
});

// --- menoscaracteres ---
app.post('/menoscaracteres', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1', 'cadena2']);
  if (error) return;

  const { name, id, cadena1, cadena2 } = req.body;
  const resultado = cadena1.length <= cadena2.length ? cadena1 : cadena2;

  res.json({ name, id, resultado });
});

// --- numcaracteres ---
app.post('/numcaracteres', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1']);
  if (error) return;

  const { name, id, cadena1 } = req.body;
  res.json({ name, id, resultado: cadena1.length });
});

// --- palindroma ---
app.post('/palindroma', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1']);
  if (error) return;

  const { name, id, cadena1 } = req.body;
  const limpia = cadena1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const esPalindroma = limpia === limpia.split('').reverse().join('');

  res.json({ name, id, resultado: esPalindroma });
});

// --- concat ---
app.post('/concat', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1', 'cadena2']);
  if (error) return;

  const { name, id, cadena1, cadena2 } = req.body;
  res.json({ name, id, resultado: cadena1 + cadena2 });
});

// --- applysha256 ---
app.post('/applysha256', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1']);
  if (error) return;

  const { name, id, cadena1 } = req.body;
  const encriptada = sha256(cadena1);

  res.json({ name, id, original: cadena1, encriptada });
});

// --- verifysha256 ---
app.post('/verifysha256', (req, res) => {
  const error = validarCampos(req, res, ['name', 'id', 'cadena1', 'cadena2']);
  if (error) return;

  const { name, id, cadena1, cadena2 } = req.body; // cadena1 = texto normal, cadena2 = hash
  const coincide = sha256(cadena1) === cadena2;

  res.json({ name, id, coincide });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
