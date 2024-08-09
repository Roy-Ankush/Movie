// const express = require('express')
// const { register, login, getMe, getAll, logout } = require('../controllers/auth')

// const router = express.Router()

// const { protect } = require('../middleware/auth')

import express from 'express';
import { register, login, getMe, logout} from '../controllers/auth.js';
import { getAll } from '../controllers/auth.js';  // Assuming the correct path

import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.get('/logout', logout)
router.get('/user', protect, getAll)

// module.exports = router
export default router;
