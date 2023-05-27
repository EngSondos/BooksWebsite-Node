const mongoose = require('mongoose');
const Joi = require('joi'); 

const categorytSchema = new mongoose.Schema({

name : {type: String , require: true},

})
function categoryValidate(categorySchema) {
    const schema = Joi.object({ name: Joi.string()  .required() .messages({
            'string.empty': 'name is a required field'
          }),  
           });
       return schema.validate(categorySchema);        
}

const categoryModel = mongoose.model("categories",categorytSchema);

module.exports = {categoryModel,categoryValidate};


