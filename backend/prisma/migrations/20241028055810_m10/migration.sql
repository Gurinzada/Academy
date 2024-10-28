-- CreateTable
CREATE TABLE "blackList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blackList_pkey" PRIMARY KEY ("id")
);
