
const { func } = require('joi');
const {bookModel,reviewValidate} = require('../models/book')




async function addReview(req, res) {


        
  const bookId = req.params.id;
  const userId = req.user.user_id
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
    { _id: bookId },
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








// async function addReview(req, res) {
//   const bookId = req.params.id;
//   const userId = request.user.user_id;
//   const { rating, review } = req.body;

//   const { error } = reviewValidate({ rating, review });
//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   const existingReview = await bookModel.findOne({
//     _id: bookId,
//     reviews: { $elemMatch: { userId } },
//   });

//   if (existingReview) {
//     // Update existing review
//     await bookModel.updateOne(
//       { _id: bookId, 'reviews.userId': userId },
//       { $set: { 'reviews.$.rating': rating } }
//     );
//   } else {
//     // Add new review
//     await bookModel.updateOne(
//       { _id: bookId },
//       { $push: { reviews: { rating, review, userId } } }
//     );
//   }

//   // Return updated book object
//   const book = await bookModel.findById(bookId).populate('reviews.userId');
//   res.json(book);
// }










async function updateReviewByUserId(req, res) {
const bookId = req.params.id;
const userId = req.user.user_id
const { rating , review} = req.body;


const { error } = reviewValidate({ rating});
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}

 bookModel.updateOne(
  
  { 'reviews': { $elemMatch: { 'userId': userId } } ,_id:bookId}, 
  {$set:{'reviews.$':{rating:rating,userId:userId,review:review}}}
).populate('reviews.userId')

.then(result=>{
    res.json(result)
    console.log(`${result}`)
})
.catch(err=>{
    console.error(err)
})
}

function avargeRateForBook(request,respone)
{
  const {bookId} =request.params
  bookModel.findOne(
    { _id:bookId}
  ,async (error,book)=>
  {
    if(error){
      return respone.status('500').json({"error":"Some Thing Wrong!!"});
    }else if(book.reviews.length){
      sum=0
      ratingCount=0
      for(let i =0;i< book.reviews.length;i++){
        sum += book.reviews[i].rating;      
        ratingCount+=1;  
      }
      console.log(sum/ratingCount)
      avgRate = sum/ratingCount;
      return respone.json({"avgRate":avgRate})
  }else {
    respone.json({"avgRate":0})

  }
  })
}


 module.exports = {addReview,updateReviewByUserId,avargeRateForBook}

 