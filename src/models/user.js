const mongoose = require("mongoose");
const Joi = require('joi'); 
const { boolean, bool } = require("joi/lib");
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    token: { type: String },
});

module.exports = mongoose.model("user", userSchema);



