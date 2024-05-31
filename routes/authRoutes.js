const express = require('express');
const authController = require('../controllers/authController');

// Router Object
const router = express.Router();

// =========================== Routes ============================

// 1) Register User
router.post('/register', authController.registerController)

// 2) Login User
router.post('/login', authController.loginController)

module.exports = router