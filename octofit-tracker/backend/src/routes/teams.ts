import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

// GET /api/teams/
router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

// GET /api/teams/:id
router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members').lean();
  if (!team) return res.status(404).json({ error: 'Team not found' });
  res.json(team);
});

// POST /api/teams/
router.post('/', async (req, res) => {
  const created = await Team.create(req.body);
  res.status(201).json(created);
});

export default router;
