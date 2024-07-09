import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    EmailModule,
    AuthModule,
    ImageModule,
    PrismaModule,
    CartItemModule,
  ],
})
export class AppModule {}
