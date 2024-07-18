import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
