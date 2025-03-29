import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password)
    return NextResponse.json(
      { message: 'Todos os campos são obrigatórios' },
      { status: 400 }
    )

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser)
    return NextResponse.json(
      { message: 'E-mail já cadastrado' },
      { status: 400 }
    )

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })

  return NextResponse.json(user, { status: 201 })
}
