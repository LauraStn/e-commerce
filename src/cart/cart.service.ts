import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getOneCart(userId: string) {
    return this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });
  }

  async createCart(userId: string) {
    const newCart = await this.prisma.cart.create({
      data: {
        userId: userId,
      },
    });
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

    const totalQuantity = existingCart.cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    const newCart = await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        totalCart: totalPrice,
        totalQuantity: totalQuantity,
      },
    });
  }
  async deleteCart(userId1: string) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId1,
      }
    });
    console.log(userCart);
    
    await this.prisma.cart.delete({
      where: {
        userId: userCart.userId,
      },
    });
  }

  async deleteCartItem(userId: string) {
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
    await this.updateCart(userId, userCart.id);
  }
}
