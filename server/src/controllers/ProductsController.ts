import { Request, Response } from "express";
import { CreateProductService, DeleteProductService, GetProductService, GetProductsStockService } from "../services/ProductService";
import { z } from "zod";

async function GetProducts(request: Request, response: Response) {
  const products = await GetProductService()
  return response.json({ products })
}

async function GetProductsStock(request: Request, response: Response) {
  const products = await GetProductsStockService()
  return response.json({ products })
}

async function CreateProduct(request: Request, response: Response) {
  const photo = request.file?.filename as string
  console.log(request.body)
  const getProductsParams = z.object({
    description: z.string(),
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    amount: z.string(),
    costPrice: z.string(),
    salePrice: z.string(),
  })
  const { description, brand, model, color, amount, costPrice, salePrice } = getProductsParams.parse(request.body)

  const newProduct = await CreateProductService({ 
    description, 
    brand, 
    model, 
    color, 
    amount: Number(amount), 
    costPrice: Number(costPrice), 
    salePrice: Number(salePrice), 
    photo
  })

  return response.json({ newProduct })
}

async function DeleteProduct(request: Request, response: Response) {
  const id = z.string().parse(request.params.id)
  const deleteProduct = await DeleteProductService({ id })

  return response.json({ deleteProduct })
}

export {
  GetProducts,
  CreateProduct,
  DeleteProduct,
  GetProductsStock
}