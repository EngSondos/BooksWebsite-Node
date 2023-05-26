const mongoose = require('mongoose');

const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi);




const bookSchema = new mongoose.Schema({

title : {type: String , require: true},
description : {type: String , require: true},
image : {type: String , require: true},
categoryId : { type: mongoose.Schema.Types.ObjectId , ref:"category",require: true},
   AuthorId : { type: mongoose.Schema.Types.ObjectId , ref:"author",require: true},

review :[

  {


    rating : {type: Number,default: null},

      userId : { type: mongoose.Schema.Types.ObjectId , ref:"user",require: true},
      review:{type:String}
    }
],
statususers: 
[{
  status:{
  type: String,
  enum: ['read', 'reading','want to read']
},
  userId : { type: mongoose.Schema.Types.ObjectId , ref:"user",require: true},
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
    categoryId : Joi.ObjectId().required(),
    AuthorId : Joi.ObjectId().required(),
    review : Joi.object(),
    statususers: Joi.object()
    
   });
   return schema.validate(bookSchema);
         
}

function reviewValidate(reviewSchema) {
  const schema = Joi.object({ 
          rating: Joi.number().integer().min(1).max(5),
           userId: Joi.ObjectId(),
          review: Joi.string().required(),
    
   });
   return schema.validate(reviewSchema);
         
}




const bookModel = mongoose.model("book",bookSchema);

module.exports = {bookModel,bookValidate,reviewValidate};

