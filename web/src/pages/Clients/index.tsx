import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faL, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../lib/axios'

interface IClients {
  id: string
  firstName: string
  lastName: string
  cpf: string
  district: string
  cell: string
}

export function Clients() {
  const [clients, setClients] = useState<IClients[]>()

  async function DeleteClient(id: string) {
    await api.delete(`/clients/${id}`).then(response => {
      alert('Cliente excluído com sucesso!')
      window.location.reload()
    })
  }

  function Confirm(id: string, name: string) {
    confirmAlert({
      title: 'Confirme para continuar!',
      message: `Deseja excluir o cliente ${name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => DeleteClient(id),
        },
        {
          label: 'Não',
        },
      ],
    })
  }

  useEffect(() => {
    api.get('/clients').then(response => {
      setClients(response.data.clients)
    })
  }, [])

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="flex justify-end items-center p-4 pt-8">
          <Link
            to="/clients/new"
            className="bg-blue-600 px-4 py-1 text-xl text-white rounded-lg hover:bg-blue-700 duration-150"
          >
            Novo Cliente
          </Link>
        </div>
        <div className="mx-auto relative overflow-x-auto overflow-y-auto w-full p-4 h-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  CPF
                </th>
                <th scope="col" className="px-6 py-3">
                  Bairro
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
              {clients?.map(client => {
                const cpf = String(client.cpf)
                const cell = String(client.cell)
                const cpfFormatted =
                  cpf.substring(0, 3) +
                  '.' +
                  cpf.substring(3, 6) +
                  '.' +
                  cpf.substring(6, 9) +
                  '-' +
                  cpf.substring(9, 11)
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
                  <tr key={client.id} className="bg-white border-b text-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {client.firstName + ' ' + client.lastName}
                    </th>
                    <td className="px-6 py-4">{cpfFormatted}</td>
                    <td className="px-6 py-4">{client.district}</td>
                    <td className="px-6 py-4">{cellFormatted}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-4 items-center">
                        <button
                          onClick={() =>
                            Confirm(client.id, client.firstName + ' ' + client.lastName)
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
