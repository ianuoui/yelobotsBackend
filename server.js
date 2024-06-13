const express = require('express');
const connectDB = require('./connect/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();

//const port = 8000;
const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/equipment', require('./routes/equipmentRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/enquiry', require('./routes/enquiryRoute'));


app.use(errorHandler);

//console.log("Node server is up!");
app.listen(port, () => console.log(`Server up. Listening on port: ${port}`));
