// Cart.js
import React, { useState, useEffect, useContext } from 'react';
import './Cart.css';
import { store } from '../App';
import { Link } from 'react-router-dom';


function Cart() {
  const [cartItems, setCartItems] = useContext(store);
  console.log(cartItems);

  const handleDecrement = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.item.id === itemId) {
          return {
            ...cartItem,
            qnty: cartItem.qnty - 1,
          };
        }
        console.log(cartItem)
        return cartItem;

      })
    );
  };

  const handleIncrement = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.item.id === itemId) {
          return {
            ...cartItem,
            qnty: cartItem.qnty + 1,
          };
        }
        console.log(cartItem)
        return cartItem;

      })
    );
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((product) => {
      totalPrice += product.qnty * (product.item.price)
    })
    return totalPrice.toFixed(2);
  };


  if (cartItems.length === 0) {
    return <p className="product-main-head" style={{ textAlign: 'center' , fontFamily : 'Rubik' , margin : '40px'}}>oops ! <br></br>Your cart is empty.</p>;
  }

  return (
    <>
      <h2 className="product-main-head">Your Cart</h2>

      <div className="cart-container">
        {
          cartItems && cartItems.map((product, index) => {
            let { item } = product;
            return (
              <div key={index} className="cart-item">
                <img src={item.preview} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p style={{fontFamily : 'Rubik' , fontSize : '20px'}}>{item.brand}</p>
                  <b className="cart-item-price"> ₹{item.price}</b>
                  <div className="quantity-controls">
                    <p style={{fontFamily : 'monospace' , fontSize : '20px'}}>Qnty :</p>
                    <button onClick={() => handleDecrement(item.id)}>-</button>
                    <span>{product.qnty}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <p className="cart-item-total">Total : Rs.{(item.price * product.qnty).toFixed(2)}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="cart-total" style={{}}>
        <p>Total : <span> ₹{calculateTotalPrice()}</span></p>
        <Link to='/payment'>
          <button className='order-btn'>Make Payment</button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
