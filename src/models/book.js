const mongoose = require('mongoose');
const Joi = require('joi')
// Joi.objectId = require('joi-objectid')(Joi)


const reviewSchema = new mongoose.Schema({

    rating : {type: Number,default: null},

      userId : { type: mongoose.Schema.Types.ObjectId , ref:"users",require: true},
      review:{type:String}
    })

const bookSchema = new mongoose.Schema({

title : {type: String , require: true},
description : {type: String , require: true},
image : {type: String , require: true},
categoryId : { type: mongoose.Schema.Types.ObjectId , ref:'categories'},
authorId : { type: mongoose.Schema.Types.ObjectId , ref:'authors'},
   
review :[reviewSchema],
statususers: 
[{
  status:{
  type: String,
  enum: ['read', 'reading','want to read']
},
  userId : { type: mongoose.Schema.Types.ObjectId , ref:"users",require: true},
}]

})


function bookValidate(bookSchema) {
  const schema = Joi.object({ title: Joi.string()  .required()
    .messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required'
    })
    ,
    description : Joi.string().required(),
    image: Joi.string(),
    // categoryId : Joi.objectId().required(),
    // authorId :Joi.objectId().required(),
    
    review :Joi.object()
    ,
    statususers:Joi.object()
    
   });
   return schema.validate(bookSchema);
         
}
function statusValidate(statusSchema) {
  const schema = Joi.object({ status: Joi.string()  .required().valid('read','want to read','reading')
    // ,userId:Joi.objectId().required()
    
   });
   return schema.validate(statusSchema);
         
}
const bookModel = mongoose.model("book",bookSchema);

module.exports = {bookModel,bookValidate,statusValidate};

