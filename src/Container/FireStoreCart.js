const admin = require("firebase-admin");
const moment = require('moment');

class FireStoreCartContainer {

    async createCart() {
        try {

            const db = admin.firestore();
            const query = db.collection('carts');
            let doc = query.doc();

            let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');
            let IDofNewCart = '';

            await doc.create({
                timestamp: date,
                products: []
            });

            const cartsRead = await this.getAll();

            let dates = [];

            cartsRead.forEach(doc => {
                dates.push(doc.data().timestamp);
            });

            dates = dates.sort();
            
            cartsRead.forEach(doc => {
                if(doc.data().timestamp === dates[dates.length - 1]){
                    IDofNewCart = doc.id;
                }
            });

            return IDofNewCart;

        } catch(error) {
            console.log(error);
        }
    }

    async save(productToAdd, currentCartToAdd) { 
        try {

            const db = admin.firestore();
            const query = db.collection('carts');

            let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');

            const product = {
                id: productToAdd.id,
                title: productToAdd.data().title,
                price: productToAdd.data().price,
                image: productToAdd.data().image,
                stock: productToAdd.data().stock,
                description: productToAdd.data().description,
                code: productToAdd.data().code
            }

            await query.doc(`${currentCartToAdd.id}`).set({
                timestamp: date,
                products: [...currentCartToAdd.data().products, product]
            });

        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {

            const carts = await this.getAll();

            let cartWithID = [];

            if(carts[0] !== 'N'){
                carts.forEach(doc => {
                    if(id == doc.id){
                        cartWithID = doc;
                    }
                });
            }

            return cartWithID;

        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try { 
        
            const db = admin.firestore();
            const query = db.collection('carts');
    
            const querySnapshot = await query.get();
    
            let dbCartRead = await querySnapshot.docs;
    
            if(dbCartRead.length != 0){
                return dbCartRead;
            } else {
                return 'No hay productos en el carrito';
            }
    
        } catch (error) {
        console.log(error);
        }
    }

    async deleteByCartAndProductId( currentCartToDelete, productToDelete) {
        try {

            const db = admin.firestore();
            const query = db.collection('carts');

            let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');

            const newCart = currentCartToDelete.data();

            let exist = false;

            currentCartToDelete.data().products.forEach(e => {
                if(e.id === productToDelete.id){
                    exist = true;
                }
            })   

            if(newCart.products.length != 0){
                if(exist){
                    newCart.products.splice(productToDelete.data(), 1);

                    await query.doc(`${currentCartToDelete.id}`).set({
                        timestamp: date,
                        products: newCart.products
                    });
                } else {
                    return 1;
                }
            } else {
                return 1;
            }

        } catch(error) {
            console.log(error);
        }
    }

    async deleteAllCartId(id) {
        try {

            const db = admin.firestore();
            const query = db.collection('carts');
            const doc = query.doc(`${id}`);
            
            const proceed = await this.getById(id);

            if(proceed.length == undefined){
                
                await doc.delete();

            } else {
                return 1;
            }

        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = FireStoreCartContainer;