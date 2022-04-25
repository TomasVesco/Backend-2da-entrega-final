const express = require('express');
const { json } = require('express');

const products = require('./Router/Products');
const cart = require('./Router/Cart');

const server = express();

server.use(json());

server.use('/api/productos', products);
server.use('/api/carrito', cart);

module.exports = server;