/*
  Warnings:

  - You are about to drop the column `coordinatesSystemId` on the `CelestialBodies` table. All the data in the column will be lost.
  - You are about to drop the column `coordinatesSystemId` on the `Observatories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CelestialBodies" DROP CONSTRAINT "CelestialBodies_coordinatesSystemId_fkey";

-- DropForeignKey
ALTER TABLE "Observatories" DROP CONSTRAINT "Observatories_coordinatesSystemId_fkey";

-- AlterTable
ALTER TABLE "CelestialBodies" DROP COLUMN "coordinatesSystemId";

-- AlterTable
ALTER TABLE "Observatories" DROP COLUMN "coordinatesSystemId";
