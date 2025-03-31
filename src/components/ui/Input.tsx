import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: Props) {
  const { className, ...rest } = props
  return (
    <input
      className={twMerge(
        'w-full p-3 px-4 border-none bg-slate-100 placeholder:text-sm rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-teal-500',
        className
      )}
      autoComplete="off"
      {...rest}
    />
  )
}
