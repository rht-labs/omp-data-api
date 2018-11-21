const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  user_name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  first_name: String,
  last_name: String,
  expiration_date: Date,
  email: String,
  role: String,
  identity_providers: [
    {
      provider: String,
      created: Boolean,
      notified: Boolean
    }
  ],
  groups: [String],
  customers: [String]
});

module.exports = mongoose.model("User", UserSchema);
