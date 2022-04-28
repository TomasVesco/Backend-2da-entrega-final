const express = require('express');
const { json } = require('express');

const db = 'firestore';

let products;
let cart;

switch(db){
    case 'mongodb':
        console.log('Conectandose a MongoDB...');
        products = require('./Router/MongoProducts');
        cart = require('./Router/MongoCart');
        break
    
    default:
        console.log('Conectandose a Firestore...');
        products = require('./Router/FirestoreProducts');
        cart = require('./Router/FirestoreCart');
        break;
}

const server = express();

server.use(json());

server.use('/api/productos', products);
server.use('/api/carrito', cart);

module.exports = server;