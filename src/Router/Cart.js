const { Router } = require('express');

const router = Router();

const CartContainer = require('../Class/cartClass');
const c = new CartContainer('./src/Files/cart.txt');

const ProductContainer = require('../Class/productClass');
const p = new ProductContainer('./src/Files/products.txt');

router.get('/:id/productos', async (req, res) => {
    try {

        const id = req.params.id;

        const productsByCartId = await c.getById(id);

        if(productsByCartId != -1){
            res.status(productsByCartId.status).send(productsByCartId);
        } else{
            res.status(200).send(`The are no products in the cart with ID:${id}`);
        }

    } catch(err) {
        res.status(404).send(err);
    }
});

router.post('/', async (req, res) => {
    try {

        IdOfNewCart = await c.createCart();

        res.status(200).send({IdOfNewCart});

    } catch(err) {
        res.status(404).send(err);
    }
});

router.post('/:id/productos', async (req, res) => {
    try{

        const id = req.params.id;

        const { productId } = req.body;

        const existProductId = await p.getById(productId);

        const existCartId = await c.getById(id);

        if(!isNaN(productId)){
            if(existProductId.id != 0 && existProductId.id != undefined){
                if(existCartId.status === 200 || existCartId === -1){
                    
                    const cart = await c.save(existProductId, id);

                    res.status(200).send({200: `Product added to cart with ID:${id}`});

                } else {
                    res.status(404).send({
                        error: 'ID not found',
                        description: `Cart with ID:${id} does not exist`,
                    });
                }
            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Product with ID:${productId} does not exist`
                }); 
            }
        } else {
            res.status(404).send({
                error: 'ID is a character',
                description: `Only numbers are accepted`
            });
        }

    } catch(err) {
        res.status(404).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{

        const id = req.params.id;

        const existCartId = await c.getById(id);

        if(!isNaN(id)){
            if(existCartId.status === 200){

                await c.deleteAllCartId(id);

                res.status(200).send({200: 'Delete ok'});

            } else {
                res.status(existCartId.status).send({
                    error: 'ID not found',
                    description: `Cart with ID:${id} does not exist`,
                });
            }
        } else {
            res.status(404).send({
                error: 'ID is a character',
                description: `Only numbers are accepted`
            });
        }

    } catch(err){
        res.status(404).send(err);
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    try{

        const cartParamsId = req.params.id;
        const productParamsId = req.params.id_prod;

        const existCartId = await c.getById(cartParamsId);
        const existProductId = await p.getById(productParamsId);

        if(existProductId.status === 200){
            if(existCartId.status != 404){

                const response = await c.deleteByCartAndProductId(cartParamsId, productParamsId);

                res.status(response.status).send(response);

            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Cart with ID:${cartParamsId} does not exist`,
                });
            }
        } else {
            res.status(404).send({
                error: 'ID not found',
                description: `Product with ID:${productParamsId} does not exist`
            }); 
        }

    } catch(err){
        res.status(404).send(err);
    }
});

module.exports = router;