const mongoose = require("mongoose")

let books = {
    name: String,
    author: String,
    edition: String,
    view: String,
    image: String,

}
const advancedcontentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    listfamous: {
        type: [books],
        required: false,
    },
    listbooks: {
        type: [books],
        required: false,
    },
    listvideos: {
        type: [String],
        required: false
    }

});
module.exports = Advancedcontent = mongoose.model("advancedcontent", advancedcontentSchema)