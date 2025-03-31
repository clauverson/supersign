'use client'

import SignatureCanvas from 'react-signature-canvas'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Eraser, Mail, Signature, User } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function MySignaturePad() {
  const sigCanvas = useRef<SignatureCanvas>(null)
  const { data: session } = useSession()

  const clearSignature = () => sigCanvas.current?.clear()
  const saveSignature = () => {
    const signatureData = sigCanvas.current?.toDataURL()
    console.log(signatureData)
  }

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{
          width: 400,
          height: 200,
          className: 'border rounded-md border-gray-400',
        }}
      />
      <small className="text-gray-500 text-center block">
        Assine no quadro acima
      </small>

      <div className="text-sm py-2">
        <p className="flex items-center gap-2">
          <User size={20} />
          {session?.user.name}
        </p>

        <p className="flex items-center gap-2">
          <Mail size={18} /> {session?.user.email}
        </p>
      </div>

      <footer className="flex justify-between items-center mt-4">
        <button
          className={twMerge(
            'flex items-center gap-2 text-sky-600 underline underline-offset-2',
            'cursor-pointer font-bold hover:text-sky-700 transition-colors duration-200'
          )}
          onClick={clearSignature}
        >
          <Eraser size={20} />
          Limpar
        </button>

        <button
          className={twMerge(
            'flex items-center gap-2 font-bold text-green-900',
            'bg-green-300 rounded-full px-6 py-2 cursor-pointer',
            'hover:bg-green-400 hover:text-green-900 transition-colors duration-200'
          )}
          onClick={saveSignature}
        >
          <Signature size={20} />
          Salvar
        </button>
      </footer>
    </div>
  )
}
