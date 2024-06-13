const mongoose = require('mongoose')

const enquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is requried'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            //unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is requried'],
        },
        duration: {
            type: String,
            required: [true, 'duration is requried'],
        },
        message: {
            type: String,
            required: [true, 'message is required'],
        },
    } ,
    {timestamps: true}
)

module.exports = mongoose.model('Enquiry', enquirySchema)