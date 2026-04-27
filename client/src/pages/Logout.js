import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/logout.scss";
import axios from "axios";


function Logout() {
    const navigate = useNavigate();

    const handleConfirm = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {}, {
                withCredentials: true
            });

            navigate("/login");
            window.location.reload();

        } catch (err) {
            console.error(err);
        }
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