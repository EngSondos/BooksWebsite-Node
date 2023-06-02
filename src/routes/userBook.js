let express = require('express')
let router = express.Router()
let userBookController = require('../controllers/userBooksController')
const auth = require('../../middelware/auth')

//remove userId
router.post('/:userId/:bookId',userBookController.addStatus)
router.get('/',auth,userBookController.getuserBooks)
router.get('/:status/:userId',userBookController.getuserBooksbyStatus)
router.get('/status/:userId/:bookId',userBookController.getStatusOfUserBook);
module.exports =router
