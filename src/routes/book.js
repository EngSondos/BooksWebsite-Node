let express = require('express')
let router = express.Router()
let BookController = require('../controllers/bookController')
const {upload} = require('../media/media')
const auth = require('../../middelware/auth')

router.get('/',BookController.getBooks)
router.get('/:id',auth,BookController.getBook)
router.post('/',auth,upload.single('image'),BookController.addBook)
router.put('/:id',auth,upload.single('image'),BookController.updateBook)
router.delete('/:id',auth,BookController.deleteBook)

module.exports =router
