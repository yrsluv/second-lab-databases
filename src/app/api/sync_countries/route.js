import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  try {
    const observations = await prisma.observation.findMany({

      select: {
        date: true,
        astronomer: true
      }
    });
    const countriesId = [...new Set(observations.map(obs => obs.astronomer.countryId))];
    const countries = await prisma.country.findMany();
    const filteredCountries = countries
      .filter(country => countriesId.includes(country.id))
      .sort((a, b) => a.value.localeCompare(b.value));


    return NextResponse.json({
      success: true,
      data: filteredCountries,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    })
  } finally {
    await prisma.$disconnect();
  }
}
