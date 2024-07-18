/*
  Warnings:

  - You are about to drop the column `addedAt` on the `CartItem` table. All the data in the column will be lost.
  - Added the required column `rgpd` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `addedAt`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `rgpd` VARCHAR(191) NOT NULL;
