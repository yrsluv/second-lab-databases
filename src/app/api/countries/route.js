import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const countries = await prisma.country.findMany();
    const filterUniqueValues = (countries) => {
      const seenValues = new Set();
      return countries.filter(country => {
        if (!seenValues.has(country.value)) {
          seenValues.add(country.value);
          return true;
        }
        return false;
      });
    };

    return NextResponse.json({
      success: true,
      data: filterUniqueValues(countries).sort((a, b) => a.value.localeCompare(b.value)),
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

