'use client'

import Image from 'next/image'
import { useState } from 'react'
import emptyUser from '../../../public/empty-user.svg'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function DropdownMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="cursor-pointer flex items-center gap-2"
      >
        <p className="">{session?.user.name}</p>
        <Image
          draggable={false}
          src={emptyUser}
          alt={'picture'}
          className="h-10 w-min"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 min-w-48 bg-white border border-gray-200 shadow-lg rounded-md">
          <ul className="py-2">
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                router.push('/documents/all')
              }}
            >
              Documentos
            </li>
            <li
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
