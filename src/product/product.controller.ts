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
import { ProductService } from './product.service';
import { InsertProductDto } from './dto/insert.product.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateProductDto } from './dto/update.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  getAllProduct() {
    return this.productService.getAllProducts();
  }

  @Get('/one/:id')
  getOneProduct(
    @Param('id')
    productId: string,
  ) {
    return this.productService.getOneProduct(productId);
  }

  @UseGuards(JwtGuard)
  @Post('/add')
  addProduct(
    @Body()
    dto: InsertProductDto,
    @GetUser() user: User,
  ) {
    console.log(dto);
    
    return this.productService.addProduct(user.id, dto);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateProduct(
    @Body()
    dto: UpdateProductDto,
    @GetUser() user: User,
    @Param('id')
    productId: string,
  ) {
    return this.productService.updateProduct(dto, user.id, productId);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteProduct(
    @GetUser() user: User,
    @Param('id')
    productId: string,
  ) {
    return this.productService.deleteProduct(user.id, productId);
  }
}
