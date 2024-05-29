/*
  Warnings:

  - You are about to drop the column `bodyTypeId` on the `CelestialBodies` table. All the data in the column will be lost.
  - You are about to drop the `BodyType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `CelestialBodies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `CelestialBodies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CelestialBodies" DROP CONSTRAINT "CelestialBodies_bodyTypeId_fkey";

-- AlterTable
ALTER TABLE "CelestialBodies" DROP COLUMN "bodyTypeId",
ADD COLUMN     "code" VARCHAR(50) NOT NULL,
ADD COLUMN     "value" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "BodyType";
