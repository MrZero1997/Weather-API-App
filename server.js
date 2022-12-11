// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
// Initialize the main project folder
app.use(express.static('website'));
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Setup Server
const port = 8080;
const server = app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
});

//GET ROUTE
app.get('/all',(req,res)=>{
  res.send(projectData);
});

//POST ROUTE
app.post('/addData',(req,res)=>{
  //projectData = req.body;
  Object.assign(projectData , {
    temp : req.body.temp ,
    date : req.body.date ,
    userResponse : req.body.userResponse ,
  });
  res.send(projectData);
  console.log(projectData);
})
