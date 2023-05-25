const express = require('express');
const router = express.Router();
const {AuthorModel, authorValidation} = require ('../models/author')



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
        AuthorModel.create({ ...req.body }, (err, newAuthId) => {
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
        photo:req.body.photo,
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        }, (err, authorData) => {
        return res.status(200).json(authorData)
    })
}

function deleteAuthor(req, res) {
    const { id } = req.params
    AuthorModel.findOneAndDelete(id, (err, delAuthor) => {
        return res.status(200).json(delAuthor)
    })
}

module.exports = {getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor}