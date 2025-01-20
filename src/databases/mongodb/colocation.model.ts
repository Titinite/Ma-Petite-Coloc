import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface IColocation extends Document {
    name: string;
    location: string;
    area: number;
    numberOfRooms: number;
    agency?: string;
    owner: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    status: "active" | "inactive";
    createdAt?: Date;
    updatedAt?: Date;
}

const ColocationSchema: Schema = new Schema<IColocation>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    agency: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const ColocationModel = model<IColocation>("Colocation", ColocationSchema);