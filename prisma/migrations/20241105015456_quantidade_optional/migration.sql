/*
  Warnings:

  - Added the required column `usuarioId` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transacao` ADD COLUMN `usuarioId` INTEGER NOT NULL,
    MODIFY `quantidade` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
