

const express = require('express')
const router = express.Router()
const reviewController =require('../controllers/review')
const auth =require('../../middelware/auth')

router.post('/:id',auth,reviewController.addReview)
router.put('/:id',auth,reviewController.updateReviewByUserId)

router.get('/:bookId/avgRate',auth,reviewController.avargeRateForBook)



 module.exports=router