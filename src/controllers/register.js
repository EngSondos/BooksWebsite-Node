

const express = require('express')
const mongoose = require("mongoose");
const {userModel ,userValidate } = require('../models/user');
const bcrypt = require('bcrypt');

async   function userRegister(req , res) {

   

        // Our register logic starts here
        try {
          // Get user input
          const {username, email, password } = req.body;
          const {error} = userValidate(req.body) ;
          // Validate user input
          if (error) {
            return res.status(404).send(error.details[0].message)
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await userModel.findOne({ email });
      
          if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const user = await userModel.create({
    
            username ,
           
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          },
        
       (error,userData)=>{
            // console.log(postData)
            if(!error){
                res.json(userData)
    
            }else
            res.json(error)
        })
    
          ;
      
        //   // Create token
        //   const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.TOKEN_KEY,
        //     {
        //       expiresIn: "2h",
        //     }
        //   );
        //   // save user token
        //   user.token = token;
      
          // return new user
         
        } catch (err) {
          console.log(err);
        }
        // Our register logic ends here
      }


module.exports = {userRegister}
