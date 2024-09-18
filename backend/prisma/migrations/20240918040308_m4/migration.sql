/*
  Warnings:

  - You are about to drop the column `professorid` on the `aluno` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "aluno" DROP CONSTRAINT "aluno_professorid_fkey";

-- AlterTable
ALTER TABLE "aluno" DROP COLUMN "professorid";

-- CreateTable
CREATE TABLE "aulas" (
    "id" SERIAL NOT NULL,
    "horario" TEXT NOT NULL,
    "idprofessor" INTEGER NOT NULL,
    "idaluno" INTEGER NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
