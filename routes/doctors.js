const express = require('express')
const { getDoctors, getDocNames, getDoctor, addDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctors.js')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/names')
    .get(getDocNames)
router.route('/:id')
    .get(getDoctor)
    .delete(protect, authorize('manager', 'admin'), deleteDoctor)

router.route('/')
    .get(getDoctors)
    .post(addDoctor)
    // .post(protect,authorize('manager','admin'),addDoctor)


module.exports = router