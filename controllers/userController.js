const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const registerUser = asyncHandler(async (req,res) => {
    //res.json({message: 'Register user successful'})
    //console.log(req.body);
    const { name, phone, email, password } = req.body

    if (!name || !phone || !email || !password) { 
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    
    const userExists = await User.findOne({ email }) 

    if (userExists) {
        res.status(400)
        throw new Error('User Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({name, phone, email, password:hashedPassword})

    if (user){
        res.status(201).json({ _id: user.id, name: user.name, phone: user.phone, email: user.email, token: generateJWTtoken(user._id)})    
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req,res) => {
    //res.json({message: 'Login user successful'})
    console.log(req.body);
    const { email, password } = req.body    
    const user = await User.findOne({ email })    

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user.id, name: user.name, phone: user.phone, email: user.email, token: generateJWTtoken(user._id) })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    } 
})

const getCurrentUser = asyncHandler(async (req, res) => {
    //res.json({message: 'Current user data'})     
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({ id: _id, name, email })
})

const generateJWTtoken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' })
module.exports = { registerUser, loginUser, getCurrentUser}