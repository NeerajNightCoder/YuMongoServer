const Appointment=require('../models/Appointment')
const User=require('../models/User')
// const NodeMailer =require('nodemailer')
const { getMaxListeners } = require('../models/Appointment')
//@desc      Get all appointments
//@route     GET /api/v1/appointments
//access     Private
exports.getAppointments=async(req,res,next)=>{
   
    console.log("here")
    try {
        console.log(req.query)
       
         req.query["dateTime.date"]={
             
            "$gte":req.query.minD,
            "$lte":req.query.maxD
           }
        
           

           req.query.minD=null
           req.query.maxD=null
        
        let query
        const reqQuery={...req.query}
        // console.log(JSON.stringify(query.time))
        //Fields to exclude
        const removeFields=['select','sort','page','limit']
        
        //Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param=>delete reqQuery[param])

        // let queryStr=JSON.stringify(reqQuery)
        // queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`)
       let queryStr=reqQuery
        console.log(queryStr)

        //Finding resource
        // query=Appointment.find(JSON.parse(queryStr))
       

        
        query= Appointment.find(
        
              req.query
        ).populate('hospital','name -_id').populate('doctor','name photo -_id')


        // console.log(query)

        // query=Appointment.find(
        //     queryStr
        // ).populate('user','name -_id').populate('hospital','name -_id').populate('doctor','name -_id')

        

        //Select fields
        if(req.query.select)
        {
            const fields=req.query.select.split(',').join(' ')
            query=query.select(fields)
           
            
        }

        if(req.query.sort)
        {
            const sortBy=req.query.sort.split(',').join(' ')
            query=query.sort(sortBy)
        }
        else
        {
            // query=query.sort('name')
        }

        console.log('1')
        // //Pagination
        const page=parseInt(req.query.page,10)||1
        console.log('2')
        const limit=parseInt(req.query.limit,10)||10
        console.log('3')
        const startIndex=(page-1)*limit
        console.log('4')
        const endIndex=page*limit
        console.log('5')
        const total=await Appointment.countDocuments()
        console.log('6')
        query=query.skip(startIndex).limit(limit)
        console.log('7')
        // //Executing query

        const appointments=await query
      
        // if(appoint)

        //Pagination result
        const pagination={}

        if(endIndex<total){
            pagination.next={page:page+1,limit}
        }
        if(startIndex>0){
            pagination.prev={page:page-1,limit}
        }
        console.log("works")
        console.log(appointments.length)
        console.log(appointments)

    return res.status(200).json({success:true,count:appointments.length,pagination ,data:appointments})
    
} catch (error) {
    console.log("printing error")
        console.log(error)
        res.status(400).json({success:false,error})
    }

}

//@desc      Get single appointment
//@route     GET /api/v1/appointments/:id
//access     Private
exports.getAppointment=async(req,res,next)=>{
    try{
        const appointment=await Appointment.findById(req.params.id).populate("doctor","name -_id")
       
        if(!appointment){ return res.status(404).json({success:false})}
        res.status(200).json({success:true,data:appointment})
    }catch(error){
        res.status(400).json({success:false})
    }
}

//@desc      Get single appointment
//@route     GET /api/v1/appointments/:id
//access     Private
exports.getAppointmentByPaymentId=async(req,res,next)=>{
    try{
        
        const appointment=await Appointment.find({paymentId:req.params.id}).populate("doctor","name -_id").populate("hospital","name -_id")
        
        if(!appointment){ return res.status(404).json({success:false})}
        res.status(200).json({success:true,data:appointment})
    }catch(error){
        res.status(400).json({success:false})
    }
}

//@desc      Add  appointment
//@route     POST /api/v1/doctors
//access     
exports.addAppointment=async(req,res,next)=>{
   try {
    console.log(req.body.appointment)
    req.body.appointment.status="awaitingPayment"
    console.log(req.body.appointment.time)
    const appointment=await Appointment.create(req.body.appointment) //created appointment with staus=awaitingpayment 
    
           //sending email via NodeMailer
                


  


    const orderId=appointment._id
    console.log(`orderID:${orderId}`)
    const user=await User.findByIdAndUpdate(req.body.appointment.user,{$push: {order:orderId}})
    
    
    req.body.appointment=appointment
    console.log(3)
    // return res.redirect(`http://localhost:5000/api/v1/payment/${orderId}`)
    res.status(201).json({
        success:true,
        orderId:appointment._id

    })
   } catch (error) {
       console.log(error)
   }
}

//@desc      Update appointment
//@route     PUT /api/v1/appointments/:id
//access     Private
exports.updateAppointment=async(req,res,next)=>{
    try {
        const appointment=await Appointment.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:trues
        })
        if(!appointment){return res.status(404).json({success:false})}
        res.status(200).json({success:true,data:appointment})
    } catch (error) {
        res.status(400).json({success:false})
    }
}