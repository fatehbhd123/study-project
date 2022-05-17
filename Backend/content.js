const mongoose = require("mongoose")


const contentSchema = mongoose.Schema({
    level: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },

    question: {

        type: [String],
        required: false,

    },
    content: {
        type: [[String]],
        required: false,
    },
    link: {
        type: String,
        required: false,
    }

});
module.exports = Content = mongoose.model("content", contentSchema)