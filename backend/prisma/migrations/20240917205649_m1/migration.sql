-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "namerole" TEXT NOT NULL,
    "userid" INTEGER NOT NULL,
    "professorid" INTEGER NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professor_email_key" ON "professor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_namerole_key" ON "role"("namerole");

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_userid_fkey" FOREIGN KEY ("userid") REFERENCES "aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_professorid_fkey" FOREIGN KEY ("professorid") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
