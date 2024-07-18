/*
  Warnings:

  - You are about to drop the column `totalQuantity` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `totalQuantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `totalQuantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `totalQuantity`;
