const DocSpeciality = require('../models/DocSpeciality')


exports.getSpeciality = async(req, res, next) => {
    try {
        const docSpeciality = await PDocSpecialityost.find(req.query)
        res.status(200).json({ success: true, data: posts })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}


exports.addDocsInSpeciality = async(req, res, next) => {
    try {

        const docSpeciality = await DocSpeciality.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true,
            data:docSpeciality

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getDocsInSpeciality = async(req, res, next) => {
    try {
        const docSpeciality = await DocSpeciality.find(req.query)
        res.status(200).json({ success: true, data: docSpeciality })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}
