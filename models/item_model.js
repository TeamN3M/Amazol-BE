const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: true
    },
    item_description: {
      type: String,
      required: true
    },
    item_price: {
      type: Number,
      required: true
    },
    item_rating: {
      type: Number,
      required: false
    },
    item_quantity: {
      type: Number,
      required: true
    },
    item_pictures: [{}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
