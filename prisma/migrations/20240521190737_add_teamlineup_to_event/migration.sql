/*
  Warnings:

  - You are about to drop the column `line_up` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "line_up",
ADD COLUMN     "lineupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_lineupId_fkey" FOREIGN KEY ("lineupId") REFERENCES "TeamLineup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
