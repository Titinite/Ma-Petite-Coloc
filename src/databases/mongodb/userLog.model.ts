import mongoose, { Schema, Document } from "mongoose";

export interface IUserLog extends Document {
    email: string; 
    action: string; 
    timestamp: Date; 
}

const UserLogSchema: Schema = new Schema({
    email: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const UserLogModel = mongoose.model<IUserLog>("UserLog", UserLogSchema);
