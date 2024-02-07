const FreeDoc = require('../models/FreeDoc')
const DocPhoto = require('../models/DocPhoto')

exports.getPhotos = async(req, res, next) => {
    try {
        const photos = await DocPhoto.find(req.query)
        res.status(200).json({ success: true, photos })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}


exports.addPhotos = async(req, res, next) => {
    try {

        const photo = await DocPhoto.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true,
            photo

        })
    } catch (error) {
        console.log(error)
    }
}

exports.getFreeDocs = async(req, res, next) => {
    try {
        const freeDocs = await FreeDoc.find(req.query)
        res.status(200).json({ success: true, data: freeDocs})

    } catch (error) {
        res.status(400).json({ success: false })
    }
}


exports.addFreeDocs = async(req, res, next) => {
    try {
        console.log('adding free doc')
        const freeDoc = await FreeDoc.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true,
            data:freeDoc

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            msg:error
        })
    }
}
