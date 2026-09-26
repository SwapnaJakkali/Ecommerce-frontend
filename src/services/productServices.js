const BASE_URL = "http://localhost:8080/api";

export const getProducts = async (page, size) => {

    const response = await fetch(
        `${BASE_URL}/products?page=${page}&size=${size}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    console.log(data);

    return data;
};
export const getProductById = async (id) => {

    const response = await fetch(
        `${BASE_URL}/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
};

export const getProductsByCategory = async (categoryId) => {

    const response = await fetch(
        `${BASE_URL}/products/category/${categoryId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products by category");
    }

    const data = await response.json();

    return data;
};