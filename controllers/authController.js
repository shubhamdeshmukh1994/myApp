const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  validateSignUpRequest,
  validateSignInRequest,
} = require("./validation.services/auth.validation");
const { sendResponse } = require("./response.services/response.service");
dotenv.config();

exports.signUp = async (req, res) => {
  const requestData = req.body;
  try {
    const {
      user_name: userName,
      email,
      password,
      is_admin: isAdmin,
      phone,
    } = validateSignUpRequest({ requestData });

    const existingUser = await User.findByEmail(email);
    if (existingUser)
      return sendResponse({
        res,
        statusCode: 400,
        message: "User already exists.",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(
      userName,
      email,
      hashedPassword,
      isAdmin,
      phone
    );
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return sendResponse({
      res,
      message: "User created successfully",
      data: { token, userId },
    });
  } catch (error) {
    console.error(error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};

exports.signIn = async (req, res) => {
  const requestData = req.body;
  try {
    const { email, password } = validateSignInRequest({ requestData });
    const user = await User.findByEmail(email);
    if (!user)
      return sendResponse({
        res,
        statusCode: 400,
        message: "Invalid email or password.",
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return sendResponse({
        res,
        statusCode: 400,
        message: "Invalid email or password.",
      });
    const token = jwt.sign(
      { user_uid: user.user_uid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return sendResponse({
      res,
      message: "User logged in successfully",
      data: { token, user_uid: user.user_uid },
    });
  } catch (error) {
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};
