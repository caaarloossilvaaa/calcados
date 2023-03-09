import { FormEvent, useState } from "react"
import { api } from "../../lib/axios"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Footer } from "../../components/Footer"

export function NewSupplier() {
  const [name, setName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [phone, setPhone] = useState("")
  const [cell, setCell] = useState("")

  async function createSupplier(event: FormEvent) {
    event.preventDefault()
    try {
      const cnpjNew = cnpj.replaceAll('.', '').replaceAll('/', '').replaceAll('-', '')
      const phoneNew = phone.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
      const cellNew = cell.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
      const response = await api.post("/suppliers", {
        name,
        cnpj: cnpjNew,
        phone: phoneNew,
        cell: cellNew,
      })

      console.log(response.data)
      alert(`Fornecedor cadastrado com sucesso!`)
      setName("")
      setCnpj("")
      setPhone("")
      setCell("")
    } catch (err) {
      console.log(err)
      alert("Falha ao criar o fornecedor, tente novamente!")
    }
  }
  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="flex justify-center items-center mx-4">
          <form className="w-full max-w-4xl" onSubmit={event => createSupplier(event)}>
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
                  placeholder="Distribuidora Exemplo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-cnpj"
                >
                  CNPJ
                </label>
                <Input
                  value={cnpj}
                  onChange={e => setCnpj(e.target.value)}
                  name="cnpj"
                  mask="cnpj"
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 float-right duration-200"
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
