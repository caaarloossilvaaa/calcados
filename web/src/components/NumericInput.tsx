import { SetStateAction } from 'react'
import { NumericFormat } from 'react-number-format'

interface IProps {
  setValue: (value: SetStateAction<string>) => void
  value: string
  id: string
  placeholder: string
}

export function NumericInput(props: IProps) {
  return (
    <div className="relative mb-6" data-te-input-wrapper-init>
      <NumericFormat
        type="text"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={props.id}
        placeholder={props.value}
        prefix={'R$ '}
        decimalScale={2}
        decimalSeparator={','}
        allowLeadingZeros
        thousandSeparator="."
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  )
}
