const asyncHandler = require('express-async-handler')
const Enquiry = require('../models/enquiryModel')


//GET
const getEnquiry = asyncHandler(async (req, res) => {     
    const enquiries = await Enquiry.find()
    res.status(200).json(enquiries);
})


//POST
const createEnquiry = asyncHandler(async (req,res) => {

    const { name, email, phone, duration, message } = req.body

    if (!name || !phone || !email || !message) { 
        res.status(400)
        throw new Error('Name/Phone/Email/Message: fields are mandatory')
    }

    const newEnquiry = await Enquiry.create({
        name : req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        duration: req.body.duration,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        message : req.body.message,         
        }
    );
    //console.log(newEnquiry.id);
    res.status(200).json({id: newEnquiry.id});
})

module.exports = {getEnquiry, createEnquiry};