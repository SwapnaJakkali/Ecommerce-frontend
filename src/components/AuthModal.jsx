import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";


// ============================
// AUTH MODAL
// Shows Login / Register tabs
// when user tries to add to cart
// without being logged in
// ============================

function AuthModal({ onClose, onSuccess }) {

    const { fetchUser } = useAuth();


    // =========================
    // STATE
    // =========================

    const [activeTab, setActiveTab] = useState("login");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // Shows green success message after registration
    const [registerSuccess, setRegisterSuccess] = useState("");


    // Login form
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    // Register form
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    // =========================
    // CLOSE ON BACKDROP CLICK
    // =========================

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };


    // =========================
    // SWITCH TAB
    // =========================

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError("");
        setRegisterSuccess("");
    };


    // =========================
    // LOGIN
    // POST /api/auth/login
    // =========================

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        if (!loginForm.email || !loginForm.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginForm.email,
                    password: loginForm.password,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.message || "Invalid email or password.");
            }

            const data = await response.json();

            // ========================
            // LOGIN RESPONSE: { "token": "eyJ..." }
            // Confirmed — only field is "token"
            // ========================

            localStorage.setItem("token", data.token);

            // Fetch user info (GET /api/users/me) so Navbar updates immediately
            await fetchUser();

            onSuccess();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };


    // =========================
    // REGISTER
    // POST /api/auth/register
    // =========================

    const handleRegister = async (e) => {

        e.preventDefault();
        setError("");

        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setError("Please fill in all fields.");
            return;
        }

        if (registerForm.password !== registerForm.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (registerForm.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: registerForm.name,
                    email: registerForm.email,
                    password: registerForm.password,
                }),
            });

            if (!response.ok) {
                // Try to parse error message from backend
                const errText = await response.text();
                let errMessage = "Registration failed. Try again.";
                try {
                    const errJson = JSON.parse(errText);
                    errMessage = errJson.message || errMessage;
                } catch {
                    errMessage = errText || errMessage;
                }
                throw new Error(errMessage);
            }

            // ========================
            // REGISTER RESPONSE:
            // Plain string: "User registered successfully"
            // NOT a JSON object — no token returned
            // ========================

            // Auto-switch to Login tab with a success message
            setRegisterSuccess("✅ Account created! Please login with your credentials.");
            setActiveTab("login");

            // Pre-fill login email for convenience
            setLoginForm((prev) => ({
                ...prev,
                email: registerForm.email,
            }));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="auth-backdrop" onClick={handleBackdropClick}>

            <div className="auth-modal">


                {/* CLOSE BUTTON */}

                <button
                    className="auth-close-btn"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>


                {/* HEADER */}

                <div className="auth-header">
                    <div className="auth-lock-icon">🔒</div>
                    <h2>Sign in to continue</h2>
                    <p>You need an account to add items to your cart</p>
                </div>


                {/* TABS */}

                <div className="auth-tabs">

                    <button
                        className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => switchTab("login")}
                    >
                        Login
                    </button>

                    <button
                        className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => switchTab("register")}
                    >
                        Register
                    </button>

                </div>


                {/* ERROR MESSAGE */}

                {error && (
                    <div className="auth-error">
                        ⚠️ {error}
                    </div>
                )}

                {/* SUCCESS MESSAGE (after register → switches to login tab) */}

                {registerSuccess && (
                    <div className="auth-success">
                        {registerSuccess}
                    </div>
                )}


                {/* ========================
                    LOGIN FORM
                ======================== */}

                {activeTab === "login" && (

                    <form className="auth-form" onSubmit={handleLogin}>

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={loginForm.email}
                                onChange={(e) =>
                                    setLoginForm({ ...loginForm, email: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={loginForm.password}
                                onChange={(e) =>
                                    setLoginForm({ ...loginForm, password: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="auth-switch-text">
                            Don't have an account?{" "}
                            <span onClick={() => switchTab("register")}>
                                Register here
                            </span>
                        </p>

                    </form>

                )}


                {/* ========================
                    REGISTER FORM
                ======================== */}

                {activeTab === "register" && (

                    <form className="auth-form" onSubmit={handleRegister}>

                        <div className="auth-field">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={registerForm.name}
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, name: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={registerForm.email}
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, email: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Min. 6 characters"
                                value={registerForm.password}
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, password: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <div className="auth-field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                value={registerForm.confirmPassword}
                                onChange={(e) =>
                                    setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>

                        <p className="auth-switch-text">
                            Already have an account?{" "}
                            <span onClick={() => switchTab("login")}>
                                Login here
                            </span>
                        </p>

                    </form>

                )}

            </div>

        </div>

    );
}


export default AuthModal;
