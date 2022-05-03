const mongoose = require("mongoose");
const item_model = require("./item_model");

const cartSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true
  },
  sender: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", postSchema);
