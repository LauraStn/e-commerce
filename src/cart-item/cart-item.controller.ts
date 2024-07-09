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
import { CartItemService } from './cart-item.service';
import { CartItemDto } from './dto/cart-item.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get('/all')
  getAllCartItems(@GetUser() user: User) {
    return this.cartItemService.getAllCartItem(user.id);
  }

  @UseGuards(JwtGuard)
  @Post('/add/:id')
  addProduct(
    @Body()
    dto: CartItemDto,
    @GetUser() user: User,
    @Param('id')
    productId: string,
  ) {
    return this.cartItemService.addCartItem(user.id, productId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateProduct(
    @Body()
    dto: CartItemDto,
    @GetUser() user: User,
    @Param('id')
    cartItemId: string,
  ) {
    return this.cartItemService.updateCartItem(user.id, cartItemId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(
    @GetUser() user: User,
    @Param('id')
    cartItemId: string,
  ) {
    return this.cartItemService.deleteCartItem(user.id, cartItemId);
  }
}
