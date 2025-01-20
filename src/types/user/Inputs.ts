import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class userToCreateInput {
  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  lastname: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsNumber()
  age: number;

  @Expose()
  @IsString()
  password_hash: string;
}