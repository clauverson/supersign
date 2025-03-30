import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import Logo from '../../../public/logo.svg'
import { Bell } from 'lucide-react'
import { DropdownMenu } from '@/components/ui/DropdownMenu'

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <section>
      <header
        className={twMerge(
          'grid grid-cols-[1fr_auto] items-center py-2 px-20',
          'border-b border-gray-200'
        )}
      >
        <Image
          draggable={false}
          src={Logo}
          alt={''}
          className="cursor-pointer"
          height={30}
        />

        <div className="flex items-center gap-4">
          <nav className="flex justify-end">
            <ul className="flex gap-4">
              <li>
                <Bell size={20} />
              </li>
            </ul>
          </nav>

          <DropdownMenu />
        </div>
      </header>

      <div className="grid grid-cols-[auto_1fr]">
        <aside className="">
          <nav className="grid gap-4 py-4 px-4">
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/home">Dashboard</a>
              </li>
              <li>
                <a href="/documents/all">Documentos</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main>{children}</main>
      </div>

      <footer></footer>
    </section>
  )
}
