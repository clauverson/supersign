import Image from 'next/image'
import Logo from '../../../public/logo.svg'

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

      <aside className="bg-teal-900"></aside>
    </section>
  )
}
