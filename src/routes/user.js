
const express = require('express')
const mongoose = require("mongoose");
const { userModel, userValidate } = require('../models/user');
const bcrypt = require('bcrypt');
const { userRegister } = require('../controllers/register');
const { userLogin } = require('../controllers/login');
const admin = require('../../middelware/admin');
const auth = require('../../middelware/auth');


const router = express.Router();
router.post("/register", admin, userRegister);
router.post("/login", auth, userLogin);
module.exports = router;