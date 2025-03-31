import { useModal } from '@/hooks/modal.store'
import { XCircle } from 'lucide-react'

interface Props {
  readonly children: React.ReactNode
  readonly title: string
}

export function Modal(props: Props) {
  const { toggleModal } = useModal()

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-fit">
        <header className="flex items-start justify-between">
          <h2 className="text-lg font-semibold mb-4">{props.title}</h2>
          <XCircle
            className="cursor-pointer hover:text-rose-600"
            onClick={toggleModal}
          />
        </header>

        {props.children}
      </div>
    </div>
  )
}
