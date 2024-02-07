const Prescription = require('../models/Prescription')
const moment = require('moment')
exports.getPrescription = async(req, res, next) => {
    try {
        const prescription = await Prescription.find({ user: req.params.id,date:moment().format('YYYY-MM-DD') }).select("-_id -user -__v")
        if (!prescription) { return res.status(404).json({ success: false }) }
        res.status(200).json({ success: true, data: prescription })
    } catch (error) {
        res.status(404).json({ success: false })
    }
}


exports.addPrescription = async(req, res, next) => {
    console.log("req.files")
    console.log(req.files)
    try {
        //save the image ,create the imagename and save the user,imagename in the database
        if (req.files) console.log("file uploaded")
        const file = req.files.image
        const index = file.name.lastIndexOf('.')
        const ext = file.name.slice(index)
        const date = moment().format('YYYYMMDD_HHmmss')
        console.log(date)
        const dateToSave = moment().format('YYYY-MM-DD')
        const filename = req.body.user+'_' + date +'_'+ ext
        console.log(filename)

        file.mv('./prescriptions/' + filename, async function(err) {
            if (err) {
                return res.send(err)
                console.log(err)
            } else {
                const prescription = await Prescription.create({ user: req.body.user,docId:req.body.docId, presc: filename, date: dateToSave })
                if (!prescription) return (res.status(404).json({ success: false }))
                res.status(201).json({ success: true, data: prescription })


            }
        })
        console.log("file moved")

        // console.log(req.body)


    } catch (err) {
        res.status(404).json({ success: false })
    }
}