import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOneCart(cartId: string) {
    return this.prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        cartItems: true,
      },
    });
  }

  async createCart(userId: string) {
    const existingCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });
    if (existingCart) {
      await this.updateCart(userId, existingCart.id);
    } else {
      const newCart = await this.prisma.cart.create({
        data: {
          userId: userId,
        },
      });
    }
  }

  async updateCart(userId: string, cartId: string) {
    const existingCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });

    const totalPrice = existingCart.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const newCart = await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        totalCart: totalPrice,
      },
    });
  }

  async deleteCart(userId: string, cartId: string) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await this.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }
}
