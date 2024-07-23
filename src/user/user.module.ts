import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CartService } from 'src/cart/cart.service';

@Module({
  controllers: [UserController],
  providers: [UserService, CartService],
})
export class UserModule {}
