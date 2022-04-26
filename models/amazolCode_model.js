const mongoose = require("mongoose");

const amazolCodeSchema = new mongoose.Schema({
  AmazolCode: {
    type: String,
    default: "AMAZOL123"
  }
});

module.exports = mongoose.model("AmazolCode", amazolCodeSchema);
