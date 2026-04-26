const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG images are allowed"), false);
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

router.post(
    "/upload",
    authMiddleware,
    (req, res, next) => {
        upload.single("image")(req, res, function (err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            next();
        });
    },
    async (req, res) => {
        try {
            const imagePath = `/uploads/${req.file.filename}`;

            const user = await User.findByIdAndUpdate(
                req.user.id,
                { profileImage: imagePath },
                { new: true }
            );

            res.json(user);
        } catch (err) {
            res.status(500).json("Upload failed");
        }
    }
);

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