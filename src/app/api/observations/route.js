import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const country = searchParams.get('country')
  const year = searchParams.get('year')
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59);
  try {
    const observations = await prisma.observation.findMany({
      where: {
        astronomer: {
          countryId: parseInt(country, 10)
        },
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        title: true,
        date: true,
        description: true,
        event: true,
        observatory: true,
        astronomer: true,
      }
    });
    //console.log(workers)



    return NextResponse.json({
      success: true,
      data: observations.filter(observation => observation.astronomer.countryId == country),
      //data: observations.filter(observation => observation.astronomer.countryId == country),
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
  const { title, description, date, astronomer, observatory } = await req.json();

  try {
    const observation = await prisma.observation.create({
      data: {
        title: title,
        description: description,
        date: date,
        astronomerId: astronomer,
        observatoryId: observatory,
      }
    })


    return NextResponse.json({
      success: true,
      data: observation,
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

