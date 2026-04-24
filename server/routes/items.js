const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const items = await Item.find({ userId: req.user.id });
    res.json(items);
});

router.post("/", auth, async (req, res) => {
    const newItem = new Item({
        name: req.body.name,
        purchased: false,
        userId: req.user.id
    });

    await newItem.save();
    res.json(newItem);
});

router.delete("/:id", auth, async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json("Item deleted");
});

module.exports = router;