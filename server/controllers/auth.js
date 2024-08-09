// const User = require('../models/User')
import User from '../models/User.js'

//@desc    Register user
//@route   POST /auth/register
//@access  Public
export async function register (req, res, next) {
	try {
		const { name, email, password, role } = req.body

		//Create user
		const user = await User.create({
			name,
			email,
			password,
			role
		})

		sendTokenResponse(user, 200, res)
	} catch (err) {
		res.status(400).json(err.message)
		console.log(err.stack)
	}
}

//@desc		Login user
//@route	POST /auth/login
//@access	Public
export async function login (req, res, next) {
	const { email, password } = req.body

	//Validate email & password
	if (!email || !password) {
		return res.status(400).json({ success: false, msg: 'Please provide an email and password' })
	}

	//Check for user
	const user = await User.findOne({ email }).select('+password')
	console.log(user)
	if (!user) {
		return res.status(400).json({ success: false, msg: 'Invalid credentials' })
	}

	//Check if password matches
	const isMatch = await user.matchPassword(password)

	if (!isMatch) {
		return res.status(401).json({ success: false, msg: 'Invalid credentials' })
	}

	sendTokenResponse(user, 200, res)
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	//Create token
	const token = user.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}
	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token
	})
}

//@desc		Get current Logged in user
//@route 	POST /auth/me
//@access	Private
export async function getMe(req, res, next) {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  }
  

//@desc		Log user out / clear cookie
//@route 	GET /auth/logout
//@access	Private
export async function logout(req, res, next) {
	res.cookie('token','none', {
		expires: new Date(Date.now() + 10*1000),
		httpOnly: true
	})

	res.status(200).json({
		success: true,
		data:{}
	})
}

//@desc		Get All user
//@route 	POST /auth/user
//@access	Private
// exports.getAll = async (req, res, next) => {
// 	const user = await User.find()
// 	res.status(200).json({
// 		success: true,
// 		data: user
// 	})
// }
export async function getAll(req, res, next) {
  const user = await User.find();
  res.status(200).json({ success: true, data: user });
}
