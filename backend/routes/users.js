// routes/users.js

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET: ottieni tutti gli utenti
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: crea un nuovo utente
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: aggiorna un utente esistente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE: elimina un utente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
