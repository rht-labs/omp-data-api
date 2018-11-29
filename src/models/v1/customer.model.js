const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  customer_name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  tags: [String]
});

module.exports = mongoose.model("Customer", CustomerSchema);
