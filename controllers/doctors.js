const Doctor = require('../models/Doctor')
const Hospital = require('../models/Hospital')
    //@desc      Get all doctors
    //@route     GET /api/v1/doctors
    //access     Public
exports.getDoctors = async(req, res, next) => {
    try {
        console.log("here")
        let query
        const reqQuery = {...req.query }
        console.log(req.query.specailisation)
        console.log(decodeURI(req.query.specailisation))

        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit']

        //Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param])

        let queryStr = JSON.stringify(reqQuery)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        //Finding resource
        query = Doctor.find(JSON.parse(queryStr), { ds: 0 })

        //Select fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)


        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort({ sortBy: "desc" })
        } else {
            query = query.sort('name')
        }

        //Pagination
        const page = parseInt(req.query.page, 10) || 1
        console.log(page)
        const limit = parseInt(req.query.limit, 10) || 100
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const total = await Doctor.countDocuments()
        query = query.skip(startIndex).limit(10000)

        //Executing query
        const doctors = await query.populate('hospital', 'name')

        //Pagination result
        const pagination = {}

        if (endIndex < total) {
            pagination.next = { page: page + 1, limit }
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit }
        }

        res.status(200).json({ success: true, count: doctors.length, pagination, data: doctors })
    } catch (error) {
        res.status(400).json({ success: false })
    }

}

//@desc      Get single doctor
//@route     GET /api/v1/doctors/:id
//access     Public
exports.getDoctor = async(req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        if (!doctor) { return res.status(404).json({ success: false }) }
        res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}


exports.getDocNames = async(req, res, next) => {
    try {
        const doctor = await Doctor.find().select("name")
        if (!doctor) { return res.status(404).json({ success: false }) }
        res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

//@desc      Add  doctor
//@route     POST /api/v1/doctors
//access     
exports.addDoctor = async(req, res, next) => {

    try {
        const doctor = await Doctor.create(req.body)
        const hospital = await Hospital.findByIdAndUpdate(req.body.hospital, { $push: { doctors: { docId: doctor._id } } })
        res.status(201).json({
            success: true,
            data: doctor
        })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

//@desc      Update doctor
//@route     PUT /api/v1/doctors/:id
//access     Private
exports.updateDoctor = async(req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!doctor) { return res.status(404).json({ success: false }) }


        res.status(200).json({ success: true, data: doctor })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

//@desc      Remove  doctor
//@route     DELETE /api/v1/doctors/:id
//access     Private
exports.deleteDoctor = async(req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id)
        if (!doctor) { return res.status(404).json({ success: false }) }
        res.status(400).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}