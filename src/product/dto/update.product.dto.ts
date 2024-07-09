import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
