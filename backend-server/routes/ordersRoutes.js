const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/', ordersController.createOrder);
router.put('/:id/deliver', ordersController.markOrderDelivered);

module.exports = router;