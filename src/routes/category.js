const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const auth = require('../../middelware/auth')



router.post('/',auth,categoryController.addCategory)
router.get('/',auth,categoryController.getCategories)
router.get('/:id',auth,categoryController.getCategory)
router.put('/:id',auth,categoryController.updateCategory)
router.delete('/:id',auth,categoryController.deleteCategory)
router.get('/:id/book',auth,categoryController.categoriesbooks)

module.exports= router
