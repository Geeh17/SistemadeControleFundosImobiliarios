-- DropForeignKey
ALTER TABLE `transacao` DROP FOREIGN KEY `Transacao_ativoId_fkey`;

-- AlterTable
ALTER TABLE `transacao` MODIFY `ativoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transacao` ADD CONSTRAINT `Transacao_ativoId_fkey` FOREIGN KEY (`ativoId`) REFERENCES `Ativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
