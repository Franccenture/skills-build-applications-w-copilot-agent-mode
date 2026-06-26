import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000; // fixed port per project requirement
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit';

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Simple health check
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Bind to 0.0.0.0 so Codespaces / containers can expose the port
    app.listen(PORT, '0.0.0.0', () => {
      const local = `http://localhost:${PORT}`;
      let apiUrl = local;
      // Codespaces-aware preview URL using CODESPACE_NAME
      if (process.env.CODESPACE_NAME) {
        apiUrl = `https://${process.env.CODESPACE_NAME}-${PORT}.githubpreview.dev`;
      }
      console.log(`Backend listening on ${local}`);
      console.log(`API base URL: ${apiUrl}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
