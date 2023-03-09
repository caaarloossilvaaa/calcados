import { Request, Response, Router } from "express";
import { CreateClient, DeleteClient, GetClientsByName, GetClients, GetClientsById } from "../controllers/ClientsController";

const clientsRoutes = Router()

clientsRoutes.get('/clients', GetClients)
clientsRoutes.get('/clients/:name', GetClientsByName)
clientsRoutes.get('/client/:id', GetClientsById)
clientsRoutes.post('/clients', CreateClient)
clientsRoutes.delete('/clients/:id', DeleteClient)

export { clientsRoutes }
