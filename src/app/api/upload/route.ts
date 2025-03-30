import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Arquivo ou userId não informado' },
        { status: 400 }
      )
    }

    const fileKey = uuidv4()
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(process.cwd(), 'public/uploads', fileKey)
    await writeFile(filePath, buffer)

    const document = await prisma.document.create({
      data: {
        name: file.name,
        fileKey,
        userId,
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
