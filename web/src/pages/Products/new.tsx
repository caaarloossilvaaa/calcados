import { FormEvent, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { api } from '../../lib/axios'
import { NumericInput } from '../../components/NumericInput'

export function NewProduct() {
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [amount, setAmount] = useState(0)
  const [costPrice, setCostPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      
      const newCostPrice = costPrice.replace('R$ ', '').replace(',', '.')
      const newSalePrice = salePrice.replace('R$ ', '').replace(',', '.')
      
      await api.post('/products', {
        description,
        brand,
        model,
        color,
        amount: Number(amount),
        costPrice: Number(newCostPrice),
        salePrice: Number(newSalePrice),
        photo
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })

      alert('Produto Cadastrado com sucesso!')
      setDescription('')
      setBrand('')
      setModel('')
      setColor('')
      setAmount(0)
      setCostPrice('')
      setSalePrice('')
      setPhoto(null)

    } catch (error) {
      alert('Erro ao cadastrar o produto')
      console.log(error)
    }
  }

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="mt-4 mx-auto">
          <form className="w-full max-w-4xl" onSubmit={e => handleSubmit(e)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-description"
                >
                  Descrição
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-description"
                  type="text"
                  placeholder="Tênis Nike Air Force 1 Branco"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-brand"
                >
                  Marca
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-brand"
                  type="text"
                  placeholder="Nike"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-model"
                >
                  Modelo
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-model"
                  type="text"
                  placeholder="Air Force 1"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-color"
                >
                  Cor
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-color"
                  type="text"
                  placeholder="Branco"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-amount"
                >
                  Quantidade
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-amount"
                  type="number"
                  placeholder="2"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  min={0}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-cost"
                >
                  Preço de Custo
                </label>
                <NumericInput
                  id='costPrice'
                  placeholder='Preço de Custo'
                  value={costPrice}
                  setValue={setCostPrice}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-sale"
                >
                  Preço de Venda
                </label>
                <NumericInput
                  id='salePrice'
                  placeholder='Preço de Venda'
                  value={salePrice}
                  setValue={setSalePrice}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-photo"
                >
                  Foto
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-photo"
                  type="file"
                  onChange={(e) => setPhoto(e.target.files![0])}
                />
              </div>
            </div>
            <div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 float-right">
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
