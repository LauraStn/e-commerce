import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
