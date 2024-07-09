/*
  Warnings:

  - Added the required column `totalCart` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalItem` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `totalCart` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `CartItem` ADD COLUMN `totalItem` DOUBLE NOT NULL;
