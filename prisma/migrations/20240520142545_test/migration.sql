-- CreateTable
CREATE TABLE "Observations" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "observatoryId" INTEGER NOT NULL,
    "astronomerId" INTEGER NOT NULL,

    CONSTRAINT "Observations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Astronomers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "biography" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Astronomers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observatories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "coordinatesSystemId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "openDate" TIMESTAMP(3) NOT NULL,
    "workersAmount" INTEGER NOT NULL,

    CONSTRAINT "Observatories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "coordinatesSystemId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bodyId" INTEGER NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CelestialBodies" (
    "id" SERIAL NOT NULL,
    "bodyTypeId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mass" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "azimuth" DOUBLE PRECISION NOT NULL,
    "radius" INTEGER NOT NULL,
    "distanceFromEarth" INTEGER NOT NULL,
    "coordinatesSystemId" INTEGER NOT NULL,

    CONSTRAINT "CelestialBodies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(2) NOT NULL,
    "value" VARCHAR(50) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyType" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "value" VARCHAR(50) NOT NULL,

    CONSTRAINT "BodyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinateSystem" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "value" VARCHAR(50) NOT NULL,

    CONSTRAINT "CoordinateSystem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Observations" ADD CONSTRAINT "Observations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observations" ADD CONSTRAINT "Observations_observatoryId_fkey" FOREIGN KEY ("observatoryId") REFERENCES "Observatories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observations" ADD CONSTRAINT "Observations_astronomerId_fkey" FOREIGN KEY ("astronomerId") REFERENCES "Astronomers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Astronomers" ADD CONSTRAINT "Astronomers_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observatories" ADD CONSTRAINT "Observatories_coordinatesSystemId_fkey" FOREIGN KEY ("coordinatesSystemId") REFERENCES "CoordinateSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observatories" ADD CONSTRAINT "Observatories_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_coordinatesSystemId_fkey" FOREIGN KEY ("coordinatesSystemId") REFERENCES "CoordinateSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "CelestialBodies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CelestialBodies" ADD CONSTRAINT "CelestialBodies_bodyTypeId_fkey" FOREIGN KEY ("bodyTypeId") REFERENCES "BodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CelestialBodies" ADD CONSTRAINT "CelestialBodies_coordinatesSystemId_fkey" FOREIGN KEY ("coordinatesSystemId") REFERENCES "CoordinateSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
