const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const Razorpay = require('razorpay');
require("dotenv").config();

//GET
const getOrder = asyncHandler(async (req,res) => {
    if (!req.query.userId){
        res.status(400);
        throw new Error('Cannot retrieve orders without an UserId.');
    } else {        
        const ordByUserId = await Order.find({userId: req.query.userId});
        if(!ordByUserId){             
            res.status(400);
            throw new Error('No orders found for this UserId.');
        } else {             
            res.status(200).json(ordByUserId);                    
        }
    }    
})

//POST
const createOrder = asyncHandler(async (req,res) => {

    let orderUserID = req.body.userId;

    if (!req.body.userId){           
        if(!req.body.name || !req.body.phone || !req.body.email){            
            res.status(400);
            throw new Error('Cannot create an Order without User Information. Please enter an UserId, or User details (Name, Email, Phone) to create a new user.');
        } else {                                      
            const usr = await User.find({email:req.body.email})              

            if (!usr[0]){                
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.phone, salt)
                const user = await User.create({name:req.body.name, phone:req.body.phone, email:req.body.email, password:hashedPassword})
                orderUserID = user.id                
            }else{                 
                orderUserID = usr[0].id
            }
        }        
    }
 
    var razorpay = new Razorpay({
        key_id: process.env.RZPAY_KEYID,
        key_secret: process.env.RZPAY_SECRET,
    });

    var options = {
        amount: req.body.orderTotal, 
        currency: req.body.currencyCode,
        receipt: orderUserID
    };
    
     
    const rzpayOrder = await razorpay.orders.create(options);     
    
    console.log(rzpayOrder);

    const newOrder = await Order.create({
        userId : orderUserID,
        orderType : req.body.orderType,                        
        orderTotal : req.body.orderTotal,    
        equipments : req.body.equipments,
        address : req.body.address,
        orderTotal : req.body.orderTotal,
        currencyCode : req.body.currencyCode,
        rzpayOrderId : rzpayOrder.id,
        rzpayOrderStatus : rzpayOrder.status          
    });
    
    res.status(200).json(newOrder);
   
})

//POST : PaymentCapture
const paymentCapture = asyncHandler(async (req,res) => {
    const {rzpayOrderId, rzpayPaymentId, orderId,rzpayOrderStatus} = req.body;  
    const razorpay_signature =  req.headers['x-razorpay-signature'];
    
    let hmac = crypto.createHmac('sha256', process.env.RZPAY_SECRET); 

    hmac.update(rzpayOrderId + "|" + rzpayPaymentId);
    
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');

    if(razorpay_signature===generated_signature){
        
        const updateOrder = await Order.findByIdAndUpdate(
            {_id: orderId},
            {rzpayOrderStatus: rzpayOrderStatus},
            {new: true}
        );

        res.status(200).json(updateOrder)        
    }
    else{
        res.status(400).json({message:"Payment verification failed"})
    }
    

})


//PUT
const updateOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to update an order'});
    const upOrd = await Order.findById(req.params.id);
    if(!upOrd){
        res.status(400);
        throw new Error('Order not found.');
    }

    const updOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updOrder);
})

//DELETE
const deleteOrder = asyncHandler(async (req,res) => {
    //res.status(200).json({message: 'Code to delete an order'});
    const delOrder = await Order.findById(req.params.id)
    if(!delOrder){
        res.status(400)
        throw new Error('Order not found')
    }
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {getOrder, createOrder, updateOrder, deleteOrder, paymentCapture};