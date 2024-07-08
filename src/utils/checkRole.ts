import { ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Roles } from './const/const';

const prisma = new PrismaClient();

export async function checkRoleLevel(userId: string, level: string) {
  if (!userId || !level) {
    throw new ForbiddenException('Access to resources denied');
  }

  checkRoleExist(level);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user && user.roleId) {
    const role = await prisma.role.findFirst({
      where: {
        id: user.roleId,
      },
    });

    if (role && role.id) {
      checkRoleExist(role.name);
      if (level === Roles.ADMIN && role.name !== Roles.ADMIN) {
        throw new ForbiddenException('Access to resources denied');
      }
    } else {
      throw new ForbiddenException('Access to resources denied');
    }
  } else {
    throw new ForbiddenException('Access to resources denied');
  }
}

function checkRoleExist(role: string) {
  switch (role) {
    case Roles.ADMIN:
    case Roles.USER:
      break;
    default:
      throw new ForbiddenException('Access to resources denied');
  }
}

export async function checkUserHasAccount(jwtId: string) {
  if (jwtId) {
    const user = await prisma.user.findUnique({
      where: {
        id: jwtId,
        isActive: true,
      },
    });
    if (!user || !user.id) {
      throw new ForbiddenException('Access to resources denied');
    }
  } else {
    throw new ForbiddenException('Access to resources denied');
  }
}

export async function checkuserIsAdmin(jwtId: string) {
  if (jwtId) {
    const user = await prisma.user.findUnique({
      where: {
        id: jwtId,
        isActive: true,
      },
      include: {
        role: true,
      },
    });
    if (!user || !user.id) {
      throw new ForbiddenException('Access to resources denied2');
    }

    if (user.role.name !== Roles.ADMIN) {
      throw new ForbiddenException('Access to resources denied3');
    }
  } else {
    throw new ForbiddenException('Access to resources denied4');
  }
}
