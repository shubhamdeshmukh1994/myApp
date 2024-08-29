const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/userController.js");
const auth = require("../middlewares/authMiddleware.js");

// Admin routes for updating and deleting users
router.put("/update_user/:user_uid", auth("admin"), updateUser);
router.delete("/delete_user/:user_uid", auth("admin"), deleteUser);

module.exports = router;
