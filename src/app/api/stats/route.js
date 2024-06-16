import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
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

    const yearCountryStats = {};

    statistics.forEach(obs => {
      const countryName = obs.country.value;
      const year = obs.observations.length ? new Date(obs.observations[0].date).getFullYear() : 2024;

      if (!yearCountryStats[year]) {
        yearCountryStats[year] = {};
      }

      if (!yearCountryStats[year][countryName]) {
        yearCountryStats[year][countryName] = {
          Год: year,
          Страна: countryName,
          Обсерватории: 0,
          События: 0,
        };
      }

      yearCountryStats[year][countryName].Обсерватории += 1;
      yearCountryStats[year][countryName].События += obs.observations.length;
    });

    const summarizedStatistics = [];

    Object.keys(yearCountryStats).forEach(year => {
      Object.values(yearCountryStats[year]).forEach(countryStat => {
        summarizedStatistics.push(countryStat);
      });
    });

    summarizedStatistics.sort((a, b) => b.События - a.События);

    return NextResponse.json({
      success: true,
      data: summarizedStatistics,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
    });
  } finally {
    await prisma.$disconnect();
  }
}
