import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { store } from '../../App'

function Navbar() {
  let { cartItems, userStatus } = useContext(store)
  let currentUser = localStorage.getItem('username');

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-main">
        <div className="container-fluid">
          <a className="navbar-brand nav-logo" href="index.html">
            <b id="title1-logo">SHOP</b>
            <span id="title2-logo">LANE</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact to='./'
                  className="nav-link nav-items d-flex align-items-center column-gap-1"
                  activeClassName="active-nav-item"
                  aria-current="page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z" />
                    <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018" />
                  </svg>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={!currentUser && !userStatus ? '/login' : '/cart'}
                  className="nav-link nav-items d-flex align-items-center column-gap-1"
                  activeClassName="active-nav-item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                    <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                  </svg>
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to={!currentUser && !userStatus ? '/login' : '/my-orders'}
                className="nav-link nav-items d-flex align-items-center column-gap-1"
                activeClassName="active-nav-item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                </svg>
                My Orders
              </NavLink>
            </li>
            </ul>
            <div id='cart-icon'>
              <div id='count-circle'>
                <p>{cartItems.length}</p>
              </div>
              <NavLink to={!currentUser && !userStatus ? '/login' : '/cart'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={30}
                  height={30}
                  fill="currentColor"
                  className="bi bi-cart3"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </NavLink>
            </div>
            {
              (!userStatus && !currentUser) ? (
                <div id='login/signup-section'>
                  <Link to='/register'>
                    <button className="btn-sigin btn btn-primary" style={{ margin: '20px' }}>
                      Sign in
                    </button>
                  </Link>
                  <Link to='/login'>
                    <button type="button" class="btn btn-outline-success">Login</button>
                  </Link>
                </div>

              ) : (
                <NavLink to='/my-profile' style={{ textDecoration: 'none' }} activeClassName="active-nav-item">
                  <div id='profile-section-nav' style={{ margin: '10px 30px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                    <b style={{ color: 'grey' }}> {currentUser}</b>
                  </div>
                </NavLink>
              )
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar