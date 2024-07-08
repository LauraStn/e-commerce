import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
// import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    // ProductModule,
    CategoryModule,
    CartModule,
    OrderModule,
    EmailModule,
    AuthModule,
    ImageModule,
    PrismaModule,
  ],
})
export class AppModule {}
