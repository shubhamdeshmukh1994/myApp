const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController.js');

// Sign Up route (any user can access this route)
router.post('/signup', signUp);

// Sign In route (any user can access this route)
router.post('/signin', signIn);

module.exports = router;
