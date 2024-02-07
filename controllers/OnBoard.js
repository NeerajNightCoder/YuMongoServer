const OnBoard = require('../models/OnBoard')
exports.addOnBoard = async(req, res, next) => {
    try {

        const onBoard = await OnBoard.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getOnBoard = async(req, res, next) => {
    try {
        const onBoards = await OnBoard.find(req.query)
        res.status(200).json({ success: true, data: onBoards })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}