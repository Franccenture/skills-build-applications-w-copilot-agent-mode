import { Router } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users/
router.get('/', async (_req, res) => {
  const users = await User.find().populate('team').lean();
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('team').lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users/
router.post('/', async (req, res) => {
  const created = await User.create(req.body);
  res.status(201).json(created);
});

export default router;
