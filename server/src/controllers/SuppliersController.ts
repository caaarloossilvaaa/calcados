import { Request, Response } from "express";
import { CreateSupplierService, DeleteSupplierService, GetSuppliersByIdService, GetSuppliersByNameService, GetSuppliersService } from "../services/SupplierService";

async function CreateSupplier(request: Request, response: Response) {
  const { name, cnpj, phone, cell } = request.body
  const supplier = await CreateSupplierService({ name, cnpj, phone, cell })

  return response.json({ supplier })
}

async function GetSuppliers(request: Request, response: Response) {
  const suppliers = await GetSuppliersService()
  return response.json({ suppliers })
}

async function DeleteSupplier(request: Request, response: Response) {
  const id = request.query.id as string
  const supplier = await DeleteSupplierService(id)
  return response.json({ supplier })
}

async function GetSuppliersByName(request: Request, response: Response) {
  const name = request.params.name as string
  const suppliers = await GetSuppliersByNameService(name)
  return response.json({ suppliers })
}

async function GetSuppliersById(request: Request, response: Response) {
  const id = request.params.id as string
  const suppliers = await GetSuppliersByIdService(id)
  return response.json({ suppliers })
}

export {
  CreateSupplier,
  GetSuppliers,
  DeleteSupplier,
  GetSuppliersByName,
  GetSuppliersById
}
