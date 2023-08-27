const express=require("express");
const mongoose=require('mongoose');
const dotenv= require('dotenv');

dotenv.config();
const app=express();

const itemsRoutes = require('./routes/itemsRoutes');
const customersRoutes = require('./routes/customersRoutes');
const deliveryVehiclesRoutes = require('./routes/deliveryVehiclesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Successfully connected");
}).catch((error)=>{
    console.log(error);
})

app.use(express.json())

app.use('/api/items', itemsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/delivery-vehicles', deliveryVehiclesRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})

