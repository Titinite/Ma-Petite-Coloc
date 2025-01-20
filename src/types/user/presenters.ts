import { Expose } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserPresenter {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsNumber()
  age: number;

  @Expose()
  @IsString()
  firstname: string;

  @Expose()
  @IsString()
  lastname: string;
}