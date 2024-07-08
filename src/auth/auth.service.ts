// import {
//   BadRequestException,
//   ForbiddenException,
//   Injectable,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { EmailService } from 'src/email/email.service';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { SigninDto } from './dto/auth.signin.dto';
// import { SignupDto } from './dto/auth.signup.dto';
// import * as argon from 'argon2';

import {
    BadRequestException,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
 
  import * as argon from 'argon2';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { EmailService } from 'src/email/email.service';
import { SigninDto } from './dto/auth.signin.dto';
import { SignupDto } from './dto/auth.signup.dto';
  
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
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
    const exisingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (exisingUser) {
      throw new ForbiddenException('Email already taken');
    }

    const hash = await argon.hash(dto.password);
    const activationToken = await argon.hash(`${dto.email}+${dto.pseudo}`);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        pseudo: dto.pseudo,
        roleId: 'a2deefca-a4fb-4f52-9dec-98a4b958f233',
        password: hash,
        token: activationToken,
      },
    });
    await this.emailService.sendUserConfirmation(user, activationToken);
    return this.signToken(user.id);
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

    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid crendentials');
    }
    return this.signToken(user.id);
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
