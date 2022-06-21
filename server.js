const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

io.on('connection', () => {
  console.log('a user is connected');
});

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
      server = http.listen(3000, (err) => {
        if (err) console.log("unable to listen on port...") && console.log("err: ", err);
        else console.log("server is running on port", server.address().port);
      });
  }
});

// defining schema and compiling model
const Message = mongoose.model('Message', {
  name: String,
  text: String
});


// ROUTES

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err)
      res.sendStatus(500);
    else
      res.send(messages);
  });
});

app.post('/messages', (req, res) => {

  if (req.body.name == "" || req.body.text == "")
    res.sendStatus(500);

  let message = new Message(req.body);

  message.save(err => {

    if (!err) {
      io.emit('message', req.body);
      res.sendStatus(200);
    }
    else
      res.sendStatus(500);
  });
});
