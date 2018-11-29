const prefix = require("./prefix");
const residencies = require("../../controllers/v1/residency.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const residencySchema = Joi.object({
  start_date: Joi.date(),
  end_date: Joi.date(),
  cluster_ref: Joi.string(),
  source_control: Joi.string(),
  name: Joi.string(),
  tags: Joi.array().items(Joi.string())
})

module.exports = app => {

  app.post(`${prefix}/residencies`, validator.body(residencySchema), residencies.create);

  app.get(`${prefix}/residencies`, residencies.findAll);

  app.get(`${prefix}/residencies/:tags`, residencies.find);

  app.put(`${prefix}/residencies/:tags`, residencies.update);

  app.delete(`${prefix}/residencies/:tags`, residencies.delete);
};