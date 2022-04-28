const admin = require("firebase-admin");

const serviceAccount = require("./Firestore.json");

FIRESTORE();

async function FIRESTORE(){
    try{

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://db-firestore-ecommerce.firebaseio.com"
          });

    }catch(err){
        console.log(err);
    }
}