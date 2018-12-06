const mongoose = require("mongoose");
const Joi = require('joi');

const schema = mongoose.Schema({
  group_name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  display_name: String,
  tags: [String]
});

const validator = Joi.object({
  group_name: Joi.string().min(2).max(50).required(),
  display_name: Joi.string().min(2).max(50).required(),
  tags: Joi.array().items(Joi.string())
})

const defaults = {}

module.exports = {
  model: new mongoose.model("Group", schema),
  validator: validator,
  defaults: defaults
};