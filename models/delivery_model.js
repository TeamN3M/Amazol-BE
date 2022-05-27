const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    order_id: { type: String, required: false, default: "" },
    date: { type: String, required: true, default: "01/08/2022" },
    time: { type: String, required: true },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true
    },
    address: { type: Object, required: false, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
