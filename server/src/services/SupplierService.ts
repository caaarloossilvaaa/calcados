import { ISupplier } from "../interfaces/suppliers";
import { prisma } from "../utils/db";

export async function CreateSupplierService({
  name,
  cnpj,
  phone,
  cell,
}: ISupplier) {

  const supplier = { name, cnpj, phone, cell }

  const newSupplier = await prisma.supplier.create({
    data: supplier,
  })

  return { newSupplier }

}

export async function GetSuppliersService() {
  const suppliers = await prisma.supplier.findMany({})
  return suppliers
}

export async function GetSuppliersByNameService(name: string) {
  const suppliers = await prisma.supplier.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }
    }
  })
  return suppliers
}

export async function GetSuppliersByIdService(id: string) {
  const suppliers = await prisma.supplier.findUnique({
    where: {
      id
    }
  })
  return suppliers
}

export async function DeleteSupplierService(supplierId: string) {
  const supplierExists = await prisma.supplier.findUnique({
    where: {
      id: supplierId
    }
  })

  if (!supplierExists) {
    throw 'Fornecedor inexistente'
  }

  const supplier = await prisma.supplier.delete({
    where: {
      id: supplierId
    }
  })

  return supplier
}
