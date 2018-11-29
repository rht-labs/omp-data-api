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
  identity_providers: Object, // There is a 'gotcha' here. See `markModified`: https://mongoosejs.com/docs/schematypes.html#mixed
  tags: [String]
});

module.exports = mongoose.model("User", UserSchema);
