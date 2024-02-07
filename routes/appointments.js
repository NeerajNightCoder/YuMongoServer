const express = require('express')
// const { getAppointments, getAppointment, addAppointment, updateAppointment, getAppointmentByPaymentId } = require('../controllers/appointment')
const {addAppointment,getAppointment,getAllAppointments,getAppointmentsForUser} =require('../controllers/newappointment')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')

// router.route('/paymentID/:id')
//         .get(getAppointmentByPaymentId)

router.route('/user/:userId')
      .get(getAppointmentsForUser)

router.route('/:id')
    .get(getAppointment)
//     .put(protect, authorize('user', 'admin'), updateAppointment)



router.route('/')
    .get(getAllAppointments)
    // .post(protect,authorize('user'),addAppointment)
    .post(addAppointment)

module.exports = router