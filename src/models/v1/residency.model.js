const mongoose = require("mongoose");
const Joi = require('joi');

const schema = mongoose.Schema({
  start_date: Date,
  end_date: Date,
  cluster_ref: String,
  source_control: String,
  name: String,
  tags: [String]
});

const validator = Joi.object({
  start_date: Joi.date(),
  end_date: Joi.date(),
  cluster_ref: Joi.string(),
  source_control: Joi.string(),
  name: Joi.string(),
  tags: Joi.array().items(Joi.string())
})

const defaults = {}

module.exports = {
  model: new mongoose.model("Residency", schema),
  validator: validator,
  defaults: defaults
};