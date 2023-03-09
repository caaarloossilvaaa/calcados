import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Input } from '../../components/Input'
import { Footer } from '../../components/Footer'
import { api } from '../../lib/axios'
import { Navigate, redirect } from 'react-router-dom'
import { cpf } from '../../components/Input/masks'

export function NewClient() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [cell, setCell] = useState('')
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  function handleChangeZip(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setZip(value)

    const cep = value?.replace(/[^0-9]/g, '')

    if (cep.length !== 8) {
      return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        setAddress(`${data.logradouro}, `)
        setDistrict(data.bairro)
        setCity(data.localidade)
        setState(data.uf)
      })
  }

  async function createClient(event: FormEvent) {
    event.preventDefault()
    try {

      const cpfNew = cpf.replaceAll('.', '').replaceAll('-', '')
      const phoneNew = phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
      const cellNew = cell.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
      const zipNew = zip.replace('-', '')

      const response = await api.post('/clients', {
        firstName,
        lastName,
        cpf: cpfNew,
        phone: phoneNew,
        cell: cellNew,
        zip: zipNew,
        address,
        district,
        city,
        uf: state,
      })

      console.log(response.data)
      alert(`Cliente cadastrado com sucesso!`)
      setFirstName('')
      setLastName('')
      setCpf('')
      setPhone('')
      setCell('')
      setZip('')
      setAddress('')
      setDistrict('')
      setCity('')
      setState('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o cliente, tente novamente!')
    }
  }

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="mt-4 mx-auto">
          <form className="w-full max-w-4xl" onSubmit={event => createClient(event)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Nome
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="João"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Sobrenome
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Silva"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-cpf"
                >
                  CPF
                </label>
                <Input
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  name="cpf"
                  mask="cpf"
                  placeholder="999.999.999-99"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-tel"
                >
                  Telefone
                </label>
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  name="phone"
                  mask="phone"
                  placeholder="(99) 9999 9999"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-cell"
                >
                  Celular
                </label>
                <Input
                  value={cell}
                  onChange={e => setCell(e.target.value)}
                  name="cell"
                  mask="cell"
                  placeholder="(99) 99999 9999"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  CEP
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-zip"
                  type="text"
                  placeholder="99999-999"
                  value={zip}
                  onChange={e => handleChangeZip(e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-address"
                >
                  Endereço
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-address"
                  type="text"
                  placeholder="Rua José Lino da Silva, 80"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-distric"
                >
                  Bairro
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="Novo Horizonte"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Cidade
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Itajubá"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  UF
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  type="text"
                  placeholder="MG"
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 float-right"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}
