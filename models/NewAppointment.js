const mongoose=require('mongoose')

const AppointmentSchema=mongoose.Schema({
    patientName:{type:String,required:true},
    phone:{type:String,required:true},
    userId:{type:String,required:true},
    docID:{type:String,required:true},
    docName:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('NewAppointment',AppointmentSchema)