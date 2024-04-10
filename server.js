const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require('./connect/database');

//const port = 8000;
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/category', require('./routes/categoryRoute'));
app.use('/api/equipment', require('./routes/equipmentRoute'));
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));


app.use(errorHandler);

//console.log("Node server is up!");
app.listen(port, () => console.log(`Server up. Listening on port: ${port}`));
