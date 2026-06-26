import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  activities?: Types.ObjectId[];
  duration_min?: number;
  date?: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  duration_min: { type: Number },
  date: { type: Date, default: () => new Date() },
});

const Workout = model<IWorkout>('Workout', WorkoutSchema);
export default Workout;
