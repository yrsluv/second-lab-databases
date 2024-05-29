/*
  Warnings:

  - You are about to drop the column `azimuth` on the `CelestialBodies` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `CelestialBodies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CelestialBodies" DROP COLUMN "azimuth",
DROP COLUMN "height";
