const mongoose=require('mongoose')
const shortid=require('shortid')

const AppointmentSchema=mongoose.Schema({
    shortid:{type:String,default:shortid.generate},
    user:{type:mongoose.Schema.ObjectId,ref:'User'},
    patientName:String,  
    patientAge:String,
    patientAdress:String,
    phone:String,
    doctor:{type:mongoose.Schema.ObjectId,ref:'Doctor',required:true},
    hospital:{type:mongoose.Schema.ObjectId,ref:'Hospital',required:true},
    cost:Number,
    dateTime:{date:String,time:String},
    time:Date,
    paymentId:{type:String,required:true},
    status:{type:String,enum:["confirmed","cancelled","awaitingPayment"],default:"awaitingPayment"},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Appointment',AppointmentSchema)