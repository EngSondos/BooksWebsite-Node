const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author');
const { getAllAuthors, getAuthorById, addAuthor, updateAuthor, checkAuthorexistence,autherbooks } = require('../controllers/author');
const {upload } = require('../media/media')
const auth = require('../../middelware/auth')

router.get('/',auth, getAllAuthors)
router.get('/:id', getAuthorById)
router.post('/', upload.single("image"),addAuthor)
router.put('/:id', upload.single("image"), updateAuthor)
router.delete('/:id', checkAuthorexistence)
router.get('/:id/book',autherbooks)


module.exports = router