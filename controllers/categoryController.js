const asyncHandler = require('express-async-handler')

const getCategory = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Code to get all Categories'});
})

const createCategory = asyncHandler(async (req,res) => {
    //console.log(req.body);
    if(!req.body.text){
        //res.status(400).json({message: 'Please enter Category details...'});
        res.status(400);
        throw new Error('Please enter Category details..');
    }
    res.status(200).json({message: 'Code to create a new Category'});
})

const updateCategory = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Code to update a Category : ${req.params.id}`});
})

const deleteCategory = asyncHandler(async (req,res) => {
    res.status(200).json({message: `Code to delete a Category : ${req.params.id}`});
})

module.exports = { getCategory, createCategory, updateCategory, deleteCategory};