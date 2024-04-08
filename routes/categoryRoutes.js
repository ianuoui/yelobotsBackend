const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).json({message: 'Code to list all Categories'});
})

module.exports = router;    