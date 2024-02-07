const express = require('express')
const { getPrescription, addPrescription } = require('../controllers/prescription')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')



router.route('/')
    .post(addPrescription)

router.route('/:id')
    .get(getPrescription)

module.exports = router