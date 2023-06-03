module.exports = {getuserBooks,updateStatus,addStatus,getuserBooksbyStatus,getStatusOfUserBook}
const { func } = require('joi');
const {bookModel, statusValidate}  = require('../models/book')

function getuserBooks(request,respone)
{
  const {userId} = request.user.user_id
    bookModel.find( { 'statususers': { $elemMatch: { 'userId': userId } }},(error,bookList)=>{
      if(error){
        return respone.status('500').json({"error":"Some Thing Wrong!!"});
      }else{
        respone.json(bookList)

      }
    }).populate('authorId')
       
}
function getuserBooksbyStatus(request,respone)
{
  
  const {userId} = request.user.user_id
  const{status} = request.params 
    bookModel.find( { 'statususers': { $elemMatch: { 'userId': userId,'status':status } }},(error,bookList)=>{
      if(error){
        return respone.status('500').json({"error":"Some Thing Wrong!!"});
      }
      console.log(bookList)
        return respone.json(bookList)
    }).populate('authorId')
       
}

async function addStatus(request,respone){
  
  const {error}= statusValidate({...request.body})
  if(error)
  {
      return respone.json({error:error.details[0].message})
  }
  const {userId} = request.user.user_id
    const {status} =request.body 
    const {bookId} =request.params
    const userStatus = await bookModel.findOne({'statususers.userId': userId ,_id:bookId});
    if(userStatus)
    {
     return await updateStatus(request,respone)
    }

    bookModel.updateOne(
      { _id:bookId},
      { $push: { statususers: { userId: userId, status: status } } }
      )
      .then(result => {
        respone.json(result)
        console.log(`${result} document(s) updated`);
      })
      .catch(err => {
        console.error(err);
      });
}

function updateStatus(request,respone){

  const {error}= statusValidate({...request.body})
  if(error)
  {
      return respone.json({error:error})
  }
  const {userId} = request.user.user_id
    const {status} =request.body 
    const {bookId} =request.params
    bookModel.updateOne(
      { 'statususers': { $elemMatch: { 'userId': userId } } ,_id:bookId}, 
      { $set: { 'statususers.$.status': status  } } 
    )
      .then(result => {
        respone.json(result)
        console.log(`${result.nModified} document(s) updated`);
      })
      .catch(err => {
        console.error(err);
      });
}

 function getStatusOfUserBook(request,respone)
{
  const {userId} = request.user.user_id
  const {bookId} =request.params
  bookModel.findOne(
    { 'statususers': { $elemMatch: { 'userId': userId } } ,_id:bookId}
  ,async (error,book)=>
  {
    if(error){
      return respone.status('500').json({"error":"Some Thing Wrong!!"});
    }else {
      let status;
      let rating=0;
      if(book.statususers.length){
         status = await book.statususers.find(user => user.userId == userId).status;
      } 
      console.log(book.reviews[0].rating)
      if(book.reviews.length){
         rating = await book.reviews.find(user=>user.userId==userId)?.rating
      }
      respone.json({status,rating})
  }
  })
}

