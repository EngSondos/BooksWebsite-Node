const mongoose = require('mongoose');

const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi);


const reviewSchema = new mongoose.Schema({

          
    rating : {type: Number,default: null},

      userId : { type: mongoose.Schema.Types.ObjectId , ref:"user",require: true},
      review:{type:String},
    })


    function reviewValidate(reviewSchema) {
        const schema = Joi.object({ 
                rating: Joi.number().integer().min(1).max(5),
                 userId: Joi.ObjectId().required(),
                review: Joi.string().required(),
          
         });
         return schema.validate(reviewSchema);
               
      }


      const reviewModel = mongoose.model("review",reviewSchema);



module.exports = {reviewModel,reviewValidate};