const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
