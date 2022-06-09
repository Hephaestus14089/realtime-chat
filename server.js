const express = require('express');
const mongoose = require('mongoose');

const app = express();

// mongodb atlas connection and server creation
const dbUrl = 'mongodb+srv://bhargav:iWjp2xeF3TB9pfV@cluster0.jrxds.mongodb.net/?retryWrites=true&w=majority';

let server;

mongoose.connect(dbUrl, (err) => {

  if (err) {
      console.log("unable to connect to db :(");
      console.log("Exiting...");
      console.log("err:", err);
  }
  else {
      console.log("db connection established...");

      // create server and listen on port
      server = app.listen(3000, () => {
        console.log("server is running on port", server.address().port);
      });
  }
});

// defining schema
const messageSchema = {
  name: String,
  text: String
};

// compiling model
const messageModel = ('Message', messageSchema);

app.use(express.static(__dirname));
