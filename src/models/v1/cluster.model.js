const mongoose = require("mongoose");

const ClusterSchema = mongoose.Schema({
  env_id: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  customer_id: String,
  logging: Boolean,
  metrics: Boolean,
  size: {
    master_node: Number,
    app_node: Number,
    infra_node: Number
  },
  ha: Boolean,
  ocp_version: String,
  hosting_platform: String
});

module.exports = mongoose.model("Cluster", ClusterSchema);