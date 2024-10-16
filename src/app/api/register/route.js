import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();
import { PrismaClient } from '@prisma/client';



export async function POST(req, res) {

  const { username, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      console.log(user)

      
      return NextResponse.json({
      success: true,
      message: 'User created successfully', 
      user: user
    })
    //res.status(201).json({ message: 'User created successfully', user });

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    })
  } finally {
    await prisma.$disconnect();
  }
}

