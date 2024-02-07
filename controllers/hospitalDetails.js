const HospitalPhoto = require('../models/HospitalPhoto')

exports.getPhotos = async(req, res, next) => {
    try {
        const photos = await HospitalPhoto.find(req.query)
        res.status(200).json({ success: true, photos })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}


exports.addPhotos = async(req, res, next) => {
    try {

        const photo = await HospitalPhoto.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true,
            photo

        })
    } catch (error) {
        console.log(error)
    }
}

