const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const {
    product_name: productName,
    description,
    img_url: imgUrl,
    price,
  } = req.body;
  const createdBy = req.user.user_uid;
  try {
    const product_uid = await Product.create({
      productName,
      description,
      imgUrl,
      price,
      createdBy,
    });
    res
      .status(201)
      .json({ message: "Product created successfully", product_uid });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVisibleProducts = async (req, res) => {
    try {
        const products = await Product.findAllVisible();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { product_uid: productId } = req.params;
    const updates = req.body;
    try {
        const userId = req.user.user_uid;
        const affectedRows = await Product.update(productId, updates, userId);
        if (affectedRows === 0) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.log("error while update product", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { product_uid: productId } = req.params;
        const affectedRows = await Product.deleteProduct(productId);
        if (affectedRows === 0) return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.log("error while deleting product", error);
        res.status(500).json({ message: 'Server error' });
    }
};
