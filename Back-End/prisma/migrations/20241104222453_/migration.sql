/*
  Warnings:

  - You are about to alter the column `senha` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `senha` VARCHAR(191) NOT NULL;
