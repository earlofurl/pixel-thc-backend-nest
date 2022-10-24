/*
  Warnings:

  - A unique constraint covering the columns `[tagNumber]` on the table `PackageTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PackageTag_tagNumber_key" ON "PackageTag"("tagNumber");
