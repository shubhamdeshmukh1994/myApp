const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const { sendResponse } = require("./response.service");
dotenv.config();

/**
 * Authenticate users with jwt tokens
 * @param {object} req - request data
 * @param {object} res - response object
 * @param {object} next - next middleware
 * @returns error in required data missing
 */

const auth = (role) => async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token)
    return sendResponse({
      res,
      statusCode: 401,
      message: "Access denied. No token provided..",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ userId: decoded?.user_uid });
    if (!user)
      return sendResponse({
        res,
        statusCode: 401,
        message: "Invalid token.",
      });
    if (role === "admin" && !user.is_admin) {
      return sendResponse({
        res,
        statusCode: 401,
        message: "Forbidden. Insufficient permissions.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("failed to Authenticate", error);
    return sendResponse({
      res,
      statusCode: 400,
      message: "Invalid token.",
    });
  }
};

module.exports = auth;
