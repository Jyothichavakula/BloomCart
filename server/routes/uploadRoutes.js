const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const {

  uploadImage

} = require(

  "../controllers/uploadController"

);

const storage =
multer.diskStorage({});

const upload =
multer({

  storage

});

router.post(

  "/",

  upload.single("image"),

  uploadImage

);

module.exports =
router;