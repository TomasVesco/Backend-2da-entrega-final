const fs = require("fs");

const mongoose = require('mongoose');
const mongoProducts = require('../../db/models/products');

class ProductContainer {
  constructor(route) {
    this.route = route;
  }

  async updateById(id, newData) {

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

      if(id.length != 24){
        return 1;
      } else {
        const productWithId = await mongoProducts.find({"_id": id});
        if(productWithId.length != 0){
          return productWithId;
        } else {
          return 2;
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {

      let dbRead = await mongoProducts.find({});

      if (dbRead == "" || dbRead == "[]") {
        return 'No hay productos en la base de datos';
      }
      
      return dbRead;

    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {

    const productWithId = await mongoProducts.find({"_id": id});

    if(productWithId.length != 0){

      await mongoProducts.deleteOne({"_id": id});

    } else {
      return -1;
    }

  }
}

module.exports = ProductContainer;