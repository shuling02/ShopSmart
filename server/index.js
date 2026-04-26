require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
