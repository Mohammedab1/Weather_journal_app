// Setup empty JS object to act as endpoint for all routes
projectData = {};
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const APIKEy= process.env.APIKEY;

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowanc

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//apply get & post methods

app.get("/s", function(req, res){
    res.send(projectData)
})


app.post("/r" , function(req, res){

projectData["date"] = req.body.date;

projectData["temperature"] = req.body.temperature;

projectData["feelings"] = req.body.feelings;

projectData["country"] = req.body.country;

projectData["city"] = req.body.city;


console.log(req.body.country);

res.send(projectData);
});



//set up the server to listen on port 3000
const port = 3000;
app.listen(port, function(){
  console.log("Server is listening on port " + port);
});
