const express = require('express')
const router=express.Router()
const {getAccessToken} =require('../controllers/videocall')
router.route('/:userType/:docId/:userId')
       .get(getAccessToken)


module.exports = router       