import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'

interface IProduct {
  id: string
  description: string
  brand: string
  model: string
  color: string
  amount: number
  costPrice: number
  salePrice: number
  photo: string
}

interface IProductDetail {
  idNew: string
  descriptionNew: string
  brandNew: string
  modelNew: string
  colorNew: string
  amountNew: number
  costPriceNew: number
  salePriceNew: number
  photoNew: string
}

export function Products() {
  const [products, setProducts] = useState<IProduct[]>()
  const [viewDetail, setViewDetail] = useState(false)
  const [description, setDescription] = useState('')  
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [amount, setAmount] = useState(0)
  const [costPrice, setCostPrice] = useState(0)  
  const [salePrice, setSalePrice] = useState(0)
  const [photo, setPhoto] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data.products)
    })
  }, [])


  function handleViewProduct({
    idNew,
    descriptionNew,
    brandNew,
    modelNew,
    colorNew,
    amountNew,
    costPriceNew,
    salePriceNew,
    photoNew
  }: IProductDetail) {
    setSelectedProduct(idNew)
    setDescription(descriptionNew)
    setBrand(brandNew)
    setModel(modelNew)
    setColor(colorNew)
    setAmount(amountNew)
    setCostPrice(costPriceNew)
    setSalePrice(salePriceNew)
    setPhoto(photoNew)
    setViewDetail(!viewDetail)
  }

  async function handleCancelSale() {
    fetch(`http://localhost:3333/api/products/` + selectedProduct, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        alert('Produto excluído com sucesso!')
        setDescription('')
        setBrand('')
        setModel('')
        setColor('')
        setAmount(0)
        setCostPrice(0)
        setSalePrice(0)
        setPhoto('')
        console.log(data)
        window.location.reload()
      })
  }

  return (
    <div className="flex flex-row p-0 m-0 box-border">
      <div
        className={
          viewDetail
            ? 'flex absolute top-1/2 left-1/2 w-1/3 gap-4 bg-gray-100 flex-row z-10 p-8 backdrop-brightness-75 rounded-xl -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_67px_10px_#00000024] border border-gray-800 border-spacing-2'
            : 'hidden'
        }
      >
        <div className="flex flex-col w-1/2">
          <h1 className="text-2xl font-semibold">Visualizar Produto</h1>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Descrição: </span>
            {description}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Marca: </span>
            {brand}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Modelo: </span>
            {model}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Estoque: </span>
            {amount}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Cor: </span>
            {color}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Preço de Custo: </span> R${' '}
            {Number(costPrice).toFixed(2).replace('.', ',')}
          </span>
          <span className="text-xl font-light mt-4">
            <span className="font-bold">Preço de Venda: </span>R${' '}
            {Number(salePrice).toFixed(2).replace('.', ',')}
          </span>

          <div className="mt-4 flex w-full justify-between gap-4">
            <button
              onClick={() => handleCancelSale()}
              className="bg-orange-700 p-2 w-full text-white text-xl font-semibold rounded-lg hover:bg-orange-900 duration-200"
            >
              Excluir Produto
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img className="w-64 h-64 object-contain" src={`http://localhost:3333/images/${photo}`} alt="" />
          <button
              onClick={() => setViewDetail(false)}
              className="bg-red-700 p-2 w-full text-white text-xl font-semibold rounded-lg hover:bg-red-900 duration-200"
            >
              Fechar
            </button>
        </div>
      </div>
      <Sidebar />
      <div className="flex flex-col w-full justify-between">
        <Header />
        <div className="flex justify-end items-center p-4 pt-8">
          <Link
            to="/products/new"
            className="bg-blue-600 px-4 py-1 text-xl text-white rounded-lg hover:bg-blue-700 duration-150"
          >
            Novo Produto
          </Link>
        </div>
        <div className="mx-auto relative overflow-x-auto overflow-y-auto w-full p-4 h-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Produto
                </th>
                <th scope="col" className="px-6 py-3">
                  Cor
                </th>
                <th scope="col" className="px-6 py-3">
                  Estoque
                </th>
                <th scope="col" className="px-6 py-3">
                  Preço de Venda
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Visualizar
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => {
                let newSalePrice = product.salePrice.toString().replace('.', ',')
                if (newSalePrice.indexOf(',') === -1){
                  newSalePrice = newSalePrice + ',00'
                }
                const { 
                  id: idNew,
                  description: descriptionNew,
                  brand: brandNew,
                  model: modelNew,
                  color: colorNew,
                  amount: amountNew,
                  costPrice: costPriceNew,
                  salePrice: salePriceNew,
                  photo: photoNew
                } = product
                return (
                  <tr key={product.id} className="bg-white border-b text-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.description}
                    </th>
                    <td className="px-6 py-4">{product.color}</td>
                    <td className="px-6 py-4">{product.amount}</td>
                    <td className="px-6 py-4">R$ {newSalePrice}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-row gap-4 items-center justify-center">
                        <button onClick={() => {
                          handleViewProduct({
                            idNew,
                            descriptionNew,
                            brandNew,
                            modelNew,
                            colorNew,
                            amountNew,
                            costPriceNew,
                            salePriceNew,
                            photoNew
                           })
                        }}>
                          <FontAwesomeIcon
                            className="text-yellow-500 hover:text-yellow-600 hover:scale-125 duration-150"
                            fontSize={24}
                            icon={faEye}
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
