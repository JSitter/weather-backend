const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const fetch = require( 'node-fetch');
fs = require('fs')

port = process.env.PORT || 5000

//Instantiate express
const app = express();

//Add bodyParser to App to get post data
app.use(bodyParser.urlencoded({extended: true}));

// Load Routes
require('./routes.js')(app);

// Listen on port
app.listen(port, function () {
    console.log('Bloop Weather listening on port ' + port);
   });
