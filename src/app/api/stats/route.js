import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

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
    console.log(statistics)

    const observatoryStatistics = statistics
                                            .filter(obs => obs.observations.length)
                                            .map(obs => ({
                                              Страна: obs.country.value,
                                              Обсерватория: obs.name,
                                              Год: new Date(obs.observations[0].date).getFullYear(),
                                              События: obs.observations.length,
                                            }
                                          ));

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
