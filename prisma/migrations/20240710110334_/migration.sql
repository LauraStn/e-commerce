/*
  Warnings:

  - You are about to drop the column `rgpd` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `rgpd`,
    ADD COLUMN `gdpr` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
