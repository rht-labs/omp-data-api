const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  group_name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  display_name: String,
  tags: [String]
});

module.exports = mongoose.model("Group", GroupSchema);
