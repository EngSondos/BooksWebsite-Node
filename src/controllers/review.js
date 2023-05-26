
const {bookModel,reviewValidate} = require('../models/book')



async function addReview(req, res) {


        
    const bookId = req.params.id;
    const userId = req.params.userId;
    const { rating, review } = req.body;


    const { error } = reviewValidate({ rating, review });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    const book = await bookModel.findOneAndUpdate(
      { _id: bookId, "review.userId": userId },
      {
        $set: {
          "review.$": { rating, review, userId },
        },
      },
      { new: true }
    ).populate('review.userId')
    .then(result=>{
        res.json(result)
        console.log(`${result} review added`)
    })
    .catch(err=>{
        console.error(err)
    })
  }



async function updateReviewByUserId(req, res) {
const bookId = req.params.id;
const userId = req.params.userId;
const { rating, review } = req.body;


const { error } = reviewValidate({ rating, review });
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}

 bookModel.findOneAndUpdate(
  
    {_id:bookId},
    {$push:{review:{rating:rating,userId:userId,review:review}}}
).populate('review.userId')

.then(result=>{
    res.json(result)
    console.log(`${result} review updated`)
})
.catch(err=>{
    console.error(err)
})
}




 module.exports = {addReview,updateReviewByUserId}

 