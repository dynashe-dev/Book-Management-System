import { IsEmail, IsString, MinLength } from "class-validator";

//dto for login, validates email and password before passing to service
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}