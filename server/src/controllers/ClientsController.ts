import { Request, Response } from "express"
import { CreateClientService, DeleteClientService, GetClientsByIdService, GetClientsByNameService, GetClientsService } from "../services/ClientService"

async function CreateClient(request: Request, response: Response) {
  const { firstName, lastName, cpf, phone, cell, zip, address, district, city, uf } = request.body
  const client = await CreateClientService({ firstName, lastName, cpf, phone, cell, zip, address, district, city, uf })

  return response.json({ client })
}

async function GetClients(request: Request, response: Response) {
  const clients = await GetClientsService()
  return response.json({ clients })
}

async function DeleteClient(request: Request, response: Response) {
  const id = request.params.id as string
  const client = await DeleteClientService(id)
  return response.json({ client })
}

async function GetClientsByName(request: Request, response: Response) {
  const name = request.params.name as string
  const clients = await GetClientsByNameService(name)
  return response.json({ clients })
}

async function GetClientsById(request: Request, response: Response) {
  const id = request.params.id as string
  const clients = await GetClientsByIdService(id)
  return response.json({ clients })
}

export {
  CreateClient,
  DeleteClient,
  GetClients,
  GetClientsByName,
  GetClientsById
}
