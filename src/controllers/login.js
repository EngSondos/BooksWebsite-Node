
const express = require('express')
const mongoose = require("mongoose");
const {userModel ,userValidate } = require('../models/user');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken'); 

async  function userLogin(req , res ) {
   
   // Our login logic starts here
   try {
    // Validate user input
    const { error } =userValidate(req.body) ;
    if (error) {
        return res.status(404).send(error.details[0].message)
    }
  // Get user input
  const { email, password } = req.body;

  

  // Validate if user exist in our database
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email , password },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
     user.token = token;
    // res.json({
    //   token : token
    // })
    // user
    res.status(200).json(user);
  }
  res.status(400).send("Invalid Credentials");
} catch (err) {
  console.log(err);
}
// Our register logic ends here
}
module.exports = {userLogin}