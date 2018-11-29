const mongoose = require("mongoose");

const ClusterSchema = mongoose.Schema({
  logging: Boolean,
  metrics: Boolean,
  size: String,
  ha: Boolean,
  ocp_version: String,
  hosting_platform: String,
  tags: [String]
});

module.exports = mongoose.model("Cluster", ClusterSchema);