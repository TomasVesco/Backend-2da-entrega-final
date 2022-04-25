const mongoose = require('mongoose');

MONGO()

async function MONGO() {
    try{

        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL);
        console.log('Base de datos conectada');

    }catch (err) {
        console.log(err);
    }
}