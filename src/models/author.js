const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema ({
    image: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dateOfBirth: { type: Date },
})

function authorValidation(authorSchema) {
    const schema = Joi.object({
            image: Joi.string(),
            firstName: Joi.string() .required(),
            lastName: Joi.string() .required(),
            dateOfBirth: Joi.date(),
    })
    return schema.validate(authorSchema); 
}
const authorModel = mongoose.model('authors', authorSchema);

module.exports = { authorModel,  authorValidation};
