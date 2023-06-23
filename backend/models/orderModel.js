const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  line_items: Object,
  email: String,
  phone: String,
  logo: String,
});

module.exports = mongoose.model("Order", productSchema);
