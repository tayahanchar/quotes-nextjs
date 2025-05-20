import { FC } from "react"

interface IInputFieldProps {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  error?: string | undefined
}


export const InputField: FC<IInputFieldProps> = ({ value, onChange, placeholder, error }) => {
  return (
    <div>
      <input value={value} onChange={onChange} placeholder={placeholder} />
      {error && <p>{error}</p>}
    </div>
  )
}