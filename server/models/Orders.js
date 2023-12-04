// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true,
            },
            quantity: {
                type: Number,
                default: 1
            },
            status: {
                type: String,
                enum: ['Pending', 'Shipped', 'Delivered', 'Returned', 'Request Cancell', 'Cancelled'], // Example status values, customize as needed
                default: 'Pending',
            },
            totalPrice: {
                type: Number,
                default: 0
            },
            orderDate: {
                type: Date,
                default: Date.now,
            },
        },
    ]
    // Add more fields as needed for your specific use case
});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders
