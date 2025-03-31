import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: Props) {
  const { className, ...rest } = props
  return (
    <label
      className={twMerge('text-sm text-gray-800 ml-1', className)}
      {...rest}
    />
  )
}
