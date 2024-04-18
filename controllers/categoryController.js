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

    //console.log(req.body.catFilterAttr);
    //res.status(200).json({message: 'Code to create a new Category'});
    const newCat = await Category.create({
        name : req.body.name,
        description : req.body.description,
        images: req.body.images,
        catFilterAttr: req.body.catFilterAttr,
        }
    );
    res.status(200).json(newCat);
})

//PUT
const updateCategory = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to update a Category : ${req.params.id}`});
    const upCat = await Category.findById(req.params.id);
    if(!upCat){
        res.status(400);
        throw new Error('Category not found.');
    }

    const updCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updCategory);
})

//DELETE
const deleteCategory = asyncHandler(async (req,res) => {
    //res.status(200).json({message: `Code to delete a Category : ${req.params.id}`});
    const delCat = await Category.findById(req.params.id)
    if(!delCat){
        res.status(400)
        throw new Error('Category not found')
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = { getCategory, createCategory, updateCategory, deleteCategory};