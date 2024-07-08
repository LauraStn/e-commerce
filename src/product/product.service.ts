// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class ProductService {
//   constructor(private prisma: PrismaService) {}

//   getAllProducts() {
//     return this.prisma.product.findMany({
//       orderBy: {
//         createdAt: 'desc',
//       },
//       take: 20,
//     });
//   }
//   async getOneProduct(id: string) {
//     return this.prisma.product.findUnique({
//       where: {
//         id: id,
//       },
//     });
//   }
//   async createCharacter(dto: , file: Express.Multer.File) {
 
// : dto.weaponId,
 
//     const newCharacter = await this.prisma.character.create({
//       data: {
//         name: dto.name,
//         image: file.filename,
//         releaseDate: dto.releaseDate,
//         regionId: dto.regionId,
//         rarityCharacterId: dto.rarityCharacterId,
//         weaponTypeId: dto.weaponTypeId,
//         visionId: dto.visionId,
//       },
//     });
//     return newCharacter;
//   }
// }
