const express = require('express')
const mongoose = require("mongoose")

const users = require("./src/routes/user")

const app = express()
app.use(express.json())


const PORT =5000

app.listen(PORT,()=>{
    console.log("Listening...")
})

// index.js

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/BookDb", () =>
  console.log("Connected...")
);
dbNative = mongoose.connection.db;

console.log(dbNative);


app.use('/',users);



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });