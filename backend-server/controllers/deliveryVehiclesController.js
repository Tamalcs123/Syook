const DeliveryVehicle = require('../models/DeliveryVehicle');

exports.getDeliveryVehicles = async (req, res) => {
    try {
        const deliveryVehicles = await DeliveryVehicle.find();
        res.json(deliveryVehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching delivery vehicles', error });
    }
};

exports.createDeliveryVehicle = async (req, res) => {
    try {
        const { registrationNumber, vehicleType, city } = req.body;
        const newDeliveryVehicle = new DeliveryVehicle({ registrationNumber, vehicleType, city });
        await newDeliveryVehicle.save();
        res.status(201).json(newDeliveryVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating delivery vehicle', error });
    }
};

exports.updateDeliveryVehicle = async (req, res) => {
    try {
        const { registrationNumber, vehicleType, city } = req.body;
        const updatedDeliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(
            req.params.id,
            { registrationNumber, vehicleType, city },
            { new: true }
        );
        res.json(updatedDeliveryVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating delivery vehicle', error });
    }
};