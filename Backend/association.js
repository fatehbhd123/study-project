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
    sunday: {
        type: String,
        required: false,
    },
    monday: {
        type: String,
        required: false,
    },
    tuesday: {
        type: String,
        required: false,
    },
    wednesday: {
        type: String,
        required: false,
    },
    thursday: {
        type: String,
        required: false,
    },
    friday: {
        type: String,
        required: false,
    },
    saturday: {
        type: String,
        required: false,
    },

});
module.exports = Association = mongoose.model("association", associationSchema)