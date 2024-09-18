/*
  Warnings:

  - Added the required column `professorid` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "professorid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleid" INTEGER NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_professorid_fkey" FOREIGN KEY ("professorid") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
