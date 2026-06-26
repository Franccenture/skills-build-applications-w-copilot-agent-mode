import { Router } from 'express';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req, res) => {
  res.json([
    { rank: 1, user: 'Alice', score: 1500 },
    { rank: 2, user: 'Bob', score: 1400 },
  ]);
});

export default router;
