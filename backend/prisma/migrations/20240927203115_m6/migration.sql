/*
  Warnings:

  - Added the required column `dia` to the `aulas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "aulas" ADD COLUMN     "dia" TEXT NOT NULL;
