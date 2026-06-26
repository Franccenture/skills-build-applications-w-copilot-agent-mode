import { Router } from 'express';

const router = Router();

// GET /api/teams/
router.get('/', async (_req, res) => {
  res.json([
    { id: 't1', name: 'Team Alpha' },
    { id: 't2', name: 'Team Beta' },
  ]);
});

// GET /api/teams/:id
router.get('/:id', async (req, res) => {
  res.json({ id: req.params.id, name: 'Placeholder Team' });
});

// POST /api/teams/
router.post('/', async (req, res) => {
  res.status(201).json({ id: 'new-team', ...req.body });
});

export default router;
