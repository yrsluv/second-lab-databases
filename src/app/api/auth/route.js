import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const dynamic = 'force-dynamic'
const prisma = new PrismaClient();
import { PrismaClient } from '@prisma/client';

export async function POST(req, res) {

  const { username, password } = await req.json();


  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        return res.status(200).json({ message: 'Пользователь с таким логином не найден', status: 401 });

    }

     const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
      return NextResponse.json(
      { message: 'Неверный пароль' }
    )

    }
    return NextResponse.json(
      { message: 'Login successful', success: true, user: { id: user.id, username: user.username } }
    )

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    })
  } finally {
    await prisma.$disconnect();
  }
}

