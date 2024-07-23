import { ForbiddenException, Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkuserIsAdmin } from 'src/utils/checkRole';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private Cart: CartService,
  ) {}

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
        cart: true,
      },
    });
  }

  async getOneUser(userId: string) {
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
        cart: true,
      },
    });
  }

  async banUser(userId: string, userAdmin: string) {
    await checkuserIsAdmin(userAdmin);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(existingUser);

    const banUser = await this.prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isActive: false,
      },
    });
    return banUser;
  }

  async deleteUser(userId: string, userAdmin: string) {
    await checkuserIsAdmin(userAdmin);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cart: true,
      },
    });
    if (!existingUser) {
      throw new ForbiddenException('does not exist');
    }
    console.log(existingUser);
    if (existingUser.cart || existingUser.cart === null) {
      await this.Cart.deleteCart(existingUser.id);
      return;
    }
    await this.prisma.user.delete({
      where: {
        id: existingUser.id,
      },
    });
  }
}
