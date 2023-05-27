const express = require('express')
const mongoose = require("mongoose")
const authorRouter = require('./src/routes/author')
const {bookModel}  = require('./src/models/book')

const app = express()
app.use(express.json())
const PORT =5000

app.listen(PORT,()=>{
    console.log("Listening...")
})

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