//npm init
//npm install express --save 
//npm install cors --save
//npm install body-parser --save
//npm install mysql --save 

var cors = require('cors');
var bodyParser = require("body-parser");
var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

app.use(cors());//allows cross domain requests
app.use(bodyParser.urlencoded({ extended: false }));//allows post requests
app.use(bodyParser.json());

var routes = require('./app/routes/userRoute'); //importing route
routes(app); //register the route

app.listen(port, function () {
    console.log('RESTful APP server started on: ' + port)
  });
