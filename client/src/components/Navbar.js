import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";

function Navbar(){
    return (
        <div className="navbar">
            <img src="/logo.png" alt="logo" className="logo" />

            <div className="nav-links">
                <NavLink to="/dashboard">Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </div>
        </div>
    );
}

export default Navbar;