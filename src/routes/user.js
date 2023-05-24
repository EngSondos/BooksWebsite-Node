
const express = require('express')
const mongoose = require("mongoose");
const {userModel ,userValidate } = require('../models/user');
const bcrypt = require('bcrypt');
const { userRegister } = require('../controllers/auth');


// const {userSchema, userValidate } = require("./src/models/user");

const router = express.Router();


// router.post('/' , (req , res)=>{
 
//     const {error} = userValidate(req.body)
//     if (error) {
//         return res.status(404).send(error.details[0].message)
    
//     }
 
//      res.send('kolo tmam') 



// })

router.post("/register", userRegister );
  


  module.exports = router;