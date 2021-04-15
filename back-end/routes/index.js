var express = require("express"),
	router = express.Router(),
	 cloudinary = require('cloudinary'),
	 multer  = require('multer'),
	 cloudinaryStorage = require('multer-storage-cloudinary'),
	 path = require('path'),
	 express = require('express'),
	 app = express();
    
     cloudinary.config({
        cloud_name: 'university-of-education-technology',
        api_key: '879499583472927',
        api_secret: 'WP0ASIIDx9dV86vq7BxKL_a_VPQ'
     });
router.post("/sendImage",multer({storage: cloudinaryStorage.CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    destination: function (req, file, callback) { callback(null, './uploads');},
    filename: function (req, file, callback) { callback(null, "MyImage")}})
   }).single('Image'), function(req, res){ 
       return res.status(200).json({
           msg:"Uploaded"
       })
   } );
   module.exports = router;