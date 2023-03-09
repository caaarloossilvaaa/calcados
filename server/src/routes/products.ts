import { Router } from "express";
import { CreateProduct, DeleteProduct, GetProducts, GetProductsStock } from "../controllers/ProductsController";
import multer from 'multer'
import { createId } from '@paralleldrive/cuid2'

const storage = multer.diskStorage({
  destination: 'uploads/images/',
  filename: (req, file, cb) => {
    cb(null, createId() + file.originalname.trim())
  }
})

const upload = multer({ storage })

const productsRoutes = Router()

productsRoutes.get('/products', GetProducts)
productsRoutes.get('/products/stock', GetProductsStock)
productsRoutes.post('/products', upload.single('photo'), CreateProduct)
productsRoutes.delete('/products/:id', DeleteProduct)

export { productsRoutes }
