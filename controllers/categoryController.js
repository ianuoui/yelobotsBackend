const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')

//GET
const getCategory = asyncHandler(async (req, res) => {
    // res.status(200).json({message: 'Code to get all Categories'});
    const categories = await Category.find()
    res.status(200).json(categories);
})

//POST
const createCategory = asyncHandler(async (req,res) => {
    //console.log(req.body);
    if(!req.body.name){
        //res.status(400).json({message: 'Please enter Category details...'});
        res.status(400);
        throw new Error('Please enter Category Name..');
    }
    //res.status(200).json({message: 'Code to create a new Category'});
    const newCat = await Category.create({name : req.body.name});
    res.status(200).json(newCat);
})

//PUT
const updateCategory = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Code to update a Category : ${req.params.id}`});
})

//DELETE
const deleteCategory = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Code to delete a Category : ${req.params.id}`});
})

module.exports = { getCategory, createCategory, updateCategory, deleteCategory};