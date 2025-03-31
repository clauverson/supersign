import Image from 'next/image'
import Logo from '../../../public/logo.svg'
import Gif from '../../../public/agreement.gif'
import { twMerge } from 'tailwind-merge'

interface Props {
  readonly children: React.ReactNode
}

export default function Layout(props: Props) {
  return (
    <section className="grid grid-cols-2 min-h-screen">
      <main>
        <header className="p-6 px-10">
          <Image src={Logo} alt={''} height={36} draggable={false} />
        </header>
        {props.children}
      </main>

      <aside className="bg-teal-900 grid items-center justify-items-center">
        <div className="grid w-md grid-cols-[1fr_auto_2rem] grid-rows-[5rem]">
          <div
            className={twMerge(
              'p-2 bg-white rounded-xl shadow-md',
              'col-start-1 col-span-2 row-start-1 row-span-2',
              'flex items-center justify-center'
            )}
          >
            <Image src={Logo} alt={''} className="opacity-10" height={80} />
          </div>

          <div
            className={twMerge(
              'p-4 bg-white rounded-xl shadow-xl',
              'col-start-2 col-span-2 row-start-2 row-span-2',
              'flex items-center justify-center border border-gray-100 z-50'
            )}
          >
            <Image src={Gif} alt={''} height={120} draggable={false} />
          </div>
          <div>
            <h2></h2>
          </div>
        </div>
      </aside>
    </section>
  )
}
