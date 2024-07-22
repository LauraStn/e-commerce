import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  Redirect,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { SigninDto } from './dto/auth.signin.dto';
import { SignupDto } from './dto/auth.signup.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
    private Cart: CartService,
  ) {}
  async signup(dto: SignupDto) {
    if (
      !dto.email ||
      !dto.firstName ||
      !dto.lastName ||
      !dto.password ||
      !dto.pseudo
    ) {
      throw new BadRequestException('Missing fields');
    }
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException('Email already taken');
    }
    const existingPseudo = await this.prisma.user.findUnique({
      where: {
        pseudo: dto.pseudo,
      },
    });
    if (existingPseudo) {
      throw new ForbiddenException('Pseudo already taken');
    }
    const hash = await argon.hash(dto.password);
    const userRole = await this.prisma.role.findUnique({
      where: {
        name: 'user',
      },
    });
    const activationToken = await argon.hash(`${dto.email}+${dto.pseudo}`);
    const cleanToken = activationToken.replaceAll('/', 'j');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        pseudo: dto.pseudo,
        roleId: userRole.id,
        password: hash,
        token: cleanToken,
      },
    });

    await this.emailService.sendUserConfirmation(user, cleanToken);
    return 'Email sent with link to activate your account';
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { pseudo: dto.pseudo }],
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid crendentials');
    }
    if (user.isActive === false) {
      throw new ForbiddenException('Inactive account');
    }
    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid crendentials');
    }
    const token = await this.signToken(user.id);
    return {
      token,
      role: user.roleId,
    };
  }

  async validateAccount(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      return false
    }
    await this.Cart.createCart(user.id);

    const validateAccount = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
        token: null,
      },
    });
    
    return true;
  }

  async resetPassword(dto: ResetPasswordDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { pseudo: dto.pseudo }],
      },
    });
    if (!existingUser) {
      throw new ForbiddenException('Email not found');
    }
    const activationToken = await argon.hash(
      `${existingUser.email}+${existingUser.pseudo}`,
    );
    const cleanToken = activationToken.replaceAll('/', '');
    const udpateUserToken = await this.prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        token: cleanToken,
      },
    });
    await this.emailService.sendResetPassword(existingUser, cleanToken);
    return 'Email sent with link to reset your password';
  }

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
