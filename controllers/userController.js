const User = require("../models/user");
const { validateUpdateUser } = require("./validation.services/user.validation");
const { sendResponse } = require("./response.services/response.service");

exports.updateUser = async (req, res) => {
  const { user_uid: userId } = req.params;
  const updates = req.body;
  try {
    const requestData = req.body;
    requestData.user_uid = userId;
    validateUpdateUser({ requestData });
    const affectedRows = await User.updateUser(userId, updates);
    if (affectedRows === 0)
      return sendResponse({
        res,
        statusCode: 404,
        message: "User not found",
      });
    return sendResponse({
      res,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("error while updated user", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { user_uid: userId } = req.params;
  try {
    const affectedRows = await User.deleteUser(userId);
    if (affectedRows === 0)
      return sendResponse({
        res,
        statusCode: 404,
        message: "User not found",
      });

    return sendResponse({
      res,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("error while delete user", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};
