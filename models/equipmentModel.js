const { text } = require('express')
const mongoose = require('mongoose')

const equipmentSchema = mongoose.Schema(   
    {   
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        }, 
        name: { 
            type: String,             
            unique: true, 
            required: [true, 'Please enter the Equipment Name'] 
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
        equipFilterAttr:[
            {
                filterName:{type: String},  
                filterValues:[{type: String}],
                _id: false
            }            
        ],                 
        price:{            
                costPerDay: {type:Number, required:true},
                currencyCode: {type: String, required:true}             
        }         
    },
    { timestamps: true }
)

module.exports = mongoose.model('Equipment', equipmentSchema)