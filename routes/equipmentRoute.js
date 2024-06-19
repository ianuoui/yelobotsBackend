const express = require('express');
const router = express.Router();
const { getEquip, createEquip, updateEquip, deleteEquip}  = require('../controllers/equipmentController');

router.get('/', getEquip)
router.post('/', createEquip)
router.put('/:id', updateEquip)
router.delete('/:id', deleteEquip)

module.exports = router