const express = require('express');
require('dotenv').config();

port = process.env.PORT || 5000

//Instantiate express
const app = express();

app.get("/api/spark", (req, res)=>{
  res.send("Hello World")
})

// Listen on port
app.listen(port, function () {
    console.log('Fireworker listening on port ' + port);
   });
