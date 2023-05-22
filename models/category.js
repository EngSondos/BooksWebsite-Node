const mongoose = require('mongoose');

const categorytSchema = new mongoose.Schema({

name : {type: string , require: true},

})

const categoryModel = mongoose.model("category",categorytSchema);

module.exports = categoryModel;


