import React, { InputHTMLAttributes, useCallback } from 'react'

import { cell, cep, cnpj, cpf, currency, phone } from './masks'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: 'cep' | 'currency' | 'cpf' | 'phone' | 'cell' | 'cnpj'
  prefix?: string
}

export function Input({ mask, prefix, ...props }: InputProps) {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'cep') {
        cep(e)
      }
      if (mask === 'currency') {
        currency(e)
      }
      if (mask === 'cpf') {
        cpf(e)
      }
      if (mask === 'phone') {
        phone(e)
      }
      if (mask === 'cell') {
        cell(e)
      }
      if (mask === 'cnpj') {
        cnpj(e)
      }
    },
    [mask]
  )

  return (
    <div className="input-group prefix">
      {prefix && <span className="prefix-span">{prefix}</span>}
      <input
        {...props}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        onKeyUp={handleKeyUp}
      />
    </div>
  )
}
