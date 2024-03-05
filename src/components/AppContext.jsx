"use client"
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
    let price = cartProduct.price;
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extras of cartProduct.extras) {
            price += extras.price
        }
    }
    return price;
}
export function AppProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const ls = typeof window !== "undefined" ? window.localStorage : null;


    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartItems(JSON.parse(ls.getItem('cart')));
        }
    }, [])

    function clearCart() {
        setCartItems([]);
        saveCartItemsToLocalStorage([]);
    }
    function removeCartItem(indexToRemove) {
        setCartItems(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((v, index) => index !== indexToRemove)
            saveCartItemsToLocalStorage(newCartProducts);
            return newCartProducts;
        });
        toast.success('Product removed successfully');
    }

    function saveCartItemsToLocalStorage(cartItems) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartItems));
        }
    }


    function addToCart(product, size = null, extras = []) {
        setCartItems(prevProducts => {
            const cartProduct = { ...product, size, extras };
            const newProducts = [...prevProducts, cartProduct]
            saveCartItemsToLocalStorage(newProducts);
            return newProducts;
        });

    }
    return (
        <SessionProvider>
            <CartContext.Provider
                value={{ cartItems, setCartItems, addToCart, removeCartItem, clearCart, }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}        