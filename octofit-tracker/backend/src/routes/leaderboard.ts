import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('user').sort({ rank: 1, score: -1 }).lean();
  res.json(entries);
});

export default router;
