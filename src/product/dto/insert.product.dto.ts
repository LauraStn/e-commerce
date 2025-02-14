import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class InsertProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  @IsUUID()
  categoryId: string;
}
