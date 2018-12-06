const mongoose = require("mongoose");
const Joi = require('joi');

const schema = mongoose.Schema({
  customer_name: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  tags: [String]
});

const validator = Joi.object({
  customer_name: Joi.string().min(2).max(50).required(),
  tags: Joi.array().items(Joi.string()) 
})

const defaults = {}

module.exports = {
  model: new mongoose.model("Customer", schema),
  validator: validator,
  defaults: defaults
}
