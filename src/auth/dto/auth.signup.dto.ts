import {
    IsEmail,
    IsStrongPassword,
    IsNotEmpty,
    MaxLength,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    @MaxLength(255)
    password: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    lastName: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(255)
    pseudo: string;
  }