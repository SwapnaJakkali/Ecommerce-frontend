const BASE_URL = "http://localhost:8080/api";

// Helper — read JWT token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper — build Authorization headers
const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
});


// ============================
// GET /api/cart
// ============================

export const getCart = async () => {

    const response = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }

    return response.json();
};


// ============================
// POST /api/cart/items
// Body: { productId, quantity }
// ============================

export const addItemToCart = async (productId, quantity) => {

    const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to add item to cart");
    }

    return response.json();
};


// ============================
// PUT /api/cart/items/{cartItemId}
// NOTE: {id} is cartItem ID, not productId
// Body: { quantity }
// ============================

export const updateCartItem = async (cartItemId, quantity) => {

    const response = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to update cart item");
    }

    return response.json();
};


// ============================
// DELETE /api/cart/items/{cartItemId}
// NOTE: {id} is cartItem ID, not productId
// ============================

export const removeCartItem = async (cartItemId) => {

    const response = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to remove cart item");
    }

    return response.json();
};
