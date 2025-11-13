require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const sessionRouter = require('./routes/sessions');

const app = express();
app.use(express.json());

app.use('/api/sessions', sessionRouter);

mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));


app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Base Fenty Beauty', price: 20000 },
    { id: 2, name: 'Gloss Bomb', price: 15000 }
  ]);
});


app.listen(8080, () => console.log('Servidor en http://localhost:8080'));
