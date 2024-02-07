const Appointment=require('../models/NewAppointment')
const DocAuth= require('../models/DocAuth')


const moment=require('moment')
require('moment-round')
exports.addAppointment=async(req,res,next)=>{
    try {
     console.log(JSON.stringify(req.body))
     const appointment=await Appointment.create(req.body) //created appointment with staus=awaitingpayment 
     
            //sending email via NodeMailer
                 
 
 
   
 
 
     
     res.status(201).json({
         success:true,
 
     })
    } catch (error) {
        console.log(error)
    }
 }


 exports.getAppointment = async(req, res, next)=>{
    try {
        const m=new moment()
        console.log(m.floor(5,'minutes').format('LT'))
        const doc=await DocAuth.findOne({password:req.params.id})
     const appointment=await Appointment.find({docID: req.params.id,date:moment().format('YYYY-MM-DD')}).select("time userId -_id") //created appointment with staus=awaitingpayment 
     
            //sending email via NodeMailer
                 
 
 
   
 
 
     
     res.status(201).json({
         success:true,
         appointments:appointment
 
     })
    } catch (error) {
        console.log(error)
    }
 }

 exports.getAllAppointments=async(req,res,next)=>{
     console.log('get all appointments')
     try {
         const appointments=await Appointment.find(req.query).sort({createdAt:-1})
         res.status(200).json({payload:appointments})
     } catch (error) {
         console.log(error)
     }
 }

 exports.getAppointmentsForUser=async(req, res, next) => {
     try {
         const appointments=await Appointment.find({userId:req.params.userId})
         res.status(200).json({
             success:true,
             appointments: appointments
         })
     } catch (error) {
         console.log(error)
     }
 }