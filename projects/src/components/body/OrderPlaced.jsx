import React from 'react'
import { Link, } from 'react-router-dom'



const OrderPlaced = () => {


    return (
        <div className='container order-placed-card'>
            <div style={{ width: "20rem", height: "20rem", position: "relative" }} className='bg-white d-flex justify-content-center align-items-center'>
                <div className='check-card'>
                    <span class="material-symbols-outlined check-icon">
                        check
                    </span>
                </div>
                <div className="dot-card1"></div>
                <div className="dot-card2"></div>
                <div className="dot-card3"></div>
                <div className="dot-card4"></div>
                <div className="dot-card5"></div>
                <div className="dot-card6"></div>
                <div className="dot-card7"></div>
                <div className="dot-card8"></div>

            </div>
            <div className='bg-white text-center'>
                <h4 className='bg-white fw-bold mb-2'>Order Placed</h4>
                <h6 className='bg-white text-secondary'>Check Your Orders <Link className='bg-white fw-bold' style={{ textDecoration: "none" }} to="/my-orders">My Orders</Link></h6>
                <Link style={{ textDecoration: "none" }} className='mt-2 fw-bold fs-6 btn bg-primary text-white' to="/">Continue Shopping</Link>
            </div>
        </div>
    )
}

export default OrderPlaced