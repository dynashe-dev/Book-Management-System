import { IsEmail, IsString, MinLength } from 'class-validator';

//dto for register, validates email, username and password before passing to service
export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}