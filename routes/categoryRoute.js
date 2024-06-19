const express = require('express');
const router = express.Router();
const { getCategory, createCategory, updateCategory, deleteCategory}  = require('../controllers/categoryController');

router.get('/', getCategory)
router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router