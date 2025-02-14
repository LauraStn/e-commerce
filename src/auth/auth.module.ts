import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailService, CartService],
})
export class AuthModule {}
