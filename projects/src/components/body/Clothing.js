import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useLoader from '../../utils/useLoader';

import './Clothing.css';
import Courosel from '../header/Courosel';

function Clothing() {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  const [filterCart, setFilterCart] = useState([]);
  const [searchInput , setSearchInput] = useState('')
  let url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

  let Loading = useLoader();
  const changeHandler =  (e)=>{
     setSearchInput(e.target.value)
  }
  const searchHandler = ()=>{
    const filterData = data.filter((product)=> product?.name?.toLowerCase().includes(searchInput.toLowerCase()));
    setData(filterData)
  }
  const fetchData = async () => {
    try {
      setLoading(true)
      let response = await fetch(url);
      let products = await response.json();
      console.log(products)
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false)
  };

  const filterChange = (name) => {
    if (!filterCart.includes(name)) {
      setFilterCart([...filterCart, name])
    }
    else {
      setFilterCart(filterCart.filter((item) => item !== name))
    }
  }

  const filterData = data.filter((item) => {
    if (filterCart.length === 0 || filterCart.includes('clothing') && filterCart.includes('accessories')) {
      return true;
    } else if (filterCart.includes('clothing')) {
      return !item.isAccessory;
    }  
    
    else if (filterCart.includes('accessories')) {
      return item.isAccessory;
    }
    else if (filterCart.includes('men')) {
      return item?.name?.toLowerCase().includes('men');
    }  
    else if (filterCart.includes('women')) {
      return item?.name?.toLowerCase().includes('women');
    }  
    else if (filterCart.includes('all')) {
      return true;
    }  
    else if (filterCart.includes('<5000')) {
      return item.price < 5000;
    }
    else if (filterCart.includes('>10000')) {
      return item.price > 10000;
    }
    else if (filterCart.includes('5000-10000')) {
      return item.price >= 5000 && item.price <= 10000;
    }
    else {
      return false;
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Courosel />
        {Loading}
      </>
    )
  }

  return (

    <>
      <Courosel />
      <section style={{ margin: '20px 15px' , display : 'flex' , alignItems : 'center', justifyContent : 'space-between'}}>
        <div className="dropdown">
          <button
            style={{ width: '100%', padding: '15px' }}
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
            </svg> Filters
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark p-4 m-1"
            aria-labelledby="dropdownMenuButton2" style={{ width: '300px', zIndex: '0' }}
          >
            <p>Categories</p>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="clothing" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  Clothing
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="accessories" id="flexCheckDefault" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  Accessories
                </label>
              </div>
            </li>
            <hr />
            <p>Type</p>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="all" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  All
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="men" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  Men
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="women" id="flexCheckDefault" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  Women
                </label>
              </div>
            </li>
            <hr />
            <p>Price</p>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name=">10000" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  &gt; 10000 Rs
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="5000-10000" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  5000 - 10000 Rs
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="<5000" onChange={
                  (e) => filterChange(e.target.name)} />
                <label className="form-check-label" for="flexCheckDefault">
                  &lt; 5000 Rs
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div className="d-flex">
            <input className="form-control" type="search" placeholder="Search for Clothing...." aria-label="Search" onChange={ (e)=> changeHandler(e)}/>
              <button className="btn btn-outline-success" type="submit" onClick={searchHandler}>Search</button>
          </div>
        </div>
      </section>
      <section id="clothing-section-main">
        <center className="product-main-head">Fashions & Accessories</center>
        <div id="clothing-container" className="clothing-container">
          {
            filterData.length === 0? (
                   <center>
                       <h2 style={{ color : 'tomato', fontFamily : 'monospace'}}>We are Sorry ! No data found </h2> 
                       <small> Please enter Valid name</small>
                   </center>
            ) : (
              filterData.map((product) => {
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
              })
            )
          }
        </div>
      </section>
    </>
  );
}

export default Clothing;
