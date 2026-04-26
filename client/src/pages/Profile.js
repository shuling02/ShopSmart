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

    return (
        <div className="profile-page">
            <Navbar isLoggedIn={true} />

            <div className="profile-container">
                <div className="profile-card">
                    <h2>My Profile</h2>

                    <div className="profile-top">
                        <div className="profile-img">Photo</div>

                        <div className="profile-info">
                            {editing ? (
                                <>
                                    <input
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                        placeholder="Name"
                                    />
                                    <input
                                        name="age"
                                        value={profile.age}
                                        onChange={handleChange}
                                        placeholder="Age"
                                    />
                                    <input
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleChange}
                                        placeholder="Gender"
                                    />
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

                        <div className="profile-actions">
                            {editing ? (
                                <>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={() => setEditing(false)}>Cancel</button>
                                </>
                            ) : (
                                <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;