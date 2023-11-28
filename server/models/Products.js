// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    image:{
        type:String,
        require:true
    }
    // Add more fields as needed for your product schema
});

const Product = mongoose.model('Product', productSchema);

export default Product;
