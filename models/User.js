const mongoose=require('mongoose')
const shortid=require('shortid')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
// const referralCodeGenerator=require('referral-code-generator')
const referralCodes=require('referral-codes')
const UserSchema=mongoose.Schema({
    shortid:{type:String,default:shortid.generate},
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String},
    gid:String,
    role:{type:String,enum:["user","manager"],default:'user'},
    code:String,
    password:{type:String,select:false,default:"Neerajis#1"},
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    order:{type:[String]},
    addedAt:{type:Date,default:Date.now},
    referral:{code:{type:String,default:referralCodes.generate({length:6,count:1})[0]},count:{type:Number,default:0}}
})

//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

//Sign JWT and return
UserSchema.methods.getSignedJwtToken=function () {
    return jwt.sign({id:this._id},"nuepearsanja12321ajnasraepeun",{
        expiresIn:"1d"
    })
  }

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword=async function(enteredPassword){
   
    const result=await bcrypt.compare(enteredPassword,this.password)
  
    return result
}

module.exports=mongoose.model('User',UserSchema)


















//user model
// const mongoose = require('mongoose');
// const shortid = require('shortid');
// const UserSchema = new mongoose.Schema({
//         shortid:{
//             type:String,
//             default:shortid.generate
//         },
//         method: {
//             type:String,
//             enum: ['local','google','facebook'],
//             required:true
//         },
//         local: {
//             name:{
//                 type:String,
               
//             },
//             email:{
//                 type:String,

//             },
//             password:{
//                 type:String,
//                 min:6
//             }
//         },
//         google: {
            
//             id: {  //ID that is there is google account profile
//                 type: String
//             },
//             name:{
//                 type:String,
//             },
//             email: {
//                 type: String,
//                 lowercase:true
//             }
//         },
//         facebook: {
//             id: {
//                 type: String
//             },
//             name:{
//                 type:String,
              
//             },
//             email: {
//                 type: String,
//                 lowercase:true
//             }
//         },
//         phone:{
//             type:String,
//             unique:true
//         },
//         role:{
//             type:String,
//             enum:["user","manager"],
//             default:'user'
//         },
//         code:String,
//         // password:{
//         //     type:String,
//         //     required:true,
//         //    // select:false,
//         //     min:6
//         // },
//         resetPasswordToken:String,
//         resetPasswordExpire:Date,
//         order:{
//             type:[String],
//             default:["123"]
//         },
//         addedAt:{
//             type:Date,
//             default:Date.now
//         }
// });


// // //Match user entered password to hashed password in database
// UserSchema.methods.matchPassword=async function(enteredPassword){
   
//     const result=await bcrypt.compare(enteredPassword,this.password)
  
//     return result
// }


// module.exports=mongoose.model('User',UserSchema);































// const mongoose=require('mongoose')
// const shortid=require('shortid')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')


//     const UserSchema = new mongoose.Schema({
//         shortid:{
//             type:String,
//             default:shortid.generate
//         },
//         method: {
//             type:String,
//             enum: ['local','google','facebook'],
//             required:true
//         },
//         local: {
//             name:{
//                 type:String,
               
//             },
//             email:{
//                 type:String,
    
//             },
//             password:{
//                 type:String,
//                 min:6
//             }
//         },
//         google: {
            
//             id: {  //ID that is there is google account profile
//                 type: String
//             },
//             name:{
//                 type:String,
//             },
//             email: {
//                 type: String,
//                 lowercase:true
//             }
//         },
//         facebook: {
//             id: {
//                 type: String
//             },
//             name:{
//                 type:String,
              
//             },
//             email: {
//                 type: String,
//                 lowercase:true
//             }
//         },
//         phone:{
//             type:String,
//             unique:true
//         },
//         role:{
//             type:String,
//             enum:["user","manager"],
//             default:'user'
//         },
//         code:String,
//         // password:{
//         //     type:String,
//         //     required:true,
//         //    // select:false,
//         //     min:6
//         // },
//         resetPasswordToken:String,
//         resetPasswordExpire:Date,
//         order:{
//             type:[String],
//             default:["123"]
//         },
//         addedAt:{
//             type:Date,
//             default:Date.now
//         }
//     });
    

// //Encrypt password using bcrypt
// UserSchema.pre('save',async function(next){
//     const salt=await bcrypt.genSalt(10)
//     this.password=await bcrypt.hash(this.password,salt)
// })

// //Sign JWT and return
// UserSchema.methods.getSignedJwtToken=function () {
//     return jwt.sign({id:this._id},"nuepearsanja12321ajnasraepeun",{
//         expiresIn:"1d"
//     })
//   }

// //Match user entered password to hashed password in database
// UserSchema.methods.matchPassword=async function(enteredPassword){
   
//     const result=await bcrypt.compare(enteredPassword,this.password)
  
//     return result
// }

// module.exports=mongoose.model('User',UserSchema)