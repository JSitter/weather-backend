module.exports = (app) => {
  const fetch = require( 'node-fetch');
  const bodyParser = require('body-parser');
  require('dotenv').config();

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
        console.log(Object.keys(blob))
        res.writeHead(200, {'Content-Type': 'image/gif'})
        res.write(radar_img)
        res.end()
        //res.end(blob, 'binary')

      }).catch(err => console.log(err.stack))
    }else{
      res.send("INVALID API KEY\NTRY ALPO, IT'S DELICIOUS!")
      console.log("Recieved invalid API key: " + client_api)

    }

  })

}
