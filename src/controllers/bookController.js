module.exports = {getBooks,getBook,addBook,updateBook,deleteBook}
const {bookModel,bookValidate}  = require('../models/book')
const fs = require('fs');

function getBooks(request,respone)
{
   const books= bookModel.find({},(error,BookList)=>{
        if(!error){
            respone.json(BookList)
        }else
         respone.json(error)
       }).populate(['authorId','categoryId'])
       
}

function getBook(request,respone)
{
    let {id} = request.params

    bookModel.find({_id:id},(error,BookData)=>{
        if(!error){
            respone.json(BookData)
        }else
         respone.json(error)
        }).populate(['authorId','categoryId'])


}

function addBook(request,respone)
{
    // console.log(bookValidate({...request.body}).error)
    const {error}= bookValidate({...request.body})
    if(error)
    {
        return respone.json({error:error})
    }
    let newBook ={
        title: request.body.title,
        description: request.body.description,
        authorId: request.body.authorId,
        categoryId: request.body.categoryId,
    }
    if(request.file)
    {
        newBook['image']=request.file.filename
    }
    bookModel.create(newBook,(error,BookData)=>{
        console.log(BookData)
        if(!error){
           return respone.json({"message":"Book Created Successfully"})
        }else
        respone.json(error)
    })
}

function updateBook(request,respone)
{
    let {id} =request.params
   if(!oldbook){
        return respone.json({"message":"This book Is Not in DB"})
   }
    let newBook ={
        title: request.body.title,
        description: request.body.description,
        authorId: request.body.authorId,
        categoryId: request.body.categoryId,
    }
  
    if(request.file)
        
            findBook(id)

    // else 
    //          newBook['image']=oldbook.image
        
   

    bookModel.updateOne({_id:id},{$set: newBook},(error)=>{
        if(!error){
            respone.json({"message":"Book Updated Successfully"})
        }else
        respone.json(error)
    })
}

function deleteBook(request,respone)
{
    let {id}= request.params
    let oldbook = findBook(id)
   if(!oldbook){
        return respone.json({"message":"This book Is Not in DB"})
   }
//    console.log(oldbook)
//    deleteimage(oldbook);
    bookModel.deleteOne({_id:id},(error)=>{
        if(!error){
            return respone.json({"message":"Book Deleted Successfully"})
        }else
       return respone.json(error)
    })
}

function findBook(id)
{
    bookModel.findById(id, (err, book) => {
        if (err) 
          return false
        else {
        deleteimage(book);
        }
      });
}

function deleteimage(book){
    if(book.image){
        fs.unlink(`assets/${book.image}`,(err)=>{
            if(err){
                console.log(err)
                return false
            }
            return true
        })
}
}