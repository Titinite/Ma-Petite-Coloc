import { Expose } from "class-transformer";
import { IsNumber, IsObject, IsString } from "class-validator";
import mongoose from "mongoose";

export class ColocationToCreateDTO {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    location: string;

    @Expose()
    @IsNumber()
    area: number;

    @Expose()
    @IsNumber()
    numberOfRooms: number;

    @Expose()
    @IsString()
    agency?: string;

    @Expose()
    @IsObject()
    owner: mongoose.Types.ObjectId;

    @Expose()
    @IsObject()
    members: mongoose.Types.ObjectId[];

    @Expose()
    @IsString()
    status: "active" | "inactive";
}