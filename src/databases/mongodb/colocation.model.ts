import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IColocation extends Document {
    name: string;
    location: string;
    area: number;
    numberOfRooms: number;
    agency: string;
    members: IUser[];
    status: "active" | "inactive";
}

const ColocationSchema: Schema = new Schema<IColocation>({
    name: { type: String, required: true },
    location: { type: String, required: true },
    area: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    agency: { type: String, required: true },
    members: [{ type: String }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export const ColocationModel = model<IColocation>("Colocation", ColocationSchema);