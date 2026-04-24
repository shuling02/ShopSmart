import { useEffect, useState } from "react";
import axios from "axios";


function Dashboard() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");

    const token = localStorage.getItem("token");

    const fetchItems = async () => {
        const res = await axios.get(
            "http://localhost:5000/api/items",
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setItems(res.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = async () => {
        await axios.post(
            "http://localhost:5000/api/items",
            { name, purchased: false},
            {
                headers: {
                    Authorization: token
                }
            }
        );
        setName("")
        fetchItems();
    };

    const deleteItem = async (id) => {
        await axios.delete(
            `http://localhost:5000/api/items/${id}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        fetchItems();
    };

    return (
        <div>
            <h2>Your Grocery List </h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                plcaeholder="Add item"
            />
            <button onClick={addItem}>Add</button>

            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                        {item.name}
                        <button onClick={() => deleteItem(item._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;