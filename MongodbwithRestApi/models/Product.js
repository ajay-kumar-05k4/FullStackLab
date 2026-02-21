const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: String,
  ratingValue: Number,
  comment: String,
  reviewDate: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  sku: { type: String, unique: true },
  price: Number,
  discount: Number,
  features: [String],
  inventory: {
    stock: Number,
    warehouse: String
  },
  specifications: {
    type: String
  },
  reviews: [reviewSchema],
  createdAt: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);