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

/*
app.get('/api/categories',(req, res) => {
    //res.send('Get All Categories');
    res.status(200).json({message: 'Get All Categories'});
})
*/
app.use('/api/category', require('./routes/categoryRoutes'));

app.use(errorHandler);

//console.log("Node server is up!");
app.listen(port, () => console.log(`Server up. Listening on port: ${port}`));
