

const express = require('express')
const router = express.Router()
const reviewController =require('../controllers/review')

router.post('/review/:id/:userId',reviewController.addReview)
router.put('/review/:id/:userId',reviewController.updateReviewByUserId)





 module.exports=router