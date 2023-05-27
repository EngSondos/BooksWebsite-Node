const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author');
const { getAllAuthors, getAuthorById, addAuthor, updateAuthor, checkAuthorexistence } = require('../controllers/author');
const {upload } = require('../media/media')

router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.post('/', upload.single("image"),addAuthor)
router.put('/:id', upload.single("image"), updateAuthor)
router.delete('/:id', checkAuthorexistence)

module.exports = router