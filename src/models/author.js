const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema ({
    photo: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: {type: Date },
})

const authorModel = mongoose.model("author", authorSchema)
module.exports = authorModel  