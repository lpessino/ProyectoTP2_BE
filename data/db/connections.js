require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.URL);

let instance = null;

async function getConnection(){
    if(instance == null){
        try{
            instance = await client.connect();
        } catch(err){
            console.log(err.message);
        }
    }
    return instance;
}

module.exports = {getConnection};