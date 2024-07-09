import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertProductDto } from './dto/insert.product.dto';
import { checkuserIsAdmin } from 'src/utils/checkRole';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getAllProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });
  }

  async getOneProduct(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async addProduct(userId: string, dto: InsertProductDto) {
    await checkuserIsAdmin(userId);
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: dto.categoryId,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new ForbiddenException('category does not exist');
    }

    const newProduct = await this.prisma.product.create({
      data: {
        ...dto,
      },
    });
    return newProduct;
  }

  async updateProduct(
    dto: UpdateProductDto,
    userId: string,
    productId: string,
  ) {
    await checkuserIsAdmin(userId);
    const existingproduct = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!existingproduct || !existingproduct.id) {
      throw new ForbiddenException('does not exist');
    }
    const updateProduct = await this.prisma.product.update({
      where: {
        id: existingproduct.id,
      },
      data: {
        ...dto,
      },
    });
    return updateProduct;
  }

  async deleteProduct(userId: string, productId: string) {
    await checkuserIsAdmin(userId);
    const existingproduct = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!existingproduct || !existingproduct.id) {
      throw new ForbiddenException('does not exist');
    }
    await this.prisma.product.delete({
      where: {
        id: existingproduct.id,
      },
    });
  }
}
