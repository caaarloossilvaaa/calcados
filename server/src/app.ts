require('dotenv').config()
import express, { Request, Response } from 'express'
import cors from 'cors'
import { prisma } from './utils/db'
import { clientsRoutes } from './routes/clients'
import { productsRoutes } from './routes/products'
import { suppliersRoutes } from './routes/suppliers'

const app = express()

async function bootstrap() {

  app.use(express.json())
  app.use(cors({
    origin: true
  }))

  app.get('/api/healthchecker',async (request:Request, response: Response) => {
    response.status(200).json({
      status: 'Sucesso',
      message: 'API Ok'
    })
  })

  app.use('/api', clientsRoutes)
  app.use('/api', productsRoutes)
  app.use('/api', suppliersRoutes)

  app.use(express.static('uploads'))

  await prisma.$connect()
    .then(() => console.log(`🌟 Banco PostgreSQL conectado!`))
    .catch(err => console.log(`❌ Erro ao conectar no banco PostgreSQL! ${err}`))

  const port = Number(process.env.PORT)
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`)
  })
}

bootstrap()
  .catch((err) => {
    throw err
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
