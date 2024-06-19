const { text } = require('express')
const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(   
    {   
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'             
        },
        orderType: { 
            type: String,                          
            required: [true, 'Please enter the Equipment Name']
        },
        equipments:[
            {
                equipId: {type: mongoose.Schema.Types.ObjectId,ref: 'Equipment'},                 
                quantity: {type: Number},                 
                startDate: {type: Date},
                endtDate: {type: Date},
                _id : false 
            }
        ],          
        address:[
            {
                addType: {type: String}, 
                addLine1: {type: String},
                addLine2: {type: String},
                city: {type: String},
                state: {type: String},
                zip: {type: String},
                _id : false 
            }
        ],
        orderTotal: {
            type: Number
        },
        currencyCode:{
            type: String
        },
        rzpayOrderId: {
            type: String
        },
        rzpayOrderStatus: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)