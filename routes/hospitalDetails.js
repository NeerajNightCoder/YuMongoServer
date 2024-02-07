const express = require("express")
const { getPhotos,addPhotos } = require('../controllers/hospitalDetails')
const router = express.Router()

router.route('/photos')
      .get(getPhotos)
      .post(addPhotos)


module.exports = router