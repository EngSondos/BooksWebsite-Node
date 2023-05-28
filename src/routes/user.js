
const express = require('express')
const mongoose = require("mongoose");
const { userModel, userValidate } = require('../models/user');
const bcrypt = require('bcrypt');
const { userRegister } = require('../controllers/register');
const { userLogin } = require('../controllers/login');
const admin = require('../../middelware/admin');
const auth = require('../../middelware/auth');
const jwt = require('jsonwebtoken'); 


const router = express.Router();
router.post("/register", userRegister);

router.post("/login",admin ,userLogin)

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ2ZTU3ZTNkNjUzNjI1ZDE3YTU0NTIxIiwiZW1haWwiOiJhaG1lZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjIzNTQyZmdoYUFAIiwiaWF0IjoxNjg1MDc3ODMwLCJleHAiOjE2ODUwODUwMzB9.mbtV5oNwiaAORssNGKfRP841BZmHri36dy4w8RrIyX0