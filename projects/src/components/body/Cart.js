// Cart.js
import React, { useEffect, useContext } from 'react';
import './Cart.css';
import { store } from '../../App';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const { cartItems, setCartItems, myOrderCartItems, setMyOrderCartItems } = useContext(store);
  const navigate = useNavigate();

  const handleDecrement = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) => {
        if (cartItem.item.id === itemId) {
          return {
            ...cartItem,
            qnty: cartItem.qnty - 1,
          };
        }
        return cartItem;
      })
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
        return cartItem;
      })
    );
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const placeOrderHandler = () => {
    toast.success('Order Placed successfully');
    let newMyOrderItems = [...myOrderCartItems, ...cartItems];
    setMyOrderCartItems(newMyOrderItems);
    localStorage.setItem('newMyOrderCartItems', JSON.stringify(newMyOrderItems));
    setTimeout(() => {
      localStorage.removeItem('cartItems');
      navigate('/my-orders');
      setCartItems([]);
    }, 1000)
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.map((product) => {
      totalPrice += product.qnty * (product.item.price)
    })
    return totalPrice.toFixed(2);
  };

  const removeHandler = (id) => {
    toast.success('Item removed successfully')
    let filterCart = cartItems.filter((product) => id !== product.item.id)
    setCartItems(filterCart);
    localStorage.setItem('cartItems', JSON.stringify(filterCart));
  }

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // if (cartItems.length === 0) {
  //   return <>
  //     <p className="product-main-head" style={{ textAlign: 'center', fontFamily: 'Rubik', margin: '40px' }}>oops ! <br></br>Your cart is empty.</p>;
  //   </>
  // }

  return (
    <>
      <ToastContainer />
      <h2 className="product-main-head text-center">My Cart</h2>
      <div className="cart-container">
        {
          cartItems.length === 0 ? (<div className='text-center' style={{ margin : '20px auto' , width : '75%'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="66" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <p className="product-main-head" style={{ textAlign: 'center', fontFamily: 'Rubik', margin: '40px' }}>oops ! <br></br>You Cart is empty</p>
          </div>
          ) : (
            cartItems.map((product, index) => {
              let { item } = product;
              return (
                <div key={index} className="cart-item">
                  {item.preview && <img src={item.preview} alt={item.name} className="cart-item-image" />}
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p style={{ fontFamily: 'Rubik', fontSize: '20px' }}>{item.brand}</p>
                    <b className="cart-item-price"> ₹ {item.price}</b>
                    <div className="quantity-controls">
                      <p style={{ fontFamily: 'monospace', fontSize: '20px' }}>Qnty :</p>
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <span>{product.qnty}</span>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </div>
                    <p className="cart-item-total">Total : ₹ {(item.price * product.qnty).toFixed(2)}</p>
                  </div>
                  <div>
                    <button className='btn btn-outline-danger' onClick={() => removeHandler(item.id)}>Remove</button>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
      <div className="cart-total" style={{}}>
        <button className='order-btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop"
        >Proceed</button>
      </div>

      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Proceed to Payment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {
                  cartItems && cartItems.map((product, index) => {
                    let { item } = product;
                    return (
                      <div key={index} className="cart-item">
                        <img src={item.preview} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <h3>{item.name}</h3>
                          <p style={{ fontFamily: 'Rubik', fontSize: '20px' }}>{item.brand}</p>
                          <b className="cart-item-price"> ₹{item.price}</b>
                        </div>
                      </div>
                    )
                  })
                }
                <hr />
                <div className="cart-total" style={{}}>
                  <p>Total : <span> ₹ {calculateTotalPrice()} <br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg> <small style={{ fontSize: '16px' }}>Free Delivery</small></span></p>
                </div>
                <hr />
                <div>
                  <p style={{ fontSize: '20px', color: 'grey' }}>Payments</p>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1z" />
                          </svg>  <b style={{ marginLeft: '16px' }}> Cash Less Payments </b>
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong>This is the Cash Less Payments.  Tax fee !</strong>  <div className="my-3">
                            <div className="form-check">
                              <input
                                id="credit"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                defaultChecked=""
                                required=""
                              />
                              <label className="form-check-label" htmlFor="credit">
                                Credit card
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                id="debit"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                required=""
                              />
                              <label className="form-check-label" htmlFor="debit">
                                Debit card
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                id="paypal"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                required=""
                              />
                              <label className="form-check-label" htmlFor="paypal">
                                PayPal
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
                          </svg>  <b style={{ marginLeft: '16px' }}>Cash On Delivery COD</b>
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong> Cash On Delivery COD.</strong>
                          <small> ₹ 15 fee for saftey COD products </small>
                          <div className="form-check">
                            <input
                              id="paypal"
                              name="paymentMethod"
                              type="radio"
                              className="form-check-input"
                              required=""
                            />
                            <label className="form-check-label" htmlFor="paypal">
                              Cash On Delivery COD
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bank" viewBox="0 0 16 16">
                            <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
                          </svg> <b style={{ marginLeft: '16px' }}> Net Banking </b>
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <strong>Tax Free.</strong>  <div className="row gy-3">
                            <div className="col-md-6">
                              <label htmlFor="cc-name" className="form-label">
                                Name on card
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-name"
                                placeholder=""
                                required=""
                              />
                              <small className="text-muted">Full name as displayed on card</small>
                              <div className="invalid-feedback">Name on card is required</div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="cc-number" className="form-label">
                                Credit card number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-number"
                                placeholder=""
                                required=""
                              />
                              <div className="invalid-feedback">Credit card number is required</div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="cc-expiration" className="form-label">
                                Expiration
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-expiration"
                                placeholder=""
                                required=""
                              />
                              <div className="invalid-feedback">Expiration date required</div>
                            </div>
                            <div className="col-md-3">
                              <label htmlFor="cc-cvv" className="form-label">
                                CVV
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="cc-cvv"
                                placeholder=""
                                required=""
                              />
                              <div className="invalid-feedback">Security code required</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" onClick={
                  () => placeOrderHandler()}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Cart;
