const { MongoClient } = require('mongodb');

const dbUrl = 'mongodb+srv://bhargav:iWjp2xeF3TB9pfV@cluster0.jrxds.mongodb.net/?retryWrites=true&w=majority';

let dbConn;

module.exports = {

  connectToDB: (cb_func) => {
    MongoClient.connect(dbUrl)
               .then((client) => {
                 dbConn = client.db();
                 return cb_func();
               })
               .catch(err => {
                 console.log(err);
                 return cb_func(err);
               });
  },

  getDB: () => dbConn

}; // end of exports object
