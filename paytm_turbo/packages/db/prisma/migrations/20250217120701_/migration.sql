/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `onRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "onRampTransaction_userId_key" ON "onRampTransaction"("userId");
