require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
