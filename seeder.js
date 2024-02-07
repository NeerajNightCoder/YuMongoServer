const fs=require('fs')
const mongoose=require('mongoose')
const colors=require('colors')
const dotenv=require('dotenv')

//Load env vars
dotenv.config({path:'./config/config.env'})

//Load models
const Doctor=require('./models/Doctor')
const Hospital=require('./models/Hospital')
const User=require('./models/User')

//Connect to DB
mongoose.connect("mongodb+srv://Neerajistheboss:Neerajis%231@cluster0-m2lq9.mongodb.net/YuMedic?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})



//Read JSON files
const doctors=JSON.parse((fs.readFileSync(`${__dirname}/_data/Shreshtra Netra Chikitsalaya.json`,'utf-8')))
const hospitals=JSON.parse((fs.readFileSync(`${__dirname}/_data/hospitals.json`,'utf-8')))
const users=JSON.parse((fs.readFileSync(`${__dirname}/_data/users.json`,'utf-8')))




//Import into DB
const importDocData=async()=>{ 
    console.log("updating hospital doctors")
    try {
        await Doctor.create(doctors)
        console.log('Data imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }




    // try {
    //     doctors.map(async(doc)=>{
            
    //        try {
    //         const doctor=await Doctor.create({"name":"DR ARCHANA KUMARI","specailisation":"OBS AND GYNEC","normalFee":350,"hospital":"5f43f5a86e2fc1623cda5cf1","city":"dhanbad"})
    //         const hospital=await Hospital.findByIdAndUpdate("5f43f5a86e2fc1623cda5cf1",{$push:{doctors:{docId:doctor._id}}})
    //        } catch (error) {
    //            console.log(error)
    //        }
    //     })

    // } catch (error) {
    //     console.log(error)
    // }

    // await Promise.all(
    //     doctors.map(async(doctor)=>{
    //         try {
    //            const doc= await Doctor.create(doctor)
    //            console.log("updating hospital doctors")
    //         const hospital=await Hospital.findByIdAndUpdate(doctor.hospital,{$push:{doctors:{docId:doc._id,schedule:[{day:"MON"},{day:"TUE"}],seat:10}}})
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     })
    // )

    console.log('Data imported'.green.inverse)
    process.exit()

}

const importHosData=async()=>{ 
    try {
        await Hospital.create(hospitals)
        console.log('Data imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}

const importUserData=async()=>{ 
    try {
        await User.create(users)
        console.log('Data imported...'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}



//Delete data from DB
const deleteDocData=async()=>{ 
    try {
        await Doctor.deleteMany()
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}
const deleteHosData=async()=>{ 
    try {
        await Hospital.deleteMany()
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}
const deleteUserData=async()=>{ 
    try {
        await User.deleteMany()
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error)
    }
}


if(process.argv[2]==='-id')
{
    importDocData()
}
else if(process.argv[2]==='-dd')
{
    deleteDocData()
}
else if(process.argv[2]==='-ih')
{
    importHosData()
}
else if(process.argv[2]==='-dh')
{
    deleteHosData()
}
else if(process.argv[2]==='-iu')
{
    importUserData()
}
else if(process.argv[2]==='-du')
{
    deleteUserData()
}

