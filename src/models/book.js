const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    rating : {type: Number,default: null},

      userId : { type: mongoose.Schema.Types.ObjectId , ref:"user",require: true},
      review:{type:String}
    })

const bookSchema = new mongoose.Schema({

title : {type: String , require: true},
description : {type: String , require: true},
image : {type: String , require: true},
categoryId : { type: mongoose.Schema.Types.ObjectId , ref:"category",require: true},
   AuthorId : { type: mongoose.Schema.Types.ObjectId , ref:"author",require: true},

review :[reviewSchema],
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
    review :
      Joi.object({
        rating : Joi.number().default(null),
        userId : Joi.ObjectId().required(),
        review: Joi.string().required(),

      })
    ,
    statususers:
      Joi.object({
        status: Joi.string().valid('read','reading','want to read').required(),
        userId: Joi.ObjectId().required()
      })
    


   });
   return schema.validate(bookSchema);
         
}

const bookModel = mongoose.model("book",bookSchema);

module.exports = {bookModel,bookValidate};

