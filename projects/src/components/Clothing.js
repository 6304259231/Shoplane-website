import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Clothing.css';

function Clothing(props) {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);

  let url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

  const fetchData = async () => {
    try {
      setLoading(true)
      let response = await fetch(url);
      let products = await response.json();
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <center style={{ width : '70%' , margin: '80px auto' , display : 'flex' , gap : '10px' , justifyContent : 'center'}}>
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </center>
    )
  }



  return (
    <>
      <section id="clothing-section-main">
        <center className="product-main-head">Fashions for men & women</center>
        <div id="clothing-container" className="clothing-container">
          {data && data.map((product) => {
            const { id, brand, preview, price, name } = product;
            return (
              <NavLink to={`product/${id}`} className="product-card" key={id}>
                <img className="product-image" src={preview} alt={name} />
                <h3>{name}</h3>
                <p className='product-brand'>{brand}</p>
                <p className="product-price">
                  Rs.{price}  <i style={{ color: 'tomato' }}>offer price</i>
                </p>
              </NavLink>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Clothing;
