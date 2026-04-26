import { useState } from "react";
import axios from "axios";
import "../styles/login.scss";
import "../styles/navbar.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const isValidText = (text) => /[a-zA-Z0-9]/.test(text);

const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function Signup() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = form;

        if (!username.trim()) {
            alert("Username required");
            return;
        }

        if (!isValidText(username)) {
            alert("Username cannot be only symbols");
            return;
        }

        if (!email.trim()) {
            alert("Email required");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Invalid email format");
            return;
        }

        if (!password) {
            alert("Password required");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/signup",
                form
            );
            alert(res.data);
        } catch (err) {
            alert(err.response?.data || "Error");
        }
    };

    return (
        <div className="login-page">
            
            <div className="login-container">
                <div className="login-card">

                    <h3>Create an account</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                name="username"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Sign Up</button>

                        <p className="switch-text">
                            Already have an account? <Link to="/">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;