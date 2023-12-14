/*
  Warnings:

  - Added the required column `event_creator` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "event_creator" TEXT NOT NULL;
