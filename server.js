const express = require('express');

const app = express();

const server = app.listen(3000, () => {
  console.log("server is running on port", server.address().port);
});

// db connection
let db;

connectToDB((err) => {
  /*
    the call back function
    that the connectToDB function expects as 'cb_func'
    as its arguments
  */

  if (!err) {
    db = getDB();
  } // end of outer if block
});


app.use(express.static(__dirname));
