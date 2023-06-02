

const express = require('express')
const router = express.Router()
const reviewController =require('../controllers/review')

router.post('/:id/:userId',reviewController.addReview)
router.put('/:id/:userId',reviewController.updateReviewByUserId)

router.get('/:bookId/avgRate',reviewController.avargeRateForBook)



 module.exports=router