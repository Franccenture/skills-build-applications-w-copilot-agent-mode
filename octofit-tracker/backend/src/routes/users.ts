import { Router } from 'express';

const router = Router();

// GET /api/users/
router.get('/', async (_req, res) => {
  // placeholder - return sample users
  res.json([
    { id: 'u1', name: 'Alice' },
    { id: 'u2', name: 'Bob' },
  ]);
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  res.json({ id: req.params.id, name: 'Placeholder User' });
});

// POST /api/users/
router.post('/', async (req, res) => {
  // accept body and echo back for now
  res.status(201).json({ id: 'new-user', ...req.body });
});

export default router;
