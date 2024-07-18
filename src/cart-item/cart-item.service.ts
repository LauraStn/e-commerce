import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemDto } from './dto/cart-item.dto';
import { CartService } from 'src/cart/cart.service';
import { allowedNodeEnvironmentFlags } from 'process';

@Injectable()
export class CartItemService {
  constructor(
    private prisma: PrismaService,
    private Cart: CartService,
  ) {}

  async getAllCartItem(userId: string) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });

    const allCartItem = await this.prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
      },
      include: {
        product: true,
      },
    });
    return allCartItem;
  }

  async addCartItem(userId: string, productId: string, dto: CartItemDto) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    const existingCartItem = userCart.cartItems.find(
      (item) => item.productId === productId,
    );

    if (existingCartItem) {
      const updatedCartItem = await this.prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + dto.quantity,
        },
      });

      await this.Cart.updateCart(userId, userCart.id);

      return updatedCartItem;
    } else {
      const newCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: productId,
          quantity: dto.quantity,
          price: product.price,
        },
      });

      await this.Cart.updateCart(userId, userCart.id);

      return newCartItem;
    }
  }

  async updateCartItem(userId: string, cartItemId: string, dto: CartItemDto) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });
    await this.Cart.updateCart(userId, userCart.id);

    const existingCartItem = userCart.cartItems.find(
      (item) => item.id === cartItemId,
    );

    if (existingCartItem) {
      const updatedCartItem = await this.prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: dto.quantity,
        },
      });

      await this.Cart.updateCart(userId, userCart.id);

      return updatedCartItem;
    } else {
      throw new NotFoundException('not found');
    }
  }

  async deleteCartItem(userId: string, cartItemId: string) {
    const userCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        cartItems: true,
      },
    });
    const existingCartItem = userCart.cartItems.find(
      (item) => item.id === cartItemId,
    );

    if (existingCartItem) {
      await this.prisma.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
    }
    await this.Cart.updateCart(userId, userCart.id);
    return { msg: 'Product removed !' };
  }
}
