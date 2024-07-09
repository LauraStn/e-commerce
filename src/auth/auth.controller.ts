import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/auth.signin.dto';
import { SignupDto } from './dto/auth.signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Patch('/validate/:token')
  validateAccount(@Param('token') token: string) {
    return this.authService.validateAccount(token);
  }
}
