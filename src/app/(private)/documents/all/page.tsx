'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { ClipboardPen } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { DocumentService } from '@/services/documents'
import moment from 'moment'

export enum DocumentStatus {
  PENDING = 'Pendente',
  SIGNED = 'Concluído',
}

export default function DocumentList() {
  const router = useRouter()
  const { data: session } = useSession()

  const {
    data: documents,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: () => DocumentService.getDocuments(),
    enabled: !!session,
  })

  if (isLoading) return <p>Carregando documentos...</p>
  if (error) return <p>Erro ao carregar documentos</p>

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-6 mb-8 border border-gray-200 rounded-lg p-4 px-8">
        <ClipboardPen />
        <div>
          <p className="font-bold text-gray-800">
            Faça o upload do seu arquivo e selecione os signatários em poucos
            cliques!
          </p>
          <small className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio
            neque dolores perferendis
          </small>
        </div>

        <div className="grow flex justify-end">
          <button
            className={twMerge(
              'bg-green-300 rounded-full p-2 px-4 text-green-800 font-bold',
              'cursor-pointer hover:bg-green-400 hover:text-green-900 transition-colors duration-200'
            )}
            onClick={() => router.push('/documents/upload')}
          >
            Adicionar Documento
          </button>
        </div>
      </div>

      <h1 className="text-xl font-medium">Meus Documentos</h1>

      <ul
        className={twMerge(
          'grid grid-cols-[1fr_repeat(3,8rem)] gap-6 mt-10 mb-4',
          'text-sm text-gray-500 border-b border-gray-200 pb-6 pr-4'
        )}
      >
        <li>Documento</li>
        <li>Status</li>
        <li>Data de criação</li>
        <li>Última atualização</li>
      </ul>

      {documents?.data.map((doc) => (
        <a
          key={doc.id}
          className={twMerge(
            'grid grid-cols-[1fr_repeat(3,8rem)] gap-6 py-4',
            'hover:ring-2 hover:ring-gray-100 hover:text-green-700 rounded px-4'
          )}
          href={`/documents/${doc.id}`}
        >
          <p>{doc.name}</p>
          <p>{DocumentStatus[doc.status] || doc.status}</p>
          <p>{moment(doc.createdAt).format('DD/MM/YYYY')}</p>
          <p>{moment(doc.updatedAt).format('DD/MM/YYYY')}</p>
        </a>
      ))}
    </div>
  )
}
