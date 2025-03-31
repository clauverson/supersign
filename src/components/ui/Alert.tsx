import { ShieldCheck, X } from 'lucide-react'

export function Alert() {
  return (
    <div className="bg-gray-50 py-6">
      <div className="container mx-auto flex gap-4 px-12">
        <div className="bg-green-200 rounded-full p-2 text-green-700 h-fit">
          <ShieldCheck />
        </div>

        <p className="text-sm text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          officiis, eligendi placeat nulla dignissimos doloremque ex neque illum
          laborum voluptatum excepturi similique dolorum architecto ipsa ducimus
          ipsum. Earum, in molestias.
        </p>

        <span className="cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center h-fit p-1">
          <X size={19} />
        </span>
      </div>
    </div>
  )
}
