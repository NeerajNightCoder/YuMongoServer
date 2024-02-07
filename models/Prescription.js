const mongoose = require('mongoose')
const shortid = require('shortid')
const PrescriptionSchema = mongoose.Schema({
    user: { type: String, required: true },
    docId:{type: String, required: true},
    presc: { type: String, required: true },
    date: { type: String, required: true }
})
module.exports = mongoose.model('Prescription', PrescriptionSchema)