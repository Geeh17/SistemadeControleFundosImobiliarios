/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_googleId_key` ON `Usuario`(`googleId`);
