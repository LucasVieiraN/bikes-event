/*
  Warnings:

  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_id",
ADD COLUMN     "event_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
