// const Hospital = require('../models/Hospital')
import Hospital from '../models/Hostipal.js'

//@desc     GET all hospitals
//@route    GET /api/v1/hospitals
//@access   Public
export const getHospitals = async (req, res, next) => {
	try {
		const hospitals = await Hospital.find()
		res.status(200).json({ success: true, count: hospitals.length, data: hospitals })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     GET single hospital
//@route    GET /api/v1/hospitals/:id
//@access   Public
export async function getHospital  (req, res, next) {
	try {
		const hospital = await Hospital.findById(req.params.id)

		if (!hospital) {
			return res.status(400).json({ success: false })
		}

		res.status(200).json({ success: true, data: hospital })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     Create all hospitals
//@route    POST /api/v1/hospitals
//@access   Private
export async function createHospital  (req, res, next) {
	const hospital = await Hospital.create(req.body)
	res.status(201).json({
		success: true,
		data: hospital
	})
}

//@desc     Update hospitals
//@route    PUT /api/v1/hospitals/:id
//@access   Private
export async function updateHospital  (req, res, next)  {
	try {
		const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!hospital) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true, data: hospital })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

//@desc     Delete all hospitals
//@route    DELETE /api/v1/hospitals/:id
//@access   Private
export async function deleteHospital  (req, res, next){
	try {
		const hospital = await Hospital.findByIdAndDelete(req.params.id)

		if (!hospital) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true, data: {} })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}