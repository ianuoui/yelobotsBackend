const { text } = require('express')
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {    
        name: { type: String, required: [true, 'Please enter the Category Name'] }
    },
    {
        description: { type: String }                
    },     
    {
        timestamps : true
    }
)

module.exports = mongoose.model('Category', categorySchema)