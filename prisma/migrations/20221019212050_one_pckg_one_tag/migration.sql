/*
  Warnings:

  - A unique constraint covering the columns `[tagId]` on the table `Package` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Package_tagId_key" ON "Package"("tagId");
