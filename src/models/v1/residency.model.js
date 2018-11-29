const mongoose = require("mongoose");

const ClusterSchema = mongoose.Schema({
  start_date: Date,
  end_date: Date,
  cluster_ref: String,
  source_control: String,
  name: String,
  tags: [String]
});

module.exports = mongoose.model("Residency", ClusterSchema);