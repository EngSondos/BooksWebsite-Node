const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author')
const fs = require('fs');
const { deleteimage } = require('../media/media')
const {bookModel}  = require('../models/book')

function getAllAuthors (req, res) {
    AuthorModel.find({}, (err, authorList)=> {
        return res.status(200).json(authorList)
    })
}

function getAuthorById(req, res) {
    const { id } = req.params
    AuthorModel.findById(id, (err, authorId)=> {
        return res.status(200).json(authorId)
    })
}

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
        AuthorModel.create( newAuthor , (err, newAuthId) => {
        return res.status(200).json(newAuthId)
    })
}

function updateAuthor(req, res) {
    const { id } = req.params
    const { error } = authorValidation (req.body)
    // res.send(error);
        if (error) {
        return res.status(404).send(error.details[0].message)
    }
    AuthorModel.findByIdAndUpdate(id,
        {
        image:req.body.image,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        }, (err, authorData) => {
        return res.status(200).json(authorData)
    })
}

async function checkAuthorexistence(req, res) {
    const { id } = req.params
    bookModel.findOne({ AuthorId: id }, (err, book) => {
        if (err) {
            return res.json({ Error: "DB Error"})
        } else if (!book) {
            console.log(book);
            delAuthor(id, res)
        } else {
            return res.json({Error:"There's is abook related to this author, you can't delete this author"})
        }
    });

async function delAuthor(id, res) {
    const oldAuthor = await findAuthor(id)

if(!oldAuthor){
        return res.json({Error:"Author not found in the database"})
}

if(oldAuthor.image){
    // console.log(oldAuthor.image);
    deleteimage(oldAuthor)
}
    AuthorModel.deleteOne({_id:id}, (err, delAuthor) => {
        return res.status(200).json(delAuthor)
    })
}
} 

async function findAuthor(id) {
    const author = await AuthorModel.findOne({_id:id})
    return author;
}

module.exports = {getAllAuthors, getAuthorById, addAuthor, updateAuthor, checkAuthorexistence}