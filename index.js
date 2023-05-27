const express = require('express')
const mongoose = require("mongoose")
const reviewRouter = require('./src/routes/review')
const categoryRouter = require('./src/routes/category')


const app = express()
app.use(express.json())


const PORT =5000

app.listen(PORT,()=>{
    console.log("Listening...")
})


app.use('/category',categoryRouter)
app.use('/review',reviewRouter)



// index.js

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/BookDb", () =>
  console.log("Connected...")
);
dbNative = mongoose.connection.db;
console.log(dbNative);




