import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const countryId = searchParams.get('country')
  try {
    const observations = await prisma.observation.findMany({
      where: {
        astronomer: {
          countryId: parseInt(countryId, 10)
        }
      },
      select: {
        date: true
      }
    });
    const years = [...new Set(observations.map(obs => new Date(obs.date).getFullYear()))];
    return NextResponse.json({
      success: true,
      data: years,
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
