import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  score: number;
  rank?: number;
  updatedAt?: Date;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number },
  updatedAt: { type: Date, default: () => new Date() },
});

const Leaderboard = model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
export default Leaderboard;
