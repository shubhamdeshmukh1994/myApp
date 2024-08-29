const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

const auth = (role) => async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ userId: decoded?.user_uid });

    if (!user) return res.status(401).json({ message: "Invalid token." });
   
    if (role === "admin" && !user.is_admin) {
      return res
        .status(403)
        .json({ message: "Forbidden. Insufficient permissions." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("failed to Authenticate", error);
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = auth;
