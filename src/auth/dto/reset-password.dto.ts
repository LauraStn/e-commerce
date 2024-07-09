import { IsEmail, MaxLength, IsOptional } from 'class-validator';

export class ResetPasswordDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @MaxLength(255)
  pseudo: string;
}
