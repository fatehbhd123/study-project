const mongoose = require("mongoose")


const associationSchema = mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,

    },
    ar_name: {
        type: String,
        required: false,
    },

    username: {

        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    facebook: {
        type: String,
        required: false,
    }

});
module.exports = Association = mongoose.model("association", associationSchema)