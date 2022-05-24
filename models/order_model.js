const mongoose = require("mongoose");
const { pending } = require("../strings");

const orderSchema = new mongoose.Schema(
  {
    customer_id: { type: String, required: true },
    items: [
      {
        item_id: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    price: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: pending }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
