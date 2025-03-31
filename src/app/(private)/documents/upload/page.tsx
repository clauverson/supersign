'use client'

import { DocumentService } from '@/services/documents'
import { useFormik } from 'formik'
import { PlusCircle, Upload, X, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function UploadDocument() {
  const router = useRouter()
  const [fileName, setFileName] = useState<string | null>(null)
  const { data: session } = useSession()

  const form = useFormik({
    initialValues: {
      file: null,
      contacts: [{ name: '', email: '' }],
    },
    onSubmit: (values) => {
      if (!session || !values.file) return

      DocumentService.uploadFile(session.user.email!, values.file).then(
        (res) => {
          if (res.status === 200) {
            router.push('/documents/all')
          }
        }
      )
    },
  })

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    if (file) {
      setFileName(file.name)
      form.setFieldValue('file', file)
    }
  }

  function handleFileRemove(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    event.stopPropagation()
    event.preventDefault()
    setFileName(null)
    form.setFieldValue('file', null)
  }

  return (
    <div className="container mx-auto p-8">
      <form
        onSubmit={form.handleSubmit}
        className="border border-gray-200 shadow rounded-lg p-12"
      >
        <h2 className="text-xl mb-6">Envie seu documento</h2>

        <div className="grid gap-1">
          <label htmlFor="file" className="text-sm">
            Selecione o arquivo
          </label>
          <label
            className={twMerge(
              'border-2 border-dashed border-gray-300 rounded-lg p-4',
              'flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50',
              'transition-colors duration-200 group'
            )}
          >
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              onBlur={form.handleBlur}
            />

            {!fileName && (
              <>
                <Upload className="text-gray-600" />
                <span className="text-gray-600 font-medium">
                  Arraste e solte o arquivo aqui ou clique para selecionar
                </span>
                <span className="text-gray-400 text-sm">
                  Formato suportado: PDF
                </span>
              </>
            )}

            {fileName && (
              <div className="relative border border-gray-200 shadow rounded-md p-4 px-10">
                <p>{fileName}</p>
                <button
                  className={twMerge(
                    'hidden absolute -top-2 -right-2 bg-rose-700 text-white rounded-full p-1',
                    'group-hover:block cursor-pointer'
                  )}
                  onClick={(e) => handleFileRemove(e)}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </label>
        </div>

        <div className="grid gap-1">
          <h2 className="mt-8">Signatários</h2>

          <label htmlFor="contacts" className="text-sm mb-4 text-gray-600">
            Informe os contatos que devem assinar o documento
          </label>

          {form.values.contacts.map((contact, index) => (
            <div key={+index} className="flex gap-4 items-center">
              <div className="grid">
                <label className="text-sm" htmlFor={`contacts[${index}].name`}>
                  Nome
                </label>
                <input
                  type="text"
                  id={`contacts[${index}].name`}
                  name={`contacts[${index}].name`}
                  value={contact.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className="border border-gray-300 rounded-lg p-2 w-[15rem]"
                />
              </div>
              <div className="grid">
                <label className="text-sm" htmlFor={`contacts[${index}].email`}>
                  E-mail
                </label>
                <input
                  type="email"
                  id={`contacts[${index}].email`}
                  name={`contacts[${index}].email`}
                  value={contact.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className="border border-gray-300 rounded-lg p-2 w-[20rem]"
                />
              </div>

              <button
                className={twMerge(
                  'flex items-center gap-2 text-sm mt-4',
                  'hover:text-red-700 cursor-pointer'
                )}
                onClick={() => {
                  if (form.values.contacts.length > 1)
                    form.setFieldValue(
                      'contacts',
                      form.values.contacts.filter((_, i) => i !== index)
                    )
                }}
              >
                <XCircle size={20} />
                Remover
              </button>
            </div>
          ))}

          <button
            type="button"
            className={twMerge(
              'rounded-full my-4 text-purple-600 font-bold w-fit flex items-center gap-2',
              'cursor-pointer hover:text-purple-800 hover:underline transition-colors duration-200',
              'underline-offset-4 text-sm'
            )}
            onClick={() =>
              form.setFieldValue('contacts', [
                ...form.values.contacts,
                { name: '', email: '' },
              ])
            }
          >
            <PlusCircle />
            Adicionar Signatário
          </button>
        </div>

        <footer className="flex mt-6 border-t border-gray-200 pt-8">
          <button
            type="submit"
            className={twMerge(
              'bg-purple-600 text-white font-bold rounded-full p-2 px-4',
              'cursor-pointer hover:bg-purple-700 transition-colors duration-200'
            )}
          >
            Enviar Documento
          </button>
        </footer>
      </form>
    </div>
  )
}
