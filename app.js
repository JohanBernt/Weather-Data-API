const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) { //creating a function to get the weather API
  res.sendFile(__dirname + "/index.html")
});

//used Postman to create a weather API by inputting city and metric.
app.post("/", function(req, res) { //installed npm i body-parser on command line at this point
  const query = req.body.cityName; //setting the city
  const unit = "metric" //setting the unit measurement to metric
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=28dd9ae8eb8fd13bfa3623dd830e0601&units=metric"
  https.get(url, function(response) { //callback function to get back a response
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data) //converts data into a javascript object for us
      const temp = weatherData.main.temp //adds the temperature to our website
      const weatherDescription = weatherData.weather[0].description //adds the description of the weather to our website
      const icon = weatherData.weather[0].icon //getting the icon from the weather data
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> The weather is " + weatherDescription + ".</h1>") //adding the weather description
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>") //adding the temperature in large header
      res.write("<img src=" + imageURL + ">"); // adding an icon that reflects the type of weather.
      res.send()
    })
  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000")
});
