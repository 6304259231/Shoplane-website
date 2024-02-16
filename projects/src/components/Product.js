import React, { useState, useEffect, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import { store } from '../App'

function Product() {
    const [product, setProduct] = useState({});
    let [cartItems, setCartItems] = useContext(store)
    const [image, setImage] = useState();
    const [activePreview, setActivePreview] = useState(null);
    let [load, setLoad] = useState(false);
    const { id } = useParams();



    let changeBorder = useRef(null);

    let changeBorderHandler = (element) => {
        if (activePreview) {
            activePreview.style.border = 'none';
        }
        element.style.border = '2px solid green';
        setActivePreview(element);
    };
    const changeImageHandler = (img) => {
        setImage(img)
    }

    const addToCart = (item) => {
        let exists = cartItems.find((product) => item.id === product.item.id);
        if (exists) {
            alert('item is already in your cart')
        }
        else {
            setCartItems([...cartItems, { item, qnty: 1 }])
        }
    }
    useEffect(() => {
        setLoad(true)
        let baseURL = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product'
        axios.get(`${baseURL}/${id}`)
            .then((response) => {
                setProduct(response.data)
                setImage(response.data.preview)

            }).catch((error) => {
                console.log('data fecthing error', error.messsage)
            }).finally(()=>{
                setLoad(false)
            })
        
    }, [id])

    if (load) {
        return (
            <center style={{ width: '70%', margin: '80px auto', display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
        <div>
            <div id="single-product-section">
                <div id="product-img-main">
                    <img src={image} alt={`product${id}`}></img>
                </div>
                <div id="product-details-aside">
                    <div id='prod-preview-section'>
                        {product.photos && product.photos.map((previewImg, index) => {
                            return (
                                <div ref={changeBorder} id='preview-imgs' key={index}>
                                    <img src={previewImg} alt='previews' onClick={(e) => {
                                        changeBorderHandler(e.target)
                                        changeImageHandler(e.target.src);
                                    }} />
                                </div>
                            )
                        })
                        }
                    </div>
                    <div id="prod-name">
                        <p>{product.name} </p>
                        <h3 id="prod-brand">{product.brand} </h3>
                    </div>
                    <div id="prod-price">
                        <h4 id="price" style={{ marginTop: '25px', marginLeft: '10px' }}> ₹<span id="spanrs"><i>{product.price}</i></span> </h4>
                    </div>
                    <div id='prod-description'>
                        <b style={{ fontFamily: 'Rubik' , fontSize : '20px' , fontWeight : '400'}}>Feauters</b>
                        <p> {product.description} </p>
                    </div>

                    <button id="addToCart-btn" onClick={() => {
                        addToCart(product)
                    }}> <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={25}
                        height={25}
                        fill="currentColor"
                        className="bi bi-cart3"
                        viewBox="0 0 16 16"
                    >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg> Add to card</button>

                </div>
            </div>
        </div>
    )
}

export default Product