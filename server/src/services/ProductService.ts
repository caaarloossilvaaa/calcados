import { prisma } from "../utils/db"

interface IProduct {
  description: string
  brand: string
  model: string
  color: string
  amount: number
  costPrice: number
  salePrice: number
  photo: string
}

export async function GetProductService() {
  const products = await prisma.product.findMany({})
  return products
}

export async function CreateProductService({ description, brand, model, color, amount, costPrice, salePrice, photo }: IProduct) {
  const product = await prisma.product.create({
    data: {
      description,
      brand,
      model,
      color,
      amount,
      costPrice,
      salePrice,
      photo
    }
  })
  return product
}

export async function DeleteProductService({ id }: { id: string }) {
  const product = await prisma.product.delete({
    where: {
      id
    }
  })
  return product
}

export async function GetProductsStockService() {
  const products = await prisma.product.findMany({
    where: {
      amount: {
        gt: 0
      }
    }
  })
  return products
}