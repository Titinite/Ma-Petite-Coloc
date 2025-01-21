import mongoose, { Schema, model, Document } from "mongoose";

export interface IColocation extends Document {
    name: string;
    location: string;
    area: number;
    numberOfRooms: number;
    agency?: string;
    owner: string;
    members: string[];
    status: "active" | "inactive";
}

const ColocationSchema: Schema = new Schema<IColocation>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    agency: { type: String },
    owner: { type: String, ref: "User", required: true },
    members: [{ type: Array, ref: "User" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const ColocationModel = model<IColocation>("Colocation", ColocationSchema);