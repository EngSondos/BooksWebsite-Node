let express = require('express')
let router = express.Router()
let BookController = require('../controllers/bookController')
const {upload} = require('../media/media')

router.get('/',BookController.getBooks)
router.get('/:id',BookController.getBook)
router.post('/',upload.single('image'),BookController.addBook)
router.put('/:id',upload.single('image'),BookController.updateBook)
router.delete('/:id',BookController.deleteBook)

module.exports =router
