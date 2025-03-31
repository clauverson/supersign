'use client'

import { Modal } from '@/components/ui/Modal'
import { MySignaturePad } from '@/components/ui/SignatureCanvas'
import { useModal } from '@/hooks/modal.store'
import { DocumentService } from '@/services/documents'
import { useQuery } from '@tanstack/react-query'
import { Download, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export default function DocumentDetails() {
  const { data: session } = useSession()
  const router = useRouter()
  const { document_id } = useParams()
  const { isOpen, toggleModal } = useModal()

  const { data: document } = useQuery({
    queryKey: ['document', document_id],
    queryFn:
      typeof document_id === 'string'
        ? () => DocumentService.getDocumentById(document_id)
        : undefined,
    enabled: !!document_id,
  })

  function deleteDocument() {
    if (typeof document_id === 'string') {
      DocumentService.deleteDocument(document_id)
        .then(() => {
          alert('Documento excluído com sucesso')
          router.push('/documents/all')
        })
        .catch((error) => {
          console.error('Erro ao excluir documento:', error)
          alert('Erro ao excluir documento')
        })
    }
  }

  return (
    <section className="container mx-auto p-8">
      <h1 className="text-xl font-medium mb-6">{document?.data.name}</h1>

      <div className="grid grid-cols-[3fr_1fr] gap-20 mb-6">
        <article>
          {document?.data && (
            <object
              data={`/uploads/${document?.data.fileKey}.pdf`}
              type="application/pdf"
              width="100%"
              height="1000px"
            >
              <p>
                Seu navegador não suporta PDF embutido.{' '}
                <a href={`/uploads/${document?.data.fileKey}`}>
                  Clique aqui para baixar
                </a>
              </p>
            </object>
          )}
        </article>

        <aside className="grid gap-4 h-fit sticky top-20">
          <button
            className={twMerge(
              'bg-green-300 rounded-full p-2 px-4 text-green-800 font-bold',
              'cursor-pointer hover:bg-green-400 hover:text-green-900 transition-colors duration-200',
              document?.data.status === 'SIGNED' &&
                'cursor-not-allowed bg-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-500'
            )}
            disabled={document?.data.status === 'SIGNED'}
            onClick={toggleModal}
          >
            {document?.data.status === 'SIGNED'
              ? 'Documento Assinado'
              : 'Assinar Documento'}
          </button>

          <a
            className="flex items-center gap-2 ml-2 cursor-pointer"
            href={`/uploads/${document?.data.fileKey}.pdf`}
            download="SuperSignDocument.pdf"
          >
            <Download size={18} /> Download
          </a>

          <button
            className="flex items-center gap-2 text-rose-600 ml-2 cursor-pointer"
            onClick={deleteDocument}
          >
            <Trash2 size={18} /> Excluir
          </button>
        </aside>
      </div>

      {isOpen && session?.user.email && typeof document_id === 'string' && (
        <Modal title={'Sua assinatura'}>
          <MySignaturePad email={session.user.email} documentId={document_id} />
        </Modal>
      )}
    </section>
  )
}
