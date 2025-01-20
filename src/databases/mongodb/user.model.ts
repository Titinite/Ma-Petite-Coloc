import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
}

const UserSchema: Schema = new Schema<IUser>({
  id: {
    type: String, 
    required: true,
    unique: true,
    default: () => generateUniqueId()
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 18 },
});


function generateUniqueId() {
  return 'user-' + Date.now();
}

export const UserModel = mongoose.model<IUser>("User", UserSchema);