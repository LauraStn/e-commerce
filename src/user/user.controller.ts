import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  getAllProduct(@GetUser() user: User) {
    return this.userService.getAllUsers(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('/one')
  getOneProduct(
    @GetUser()
    user: User,
  ) {
    return this.userService.getOneUser(user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('/ban')
  banUser(
    @GetUser() user: User,
    @Body() // @Param('id')
    userId: User,
  ) {
    return this.userService.banUser(userId.id, user.id);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteUser(
    @GetUser() user: User,
    @Param('id')
    userId: string,
  ) {
    return this.userService.deleteUser(userId, user.id);
  }
}
