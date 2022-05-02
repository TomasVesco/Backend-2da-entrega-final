const fs = require('fs');
const moment = require('moment');

class FileSystemCartContainer {

    constructor( route ) {
        this.route = route;
    }

    async createCart() {
        try {

            const cart = await this.getAll();
            cart.sort((a, b) => a.id - b.id);

            let date = moment(new Date()).format('DD-MM-YYYY h:mm:ss a');

            let id = undefined;
            
            if(id == undefined) {
                for(let i = 0; i < cart.length ;i++){
                    if(cart[i].id !== i + 1 && cart[0].id !== 0){
                        id = i + 1;
                        break;
                    } else {
                        id = cart[cart.length - 1].id + 1;
                    }
                }
            }

            if(cart[0].id == '0'){
                id = 1;
                cart.shift();
            }

            const newCart = 
                {
                    id: id,
                    timestamp: date,
                    products: []
                } 

            cart.push(newCart);    
            
            cart.sort((a, b) => a.id - b.id);
            
            fs.writeFileSync( this.route, JSON.stringify( cart, null, 4 ));

            return JSON.stringify(id);

        } catch(error) {
            console.log(error);
        }
    }

    async save(productToAdd, id) { 
        try {

            let cart = await this.getAll();

            cart[id - 1].products.push(productToAdd);
                
            fs.writeFileSync( this.route, JSON.stringify( cart, null, 4 ));

            return JSON.stringify(cart);

        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {

            if(!isNaN(id)){
                id = parseInt(id);
            
                const cart = await this.getAll();
    
                const IdCart = cart.find( cart => cart.id == id );
                   
                if ( IdCart ) {
                    if(IdCart.products != ''){
                        return {...IdCart.products, status: 200};
                    } else {
                        return -1;
                    }
                } else {
                    return {
                        error: 'ID not found',
                        description: `Cart with ID:${id} does not exist`,
                        status: 404
                    };
                }
            } else {
                return {
                    error: 'ID not found',
                    description: `Cart with ID:${id} does not exist`,
                    status: 404
                }
            }

        } catch(error) {
            console.log(error);
        }
    }

    async getAll() {
        try {

            let readFile = await fs.promises.readFile( this.route, 'utf-8' ); 

            if(readFile == '' || readFile == '[]'){
                const obj = [
                    {id: 0}
                ];
                fs.promises.writeFile( this.route, JSON.stringify(obj));
            }
            
            readFile = await fs.promises.readFile( this.route, 'utf-8' ); 

            return JSON.parse( readFile );

        } catch(error) {
            console.log(error);
        }
    }

    async deleteByCartAndProductId( cartParamsId, productParamsId) {
        try {

            cartParamsId = parseInt(cartParamsId);
            productParamsId = parseInt(productParamsId);

            let cart = await this.getAll();
    
            let deleteProductFromCart = cart.find( cart => cart.id == cartParamsId );
            const productToDelete = deleteProductFromCart.products.find(product => product.id == productParamsId);

            console.log(productToDelete);

            if(deleteProductFromCart.products != '' && productToDelete != undefined){

                const index = deleteProductFromCart.products.indexOf(productToDelete);
    
                cart[cartParamsId - 1].products.splice(index, 1);
    
                fs.promises.writeFile( this.route, JSON.stringify( cart, null, 4 ));  
                
                return ({
                    status: 200,
                    message: 'Delete ok'
                });

            } else {
                return ({
                    status: 404,
                    error: `Product with ID:${productParamsId} is't in the cart`
                });
            }

        } catch(error) {
            console.log(error);
        }
    }

    async deleteAllCartId(id) {
        try {

            id = parseInt(id);

            let cart = await this.getAll();

            const IdCart = cart.find( cart => cart.id === id );
    
            const index = cart.indexOf(IdCart);

            cart.splice(index, 1);

            fs.promises.writeFile( this.route, JSON.stringify (cart, null, 4));   

        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = FileSystemCartContainer;