import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

// Seed the octofit_db database with test data
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Starting seed: Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding');

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const teamAlpha = await Team.create({ name: 'Team Alpha' });
  const teamBeta = await Team.create({ name: 'Team Beta' });

  // Create users
  const alice = await User.create({ name: 'Alice Runner', email: 'alice@example.com', team: teamAlpha._id, role: 'member' });
  const bob = await User.create({ name: 'Bob Cyclist', email: 'bob@example.com', team: teamBeta._id, role: 'member' });
  const carol = await User.create({ name: 'Carol Coach', email: 'carol@example.com', role: 'coach' });

  // Update team members
  teamAlpha.members = [alice._id];
  teamBeta.members = [bob._id];
  await teamAlpha.save();
  await teamBeta.save();

  // Create activities
  const a1 = await Activity.create({ user: alice._id, type: 'run', distance_km: 10, duration_min: 50, date: new Date() });
  const a2 = await Activity.create({ user: alice._id, type: 'swim', distance_km: 2, duration_min: 40, date: new Date() });
  const a3 = await Activity.create({ user: bob._id, type: 'bike', distance_km: 25, duration_min: 70, date: new Date() });

  // Create workouts
  const w1 = await Workout.create({ user: alice._id, activities: [a1._id, a2._id], duration_min: 90, date: new Date() });
  const w2 = await Workout.create({ user: bob._id, activities: [a3._id], duration_min: 70, date: new Date() });

  // Create leaderboard entries (simple scoring: distance*10)
  const aliceScore = (a1.distance_km || 0) + (a2.distance_km || 0);
  const bobScore = (a3.distance_km || 0);

  await Leaderboard.create({ user: alice._id, score: aliceScore * 10, rank: 1 });
  await Leaderboard.create({ user: bob._id, score: bobScore * 10, rank: 2 });

  console.log('Seeding complete: inserted users, teams, activities, workouts, leaderboard entries');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
