const mongoose = require("mongoose");
const Joi = require('joi'); 

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
   
});
const userModel = mongoose.model("user", userSchema); 


function userValidate(userSchema) {
    const schema = Joi.object({ username: Joi.string()  .required(),
        email: Joi.string()  .required() .email() ,
        password: Joi.string()  .required()   .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[`!@#$%\^&*\-_=\+'/\.,]){1}).{8,}$/))
        .message({"string.pattern.base":"password must have at least 8 characters , contains at least one lowercase - 1 uppercase - 1 digit ,and 1 special character"})
     });

        // return  Joi.validate(userSchema,schema);  
       return schema.validate(userSchema); 
           
}

module.exports = { userValidate , userModel }


