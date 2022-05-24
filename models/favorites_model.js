const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
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
        item_price: {
          type: Number,
          required: true
        },
        item_rating: {
          type: Number,
          required: false
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorites", favoritesSchema);
