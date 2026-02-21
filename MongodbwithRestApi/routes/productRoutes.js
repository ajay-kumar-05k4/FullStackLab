const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:sku", productController.getProductBySKU);
router.post("/", productController.createProduct);
router.put("/:sku", productController.updateProduct);
router.delete("/:sku", productController.deleteProduct);

module.exports = router;