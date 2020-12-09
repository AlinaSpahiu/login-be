const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
}, {
    timestamps: true
})

module.exports = User = mongoose.model("user", userSchema)