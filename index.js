const express = require('express')
const mongoose = require("mongoose")
const reviewRouter = require('./src/routes/review')
const categoryRouter = require('./src/routes/category')
const bookRouter = require('./src/routes/book')
const {categoryModel} =require('./src/models/category')
const {authorModel} =require('./src/models/author')


const app = express()
app.use(express.json())
app.use('/assets', express.static('assets'));


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
const authorRouter = require('./src/routes/author')
const {bookModel}  = require('./src/models/book')


const PORT =5000

app.listen(PORT,()=>{
    console.log("Listening...")
})


app.use('/category',categoryRouter)
app.use('/review',reviewRouter)
app.use('/book',bookRouter)




// index.js
app.use('/author', authorRouter);

// app.post("/",(req,res)=>{
//     bookModel.create({...req.body},(error,BookData)=>{
//     console.log(BookData)
//     if(!error){
//     return res.json({"message":"Book Created Successfully"})
//     }else
//     res.json(error)
//     })
//     })

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/BookDb", () =>
  console.log("Connected...")
);
dbNative = mongoose.connection.db;
console.log(dbNative);