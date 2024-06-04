import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const minWorkersAmount = await prisma.observatory.aggregate({
      _min: {
        workersAmount: true,
      },
    });

    const maxWorkersAmount = await prisma.observatory.aggregate({
      _max: {
        workersAmount: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        minWorkersAmount: minWorkersAmount._min.workersAmount,
        maxWorkersAmount: maxWorkersAmount._max.workersAmount,
      },
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
