import { NextResponse } from 'next/server'
import { prisma } from '../../auth/[...nextauth]/route'
import { unlink } from 'fs/promises'
import path from 'path'

export async function GET(
  req: Request,
  { params }: { params: { document_id: string } }
) {
  try {
    const { document_id } = params

    const document = await prisma.document.findUnique({
      where: {
        id: document_id,
      },
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(document)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Erro ao buscar documento' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { document_id: string } }
) {
  try {
    const { document_id } = params

    const document = await prisma.document.findUnique({
      where: { id: document_id },
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const fileExtension = path.extname(document.fileKey)
    const filePath = path.join(uploadDir, `${document.fileKey}${fileExtension}`)

    try {
      await unlink(filePath)
    } catch (error) {
      console.warn('Erro ao excluir arquivo físico:', error)
    }

    await prisma.document.delete({ where: { id: document_id } })

    return NextResponse.json({ message: 'Documento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir documento:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir documento' },
      { status: 500 }
    )
  }
}
