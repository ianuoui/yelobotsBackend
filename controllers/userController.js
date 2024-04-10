const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


const registerUser = asyncHandler(async (req,res) => {
    
    const { name, email, password } = req.body
    if (!name || !email || !password) { 
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    
    const userExists = await User.findOne({ email }) 
    if (userExists) {
        res.status(400)
        throw new Error('User Exists')
    }

    res.json({message: 'Register user successful'})
})

const loginUser = asyncHandler(async (req,res) => {
    res.json({message: 'Login user successful'})
})

const getCurrentUser = asyncHandler(async (req,res) => {
    res.json({message: 'Current user data'})
})

module.exports = { registerUser, loginUser, getCurrentUser}