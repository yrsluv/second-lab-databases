-- DropForeignKey
ALTER TABLE "Observations" DROP CONSTRAINT "Observations_astronomerId_fkey";

-- DropForeignKey
ALTER TABLE "Observations" DROP CONSTRAINT "Observations_eventId_fkey";

-- AlterTable
ALTER TABLE "Observations" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "astronomerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Observations" ADD CONSTRAINT "Observations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observations" ADD CONSTRAINT "Observations_astronomerId_fkey" FOREIGN KEY ("astronomerId") REFERENCES "Astronomers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
