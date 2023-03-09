import { Router } from "express";
import { CreateSupplier, DeleteSupplier, GetSuppliers, GetSuppliersByName, GetSuppliersById } from "../controllers/SuppliersController";

const suppliersRoutes = Router()

suppliersRoutes.get('/suppliers', GetSuppliers)
suppliersRoutes.get('/suppliers/:name', GetSuppliersByName)
suppliersRoutes.get('/supplier/:id', GetSuppliersById)
suppliersRoutes.post('/suppliers', CreateSupplier)
suppliersRoutes.delete('/suppliers/:id', DeleteSupplier)

export { suppliersRoutes }
