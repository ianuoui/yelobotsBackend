const express = require('express');
const dotenv = require('dotenv').config();
//const port = 8000;
const port = process.env.PORT || 5000;
const app = express();

//console.log("Node server is up!");
app.listen(port, () => console.log(`Server up. Listening on port: ${port}`));

app.get('/api/categories',(req, res) => {
    //res.send('Get All Categories');
    res.status(200).json({message: 'Get All Categories'});
})