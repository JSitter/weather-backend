const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const fetch = require( 'node-fetch');
fs = require('fs');
var cron = require('node-cron');

port = process.env.PORT || 5000;

let coords = [{"lat": 34, "lon":-118}]

//Instantiate express
const app = express();

let i = 0;

download_radar = ()=>{
  console.log("chron ran")

}

function add_coords(lat, lon){
  this.coords.push(lat, lon)
}

function get_coords(){
  for(pair in this.coords){
    console.log("lat" + pair["lat"])
    console.log("longitude" + pair["lon"])
  }
}

//dowload radar data on a 5 minute interval
cron.schedule('*/5 * * * *', function(){
  download_radar()
}.bind(download_radar));

//Add bodyParser to App to get post data
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Load Routes
require('./routes.js')(app);

// Listen on port
app.listen(port, function () {
    console.log('Bloop Weather listening on port ' + port);
   });
