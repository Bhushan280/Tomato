import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextprovider = (props) => {

    const [cartItems, setCaetItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCaetItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCaetItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

    }

    const removeFromCart = (itemId) => {
        setCaetItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totlAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totlAmount += itemInfo.price * cartItems[item]
            }
        }
        return totlAmount
    }

    const contextValue = {
        food_list,
        cartItems,
        setCaetItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextprovider