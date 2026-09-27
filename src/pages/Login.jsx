import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { fetchUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || "Invalid email or password.");
            }

            const data = await response.json();
            
            if (data.token) {
                localStorage.setItem("token", data.token);
                await fetchUser(); 
                navigate(-1); // Go back to the previous page
            } else {
                throw new Error("No token received");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.message || "Something went wrong during login.");
        }
    };

    return (
        <div className="login-page">
            <Navbar />
            <div className="login-container">
                <div className="login-box">
                    <h2>Welcome Back</h2>
                    <p className="login-subtitle">Please login to your account</p>

                    {error && <div className="login-error">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        
                        <button type="submit" className="login-submit-btn">
                            Login
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        Don't have an account? <Link to="/register">Sign up here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
