const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    item_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    date: { type: String },
    review: { type: String, required: true },
    rating: { type: Number, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
