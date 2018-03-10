module.exports = (app, latlon) => {
  const fetch = require( 'node-fetch');
  const bodyParser = require('body-parser');
  require('dotenv').config();

  checkAPI = (api) =>{
    if(api === process.env.REMOTE_ACCESS_KEY){
      return True;
    } else{
      return False;
    }
  }

  app.get("/api/locate/city/:api_key/:lat/:long", (req, res)=>{
    if(checkAPI(req.params.api_key)){
      api_address = "https://www.googleapis.com/geolocation/v1/geolocate?key="+process.env.GOOGLE_API_KEY
      fetch(api_address)
      .then((response)=>response.json())
      .then((json)=>res.send(json))
    }else{
      res.status(400);
      res.send('Forbidden');
    }
  })

  app.get("/api/track/city/:api_key/:city", (req, res)=>{
    if(checkAPI(req.params.api_key)){
      city = req.params.city.replace(" ", "-")
      api_address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city
      fetch(api_address).then((response)=>response.json()).then((json)=>{
        console.log(json.results[0].geometry.location.lat)
        console.log(json.results[0].geometry.location.lng)
        console.log(json)
      })
    }else{
      res.status(400);
      res.send('Forbidden');
    }
  })



  app.get("/api/track/coords/:api_key/", (req, res)=>{
    console.log(request.connection.remoteAddress)
    client_api = req.params.api_key
    lat = req.params.lat
    lon = req.params.lon

    if(checkAPI(req.params.api_key)){
      res.send("API end point not implemented")
    }else{
      res.status(400);
      res.send('Forbidden');
    }
  })

  app.get("/api/radar/:api_key/:lat/:lon", (req, res)=>{
    client_api = req.params.api_key
    lat = req.params.lat
    lon = req.params.lon

    radar_link = "https://api.wunderground.com/api/"+process.env.WEATHER_KEY+"/animatedsatellite/image.gif?lat="+lat+"&lon="+lon+"&radius=90&key=sat_ir4&basemap=0"
    if(client_api == process.env.REMOTE_ACCESS_KEY){
      console.log("Valid request recieved")
      radar_img = fs.readFileSync('./image-1.gif')
      fetch(radar_link)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(new Date)

        // console.log(Object.keys(blob)
        res.writeHead(200, {'Content-Type': 'image/gif'})
        res.write(radar_img)
        res.end()
        //res.end(blob, 'binary')
        console.log(request.connection.remoteAddress)
      }).catch(err => console.log(err.stack))
    }else{
      res.status(400);
      res.send('Forbidden');
      console.log("Recieved invalid API key: " + client_api + "\nIP: " + request.connection.remoteAddress)

    }

  })

}
