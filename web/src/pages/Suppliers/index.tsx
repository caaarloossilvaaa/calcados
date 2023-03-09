import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { api } from "../../lib/axios"
import { confirmAlert } from "react-confirm-alert"
import { Footer } from "../../components/Footer"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

interface ISuppliers {
  id: string
  name: string
  cnpj: string
  phone: string
  cell: string
}

export function Suppliers() {
  const [suppliers, setSuppliers] = useState<ISuppliers[]>()

  async function DeleteSupplier(id: string) {
    await api.delete(`/suppliers/${id}`).then(response => {
      alert('Fornecedor excluído com sucesso!')
      window.location.reload()
    })
  }

  function Confirm(id: string, name:string) {
    confirmAlert({
      title: "Confirme se deseja continuar!",
      message: `Deseja excluir o fornecedor ${name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => DeleteSupplier(id)
        },
        {
          label: 'Não'
        }
      ]
    })
  }

  useEffect(() => {
    api.get("/suppliers").then(response => {
      setSuppliers(response.data.suppliers)
    })
  }, [])

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex justify-end items-center p-4 pt-8">
          <Link
            to="/suppliers/new"
            className="bg-blue-600 px-4 py-1 text-xl text-white rounded-lg hover:bg-blue-700 duration-150"
          >
            Novo Fornecedor
          </Link>
        </div>
        <div className="mx-auto relative overflow-x-auto overflow-y-auto w-full p-4 h-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Fornecedor
                </th>
                <th scope="col" className="px-6 py-3">
                  CNPJ
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3">
                  Celular
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {suppliers?.map(supplier => {
                const cnpj = String(supplier.cnpj)
                const cell = String(supplier.cell)
                const phone = String(supplier.phone)
                const cnpjFormatted =
                  cnpj.substring(0, 2) +
                  '.' +
                  cnpj.substring(2, 5) +
                  '.' +
                  cnpj.substring(5, 8) +
                  '/' +
                  cnpj.substring(8, 12) +
                  '-' +
                  cnpj.substring(12, 14)
                const phoneFormatted =
                  '(' +
                  phone.substring(0, 2) +
                  ') ' +
                  phone.substring(2, 6) +
                  ' ' +
                  phone.substring(6, 10)
                const cellFormatted =
                  '(' +
                  cell.substring(0, 2) +
                  ') ' +
                  cell.substring(2, 3) +
                  ' ' +
                  cell.substring(3, 7) +
                  ' ' +
                  cell.substring(7, 11)
                return (
                  <tr key={supplier.id} className="bg-white border-b text-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowra"
                    >
                      {supplier.name}
                    </th>
                    <td className="px-6 py-4">{cnpjFormatted}</td>
                    <td className="px-6 py-4">{phoneFormatted}</td>
                    <td className="px-6 py-4">{cellFormatted}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-4 items-center">
                        <button
                          onClick={() =>
                            Confirm(supplier.id, supplier.name)
                          }
                        >
                          <FontAwesomeIcon
                            className="text-red-600 hover:text-red-800 hover:scale-125 duration-200"
                            fontSize={24}
                            icon={faTrash}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    </div>
  )
}
