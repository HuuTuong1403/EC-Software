var express = require('express'),
    cloudinary = require('cloudinary'),
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use("/", routes);
console.log("App Started!");
module.exports = app;