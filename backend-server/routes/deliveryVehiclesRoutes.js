const express = require('express');
const router = express.Router();
const deliveryVehiclesController = require('../controllers/deliveryVehiclesController');

router.get('/', deliveryVehiclesController.getDeliveryVehicles);
router.post('/create', deliveryVehiclesController.createDeliveryVehicle);
router.put('/:id/update', deliveryVehiclesController.updateDeliveryVehicle);

module.exports = router;