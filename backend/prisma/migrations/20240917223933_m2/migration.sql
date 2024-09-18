/*
  Warnings:

  - You are about to drop the column `professorid` on the `role` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `role` table. All the data in the column will be lost.
  - You are about to drop the `professor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleid` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_professorid_fkey";

-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_userid_fkey";

-- AlterTable
ALTER TABLE "aluno" ADD COLUMN     "roleid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "role" DROP COLUMN "professorid",
DROP COLUMN "userid";

-- DropTable
DROP TABLE "professor";

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
