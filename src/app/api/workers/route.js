import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const min = searchParams.get('min')
  const max = searchParams.get('max')
  try {
    const workers = await prisma.observatory.findMany({
      where: {
        workersAmount: {
          gte: +min,
          lte: +max,
        }
      },
      select: {
        country: true,
        name: true,
        description: true,
        latitude: true,
        longitude: true,
        openDate: true,
        workersAmount: true,
      }
    });
    //console.log(workers)



    return NextResponse.json({
      success: true,
      data: workers,
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
