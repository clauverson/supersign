import { NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const email = formData.get('email') as string

    if (!file || !email) {
      return NextResponse.json(
        { error: 'Arquivo ou email não informado' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const fileKey = uuidv4()
    const fileName = file.name
    const fileExtension = path.extname(fileName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    await mkdir(uploadDir, { recursive: true })

    const filePath = path.join(uploadDir, `${fileKey}${fileExtension}`)
    await writeFile(filePath, buffer)

    const document = await prisma.document.create({
      data: {
        name: file.name,
        fileKey,
        userId: user.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      message: 'Upload realizado com sucesso!',
      document,
    })
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao processar upload: ${error}` },
      { status: 500 }
    )
  }
}
