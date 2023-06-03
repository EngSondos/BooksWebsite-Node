let express = require('express')
let router = express.Router()
let userBookController = require('../controllers/userBooksController')
const auth = require('../../middelware/auth')

//remove userId
router.post('/:bookId',auth ,userBookController.addStatus)
router.get('/',auth,userBookController.getuserBooks)
router.get('/:status',auth,userBookController.getuserBooksbyStatus)
router.get('/status/:bookId',auth,userBookController.getStatusOfUserBook);
module.exports =router
