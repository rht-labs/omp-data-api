const mongoose = require("mongoose");
const Joi = require('joi');

const schema = mongoose.Schema({
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

const validator = Joi.object({
  user_name: Joi.string().min(2).max(50).required(),
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  expiration_date: Joi.date(),
  email: Joi.string().email().required(),
  identity_providers: Joi.any(),
  tags: Joi.array().items(Joi.string())
})

const defaults = {
  identity_providers: {},
  expiration_date: ''
}

const mutator = body => {
  body.user_name = body.user_name.toLowerCase();
  body.email = body.email.toLowerCase();
  return body;
}

module.exports = {
  model: new mongoose.model("User", schema),
  validator: validator,
  defaults: defaults,
  mutator: mutator
};