const mongoose = require('mongoose')

const quizzeSchema = mongoose.Schema({
    level: {
        type: String,
        required: true,
    },

    questions: {

        type: [String],
        required: false,

    },
    propositions: {
        type: [[String]],
        required: false,
    },
    answers: {
        type: [String],
        required: false,
    }


});
module.exports = Quizze = mongoose.model("quizze", quizzeSchema)