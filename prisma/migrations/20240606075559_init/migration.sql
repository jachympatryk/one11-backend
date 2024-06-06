/*
  Warnings:

  - You are about to drop the column `created_by` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `opponent` on the `Event` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "created_by",
DROP COLUMN "opponent",
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
