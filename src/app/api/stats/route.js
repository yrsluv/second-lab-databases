import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const statistics = await prisma.observatory.findMany({
      select: {
        country: true,
        name: true,
        observations: true
      },
    });

    const uniqueNames = new Set();
    const uniqueStatistics = statistics.filter(item => {
      if (uniqueNames.has(item.name)) {
        return false;
      } else {
        uniqueNames.add(item.name);
        return true;
      }
    });


    const observatoryStatistics = uniqueStatistics
      .map(obs => ({
        Страна: obs.country.value,
        Обсерватория: obs.name,
        Год: obs.observations.length ? new Date(obs.observations[0].date).getFullYear() : 2024,
        События: obs.observations.length ? obs.observations?.length : 0,
      }
      ))
      .sort((a, b) => (b.События - a.События))

    return NextResponse.json({
      success: true,
      data: observatoryStatistics,
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
