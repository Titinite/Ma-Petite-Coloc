import { Expose } from "class-transformer";
import { IsNumber, IsString, IsEmail } from "class-validator";

export class UserToCreateDTO {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsNumber()
  age: number;
}