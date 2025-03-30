import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, prisma } from '../auth/[...nextauth]/route'

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as {
      user: { id: string }
    } | null

    console.log(session, 'SESSION')

    if (!session) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const documents = await prisma.document.findMany({
      where: { userId },
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
