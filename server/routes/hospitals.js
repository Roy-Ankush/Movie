// const express = require('express')
// const { getHospitals, getHospital, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals')
// const router = express.Router()

// const { protect, authorize } = require('../middleware/auth')

import express from 'express';
import {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
} from '../controllers/hospitals.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getHospitals)
  .post(protect, authorize('admin'), createHospital);

router.route('/:id')
  .get(getHospital)
  .put(protect, authorize('admin'), updateHospital)
  .delete(protect, authorize('admin'), deleteHospital);

export default router;

