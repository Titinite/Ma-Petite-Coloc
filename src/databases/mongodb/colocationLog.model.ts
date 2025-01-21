import mongoose, { Schema, Document } from "mongoose";

export interface IColocationLog extends Document {
    name: string; 
    action: string; 
    timestamp: Date; 
}

const ColocationLogSchema: Schema = new Schema({
    name: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const ColocationLogModel = mongoose.model<IColocationLog>("ColocationLog", ColocationLogSchema);
