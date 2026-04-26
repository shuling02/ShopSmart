import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }){
    return (
        <div className="navbar">
            <div className="logo">Logo</div>

            <div className="nav-links">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/profile">Profile</NavLink>

                {!isLoggedIn ? (
                    <>
                        <NavLink to="/">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </>
                ) : (
                    <NavLink to="/logout">Logout</NavLink>
                )}
            </div>
        </div>
    );
}

export default Navbar;