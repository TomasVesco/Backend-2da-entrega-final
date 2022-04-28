//SERVER
const server = require('./src/app');

//firestore cfg
const FIRESTORE = require('./db/Firestore');

//mongo cfg
const MONGO = require('./db/MongoDB');

const PORT = 8080;

server.listen( PORT, async () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    MONGO;
    FIRESTORE;
});
