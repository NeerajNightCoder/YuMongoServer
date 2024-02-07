const mongoose=require('mongoose')
const shortid=require('shortid')

const HospitalSchema=mongoose.Schema({
    shortid:{type:String,default:shortid.generate},
    name:String,
    photo:String,
    location:String,
    doctors:[{_id:false,
        docId:{type:mongoose.Schema.ObjectId,ref:'Doctor'},
        schedule:{
            _id:false,
            type:[{
                day:{type:String,enum:["MON","TUE","WED","THU","FRI","SAT","SUN"]},
                hourFrom:{type:Date,default:Date.now},
                hourTill:{type:Date,default:Date.now}
            }]
        },
        seat:Number,
        dayUnavl:{from:Date,till:Date}
    }],
    city:{type:String,index:true},
    mr:{type:mongoose.Schema.ObjectId,ref:"User"},
    addedAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Hospital",HospitalSchema )