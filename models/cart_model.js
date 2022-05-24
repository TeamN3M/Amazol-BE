const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        item_id: {
          type: String,
          required: true
        },
        item_name: {
          type: String,
          required: true
        },
        item_rating: {
          type: Number,
          required: true
        },
        item_price: {
          type: Number,
          required: true
        },
        item_pictures: {
          type: Array,
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
