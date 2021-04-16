var express = require('express'),
    cloudinary = require('cloudinary').v2,
    bodyParser = require("body-parser"),
    routes = require("./routes"),
    router = express.Router();
    var path = require("path");
    app = express();
    
app.use(bodyParser.json);
app.use(
    bodyParser.urlencoded({extended: false})
);
app.use(express.static(path.join(__dirname, 'uploads')));



app.use("/", routes);
console.log("App Started!");
module.exports = app;