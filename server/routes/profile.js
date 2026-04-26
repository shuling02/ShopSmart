const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json("Server error");
    }
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json("Server error");
    }
});

module.exports = router;