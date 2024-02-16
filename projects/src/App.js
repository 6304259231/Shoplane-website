// App.js

import React, { useState, createContext } from 'react';
import './App.css';
import Courosel from './components/Courosel';
import Navbar from './components/Navbar';
import Clothing from './components/Clothing';
import Cart from './components/Cart';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Product from './components/Product';
import Payment from './components/Payment';
import Footer from './components/Footer';

export let store = createContext();

function App() {
  const [cartItems , setCartItems] = useState([]);
  
  return (
    <store.Provider value={[cartItems , setCartItems]}>
    <BrowserRouter>
      <Navbar />
      <Courosel/>
      <Routes>
        <Route path="/" element={<Clothing/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </store.Provider>
  );
}

export default App;
