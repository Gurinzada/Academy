/*
  Warnings:

  - Added the required column `idexercicio` to the `aulas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aulas" ADD COLUMN     "idexercicio" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "exercicios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "exercicios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_idexercicio_fkey" FOREIGN KEY ("idexercicio") REFERENCES "exercicios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
