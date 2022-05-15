const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {

        type: String,
        required: true,

    },
    level: {
        type: String,
        required: false,
    },


});
module.exports = User = mongoose.model("user", userSchema)