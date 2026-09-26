const BASE_URL = "http://localhost:8080/api";

// Helper — read JWT token from localStorage
const getToken = () => localStorage.getItem("token");


// ============================
// GET /api/users/me
// Fetches logged-in user's info
// Response: { name, email, role, ... }
// ============================

export const getCurrentUser = async () => {

    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user info");
    }

    return response.json();
};
