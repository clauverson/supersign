import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { signature, documentId, email } = await req.json()

    if (!signature || !documentId || !email) {
      return NextResponse.json({ error: 'Dados faltando' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const base64Data = signature.replace(/^data:image\/png;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    const filePath = path.join(
      process.cwd(),
      'public/signatures',
      `${uuidv4()}.png`
    )
    await writeFile(filePath, buffer)

    const signatureRecord = await prisma.signature.create({
      data: {
        documentId,
        userId: user.id,
        signatureImg: `/signatures/${path.basename(filePath)}`,
        signedAt: new Date(),
      },
    })

    await prisma.document.update({
      where: { id: documentId },
      data: { status: 'SIGNED' },
    })

    return NextResponse.json({
      message: 'Assinatura salva com sucesso!',
      signatureRecord,
    })
  } catch (error) {
    return NextResponse.json(
      { error: `Erro ao salvar assinatura: ${error}` },
      { status: 500 }
    )
  }
}
