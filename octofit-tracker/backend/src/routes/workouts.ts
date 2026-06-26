import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET /api/workouts/
router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user').populate('activities').lean();
  res.json(workouts);
});

// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate('user').populate('activities').lean();
  if (!workout) return res.status(404).json({ error: 'Workout not found' });
  res.json(workout);
});

// POST /api/workouts/
router.post('/', async (req, res) => {
  const created = await Workout.create(req.body);
  res.status(201).json(created);
});

export default router;
