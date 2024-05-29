const express = require('express');
const authController = require('../controllers/authController');

// Router Object
const router = express.Router();

// Routes
router.post('/register', authController.registerController)

module.exports = router