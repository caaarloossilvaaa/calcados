import { IClient } from "../interfaces/clients";
import { prisma } from "../utils/db";

export async function CreateClientService({
  firstName,
  lastName,
  cpf,
  phone,
  cell,
  zip,
  address,
  district,
  city,
  uf
}: IClient) {

  const client = {
    firstName,
    lastName,
    cpf,
    phone,
    cell,
    zip,
    address,
    district,
    city,
    uf
  }

  const newClient = await prisma.client.create({
    data: client,
  })

  return { newClient }

}

export async function GetClientsService() {
  const clients = await prisma.client.findMany({})
  return clients
}

export async function GetClientsByNameService(name: string) {
  const clients = await prisma.client.findMany({
    where: {
      OR: [{
        firstName: {
          contains: name,
          mode: "insensitive"
        }
      }, {
        lastName: {
          contains: name,
          mode: "insensitive"
        }
      }]
    }
  })
  return clients
}

export async function GetClientsByIdService(id: string) {
  const clients = await prisma.client.findUnique({
    where: {
      id
    }
  })
  return clients
}

export async function DeleteClientService(clientId: string) {
  console.log(clientId)
  const client = await prisma.client.delete({
    where: {
      id: clientId
    }
  })

  return client
}
