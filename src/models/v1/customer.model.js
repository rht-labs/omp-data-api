const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  customer_id: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  customer_name: String,
  start_date: Date,
  end_date: Date,
  cluster_url: String,
  atlassian_url: String,
  source_control: String
});

module.exports = mongoose.model("Customer", CustomerSchema);
