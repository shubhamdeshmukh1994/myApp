const Product = require("../models/product");
const {
  validateProductReq,
  validateUpdateProduct,
} = require("./validation.services/product.validation");
const { sendResponse } = require("./response.services/response.service");

exports.createProduct = async (req, res) => {
  const requestData = req.body;
  const createdBy = req.user.user_uid;
  try {
    const {
      product_name: productName,
      description,
      img_url: imgUrl,
      price,
    } = validateProductReq({ requestData });
    const existingProduct = await Product.findProduct({
      productName,
      price,
    });
    if (existingProduct)
      return sendResponse({
        res,
        statusCode: 400,
        message: "Product already exists.",
      });
    const product_uid = await Product.create({
      productName,
      description,
      imgUrl,
      price,
      createdBy,
    });
    return sendResponse({
        res,
        statusCode: 201,
        message: "Product created successfully",
        data: {product_uid}
      });
  } catch (error) {
    console.log("error while create product", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};

exports.getVisibleProducts = async (req, res) => {
  try {
    const products = await Product.findAllVisible();
    return sendResponse({
      res,
      data: products,
    });
  } catch (error) {
    console.log("error while get product", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { product_uid: productId } = req.params;
  const updates = req.body;
  try {
    const requestData = req.body;
    requestData.product_uid = productId;
    console.log("productId", productId);
    validateUpdateProduct({ requestData });
    const userId = req.user.user_uid;
    const affectedRows = await Product.update(productId, updates, userId);
    if (affectedRows === 0)
      return sendResponse({
        res,
        statusCode: 404,
        message: "Product not found",
      });
    return sendResponse({
      res,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("error while update product", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product_uid: productId } = req.params;
    const affectedRows = await Product.deleteProduct(productId);
    if (affectedRows === 0)
      return sendResponse({
        res,
        statusCode: 404,
        message: "Product not found",
      });

    return sendResponse({
      res,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("error while deleting product", error);
    return sendResponse({
      res,
      statusCode: 500,
      message: `Server error : ${error.message}`,
    });
  }
};
