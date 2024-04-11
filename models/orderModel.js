const { text } = require('express')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(   
    {   
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        orderType: { 
            type: String,                          
            required: [true, 'Please enter the Equipment Name']
        },
        equipments:[
            {
                equipId: {type: mongoose.Schema.Types.ObjectId,ref: 'Equipment'},
                name: {type: String},
                quantity: {type: Number},
                price:{type: Number},
                currencyCode: {type: String}, 
                startDate: {type: Date},
                endtDate: {type: Date}
            }
        ],          
        address:[
            {
                addType: {type: String}, 
                addLine1: {type: String},
                addLine2: {type: String},
                city: {type: String},
                state: {type: String},
                zip: {type: String}
            }
        ],
        orderTotal: {
            type: Number
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)