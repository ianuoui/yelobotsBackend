const express = require('express')
const router = express.Router()
const { getEnquiry, createEnquiry} = require('../controllers/enquiryController')

router.get('/', getEnquiry)
router.post('/', createEnquiry)

module.exports = router
