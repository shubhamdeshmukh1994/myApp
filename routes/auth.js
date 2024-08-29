const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController.js');

// Sign Up route
router.post('/signup', signUp);

// Sign In route
router.post('/signin', signIn);

module.exports = router;
