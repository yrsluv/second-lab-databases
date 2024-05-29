import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const countries = await prisma.country.findMany();


    return NextResponse.json({
      success: true,
      data: countries,
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
  //console.log(req.body)
  const { value, code } = await req.json();

  try {
    const country = await prisma.country.create({
      data: {
        value: value,
        code: code,
      }
    })


    return NextResponse.json({
      success: true,
      data: country,
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

