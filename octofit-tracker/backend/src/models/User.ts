import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  team?: Types.ObjectId;
  role?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  role: { type: String },
  createdAt: { type: Date, default: () => new Date() },
});

const User = model<IUser>('User', UserSchema);
export default User;
