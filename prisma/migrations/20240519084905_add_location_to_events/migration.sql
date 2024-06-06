-- DropIndex
DROP INDEX "Event_teamId_idx";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "locationId" INTEGER;

-- CreateIndex
CREATE INDEX "Event_teamId_locationId_idx" ON "Event"("teamId", "locationId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
