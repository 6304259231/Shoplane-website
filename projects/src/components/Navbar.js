import React, { useContext } from 'react'
import './Navbar.css'
import { Link , NavLink } from 'react-router-dom'
import { store } from '../App'

function Navbar() {
  let [cartItems] = useContext(store);
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
                <NavLink to='./'
                  className="nav-link active nav-items"
                  aria-current="page"
                  href="#clothing-section-main"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/cart'
                 
                  className="nav-link active nav-items"
                  href="#accessories-container"
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/payment'
                
                  className="nav-link active nav-items"
                  aria-current="page"
                  href="#clothing-section-main"

                >
                  Payments
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 nav-search"
                type="search"
                placeholder="Search for Clothing & Accessories"
                aria-label="Search"
                size={50}
              />
            </form>
            <div id="icon-section">
            </div>
            <div>
              <div id='count-circle'>
                <p>{cartItems.length}</p>
              </div>
              <Link to='/cart'>
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
              </Link>
            </div>
            <button className="btn-sigin btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ margin: '20px' }}>
              SIGN IN
            </button>
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ backgroundColor: 'black' }}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Sign in
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Username or Mobile number
                  </label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Password
                  </label>
                  <input type="password" className="form-control" id="recipient-passwprd" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar