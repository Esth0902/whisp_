/*
  Warnings:

  - You are about to drop the column `nom` on the `Utilisateur` table. All the data in the column will be lost.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pseudo` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "public"."StatutRelation" AS ENUM ('en_attente', 'acceptee', 'refusee', 'bloquee');

-- AlterTable
ALTER TABLE "public"."Message" ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Utilisateur" DROP COLUMN "nom",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "pseudo" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "statut" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."Conversation" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(50),
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Relation" (
    "id" SERIAL NOT NULL,
    "demandeurId" INTEGER NOT NULL,
    "receveurId" INTEGER NOT NULL,
    "statut" "public"."StatutRelation" NOT NULL DEFAULT 'en_attente',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_Participants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Participants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relation_demandeurId_receveurId_key" ON "public"."Relation"("demandeurId", "receveurId");

-- CreateIndex
CREATE INDEX "_Participants_B_index" ON "public"."_Participants"("B");

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "public"."Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Relation" ADD CONSTRAINT "Relation_demandeurId_fkey" FOREIGN KEY ("demandeurId") REFERENCES "public"."Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Relation" ADD CONSTRAINT "Relation_receveurId_fkey" FOREIGN KEY ("receveurId") REFERENCES "public"."Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Participants" ADD CONSTRAINT "_Participants_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_Participants" ADD CONSTRAINT "_Participants_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
