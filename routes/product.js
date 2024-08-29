const express = require("express");
const router = express.Router();
const {
  createProduct,
  getVisibleProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const auth = require("../middlewares/authMiddleware.js");

// Routes for product operations
//(route, auth middleware(role), calling function) 
router.post("/", auth("user"), createProduct); 
router.get("/get_products",auth("user"), getVisibleProducts);
router.put("/:product_uid", auth("admin"), updateProduct);
router.delete("/:product_uid", auth("admin"), deleteProduct);

module.exports = router;
