import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities/
router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user').lean();
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.json(activity);
});

// POST /api/activities/
router.post('/', async (req, res) => {
  const created = await Activity.create(req.body);
  res.status(201).json(created);
});

export default router;
