const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: Number,
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  price: Number,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  deliveryVehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryVehicle",
  },
  isDelivered: { type: Boolean, default: false },
});

orderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const lastOrder = await mongoose.model("Order").findOne(
      {},
      {},
      { sort: { orderNumber: -1 } }
    );
    this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Order", orderSchema);
