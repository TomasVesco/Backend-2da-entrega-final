const mongoose = require('mongoose');

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: {type: String, require: true, max: 100},
    price: {type: Number, require: true, max: 10000},
    description: {type: String, require: true, max: 10000},
    image: {type: String, require: true, max: 100},
    stock: {type: Number, require: true, max: 100},
    code: {type: String, require: true, max: 100}
});

const products = mongoose.model(productCollection, productSchema);

module.exports = products;