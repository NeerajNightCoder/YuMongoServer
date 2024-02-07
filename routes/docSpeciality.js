const express = require("express")
const { getSpeciality,addSpeciality,getDocsInSpeciality,addDocsInSpeciality,deleteSpeciality } = require('../controllers/docSpeciality')
const router = express.Router()

router.route('/')
      .get(getDocsInSpeciality)
      .post(addDocsInSpeciality)
    //   .delete(deleteSpeciality)

module.exports = router