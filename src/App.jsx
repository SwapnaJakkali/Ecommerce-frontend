
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
