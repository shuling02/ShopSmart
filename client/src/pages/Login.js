import { useState } from "react";
import axios from "axios";
import "../styles/login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/api/profile")
            .then(() => {
                navigate("/dashboard");
            })
            .catch(() => {

            });
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!form.email || !form.password){
            alert("Email and password required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );
            
            navigate("/dashboard");

            alert("Login successful");
        } catch (err) {
            console.log(err.response);
            alert(err.response?.data || "Error");
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

               <div className="login-card">

                    <h3>Login</h3> 

                    <form onSubmit={handleSubmit}>
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

                        <button type="submit">Login</button>

                        <p className="switch-text">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
               </div>
            </div>
        </div>
    );
}

export default Login;




