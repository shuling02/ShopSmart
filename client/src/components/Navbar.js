import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/navbar.scss";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API_URL}/api/profile`,
            { withCredentials: true }
        )
            .then(() => setIsLoggedIn(true))
            .catch(() => setIsLoggedIn(false));
    }, []);


    return (
        <div className="navbar">
            <img src="/logo.png" alt="logo" className="logo" />

            <div className="nav-links">
                <NavLink to="/dashboard">Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                {isLoggedIn ? (
                    <NavLink to="/logout">Logout</NavLink>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;