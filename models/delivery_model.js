const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    order_id: { type: String },
    date: { type: String, required: true, default: "01/08/2022" },
    time: { type: Number, required: true, default: 8 },
    isAvailable: {
      type: Boolean,
      required: true
    },
    address: { type: Object, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
