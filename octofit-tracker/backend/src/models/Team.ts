import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  _id?: Types.ObjectId;
  name: string;
  members?: Types.ObjectId[];
  createdAt?: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

const Team = model<ITeam>('Team', TeamSchema);
export default Team;
