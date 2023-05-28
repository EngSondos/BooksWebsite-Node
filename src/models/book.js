const mongoose = require('mongoose');
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi);

const bookSchema = new mongoose.Schema({

title : {type: String , require: true},
image : {type: String , require: true},
categoryId : { type: mongoose.Schema.Types.ObjectId , ref:"categories",require: true},
 authorId : { type: mongoose.Schema.Types.ObjectId , ref:"authors",require: true},
review :[
  {
      rating : {type: Number,default: null},
      userId : { type: mongoose.Schema.Types.ObjectId , ref:"users",require: true},
      review:{type:String}
    }
],
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
    image: Joi.string(),
    categoryId : Joi.ObjectId().required(),
    authorId : Joi.ObjectId().required(),
     reviews : Joi.object(),
    statususers: Joi.object()
    
   });
   return schema.validate(bookSchema);
         
}

function reviewValidate(reviewSchema) {
  const schema = Joi.object({ 
          rating: Joi.number().integer().min(1).max(5),
           userId: Joi.ObjectId(),
          review: Joi.string(),
   return schema.validate(reviewSchema);
         
}
function statusValidate(statusSchema) {
  const schema = Joi.object({ status: Joi.string()  .required().valid('read','want to read','reading')    
   });
   return schema.validate(statusSchema);
         
}
const bookModel = mongoose.model("books",bookSchema);

module.exports = {bookModel,bookValidate,statusValidate,reviewValidate};






