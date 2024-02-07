const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const bodyparser = require('body-parser')
const upload = require('express-fileupload')
    //Load env vars
dotenv.config({ path: './config/config.env' })



//Route files
const doctors = require('./routes/doctors.js')
const hospitals = require('./routes/hospitals.js')
const users = require('./routes/users.js')
const userDetails = require('./routes/userDetails')
const hospitalDetails = require('./routes/hospitalDetails')
const appointments = require('./routes/appointments.js')
const videocalls=require('./routes/videocalls.js')
const prescriptions=require('./routes/prescriptions.js')
const docAuths=require('./routes/docAuths.js')
const auth = require('./routes/auth.js')
const payment = require('./routes/payment')
const onBoard = require('./routes/onBoard')
const message = require('./routes/message')
const yufacts = require('./routes/yufacts')
const docSpeciality = require('./routes/docSpeciality')    //speciality doctorId and shopId
const docDetails =require('./routes/docDetails')    //speciality doctorId and shopId
const couponCodes=require('./routes/couponCodes')
const couponCodesBookings=require('./routes/couponCodesBookings')
var cors = require('cors')

//Connect to database
connectDB()

const app = express()

//cors
app.use(cors())


// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Body Parser
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(upload())

// Function to serve all static files
// inside public directory.
app.use(express.static('prescriptions'));  
app.use('/images', express.static('images')); 

console.log("request made")

//Mount routers
app.use('/api/v1/doctors', doctors)
app.use('/api/v1/hospitals', hospitals)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/userDetails', userDetails)
app.use('/api/v1/hospitalDetails', hospitalDetails)
app.use('/api/v1/appointments', appointments)
app.use('/api/v1/videocalls', videocalls)
app.use('/api/v1/prescription', prescriptions)
app.use('/api/v1/docAuth', docAuths)
app.use('/api/v1/payment', payment)
app.use('/api/v1/onBoard', onBoard)
app.use('/api/v1/messages', message)
app.use('/api/v1/yufacts', yufacts)
app.use('/api/v1/speciality',docSpeciality)
app.use('/api/v1/docDetails',docDetails)
app.use('/api/v1/couponCodes',couponCodes)
app.use('/api/v1/couponCodesBookings',couponCodesBookings)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ip ${process.env.IP} on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error:${err.message}`.red)
        //close and exit process
    server.close(() => process.exit(1))
})