import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/dashboard.scss";
import "../styles/navbar.scss";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [store, setStore] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editStore, setEditStore] = useState("");
    const [editingField, setEditingField] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/items`, {
                withCredentials: true
            });
            setItems(res.data);
        } catch (err) {
            if(err.response?.status === 401) {
                navigate("/login");
            } else{
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const isValidText = (text) => {
        return /[a-zA-Z0-9]/.test(text);
    };

    const addItem = async () => {

        if (!name.trim()) {
            alert("Item name required");
            return;
        }

        if (!isValidText(name)) {
            alert("Item name cannot be only symbols");
            return;
        }

        if (store.trim() && !isValidText(store)) {
            alert("Store name cannot be only symbols");
            return;
        }

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/items`,
                { name, store, purchased: false },
                { withCredentials: true }
            );
            setName("")
            setStore("");
            setShowForm(false);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteItem = async (id) => {
        await axios.delete(
            `${process.env.REACT_APP_API_URL}/api/items/${id}`,
            { withCredentials: true }
        );
        fetchItems();
    };

    const toggleItem = async (id) => {
        await axios.put(
            `${process.env.REACT_APP_API_URL}/api/items/${id}`,
            { withCredentials: true }
        );
        fetchItems();
    };

    const startEdit = (item, field) => {
        setEditingId(item._id);
        setEditingField(field);
        setEditName(item.name);
        setEditStore(item.store);
    };

    const saveEdit = async (id) => {

        if (editingId !== id) return;

        const trimmedName = editName.trim();
        const trimmedStore = editStore.trim();

        if (!trimmedName) {
            alert("Item name required");
            return;
        }

        if (!isValidText(trimmedName)) {
            alert("Item name cannot be only symbols");
            return;
        }

        if (trimmedStore && !isValidText(trimmedStore)) {
            alert("Store name cannot be only symbols");
            return;
        }

        const finalStore = trimmedStore || editStore;

        setEditingId(null);

        await axios.put(
            `${process.env.REACT_APP_API_URL}/api/items/edit/${id}`,
            { withCredentials: true },
            { name: trimmedName, store: finalStore }
        );

        setEditingId(null);
        setEditingField(null);

        fetchItems();
    };

    return (
        <div className="dashboard-page">

            <div className="dashboard-container">
                <div className="dashboard-card">

                    <h2>Grocery Checklist 🛒</h2>

                    <div className="list-container">
                        <ul>
                            {items.map((item) => (
                                <li key={item._id}>
                                    <div className="item-left">
                                        <input
                                            type="checkbox"
                                            checked={item.purchased}
                                            onChange={() => toggleItem(item._id)}
                                        />

                                        {editingId === item._id && editingField === "name" ? (
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                onBlur={() => saveEdit(item._id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveEdit(item._id);
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                className={item.purchased ? "done" : ""}
                                                onClick={() => startEdit(item, "name")}
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="item-right">
                                        {editingId === item._id && editingField === "store" ? (
                                            <input
                                                value={editStore}
                                                onChange={(e) => setEditStore(e.target.value)}
                                                onBlur={() => saveEdit(item._id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveEdit(item._id);
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                className="store"
                                                onClick={() => startEdit(item, "store")}
                                            >
                                                {item.store}
                                            </span>
                                        )}

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteItem(item._id)}
                                        >
                                        </button>
                                    </div>
                                </li>
                            ))}

                            {showForm && (
                                <li className="new-item">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Add item"
                                        autoFocus
                                    />

                                    <input
                                        value={store}
                                        onChange={(e) => setStore(e.target.value)}
                                        placeholder="Store (e.g. Target)"
                                        autoFocus
                                    />

                                    <button onClick={addItem}>Save</button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <button className="add-btn" onClick={() => setShowForm(true)}>
                        Add
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;