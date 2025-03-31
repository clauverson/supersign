interface Props {
  readonly children: React.ReactNode
  readonly title: string
}

export function Modal(props: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-fit">
        <h2 className="text-lg font-semibold mb-4">{props.title}</h2>

        {props.children}
      </div>
    </div>
  )
}
