const mongoose = require("mongoose")
const shorid = require("shortid")

const DocSpecialitySchema = mongoose.Schema({
    speciality: String,
    docId: String,
    shopId: String
})

module.exports = mongoose.model("DocSpeciality",DocSpecialitySchema)