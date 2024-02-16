
import React, { useState } from 'react';

export const cardContext = React.createContext();

export const useContextProvider = ({ children }) => {
    const [cartItems , setCartItems] = useState([]);

    const addToCart = (product)=>{
        setCartItems([...cartItems , {product , qnty : 1}])
    }

    return <cardContext.Provider value={{cartItems , addToCart}}>
        {children}
    </cardContext.Provider>
}

