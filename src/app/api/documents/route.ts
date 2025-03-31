import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, prisma } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as {
      user: { id: string; email: string }
    } | null

    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Erro ao buscar documentos' },
      { status: 500 }
    )
  }
}
