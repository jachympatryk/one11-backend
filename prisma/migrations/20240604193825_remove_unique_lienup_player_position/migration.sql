/*
  Warnings:

  - A unique constraint covering the columns `[lineupId]` on the table `LineupPlayer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LineupPlayer_lineupId_playerPosition_key";

-- CreateIndex
CREATE UNIQUE INDEX "LineupPlayer_lineupId_key" ON "LineupPlayer"("lineupId");
