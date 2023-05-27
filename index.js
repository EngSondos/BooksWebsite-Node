const express = require('express')
const mongoose = require("mongoose")
const reviewRouter = require('./src/routes/review')
const categoryRouter = require('./src/routes/category')
const bookRouter = require('./src/routes/book')
const mybookRouter = require('./src/routes/userBook')

const {authorModel}= require('./src/models/author')
const {categoryModel}= require('./src/models/category')
const {userModel}= require('./src/models/user')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/book',bookRouter)
app.use('/mybooks',mybookRouter)


const PORT =5050

app.listen(PORT,()=>{
    console.log("Listening...")
})


app.use('/category',categoryRouter)
app.use('/book',reviewRouter)



mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/BookDb", () =>
console.log("Connected...")
);





