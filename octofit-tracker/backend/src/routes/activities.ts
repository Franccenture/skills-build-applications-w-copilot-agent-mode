import { Router } from 'express';

const router = Router();

// GET /api/activities/
router.get('/', async (_req, res) => {
  res.json([
    { id: 'a1', type: 'run', distance_km: 5 },
    { id: 'a2', type: 'bike', distance_km: 20 },
  ]);
});

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  res.json({ id: req.params.id, type: 'run', distance_km: 5 });
});

// POST /api/activities/
router.post('/', async (req, res) => {
  res.status(201).json({ id: 'new-activity', ...req.body });
});

export default router;
