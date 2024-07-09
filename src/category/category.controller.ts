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
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Get('/one/:id')
  getOneCategory(
    @Param('id')
    categoryId: string,
  ) {
    return this.categoryService.getOneCategory(categoryId);
  }

  @UseGuards(JwtGuard)
  @Post('/add')
  createCategory(
    @Body()
    dto: CategoryDto,
    @GetUser() user: User,
  ) {
    return this.categoryService.createCategory(dto, user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateCategory(
    @Body()
    dto: CategoryDto,
    @GetUser() user: User,
    @Param('id')
    categoryId: string,
  ) {
    return this.categoryService.updateCategory(dto, user.id, categoryId);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteCategory(
    @GetUser() user: User,
    @Param('id')
    categoryId: string,
  ) {
    return this.categoryService.deleteCategory(categoryId, user.id);
  }
}
