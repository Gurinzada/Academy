/*
  Warnings:

  - You are about to drop the column `idexercicio` on the `aulas` table. All the data in the column will be lost.
  - You are about to drop the `exercicios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "aulas" DROP CONSTRAINT "aulas_idexercicio_fkey";

-- AlterTable
ALTER TABLE "aulas" DROP COLUMN "idexercicio";

-- DropTable
DROP TABLE "exercicios";
