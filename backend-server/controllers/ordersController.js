const Order = require('../models/Order');
const Item = require('../models/Item');
const Customer = require('../models/Customer');
const DeliveryVehicle = require('../models/DeliveryVehicle');

exports.createOrder = async (req, res) => {
    try {
        const { itemId, customerId } = req.body;

        const [item, customer] = await Promise.all([
            Item.findById(itemId),
            Customer.findById(customerId)
        ]);

        if (!item || !customer) {
            return res.status(400).json({ message: 'Item or customer not found' });
        }

        const matchingVehicle = await DeliveryVehicle.findOne({
            city: customer.city,
            activeOrdersCount: { $lt: 2 }
        });

        if (!matchingVehicle) {
            return res.status(400).json({ message: 'No available vehicle for this order' });
        }

        const newOrder = new Order({
            itemId,
            price: item.price,
            customerId,
            deliveryVehicleId: matchingVehicle._id
        });

        matchingVehicle.activeOrdersCount += 1;
        await Promise.all([newOrder.save(), matchingVehicle.save()]);

        res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: 'Error creating order', error });
    }
};

exports.markOrderDelivered = async (req, res) => {
    try {
        const orderId = req.params.id;

        const order = await Order.findById(orderId).populate('deliveryVehicleId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.isDelivered = true;
        await order.save();

        const deliveryVehicle = order.deliveryVehicleId;
        deliveryVehicle.activeOrdersCount -= 1;
        await deliveryVehicle.save();

        res.json({ message: 'Order marked as delivered' });
    } catch (error) {
        res.status(500).json({ message: 'Error marking order as delivered', error });
    }
};
