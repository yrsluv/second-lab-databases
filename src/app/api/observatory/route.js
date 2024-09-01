import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const observatories = await prisma.observatory.findMany();

    const filterUniqueNames = (observatories) => {
      const seenNames = new Map();
      return observatories.filter(observatory => {
        if (!seenNames.has(observatory.name)) {
          seenNames.set(observatory.name, true);
          return true;
        }
        return false;
      });
    };


    return NextResponse.json({
      success: true,
      data: filterUniqueNames(observatories).sort((a, b) => a.name.localeCompare(b.name)),
    })
      ;
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    })
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req, res) {
  const { name, description, country, latitude, longitude, date, workers } = await req.json();

  try {
    const observatory = await prisma.observatory.create({
      data: {
        name: name,
        description: description,
        countryId: country,
        latitude: +latitude,
        longitude: +longitude,
        openDate: date,
        workersAmount: +workers,
      }
    })


    return NextResponse.json({
      success: true,
      data: observatory,
    })
      ;
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    })
  } finally {
    await prisma.$disconnect();
  }
}

