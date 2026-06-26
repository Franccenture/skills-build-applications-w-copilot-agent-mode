import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  type: string;
  distance_km?: number;
  duration_min?: number;
  date?: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distance_km: { type: Number },
  duration_min: { type: Number },
  date: { type: Date, default: () => new Date() },
});

const Activity = model<IActivity>('Activity', ActivitySchema);
export default Activity;
