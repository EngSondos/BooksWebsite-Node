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

const bookModel = mongoose.model("book",bookSchema);

module.exports = bookModel;


