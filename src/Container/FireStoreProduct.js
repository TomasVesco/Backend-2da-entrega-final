const admin = require("firebase-admin");

class FireStoreProductContainer {

    async updateById(id, newData) {
        try{

            const db = admin.firestore();
            const query = db.collection('products');
    
            const { title, price, image, description, stock, code } = newData;
    
            const newProduct = {
                title,
                price,
                image,
                description,
                stock,
                code
            };
    
            let productWithID = await this.getById(id);
    
            if(productWithID.length != 0){
                
                const doc = query.doc(`${id}`);
                await doc.update(newProduct);
                return newProduct;
    
            } else {
                return -1;
            }

        }catch(err){
            console.log(err);
        }
    }

    async save(productToAdd) {
        try {
            
            const db = admin.firestore();
            const query = db.collection('products');
            let doc = query.doc();
            
            const { title, price, image, description, stock, code } = productToAdd;

            const newProduct = {
                title,
                price,
                image,
                description,
                stock,
                code,
            }
        
            await doc.create(newProduct);

            return newProduct;
        
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {

            const products = await this.getAll();

            let productWithID = [];

            if(products[0] !== 'N'){
                products.forEach(doc => {
                    if(id == doc.id){
                        productWithID = doc;
                    }
                });
            }

            return productWithID;

        } catch (error) {
            console.log(error);
        }
    }

  async getAll() {
    try { 
        
        const db = admin.firestore();
        const query = db.collection('products');

        const querySnapshot = await query.get();

        let dbProductRead = await querySnapshot.docs;

        if(dbProductRead.length != 0){
            return dbProductRead;
        } else {
            return 'No hay productos en la base de datos';
        }

    } catch (error) {
    console.log(error);
    }
  }

  async deleteById(id) {
    try{

        const db = admin.firestore();
        const query = db.collection('products');
    
        const productWithID = await this.getById(id);
    
        if(productWithID.length != 0){
    
          const doc = query.doc(`${id}`);
          await doc.delete();
    
        } else {
          return -1;
        }

    }catch(err){
        console.log(err);
    }
  }
}

module.exports = FireStoreProductContainer;