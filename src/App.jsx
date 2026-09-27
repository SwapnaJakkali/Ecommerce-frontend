
import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartSidebar from "./components/CartSidebar";

function App() {

  return (
    <BrowserRouter>
      <CartSidebar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path='/*' element={<h1>Page Not Found 404</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
