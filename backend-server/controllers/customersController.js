const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { name, city } = req.body;
    const newCustomer = new Customer({ name, city });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { name, city } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, city },
      { new: true }
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};
