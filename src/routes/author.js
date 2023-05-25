const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author');
const { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor } = require('../controllers/author');

///////////////// MULTER ///////////////////////////////////
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../assets/authors')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

// UPLOAD Middleware which contains the sotrage object which defines where we are gonna save the image(destination)
// and what the image name will be (filename)
const upload = multer({storage: storage})
///////////////// MULTER ///////////////////////////////////

router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.post('/', upload.single("photo"),addAuthor)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router