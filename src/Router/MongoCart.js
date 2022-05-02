const { Router } = require('express');

const router = Router();

const CartContainer = require('../DAO/cartClass');
const c = new CartContainer();

const ProductContainer = require('../DAO/productClass');
const p = new ProductContainer();

router.get('/:id/productos', async (req, res) => {
    try {

        const id = req.params.id;

        if(id.length == 24){

            let cartWithID = await c.getById(id);

            if(cartWithID.length != 0){
                res.status(200).send(cartWithID);
            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Cart with ID:${id} does not exist`,
                });                 
            }

        } else {
            res.status(404).send({
                error: 'ID not found',
                description: `Cart with ID:${id} does not exist`,
            });            
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

        const cartID = req.params.id;

        const { productID } = req.body;

        const existProductID = await p.getById(productID);

        const existCartID = await c.getById(cartID);

        if(cartID.length == 24){
            if(productID.length == 24){
                if(existCartID.length != 0){
                    if(existProductID.length != 0){

                        await c.save(existProductID, existCartID);
                        res.status(200).send('Post ok');

                    } else {
                        res.status(404).send({
                            error: 'ID not found',
                            description: `Product with ID:${productID} does not exist`,
                        });  
                    }
                } else {
                    res.status(404).send({
                        error: 'ID not found',
                        description: `Cart with ID:${cartID} does not exist`,
                    });                    
                }
            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Product with ID:${productID} does not exist`,
                });                
            }
        } else {
            res.status(404).send({
                error: 'ID not found',
                description: `Cart with ID:${cartID} does not exist`,
            });
        }

    } catch(err) {
        res.status(404).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try{
 
        const id = req.params.id;

        if(id.length == 24){

            const response = await c.deleteAllCartId(id);

            if(response != 1){
                res.status(200).send('Delete ok');
            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Cart with ID:${id} does not exist`,
                }); 
            }
        } else {
            res.status(404).send({
                error: 'ID not found',
                description: `Cart with ID:${id} does not exist`,
            });   
        }

    } catch(err){
        res.status(404).send(err);
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    try{

        const cartParamsID = req.params.id;
        const productParamsID = req.params.id_prod;

        const existCartID = await c.getById(cartParamsID);
        const existProductID = await p.getById(productParamsID);

        if(cartParamsID.length == 24){
            if(productParamsID.length == 24){
                if(existCartID.length != 0){
                    if(existProductID != 0){
                        
                        const response = await c.deleteByCartAndProductId(existCartID, existProductID);
                        if(response != 1){
                            res.status(200).send('Delete ok');
                        } else {
                            res.status(404).send({
                                error: 'Product not found',
                                description: `Product with ID:${productParamsID} does not exist in the cart`,
                            });
                        }

                    } else {
                        res.status(404).send({
                            error: 'ID not found',
                            description: `Product with ID:${productParamsID} does not exist`,
                        });
                    }
                } else {
                    res.status(404).send({
                        error: 'ID not found',
                        description: `Cart with ID:${cartParamsID} does not exist`,
                    }); 
                }
            } else {
                res.status(404).send({
                    error: 'ID not found',
                    description: `Product with ID:${productParamsID} does not exist`,
                });
            }
        } else {
            res.status(404).send({
                error: 'ID not found',
                description: `Cart with ID:${cartParamsID} does not exist`,
            });           
        }

    } catch(err){
        res.status(404).send(err);
    }
});

module.exports = router;