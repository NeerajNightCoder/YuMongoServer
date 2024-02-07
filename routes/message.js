const express = require("express")
const { addMessage, getMessage } = require('../controllers/message')
const router = express.Router()

router.route('/')
    .get(getMessage)
    .post(addMessage)

module.exports = router