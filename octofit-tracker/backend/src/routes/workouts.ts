import { Router } from 'express';

const router = Router();

// GET /api/workouts/
router.get('/', async (_req, res) => {
  res.json([
    { id: 'w1', user: 'u1', duration_min: 45 },
    { id: 'w2', user: 'u2', duration_min: 30 },
  ]);
});

// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
  res.json({ id: req.params.id, user: 'u1', duration_min: 45 });
});

// POST /api/workouts/
router.post('/', async (req, res) => {
  res.status(201).json({ id: 'new-workout', ...req.body });
});

export default router;
