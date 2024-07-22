import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/auth.signin.dto';
import { SignupDto } from './dto/auth.signup.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Response } from 'express';

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

  @Get('/validate/:token')
  async validateAccount(@Param('token') token: string, @Res() res: Response) {
    const resp = await this.authService.validateAccount(token);
    if (resp) {
     return res.redirect('http://localhost:3001/myapp/validateAccount');
    
    }
    return res.redirect('http://localhost:3001/myapp/notfound');
  }

  @Post('/reset')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
