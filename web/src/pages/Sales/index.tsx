import { useEffect, useState } from 'react'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { api } from '../../lib/axios'
import { ComboboxClient } from '../../components/Comboboxs/clients'
import { Link } from 'react-router-dom'

interface IProductSale {
  id: string
  amount: number
}

export function Sales() {
  const [productsData, setProductsData] = useState()
  const [clientsData, setClientsData] = useState()
  const [loading, setLoading] = useState(false)
  const [productsSale, setProductsSale] = useState<IProductSale[]>()
  const [client, setClient] = useState('')
  const [clientId, setClientId] = useState('')

  useEffect(() => {
    setLoading(true)
    const clientData = async () => {
      const { data } = await api.get('/clients')
      setClientsData(data.clients)
      setLoading(false)
    }
    const productData = async () => {
      const { data } = await api.get('/products/stock')
      setProductsData(data.products)
      setLoading(false)
    }
    clientData()
    productData()
  }, [])

  function addProductSale({ id, amount }: IProductSale) {
    const findProduct = productsSale?.find(element => element.id == id)
    if (findProduct !== undefined) {
      productsSale?.map(product => {
        if (product.id === id) {
          product.amount++
        }
      })
    } else {
      setProductsSale(oldArray => [{ id, amount }, ...oldArray!])
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-slate-500">Nova venda</h1>
          <div className="flex justify-center items-center h-full">
            <div className="block rounded-lg mt-8 bg-white p-6 shadow-lg max-w-xl mx-auto w-full">
              <form>
                <div className="grid grid-cols-1 gap-4 w-full">
                  <ComboboxClient
                    htmlFor="sellers"
                    label="Vendedor"
                    values={clientsData!}
                    placeHolder="Vendedor"
                    setValue={setClient}
                    value={client}
                    setClient={setClient}
                    setClientId={setClientId}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 w-full">
                  {/* <ComboBoxClient
                    htmlFor="client"
                    label="Cliente"
                    values={clients}
                    placeHolder="Cliente"
                    setValue={setClient}
                    value={client}
                    setCompany={setCompany}
                    setBalance={setActualBalance}
                    setClient={setClient}
                    setClientId={setClientId}
                    setTotalBalance={setTotalBalance}
                  /> */}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* <Input
                    type="text"
                    label="Empresa"
                    htmlFor="company"
                    id="company"
                    placeholder="Empresa"
                    value={company}
                    setValue={setCompany}
                    readOnly={true}
                  />
                  <Input
                    type="mask"
                    id="totalBalance"
                    placeholder="Crédito Total"
                    value={totalBalance}
                    setValue={setTotalBalance}
                    label="Crédito Total"
                    htmlFor="totalBalance"
                    readOnly={true}
                  /> */}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* <Input
                    type="mask"
                    id="actualBalance"
                    placeholder="Saldo Atual"
                    value={actualBalance}
                    setValue={setActualBalance}
                    label="Saldo Atual"
                    htmlFor="actualBalance"
                    readOnly={true}
                  />
                  <Input
                    type="mask"
                    id="saleValue"
                    placeholder="Valor da Venda"
                    value={saleValue}
                    setValue={setSaleValue}
                    label="Valor da Venda"
                    htmlFor="saleValue"
                    readOnly={false}
                  /> */}
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-200">
                      Confirmar
                    </button>
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <Link
                      to="/sales"
                      className="bg-red-500 flex w-full justify-center hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-200"
                    >
                      Menu
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
