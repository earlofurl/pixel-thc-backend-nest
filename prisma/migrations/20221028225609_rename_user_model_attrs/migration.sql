/*
  Warnings:

  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_provider_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "first_name",
DROP COLUMN "hashed_password",
DROP COLUMN "last_name",
DROP COLUMN "provider_id",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_providerId_key" ON "user"("providerId");
