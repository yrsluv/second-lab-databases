import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET(req, res) {
  try {
    const astronomers = await prisma.astronomer.findMany();


    return NextResponse.json({
      success: true,
      data: astronomers.sort((a, b) => a.name.localeCompare(b.name)),
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
  const { name, biography, birthday, countryId } = await req.json();

  try {
    const astronomer = await prisma.astronomer.create({
      data: {
        name: name,
        biography: biography,
        birthday: birthday,
        countryId: countryId,
      }
    })


    return NextResponse.json({
      success: true,
      data: astronomer,
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

