import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../services/userServices";


// ============================
// CONTEXT
// ============================

const AuthContext = createContext();


// ============================
// PROVIDER
// ============================

export function AuthProvider({ children }) {


    // =========================
    // STATE
    // =========================

    // User info from GET /api/users/me
    // e.g. { name: "John", email: "john@example.com", ... }
    const [user, setUser] = useState(null);

    const [authLoading, setAuthLoading] = useState(true);


    // =========================
    // FETCH USER INFO
    // Calls GET /api/users/me
    // =========================

    const fetchUser = useCallback(async () => {

        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setAuthLoading(false);
            return;
        }

        try {

            setAuthLoading(true);
            const data = await getCurrentUser();
            setUser(data);

        } catch (err) {

            console.error("Could not fetch user info:", err);
            // Token might be expired — clear it
            localStorage.removeItem("token");
            setUser(null);

        } finally {

            setAuthLoading(false);

        }

    }, []);


    // Fetch user on app mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    // =========================
    // LOGOUT
    // =========================

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };


    // =========================
    // PROVIDE CONTEXT
    // =========================

    return (
        <AuthContext.Provider value={{
            user,
            authLoading,
            isLoggedIn: !!user,
            fetchUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}


// ============================
// CUSTOM HOOK
// ============================

export const useAuth = () => useContext(AuthContext);
