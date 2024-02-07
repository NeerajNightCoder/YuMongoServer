const express = require("express")
const { getPhotos,getFreeDocs,addPhotos,addFreeDocs } = require('../controllers/docDetails')
const router = express.Router()

router.route('/photos')
      .get(getPhotos)
      .post(addPhotos)

router.route('/freeDocs')
      .get(getFreeDocs)
      .post(addFreeDocs)      

module.exports = router