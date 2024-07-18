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
@UseGuards(JwtGuard)
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Get('/all')
  getAllCartItems(@GetUser() user: User) {
    return this.cartItemService.getAllCartItem(user.id);
  }

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

  @Delete('/delete/:id')
  deleteProduct(
    @GetUser() user: User,
    @Param('id')
    cartItemId: string,
  ) {
    console.log(cartItemId);

    return this.cartItemService.deleteCartItem(user.id, cartItemId);
  }
}
