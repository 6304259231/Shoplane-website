import React, { useEffect, useContext } from 'react'
import { store } from '../../App';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Myorders() {

    const { myOrderCartItems, setMyOrderCartItems } = useContext(store);

    const removeHandler = (id) => {
        let filterCart = myOrderCartItems.filter((product) => id !== product.item.id);
        setMyOrderCartItems(filterCart);
        toast.success('Order canceled successfully')
        localStorage.setItem('newMyOrderCartItems', JSON.stringify(filterCart));

    }
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        myOrderCartItems.map((product) => {
            totalPrice += product.qnty * (product.item.price)
        })
        return totalPrice.toFixed(2);
    };

    useEffect(() => {
        let myOrders = JSON.parse(localStorage.getItem('newMyOrderCartItems'));
        if (myOrders) {
            setMyOrderCartItems(myOrders);
        }
    }, []);


    return (
        <div>
            <ToastContainer />
            <h2 className="product-main-head text-center" style={{ marginBottom: '9px' }}>My Orders</h2>
            <div className="cart-container">
                {
                    myOrderCartItems.length === 0 ? (
                        <p className="product-main-head" style={{ textAlign: 'center', fontFamily: 'Rubik', margin: '20px auto', letterSpacing : '2px' , width : '75%'}}>oops ! <br></br>You  haven't  placed  any  orders  yet</p>
                    ) : (
                        myOrderCartItems.map((product, index) => {
                            let { item } = product;
                            return (
                                <div key={index} className="cart-item ">
                                    <div key={index} className="cart-item">
                                        {item.preview && <img src={item.preview} alt={item.name} className="cart-item-image" />}
                                        <div className="cart-item-details">
                                            <h3>{item.name}</h3>
                                            <p style={{ fontFamily: 'Rubik', fontSize: '20px' }}>{item.brand}</p>
                                            <b className="cart-item-price" style={{display : 'block'}}> ₹ {item.price}</b>
                                            <hr />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                            </svg> <small style={{ fontSize: '16px' }}>Delivery with in 2 days form your date</small>
                                        </div>
                                        <div>
                                            <button className='btn btn-outline-danger' onClick={() => removeHandler(item.id)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }

            </div>
            <hr />
            <center style={{ margin: '20px auto', width: '50%' }}>
                <p>Total : <span> ₹ {calculateTotalPrice()} <br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg> <small style={{ fontSize: '16px' }}>Free Delivery</small></span></p>
            </center>
        </div>
    )
}

export default Myorders