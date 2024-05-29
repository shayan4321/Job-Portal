const express = require('express');
const testController = require('../controllers/testController')

// router object
const router = express.Router();

// Routes
router.post('/test-post', testController.testPostController)


module.exports = router