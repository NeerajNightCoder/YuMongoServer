const Message = require('../models/Message')
exports.addMessage = async(req, res, next) => {
    try {

        const message = await Message.create(req.body) //created appointment with staus=awaitingpayment 
        res.status(201).json({
            success: true

        })
    } catch (error) {
        console.log(error)
    }
}


exports.getMessage = async(req, res, next) => {
    try {
        const messages = await OnBoard.find(req.query)
        res.status(200).json({ success: true, data: messages })

    } catch (error) {
        res.status(400).json({ success: false })
    }
}