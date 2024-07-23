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
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.',
    },
  )
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
