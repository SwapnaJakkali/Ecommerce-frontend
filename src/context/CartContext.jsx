import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
    getCart,
    addItemToCart,
    updateCartItem,
    removeCartItem,
} from "../services/cartServices";


// ============================
// CONTEXT
// ============================

const CartContext = createContext();


// ============================
// PROVIDER
// ============================

export function CartProvider({ children }) {


    // =========================
    // STATE
    // =========================

    // Full CartDto from backend: { id, cartItems: [...], totalAmount }
    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);


    // =========================
    // FETCH CART FROM BACKEND
    // =========================

    const fetchCart = useCallback(async () => {

        const token = localStorage.getItem("token");

        // Don't fetch if user is not logged in
        if (!token) return;

        try {

            setLoading(true);
            setError(null);

            const data = await getCart();
            setCart(data);

        } catch (err) {

            console.error("Error fetching cart:", err);
            setError(err.message);

        } finally {

            setLoading(false);

        }

    }, []);


    // Fetch cart on mount
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);


    // =========================
    // ADD TO CART
    // POST /api/cart/items
    // { productId, quantity }
    // =========================

    const addToCart = async (productId, quantity = 1) => {

        try {

            setLoading(true);
            setError(null);

            const updatedCart = await addItemToCart(productId, quantity);
            setCart(updatedCart);

        } catch (err) {

            console.error("Error adding to cart:", err);
            setError(err.message);
            throw err; // re-throw so caller (ProductDetails) knows it failed

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // UPDATE CART ITEM
    // PUT /api/cart/items/{cartItemId}
    // NOTE: cartItemId, not productId
    // { quantity }
    // =========================

    const updateItem = async (cartItemId, quantity) => {

        try {

            setLoading(true);
            setError(null);

            const updatedCart = await updateCartItem(cartItemId, quantity);
            setCart(updatedCart);

        } catch (err) {

            console.error("Error updating cart item:", err);
            setError(err.message);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // REMOVE CART ITEM
    // DELETE /api/cart/items/{cartItemId}
    // NOTE: cartItemId, not productId
    // =========================

    const removeItem = async (cartItemId) => {

        try {

            setLoading(true);
            setError(null);

            const updatedCart = await removeCartItem(cartItemId);
            setCart(updatedCart);

        } catch (err) {

            console.error("Error removing cart item:", err);
            setError(err.message);

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // DERIVED VALUES
    // =========================

    // Total number of items (sum of all quantities)
    const totalItems = cart?.items?.reduce(
        (sum, item) => sum + item.quantity, 0
    ) ?? 0;

    // Total amount from backend response
    const totalAmount = cart?.totalAmount ?? 0;


    // =========================
    // PROVIDE CONTEXT
    // =========================

    return (
        <CartContext.Provider value={{
            cart,
            loading,
            error,
            totalItems,
            totalAmount,
            fetchCart,
            addToCart,
            updateItem,
            removeItem,
        }}>
            {children}
        </CartContext.Provider>
    );
}


// ============================
// CUSTOM HOOK
// ============================

export const useCart = () => useContext(CartContext);
