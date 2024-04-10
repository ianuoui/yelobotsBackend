const express = require('express');
const router = express.Router();
const { getCategory, createCategory, updateCategory, deleteCategory}  = require('../controllers/categoryController');


/*
router.get('/', (req,res) => {
    res.status(200).json({message: 'Code to list all Categories'});
})

router.post('/', (req,res) => {
    res.status(200).json({message: 'Code to create a new Category'});
})

router.put('/:id',(req,res) => {
    res.status(200).json({message: `Code to update a Category : ${req.params.id}`});
})

router.delete('/:id',(req,res) => {
    res.status(200).json({message: `Code to delete a Category : ${req.params.id}`});
})
*/

router.get('/', getCategory)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router