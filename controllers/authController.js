const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  validateSignUpRequest,
  validateSignInRequest
} = require("./validation.services/auth.request.validation");
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
      return res.status(400).json({ message: "User already exists." });

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
    res.status(201).json({ token, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Server error : ${error.message}`,
    });
  }
};

exports.signIn = async (req, res) => {
const requestData = req.body;
  try {
    const { email, password } = validateSignInRequest({requestData});
    const user = await User.findByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { user_uid: user.user_uid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user_uid: user.user_uid });
  } catch (error) {
    res.status(500).json({  message: `Server error : ${error.message}`, });
  }
};
