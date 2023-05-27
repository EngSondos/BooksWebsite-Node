
const {bookModel,reviewValidate} = require('../models/book')



async function addReview(req, res) {


        
  const bookId = req.params.id;
  const userId = req.params.userId;
  const { rating, review } = req.body;


  const { error } = reviewValidate({ rating, review });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }


  const userreview = await bookModel.findOne({'reviews.userId': userId ,_id:bookId});
    if(userreview)
    {
     return await updateReviewByUserId(req,res)
    }


       bookModel.updateOne(
    { _id: bookId, "reviews.userId": userId },
    {
      $push: {
        reviews: { rating, review, userId },
      },
    },
  ).populate('reviews.userId')
  .then(result=>{
      res.json(result)
      console.log(`${result}`)
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

 bookModel.updateOne(
  
  { 'reviews': { $elemMatch: { 'userId': userId } } ,_id:bookId}, 
  {$set:{reviews:{rating:rating,userId:userId,review:review}}}
).populate('reviews.userId')

.then(result=>{
    res.json(result)
    console.log(`${result}`)
})
.catch(err=>{
    console.error(err)
})
}



 module.exports = {addReview,updateReviewByUserId}

 