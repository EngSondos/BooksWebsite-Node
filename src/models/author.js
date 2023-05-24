const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema ({
    photo: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: { type: Date },
})

function authorValidation(authorSchema) {
    const schema = Joi.object({
            firstName: Joi.string() .required(),
            lastName: Joi.string() .required(),
            dateOfBirth: Joi.date(),
    })
    return schema.validate(authorSchema); 
}
const AuthorModel = mongoose.model("author", authorSchema);

module.exports = { AuthorModel,  authorValidation};