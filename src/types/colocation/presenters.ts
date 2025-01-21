import { Expose } from "class-transformer";
import { IsNumber, IsString, IsArray } from "class-validator";

export class ColocationPresenter {
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
    @IsString()
    owner: string;

    @Expose()
    @IsArray()
    members: string[];

    @Expose()
    @IsString()
    status: "active" | "inactive";
}