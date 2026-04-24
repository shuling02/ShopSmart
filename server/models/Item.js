const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    purchased: Boolean,
    userId: String
});

module.exports = mongoose.model("Item", itemSchema);