const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getItems);
router.post('/create', itemsController.createItem);
router.put('/:id/update', itemsController.updateItem);

module.exports = router;
