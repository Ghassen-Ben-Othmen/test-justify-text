const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.String,
        unique: true
    },
    token: {
        type: mongoose.Schema.Types.String,
        default: ""
    },
    limit: {
        type: mongoose.Schema.Types.Number
    }
})

module.exports = userModel = mongoose.model("user", userSchema)