const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

router.get('/', customersController.getCustomers);
router.post('/create', customersController.createCustomer);
router.put('/:id/update', customersController.updateCustomer);

module.exports = router;