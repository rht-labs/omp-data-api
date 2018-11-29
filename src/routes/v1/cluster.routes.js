const prefix = require("./prefix");
const clusters = require("../../controllers/v1/cluster.controller.js");
const Joi = require('joi')
const validator = require('express-joi-validation')({})

const clusterSchema = Joi.object({
  logging: Joi.boolean(),
  metrics: Joi.boolean(),
  size: Joi.string().min(2).max(6),
  ha: Joi.boolean(),
  ocp_version: Joi.string().min(2).max(10).required(),
  hosting_platform: Joi.string().min(2).max(20).required(),
  tags: Joi.array().items(Joi.string())
})

module.exports = app => {

  app.post(`${prefix}/clusters`, validator.body(clusterSchema), clusters.create);

  app.get(`${prefix}/clusters`, clusters.findAll);

  app.get(`${prefix}/clusters/:tags`, clusters.find);

  app.put(`${prefix}/clusters/:tags`, clusters.update);

  app.delete(`${prefix}/clusters/:tags`, clusters.delete);
};