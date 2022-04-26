const fs = require('fs');

const mongoose = require('mongoose');
const mongoCart = require('../../db/models/cart');

class CartContainer {

    constructor( route ) {
        this.route = route;
    }

    async createCart() {
        try {

            await mongoCart.insertMany({});

            let lastCartCreatedID = await mongoCart.find({},{"_id": true}).sort({$natural:-1}).limit(1);

            return lastCartCreatedID;

        } catch(error) {
            console.log(error);
        }
    }

    async save(productToAdd, currentCartToAdd) { 
        try {

            const { title, price, description, image, stock, code } = productToAdd[0];

            await mongoCart.updateOne({"_id": currentCartToAdd[0]._id},{$push: {products: {"title": title, "price": price, "image": image, "description": description, "stock": stock, "code": code}}});

        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {

            const cartWithID = await mongoCart.find({"_id": id});

            return cartWithID;

        } catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {

            let dbCartRead = await mongoCart.find({});
            
            if(dbCartRead.length != 0){
                return dbCartRead;
            } else {
                return 'El carrito está vacío';
            }

        } catch(error) {
            console.log(error);
        }
    }

    async deleteByCartAndProductId( currentCartToDelete, productToDelete) {
        try {

            const productInCartID = await mongoCart.find({"_id": currentCartToDelete[0]._id});

            if(productInCartID[0].products.length != 0){
                return await mongoCart.updateOne({"_id": currentCartToDelete[0]._id},{$pull: {products: {"title": productToDelete[0].title}}});
            } else {
                return 1;
            }

        } catch(error) {
            console.log(error);
        }
    }

    async deleteAllCartId(id) {
        try {

            const proceed = await this.getById(id);
            if(proceed.length != 0){

                await mongoCart.deleteOne({'_id': id});

            } else {
                return 1;
            }

        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = CartContainer;