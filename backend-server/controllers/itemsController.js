const Item = require('../models/Item');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newItem = new Item({ name, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};