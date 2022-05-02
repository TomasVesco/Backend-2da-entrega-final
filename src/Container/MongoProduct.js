const mongoose = require('mongoose');
const mongoProducts = require('../../db/models/products');

class MongoProductContainer {

  async updateById(id, newData) {
    try{

    const { title, price, image, description, stock, code } = newData;

    const newProduct = {
      title,
      price,
      image,
      description,
      stock,
      code
    };

    const productWithId = await mongoProducts.find({"_id": id});

    if(productWithId.length != 0){
      await mongoProducts.updateOne({"_id": id},{$set: {"title": title, "price": price, "image": image, "description": description, "stock": stock, "code": code}});
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
      
      const { title, price, image, description, stock, code } = productToAdd;

      const newProduct = {
        title,
        price,
        image,
        description,
        stock,
        code,
      }
      
      await mongoProducts.insertMany(newProduct);

      return newProduct;

    } catch (error) {
        console.log(error);
    }
  }

  async getById(id) {
    try {

        const productWithId = await mongoProducts.find({"_id": id});

        return productWithId;

    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {

      let dbProductRead = await mongoProducts.find({});

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

      const productWithId = await mongoProducts.find({"_id": id});

      if(productWithId.length != 0){
  
        await mongoProducts.deleteOne({"_id": id});
  
      } else {
        return -1;
      }

    }catch(err){
      console.log(err);
    }
  }
}

module.exports = MongoProductContainer;