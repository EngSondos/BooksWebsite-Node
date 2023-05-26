module.exports = {getuserBooks,updateStatus,addStatus,getuserBooksbyStatus}
const {bookModel, bookValidate}  = require('../models/book')

function getuserBooks(request,respone)
{
  const {userId} = request.params 
    bookModel.find( { 'statususers': { $elemMatch: { 'userId': userId } }},(error,bookList)=>{
      if(error){
        return respone.status('500').json({"message":"Some Thing Wrong!!"});
      }else{
        respone.json(bookList)

      }
    })
       
}
function getuserBooksbyStatus(request,respone)
{
  const {userId} = request.params
  const{status} = request.params 
    bookModel.find( { 'statususers': { $elemMatch: { 'userId': userId,'status':status } }},(error,bookList)=>{
      if(error){
        return respone.status('500').json({"message":"Some Thing Wrong!!"});
      }
        respone.json(bookList)
    })
       
}

function addStatus(request,respone){
    const {userId} = request.params //'user_id_to_update'; // replace with the actual user ID
    const {status} =request.body //'reading'; // replace with the new status value
    const {bookId} =request.params
    bookModel.updateOne(
      { _id:bookId}, // filter to find the matching statususer
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
    const {userId} = request.params 
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