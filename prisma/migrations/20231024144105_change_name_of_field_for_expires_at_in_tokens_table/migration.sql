/*
  Warnings:

  - You are about to drop the column `expiresDate` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "expiresDate",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
