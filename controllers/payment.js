// const Appointment = require('../models/Appointment')
// const checksum_lib = require('../paytm/checksum/checksum')
// const Doctor = require('../models/Doctor')
// const _ = require('underscore')
// exports.makePayment = async(req, res, next) => {
//     try {
//         console.log(4)
//         let params = {}
//         params['MID'] = 'INDIRA00799552295623',
//             params['WEBSITE'] = 'WEBSTAGING',
//             params['CHANNEL_ID'] = 'WEB',
//             params['INDUSTRY_TYPE_ID'] = 'Retail',
//             params['ORDER_ID'] = req.params.id,
//             params['CUST_ID'] = 'CUST000002',
//             params['TXN_AMOUNT'] = '1',
//             params['CALLBACK_URL'] = `http://localhost:5000/api/v1/payment/${req.params.id}`,
//             params['EMAIL'] = 'xyz@gmail.com',
//             params['MOBILE_NO'] = "9876543254"


//         checksum_lib.genchecksum(params, 'bB@GB&P&phTXYsEL', function(err, checksum) {
//             let txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"
//             let form_fields = ""
//             for (x in params) {
//                 form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' />"
//             }

//             form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'> "

//             var html = '<html><body><center><h1>Please wait! Do not refresh Page</h1></center><form method="POST" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit()</script></body></html>'
//             res.writeHead(200, { 'Content-Type': 'text/html' })
//             res.write(html)
//             console.log("5")
//             res.end()
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ success: false })
//     }
// }

// exports.checkPayment = async(req, res, next) => {
//     try {
//         const { STATUS } = req.body
//         let result
//         console.log(STATUS+"status")
//         if (STATUS === "TXN_FAILURE") { 


       
         
//             return res.redirect('http://localhost:3000/fail')
//         }
      
      
//        else if (STATUS === "TXN_SUCCESS") {

            
                
//               //reserving the time slot
                
//                 let appointment=await Appointment.findById(req.params.id,'doctor dateTime')
//                 const docId=appointment.doctor
//                 const appointmentDS=appointment.dateTime
//                 const doctorDS=(await Doctor.findById(docId).select('ds -_id')).ds
//                 console.log(doctorDS)
//                 const appday=((new Date(appointmentDS.date)).getDay())
//                 const neededDSTImeSlot =doctorDS.filter((ds)=>{return (ds.day==appday)})[0].timeSlots.filter((timeslot)=>{
                  
//                                 return timeslot.time==appointmentDS.time})[0]
                
    
                
//               console.log(neededDSTImeSlot)
//                 if(neededDSTImeSlot.status ) //time slot is available , reserving it and changing status to confirm
//                 {
//                 //   const isDay=(day)=>{return day.day==appday}
//                 //   const isTime=(time)=>{return time.time==appointmentDS.time}
//                 //   console.log(neededDSTImeSlot.status)
//                 // const fi=_.findIndex(doctorDS,isDay)
//                 // const timeSlots=doctorDS[fi].timeSlots
//                 // const si=_.findIndex(timeSlots,isTime)
//                 // const url=`ds[${fi}].timeSlots[${si}].status`                                      //here url 
//                 //   const doctor=await Doctor.findByIdAndUpdate(docId,{$set: {url: false}},{runValidators:true,new:true})
//                   const doctor=await Doctor.findOneAndUpdate({
//                     "_id":docId,
//                     "ds":{"$elemMatch": {
//                        "day": appday,
//                        "timeSlots.time":appointmentDS.time
//                   }}
//                   },{  "$set":{
//                     "ds.$[outer].timeSlots.$[inner].status": false,
//                   }},{ "arrayFilters": [
//                     { "outer.day": appday },
//                     { "inner.time": appointmentDS.time }
//                 ] })
//                   console.log(docId + "appday" +appday +appointmentDS.time+"doc"+doctor)
//                   appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "confirmed" }, {
//                     new: true,
//                     runValidators: true
//                 })
//                 }






//                 // const appointment=await Appointment.findById(req.params.id,'doctor dateTime')
//                 // const docId=appointment.doctor
//                 // const appointmentDS=appointment.dateTime
//                 // const doctorDS=await Doctor.findById(docId).select('ds')
//                 // const neededDSTImeSlot =doctorDS.filter((ds)=>{return (ds.day==new Date(appointmentDS.date))}).timeSlots.filter((timeslot)=>{return timeslot.time==appointmentDS.time})
//                 // if(neededDSTImeSlot.status ) //time slot is available , reserving it 
//                 // {
//                 //   console.log(neededDSTImeSlot.status)
//                 // }
//                 //  appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "confirmed" }, {
//                 //     new: true,
//                 //     runValidators: true
//                 // })



//                 //sending email via NodeMailer
                


//   // create reusable transporter object using the default SMTP transport
//   // let transporter = NodeMailer.createTransport({
//   //   service: "gmail",
   
//   //   secure: false, // true for 465, false for other ports
//   //   auth: {
//   //     user: 'neerajvsryback@gmail.com' , // generated ethereal user
//   //     pass: 'johniscute', // generated ethereal password
//   //   },
//   // });


//   //     let info = await transporter.sendMail({
//   //       from: 'neerajvsryback@gmail.com', // sender address
//   //       to: "neerajistheboss@gmail.com", // list of receivers
//   //       subject: "Hello ✔", // Subject line
//   //       text: "Hello world?", // plain text body
//   //       html: `<div style="margin: 0; padding: 0;">
//   //       <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
//   //    <tr>
//   //     <td align="center"  style="padding: 15px 0 15px 0;
//   //     border-radius:0px;
//   //       height:100px;
//   //       background-image: linear-gradient(to right,#2AD3C3,#0DAD9D);">
//   //       <img src="yuMedic%20LogO%20%20white.png" alt="" width="300" height="100" style="display: block;" />
    
//   //     </td>
//   //    </tr>
//   //    <tr>
//   //      <td align="center"  style="padding: 10px 0 10px 0;">
//   //        <img src="2nd%20Header.png" alt="" width="400" height="150" style="display: block;" />
//   //      </td>
//   //    </tr>
//   //    <tr>
//   //     <td>
//   //     <b>  Respected Sir, </b>
//   //       <br />
//   //   <br/>
//   //    Your appointment with
//   //   <h4>
//   //    DR. SURAJ H. CHAVAN
//   //   <br/>
//   //   <br />
//   //    Patient Name
//   //    <br/>
//   //    Piyush Mussadi
//   //    <br/>
//   //    9431144286
//   //   <br/>
//   //     is confirmed!
//   //     </h4>
//   //    Appointment Date  -<b> 29th MAY / Friday </b>
//   //    <br />
//   //    <br />
//   //    Appointment id-<b> ASMY-021 </b>
//   //    <br />
//   //    <br />
//   //    Timings - <b>11:00  AM (+1 hr Subjected to Hospital Requirements Place ) </b>
//   //    <br />
//   //    <br />
//   //    Place -<b> Asarfi Hospital </b>
//   //   <br/>
//   //   <h4>
//   //    APPOINTMENT FEES  - PAID
//   //   <br/>
//   //   <br/>
//   //    Warm Regards,
//   //   <br/>
//   //    YuMedic
//   //   <br/>
//   //    (Previously
//   //    <br/>
//   //    THE HELLO DOCTOR ) </h4>
//   //     </td>
//   //    </tr>
//   //    <tr>
//   //     <td align="center" style="padding: 10px 0 10px 0;">
//   //       <a href="https://www.yumedic.com"><button style="
//   //           background:#4CD3C2;
//   //           display: inline-block;
//   //           border-radius: 10px;
//   //           color: #eeeeee;
//   //           text-align: center;
//   //           font-size: 30px;
//   //           padding: 10px;
//   //           width: 400px;
//   //           border-width: 0px;s
//   //           -webkit-transition: all 0.5s;
//   //           -moz-transition: all 0.5s;
//   //           -o-transition: all 0.5s;
//   //           transition: all 0.5s;
//   //           cursor: pointer;
//   //           margin: 5px;" type="button" name="button">Book Another Appointment</button></a>
//   //     </td>
//   //    </tr>
//   //   </table>
    
//   //     </div>`, 
//   //     });


//                 if (!appointment) { return res.status(404).json({ success: false }) }
//                 return res.redirect('http://localhost:3000/success')
//             }} catch (error) {
//                 res.status(400).json({ success: false })
//             }



//           }



const app = require('express')()
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const Appointment =require('../models/Appointment')
const Doctor=require('../models/Doctor')
const Hospital=require('../models/Hospital')
var nodemailer=require("nodemailer")
const moment=require('moment')
const User = require('../models/User')

// app.use(cors())
app.use(bodyParser.json())




const razorpay = new Razorpay({
	key_id: 'rzp_live_A8fHsK5kq7rgBv',
	key_secret: 'nah0raOWsLB1tViVYB0inZdE'
})


//make payment
exports.makePayment= async (req, res) => {    
	try {
		console.log(`req.body ${JSON.stringify(req.body)}`)

	const payment_capture = 1
		                      //get the docId from the req.body and get that doctors fee here
	
	
	
	const doctor = await Doctor.findById(req.body.doctor,'normalFee hospital')  
	
	 console.log('1')
	req.body.hospital=doctor.hospital															     //setting hospital in req.body
	console.log('1')

	const amount =doctor.normalFee+25
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	

	
		const response = await razorpay.orders.create(options)
		console.log(response.id)
		req.body.paymentId=response.id         //adding payment id to req.body  but actually this is the order id
		//get the appointmnet details from the req.body and create appointment with payment id in it
		 const appointment=await Appointment.create(req.body)
		
												res.json({
			id: response.id,                    //this is the payment id
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
	
}






//verify payment
exports.checkPayment=async(req, res) => {  //this is coming from razorpay after payment is submitted to razorpay
	try {
		console.log("verification")			
	// do a validation
	const secret = '1234567890'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		//payment done , change appointmnet status to confirm , find appointment where paymentId = req.body
		//also update the payment id field	
		razorpayOrderId=req.body.payload.payment.entity.order_id
		
		
		
		
		//               //reserving the time slot
                
		let appointment=await Appointment.findOne({paymentId:razorpayOrderId})
                const docId=appointment.doctor
                const appointmentDS=appointment.dateTime
                const doctorDS=(await Doctor.findById(docId).select('ds -_id')).ds
                console.log(doctorDS)
				const appday=((new Date(appointmentDS.date)).getDay())
				console.log(`appday ${appday}`)
                const neededDSTImeSlot =doctorDS.filter((ds)=>{return (ds.day==appday)})[0].timeSlots.filter((timeslot)=>{
                  
                                return timeslot.time==appointmentDS.time})[0]
                
    
                
              console.log(neededDSTImeSlot)
                if(neededDSTImeSlot.status ) //time slot is available , reserving it and changing status to confirm
                {
					


            //     //   const isDay=(day)=>{return day.day==appday}
            //     //   const isTime=(time)=>{return time.time==appointmentDS.time}
            //     //   console.log(neededDSTImeSlot.status)
            //     // const fi=_.findIndex(doctorDS,isDay)
            //     // const timeSlots=doctorDS[fi].timeSlots
            //     // const si=_.findIndex(timeSlots,isTime)
            //     // const url=`ds[${fi}].timeSlots[${si}].status`                                      //here url 
            //     //   const doctor=await Doctor.findByIdAndUpdate(docId,{$set: {url: false}},{runValidators:true,new:true})
                  const doctor=await Doctor.findOneAndUpdate({
                    "_id":docId,
                    "ds":{"$elemMatch": {
                       "day": appday,
                       "timeSlots.time":appointmentDS.time
                  }}
                  },{  "$set":{
                    "ds.$[outer].timeSlots.$[inner].status": false,
                  }},{ "arrayFilters": [
                    { "outer.day": appday },
                    { "inner.time": appointmentDS.time }
                ] })
                //   console.log(docId + "appday" +appday +appointmentDS.time+"doc"+doctor)
                //   appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: "confirmed" }, {
                //     new: true,
                //     runValidators: true
				// })
				

				console.log(JSON.stringify( req.body))
		 appointment=await Appointment.findOneAndUpdate({paymentId:razorpayOrderId},{status:"confirmed"})


		 // create reusable transporter object using the default SMTP transport

  var transporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
          user:"yumedicbookings@gmail.com",
          pass:"yumedic@2002"
      }
  })

  const hospital=await Hospital.findById(appointment.hospital)
  const user=await User.findById(appointment.user)

      let info = await transporter.sendMail({
        from: '"YuMedic" <yumedicbookings@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Bookin Confirmed ✔", // Subject line
        text: "Booking Confirmed", // plain text body
        html: `<div style="margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
     <tr>
      <td align="center"  style="padding: 15px 0 15px 0;
      border-radius:0px;
        height:100px;
        background-image: linear-gradient(to right,#2AD3C3,#0DAD9D);">
        <img src="https://i.ibb.co/Gv6HsZC/yu-Medic-Log-O-white.png" alt="" width="300" height="100" style="display: block;" />
    
      </td>
     </tr>
     <tr>
       <td align="center"  style="padding: 10px 0 10px 0;">
         <img src="https://i.ibb.co/n8GGbvD/2nd-Header.png" alt="" width="400" height="150" style="display: block;" />
       </td>
     </tr>
     <tr>
      <td>
      <b>  Respected Sir, </b>
        <br />
    <br/>
     Your appointment with
    <h4>
    ${doctor.name}
    <br/>
    <br />
     Patient Name
     <br/>
     ${appointment.patientName}
     <br/>
    
    <br/>
      <b>is confirmed!</b>
      </h4>
     Appointment Date  -<b> ${moment(appointment.dateTime.date,"YYYY/MM/DD").format("dddd Do MMMM YYYY")}  </b>
     <br />
     <br />
     Appointment id-<b> ${appointment.shortid} </b>
     <br />
     <br />
     Timings - <b>${appointment.dateTime.time} (+1 hr Subjected to Hospital Requirements Place ) </b>
     <br />
     <br />
     Place -<b> ${hospital.name} </b>
    <br/>
    <h4>
     APPOINTMENT FEES  - PAID
    <br/>
    <br/>
     Warm Regards,
    <br/>
     YuMedic
    <br/>
     (Previously
     <br/>
     THE HELLO DOCTOR ) </h4>
      </td>
     </tr>
     <tr>
      <td align="center" style="padding: 10px 0 10px 0;">
        <a href="https://www.yumedic.com"><button style="
            background:#4CD3C2;
            display: inline-block;
            border-radius: 10px;
            border: 4px double #cccccc;
            color: #eeeeee;
            text-align: center;
            font-size: 28px;
            padding: 10px;
            width: 400px;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            -o-transition: all 0.5s;
            transition: all 0.5s;
            cursor: pointer;
            margin: 5px;" type="button" name="button">Book Another Appointment</button></a>
      </td>
     </tr>
    </table>
    
      </div>`, 
      });

      transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }else
        {
            console.log(`Email sent successfully: ${info.response}`)
        }
    })
		 
                }

	} else {
		// pass it
	}
	res.json({ status: 'ok'})
	} catch (error) {
		console.log(error)
	}
}