-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('negociacao', 'finalizado', 'aprovado');

-- CreateTable
CREATE TABLE "Briefing" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "Estado" NOT NULL,

    CONSTRAINT "Briefing_pkey" PRIMARY KEY ("id")
);
