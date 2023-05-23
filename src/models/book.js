const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    rating : {type: number},
    status: {
        type: String,
        enum: ['read', 'reading','want to read']
      }
      //userId
    })

const bookSchema = new mongoose.Schema({

title : {type: string , require: true},
description : {type: string , require: true},
image : {type: string , require: true},
categoryId : { type: mongoose.Schema.Types.ObjectId , ref:"category",require: true},
//AuthorId
review :[reviewSchema]
})

const bookModel = mongoose.model("book",categorytSchema);

module.exports = bookModel;


