const { Router } = require("express");
const { isAdmin } = require("../Middlewares/isAdmin");

const router = Router();

const ProductContainer = require("../Container/FileSystemProduct");
const p = new ProductContainer("./src/Files/products.txt");

router.get("/:id?", async (req, res) => {
  try {

    const id = req.params.id || null;

    if (id != null) {
      const productId = await p.getById(id);
      res.status(productId.status).send(productId);
      return false;
    }

    products = await p.getAll();
    res.status(200).send(products);

  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", [isAdmin], async (req, res) => {
  try {
    
    const { title, price, image, description, stock, code } = req.body;

    const propertyEmpty = [];
    
    for(const property in req.body) {
      if(req.body[property] == ''){
        propertyEmpty.push(property);
      }
    }

    if(propertyEmpty.length === 0){

        const newProduct = {
          title,
          price,
          image,
          description,
          stock,
          code,
        } 
        
        const response = await p.save(newProduct);

        res.status(200).send(response);

      } else {
      res.status(404).send({
        error: 'Argument null',
        description: `The argument ${propertyEmpty} have been no completed`
      });
    }

  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/:id", [isAdmin], async (req, res) => {
  try {

    const id = parseInt(req.params.id);

    const { title, price, image, description, stock, code } = req.body;

    const newProduct = { title, price, image, description, stock, code };

    const response = await p.updateById(id, newProduct);

    if (response !== -1) {

      res.status(200).send(response);

    } else {
      res.status(404).send({
        error: "ID not found",
        description: `Product with ID:${id} does not exist`,
      });
    }

  } catch (err) {
    res.status(404).send(err);
  } 
});

router.delete("/:id", [isAdmin], async (req, res) => {
  try {

    const id = req.params.id;

    proceed = await p.deleteById(id);

    if (proceed === 1) {
      res.status(200).send("Product deleted");
    } else if (proceed === 0) {
      res.status(404).send({
        error: "ID not found",
        description: `Product with ID:${id} does not exist`,
      });
    } else if (proceed === -1) {   
      res.status(404).send({
        error: "ID is a character",
        description: `Only numbers are accepted`,
      });
    }
    

  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;