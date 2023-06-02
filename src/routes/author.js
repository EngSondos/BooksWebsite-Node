const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author');
const { getAllAuthors, getAuthorById, addAuthor, updateAuthor, checkAuthorexistence,autherbooks } = require('../controllers/author');
const {upload } = require('../media/media')
const auth = require('../../middelware/auth')

router.get('/',auth, getAllAuthors)
router.get('/:id',auth, getAuthorById)
router.post('/',auth, upload.single("image"),addAuthor)
router.put('/:id',auth, upload.single("image"), updateAuthor)
router.delete('/:id',auth, checkAuthorexistence)
router.get('/:id/book', auth, autherbooks)


module.exports = router