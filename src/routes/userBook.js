let express = require('express')
let router = express.Router()
let userBookController = require('../controllers/userBooksController')
//remove userId
router.put('/:userId/:bookId',userBookController.updateStatus)
router.post('/:userId/:bookId',userBookController.addStatus)
router.get('/:userId',userBookController.getuserBooks)
router.get('/:status/:userId',userBookController.getuserBooksbyStatus)

module.exports =router
