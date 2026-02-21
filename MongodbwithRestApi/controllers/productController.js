const Product = require("../models/Product");


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductBySKU = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (!product) return res.status(404).json({ message: "Not Found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { sku: req.params.sku },
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ sku: req.params.sku });
    res.json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};