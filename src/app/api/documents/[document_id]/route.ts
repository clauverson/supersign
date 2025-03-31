import { NextResponse } from 'next/server'
import { prisma } from '../../auth/[...nextauth]/route'

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
