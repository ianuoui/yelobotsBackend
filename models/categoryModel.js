const { text } = require('express')
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(   
    {    
        name: { 
            type: String, 
            unique: true, 
            required: [true, 'Please enter the Category Name'], 
        },
        description: { 
            type: String, 
        },
        images:[
            {
                url: {type: String}, 
                altText: {type: String},
                _id : false 
            }   
        ],
        catFilterAttr:[
            {
                filterName:{type: String},  
                filterValues:[{type: String}],
                _id: false
            }            
        ]        
    },
    { timestamps: true}
)

module.exports = mongoose.model('Category', categorySchema)
