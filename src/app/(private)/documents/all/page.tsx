'use client'

import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchDocuments = async () => {
  const response = await axios.get('/api/documents')
  return response.data
}

const DocumentList = () => {
  const { data: session } = useSession()

  const {
    data: documents,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['documents'],
    queryFn: () => fetchDocuments(),
    enabled: !!session,
  })

  if (isLoading) return <p>Carregando documentos...</p>
  if (error) return <p>Erro ao carregar documentos</p>

  return (
    <div>
      <h1>Meus Documentos</h1>
      <ul>
        {documents?.map((doc: { id: string; name: string }) => (
          <li key={doc.id}>{doc.name}</li>
        ))}
      </ul>

      <pre>{JSON.stringify(documents, null, 2)}</pre>
    </div>
  )
}

export default DocumentList
