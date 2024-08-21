// App.js

import React, { useState, createContext } from 'react';
import './App.css';
import Navbar from './components/header/Navbar';
import Clothing from './components/body/Clothing';
import Cart from './components/body/Cart';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Product from './components/body/Product';
import Footer from './components/footer/Footer';
import Register from './components/header/Register';
import Login from './components/header/Login';
import Profile from './components/header/Profile'
import Myorders from './components/body/Myorders';
import OrderPlaced from './components/body/OrderPlaced';

export let store = createContext();

function App() {
  const [cartItems , setCartItems] = useState([]);
  const [userStatus , setUserStatus] = useState(true);
  let [myOrderCartItems, setMyOrderCartItems] = useState([]);

  return (
    <store.Provider value={{ cartItems , setCartItems , userStatus , setUserStatus , myOrderCartItems, setMyOrderCartItems }}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Clothing/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/my-profile" element={<Profile/>}/>
        <Route path="/my-orders" element={<Myorders/>}/>
        <Route path='/orderplaced' element={<OrderPlaced/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </store.Provider>
  );
}

export default App;
