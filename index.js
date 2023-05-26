const express = require('express')
const mongoose = require("mongoose")
const bookRouter = require('./src/routes/book')
const {authorModel}= require('./src/models/author')
const {categoryModel}= require('./src/models/category')

const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));


app.use('/book',bookRouter)

const PORT =5050

app.listen(PORT,()=>{
    console.log("Listening...")
})

// index.js
app.post("/",(request,respone)=>{
    authorModel.create({...request.body},(error,BookData)=>{
    console.log(BookData)
    if(!error){
    return respone.json({"message":"Book Created Successfully"})
    }else
    respone.json(error)
    })
    })
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/BookDb", () =>
  console.log("Connected...")
);





