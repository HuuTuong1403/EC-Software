const express = require("express");
const multer  = require('multer')
const app = express();
const cloudinary = require("cloudinary").v2;
const bodyParser = require('body-parser');
const cors = require('cors')
// body parser configuration
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary configuration
cloudinary.config({
    cloud_name: 'university-of-education-technology',
    api_key: '879499583472927',
    api_secret: 'WP0ASIIDx9dV86vq7BxKL_a_VPQ'
 });

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

 app.listen(3000, () => {
 });

app.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

const storage = multer({dest:'public/'});
// image upload API
app.post("/image-upload", storage.single('image') ,(request, response) => {
    // upload image here
    cloudinary.uploader.upload(request.file.path, {folder: 'single'})
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

app.get("/getImage", async(request, response) => {
  const {resources} = await cloudinary.search.expression('folder: single').sort_by('public_id', 'desc').max_results(30).execute();
  const url = resources.map(file => file.url);
  response.send(url);
})

module.exports = app;