const mongoose = require("mongoose");
const Joi = require('joi');

const schema = mongoose.Schema({
  logging: Boolean,
  metrics: Boolean,
  size: String,
  ha: Boolean,
  ocp_version: String,
  hosting_platform: String,
  tags: [String]
});

const validator = Joi.object({
  logging: Joi.boolean(),
  metrics: Joi.boolean(),
  size: Joi.string().min(2).max(6),
  ha: Joi.boolean(),
  ocp_version: Joi.string().min(2).max(10).required(),
  hosting_platform: Joi.string().min(2).max(20).required(),
  tags: Joi.array().items(Joi.string())
})

const defaults = {
  logging: false,
  metrics: false,
  size: 'SMALL',
  ha: false
}

module.exports = {
  model: new mongoose.model("Cluster", schema),
  validator: validator,
  defaults: defaults
};