const express = require('express');
const User = require('../models/user');
const { hashPassword } = require('../utils/password');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'El email ya está registrado' });

    const hashed = hashPassword(password);
    const newUser = new User({ first_name, last_name, email, age, password: hashed });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

module.exports = router;
