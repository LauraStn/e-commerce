import {
    IsEmail,
    IsStrongPassword,
    IsNotEmpty,
    MaxLength,
    IsOptional,
  } from 'class-validator';
  
  export class SigninDto {
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email: string;
  
    @IsOptional()
    @MaxLength(255)
    pseudo: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    @MaxLength(255)
    password: string;
  }
  