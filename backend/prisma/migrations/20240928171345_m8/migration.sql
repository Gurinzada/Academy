-- CreateTable
CREATE TABLE "aprovelist" (
    "id" SERIAL NOT NULL,
    "idaluno" INTEGER NOT NULL,
    "idprofessor" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "dia" TEXT NOT NULL,

    CONSTRAINT "aprovelist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aprovelist" ADD CONSTRAINT "aprovelist_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprovelist" ADD CONSTRAINT "aprovelist_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
