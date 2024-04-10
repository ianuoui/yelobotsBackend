const asyncHandler = require('express-async-handler')
const Equipment = require('../models/orderModel')

//GET
const getOrder = asyncHandler(async (req,res) => {
    res.status(200).json({message: 'Code to get all Orders by UserID'});
})

//POST
const createOrder = asyncHandler(async (req,res) => {
    res.status(200).json({message: 'Code to create an order'});
})

//PUT
const updateOrder = asyncHandler(async (req,res) => {
    res.status(200).json({message: 'Code to update an order'});
})

//DELETE
const deleteOrder = asyncHandler(async (req,res) => {
    res.status(200).json({message: 'Code to delete an order'});
})

module.exports = {getOrder, createOrder, updateOrder, deleteOrder};