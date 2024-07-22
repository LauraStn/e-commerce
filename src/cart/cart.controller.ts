import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { InsertProductDto } from 'src/product/dto/insert.product.dto';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/one')
  getOneCart(@GetUser() user: User) {
    return this.cartService.getOneCart(user.id);
  }

  @Post('/add')
  createCart(@GetUser() user: User) {
    console.log(user);

    return this.cartService.createCart(user.id);
  }

  @Patch('/add/:id')
  updateCart(
    @Param('id')
    cartId: string,
    @GetUser() user: User,
  ) {
    return this.cartService.updateCart(user.id, cartId);
  }

  @Delete('/clearCart')
  deleteCartItem(@GetUser() user: User) {
    return this.cartService.deleteCartItem(user.id);
  }

  @Delete('/delete')
  deleteCart(@GetUser() user: User) {
    return this.cartService.deleteCart(user.id);
  }
}
