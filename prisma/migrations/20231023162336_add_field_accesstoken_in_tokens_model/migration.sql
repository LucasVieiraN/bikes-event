/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "accessToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokens_accessToken_key" ON "tokens"("accessToken");
