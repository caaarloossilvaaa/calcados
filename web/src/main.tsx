import "./styles/main.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { App } from "./pages"
import { Clients } from "./pages/Clients"
import { Suppliers } from "./pages/Suppliers"
import { Products } from "./pages/Products"
import { NewClient } from "./pages/Clients/new"
import { NewProduct } from "./pages/Products/new"
import { NewSupplier } from "./pages/Suppliers/new"
import { Sales } from "./pages/Sales"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/new" element={<NewClient />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/new" element={<NewSupplier />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/sale" element={<Sales />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
