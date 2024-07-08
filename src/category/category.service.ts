import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { checkuserIsAdmin } from 'src/utils/checkRole';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getAllCategory() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getOneCategory(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createCategory(dto: CategoryDto, userId: string) {
    await checkuserIsAdmin(userId);

    const newCategory = await this.prisma.category.create({
      data: {
        name: dto.name,
      },
    });
    return newCategory;
  }

  async updateCategory(dto: CategoryDto, userId: string, categoryId: string) {
    await checkuserIsAdmin(userId);
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new ForbiddenException('does not exist');
    }
    const updateCategory = await this.prisma.category.update({
      where: {
        id: existingCategory.id,
      },
      data: {
        ...dto,
      },
    });
    return updateCategory;
  }

  async deleteCategory(categoryId: string, userId: string) {
    await checkuserIsAdmin(userId);
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!existingCategory || !existingCategory.id) {
      throw new ForbiddenException('does not exist');
    }
    await this.prisma.category.delete({
      where: {
        id: existingCategory.id,
      },
    });
  }
}
