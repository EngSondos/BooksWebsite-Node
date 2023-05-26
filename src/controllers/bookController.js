module.exports = {getBooks,getBook,addBook,updateBook,deleteBook}
const {bookModel,bookValidate}  = require('../models/book')
const {deleteimage}=require('../media/media')

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
           return respone.json(BookData)
        }else
        respone.json(error)
    })
}

async function updateBook(request,respone)
{
    let {id} =request.params
    const oldbook =  await findBook(id)

   if(!oldbook){
        return respone.json({"message":"This book Is Not in DB"})
   }
    let newBook ={
        title: request.body.title,
        description: request.body.description,
        authorId: request.body.authorId,
        categoryId: request.body.categoryId,
    }
  
    if(request.file){
        if(oldbook.image){
            deleteimage(oldbook)
        }
        newBook['image']=request.file.filename
    }
    else if(oldbook.image)
             newBook['image']=oldbook.image
        
   

    bookModel.updateOne({_id:id},{$set: newBook},(error)=>{
        if(!error){
            respone.json({"message":"Book Updated Successfully"})
        }else
        respone.json(error)
    })
}

async function deleteBook(request,respone)
{
    let {id}= request.params
    let oldbook = await findBook(id)

   if(!oldbook){
        return respone.json({"message":"This book Is Not in DB"})
   }

   if(oldbook.image){
    deleteimage(oldbook)
   }

    bookModel.deleteOne({_id:id},(error)=>{
        if(!error){
            return respone.json({"message":"Book Deleted Successfully"})
        }else
       return respone.json(error)
    })
}

async function findBook(id) 
{
  const book = await bookModel.findOne({_id:id})
  return book;
}

