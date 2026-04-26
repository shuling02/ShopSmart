import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/logout.scss";

function Logout() {
    const navigate = useNavigate();

    const handleConfirm = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="logout-page">

            <div className="logout-container">
                <div className="logout-card">
                    <h3>Are you sure you want to logout?</h3>

                    <div className="logout-buttons">
                        <button className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
                        <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;