const mongoose = require('mongoose');
const productSchema = require('../models/products');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [{
        title: {type: String, require: false, max: 100},
        price: {type: Number, require: false, max: 10000},
        description: {type: String, require: false, max: 10000},
        image: {type: String, require: false, max: 100},
        stock: {type: Number, require: false, max: 100},
        code: {type: String, require: false, max: 100}
    }]
});

const carts = mongoose.model(cartCollection, cartSchema);

module.exports = carts;