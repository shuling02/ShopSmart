import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.scss";

function Profile() {

    const [profile, setProfile] = useState({
        username: "",
        age: "",
        gender: "",
        foodPreferences: "",
        notes: ""
    });

    const [editing, setEditing] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/profile",
                    {
                        headers: { Authorization: token }
                    }
                );
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {

        if(!profile.username){
            alert("Name cannot be empty");
            return;
        }

        try {
            const res = await axios.put(
                "http://localhost:5000/api/profile",
                profile,
                {
                    headers: { Authorization: token }
                }
            );

            setProfile(res.data);
            setEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if(!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if(!allowedTypes.includes(file.type)) {
            alert("Only JPG and PNG images are allowed");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/profile/upload",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            setProfile(res.data);
        } catch(err) {
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div className="profile-page">

            <div className="profile-container">
                <div className="profile-card">
                    <h2>My Profile</h2>
                    
                    <div className="profile-top">
                        <div className="profile-img" onClick={() => document.getElementById("fileInput").click()}>
                            
                            {profile.profileImage ? (
                                <img
                                    src={`http://localhost:5000${profile.profileImage}`}
                                    alt="profile"
                                />
                            ) : (
                                <span>Photo</span>
                            )}

                            <input 
                                id="fileInput"
                                type="file" 
                                onChange={handleImageChange}
                                style={{ display: "none "}} 
                            />
                        
                        </div>
                        <div className="profile-info">
                            {editing ? (
                                <>
                                    <label>Name</label>
                                    <input
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                    />
                                    <label>Age</label>
                                    <input
                                        name="age"
                                        value={profile.age}
                                        onChange={handleChange}
                                    />
                                    <label>Gender</label>
                                    <select
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </>
                            ) : (
                                <>
                                    <p><strong>Name: </strong>{profile.username}</p>
                                    <p><strong>Age: </strong>{profile.age}</p>
                                    <p><strong>Gender: </strong>{profile.gender}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="profile-bottom">
                        <div className="section">
                            <h4>Food Preference</h4>
                            {editing ? (
                                <textarea
                                    name="foodPreferences"
                                    value={profile.foodPreferences}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.foodPreferences}</p>
                            )}
                        </div>

                        <div className="section">
                            <h4>Notes</h4>
                            {editing ? (
                                <textarea
                                    name="notes"
                                    value={profile.notes}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>{profile.notes}</p>
                            )}
                        </div>

                    </div>
                    
                    <div className="profile-actions">
                            {editing ? (
                                <>
                                    <button className="save-btn" onClick={handleSave}>Save</button>
                                    <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                                </>
                            ) : (
                                <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;