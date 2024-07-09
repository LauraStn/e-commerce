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

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/one/:id')
  getOneCart(
    @Param('id')
    cartId: string,
  ) {
    return this.cartService.getOneCart(cartId);
  }

  @UseGuards(JwtGuard)
  @Post('/add')
  createCart(@GetUser() user: User) {
    return this.cartService.createCart(user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('/add/:id')
  updateCart(@Param('id')
  cartId: string,@GetUser() user: User) {
    return this.cartService.updateCart(user.id, cartId);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteCart(
    @Param('id')
    cartId: string,
    @GetUser() user: User,
  ) {
    return this.cartService.deleteCart(user.id, cartId);
  }
}
