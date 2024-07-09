import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkuserIsAdmin } from 'src/utils/checkRole';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(userId: string) {
    await checkuserIsAdmin(userId);
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      select: {
        id: true,
        email: true,
        pseudo: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        roleId: true,
        orders: true,
        carts: true
      },
    });
  }

  async getOneUser(userId: string, userAdmin: string) {
    await checkuserIsAdmin(userAdmin);
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        pseudo: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        roleId: true,
        orders: true,
        carts: true
      },
      
    });
  }

  async banUser(userId: string, userAdmin: string) {
    await checkuserIsAdmin(userAdmin);

    const banUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  }

  async deleteUser(userId: string, userAdmin: string) {
    await checkuserIsAdmin(userAdmin);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser || !existingUser.id) {
      throw new ForbiddenException('does not exist');
    }
    await this.prisma.user.delete({
      where: {
        id: existingUser.id,
      },
    });
  }
}
