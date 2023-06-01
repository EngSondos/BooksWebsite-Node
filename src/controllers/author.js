const express = require('express');
const router = express.Router();
const {authorModel, authorValidation} = require ('../models/author')
const fs = require('fs');
const { deleteimage } = require('../media/media')
const {bookModel}  = require('../models/book')

/////////////////////// GETTING ALL AUTHORS //////////////////////
function getAllAuthors (req, res) {
    authorModel.find({}, (err, authorList)=> {
        return res.status(200).json(authorList)
    })
}

/////////////////////// GETTING AUTHOR BY ID //////////////////////
function getAuthorById(req, res) {
    const { id } = req.params
    authorModel.findById(id, (err, authorId)=> {
        return res.status(200).json(authorId)
    })
}

/////////////////////// ADD AUTHOR //////////////////////
function addAuthor(req, res) {
    const { error } = authorValidation (req.body)
    // res.send(error);
        if (error) {
        return res.status(404).send(error.details[0].message)
    }

    let newAuthor ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
    }
        if(req.file)
        {
            newAuthor['image']=req.file.filename
        }
    authorModel.create( newAuthor , (err, newAuthId) => {
    // return res.status(200).json(newAuthId)
    if (!err) return res.status(200).json({message: "Author Added successfully"})
            else {return res.status(500).json({message: "Error adding this user"})
            }
    })
}

/////////////////////// UPDATE AUTHOR //////////////////////
async function updateAuthor(req, res) {
    const { id } = req.params
    const { error } = authorValidation (req.body)
    // res.send(error);
        if (error) {
        return res.status(404).send(error.details[0].message)
    }
    
    const oldAuthor = await findAuthor(id)
        if(!oldAuthor){
                return res.json({message:"Author not found in the database"})
        }

    let newAuthor ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
    }

    if(req.file){
        if(oldAuthor.image){
            deleteimage(oldAuthor)
        }
        newAuthor['image']=req.file.filename
    }

    else if(oldAuthor.image) {
        newAuthor['image']=oldAuthor.image
    }
    
    authorModel.findByIdAndUpdate(id,
    newAuthor, (err) => {
    if (!err) { return res.status(200).json({message: "Author updated successfully"}) }
    else {
        return res.status(500).json({error: "Error updating this author"})
    }
    })
}

/////////////////////////// DELETE AUTHOR ///////////////////////
async function checkAuthorexistence(req, res) {
////////////// Checking if the author has abook in database //////////////////
    const { id } = req.params
    bookModel.findOne({ authorId: id }, (err, book) => {
        if (err) {
            return res.json({ Error: "DB Error"})
        } else if (!book) {
            // console.log(book);
            delAuthor(id, res)
        } else {
            return res.json({message:"There's is abook related to this author, you can't delete this author"})
        }
    });

////////////// Checking to delete tha image of the author //////////////////
async function delAuthor(id, res) {
    const oldAuthor = await findAuthor(id)

if(!oldAuthor){
        return res.json({Error:"Author not found in the database"})
}

if(oldAuthor.image){
    // console.log(oldAuthor.image);
    deleteimage(oldAuthor)
}

////////////// Deletig the author  //////////////////
    authorModel.deleteOne({_id:id}, (err, delAuthor) => {
        if (!err) return res.status(200).json({message: "Author deleted successfully"})
        return res.status(500).json({Error: "Error deleting this author"})
    })
}
} 

async function findAuthor(id) {
    const author = await authorModel.findOne({_id:id})
    return author;
}

module.exports = {getAllAuthors, getAuthorById, addAuthor, updateAuthor, checkAuthorexistence}