const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    card_number: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Credit", CreditSchema);
