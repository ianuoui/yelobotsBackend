const express = require('express');
const router = express.Router();
const {getOrder, createOrder, updateOrder, deleteOrder,paymentCapture}  = require('../controllers/orderController');

 
router.get('/', getOrder)
router.post('/', createOrder)
router.put('/:id', updateOrder)
router.delete('/:id', deleteOrder)
router.post('/paymentCapture', paymentCapture)

module.exports = router